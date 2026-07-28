/**
 * API 安全防护：速率限制 + 请求体大小限制。
 *
 * 安全最佳实践依据：LLM 代理接口直连按 token 计费的第三方 API，
 * 若不限流，任何人都可用脚本无限调用刷光账户余额（见 security_best_practices_report.md C-1/M-2）。
 *
 * 实现说明：内存滑动窗口，按 IP 维度计数，Edge/Node 运行时均可运行，
 * 无需任何外部服务或环境变量即可生效。单实例部署下即为全局限流；
 * Vercel 多实例场景下为"每实例"限流（仍可将滥用流量压缩到 1/N），
 * 如需严格的全局限流，可将 bucket 存储替换为 Upstash Redis，接口保持不变。
 */

interface RateBucket {
  /** 当前窗口内的请求时间戳（毫秒） */
  hits: number[];
}

const buckets = new Map<string, RateBucket>();

/** 定期清理过期 bucket，防止内存随独立 IP 数无限增长 */
const MAX_BUCKETS = 5000;
let lastSweep = Date.now();

function sweep(now: number, windowMs: number) {
  if (now - lastSweep < windowMs) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.hits.length === 0 || now - bucket.hits[bucket.hits.length - 1] > windowMs) {
      buckets.delete(key);
    }
  }
  // 极端情况下（大量不同 IP）兜底淘汰最旧的 bucket
  if (buckets.size > MAX_BUCKETS) {
    const excess = buckets.size - MAX_BUCKETS;
    let removed = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++removed >= excess) break;
    }
  }
}

export interface RateLimitOptions {
  /** 窗口内允许的最大请求数 */
  limit: number;
  /** 窗口长度（毫秒） */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  /** 被限制时，建议客户端多少秒后重试 */
  retryAfterSeconds: number;
}

/** 从请求中提取客户端标识（Vercel/代理会写入 x-forwarded-for） */
export function getClientKey(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): RateLimitResult {
  const now = Date.now();
  sweep(now, windowMs);

  const bucket = buckets.get(key) ?? { hits: [] };
  // 丢弃窗口外的时间戳（滑动窗口）
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0];
    return {
      success: false,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { success: true, retryAfterSeconds: 0 };
}

/** 请求体上限：正常业务 payload 最大约 40KB（chat 满载），64KB 留有余量 */
export const MAX_BODY_BYTES = 64 * 1024;

export interface GuardOptions extends RateLimitOptions {
  /** 限流维度前缀（按路由隔离配额） */
  scope: string;
}

/**
 * API 路由统一入口守卫。
 * 返回 null 表示放行；返回 Response 表示拦截（413 超限 / 429 限流），路由直接 return 即可。
 */
export function guardApiRequest(
  request: Request,
  { scope, limit, windowMs }: GuardOptions
): Response | null {
  // M-2：拒绝超大请求体，避免内存与解析资源被滥用
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json(
      { error: "请求体过大，请精简内容后重试" },
      { status: 413 }
    );
  }

  // C-1：按 IP + 路由维度限流
  const key = `${scope}:${getClientKey(request)}`;
  const result = checkRateLimit(key, { limit, windowMs });
  if (!result.success) {
    return Response.json(
      { error: "请求过于频繁，请稍后再试" },
      {
        status: 429,
        headers: { "Retry-After": String(result.retryAfterSeconds) },
      }
    );
  }

  return null;
}
