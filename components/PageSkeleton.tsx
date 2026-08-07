import PageHeader from "@/components/PageHeader";
import SkeletonCard from "@/components/SkeletonCard";

interface PageSkeletonProps {
  title: string;
  subtitle?: string;
  /**
   * - "card-grid": 卡片网格骨架（异兽图鉴、诗境漫游、古今对话、成就、收藏、笔记、设置）
   * - "reading":   双语阅读骨架（带侧边栏占位 + 内容区）
   * - "quiz":      知识问答骨架（模式卡片网格）
   * - "spinner":   简单旋转加载（关于页等非卡片页面）
   */
  variant?: "card-grid" | "reading" | "quiz" | "spinner";
  /** 卡片数量，仅 card-grid / quiz 生效 */
  count?: number;
  /** PageHeader 是否紧凑模式 */
  compact?: boolean;
}

/**
 * 统一页面骨架屏组件。
 *
 * 用途：
 * 1. 作为 `<Suspense fallback={...}>` 的 fallback，防止客户端组件挂起时页脚顶上来。
 * 2. 作为 `loading.tsx` 的内容，保持路由级加载和 Suspense fallback 视觉一致。
 *
 * 所有页面共用同一套骨架样式，不允许出现内容为空、底部直接顶上来的情况。
 */
export default function PageSkeleton({
  title,
  subtitle = "正在为你准备内容",
  variant = "card-grid",
  count = 6,
  compact = false,
}: PageSkeletonProps) {
  /* -------- 双语阅读：侧边栏占位 + 内容区骨架 -------- */
  if (variant === "reading") {
    return (
      <main className="min-h-dvh w-full bg-xuan">
        {/* 桌面侧边栏占位 */}
        <aside className="hidden md:flex md:w-[200px] lg:w-[240px] md:flex-col md:fixed md:left-0 md:top-16 md:bottom-0 md:bg-xuan-dark md:border-r md:border-ink/5" />

        <div className="md:ml-[200px] lg:ml-[240px] lg:pl-[calc(max((100vw-1100px)/2-240px,0px)+1.5rem)] lg:pr-[calc(max((100vw-1100px)/2,0px)+1.5rem)]">
          <PageHeader title={title} subtitle={subtitle} compact />
          <div className="w-full px-4 pb-8 md:px-6">
            {/* 进度条骨架 */}
            <div className="mb-6 animate-pulse pt-2">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-rule/40" />
                <div className="h-4 w-10 rounded bg-rule/40" />
              </div>
              <div className="h-2 w-full rounded-full bg-ink/10" />
            </div>

            {/* 句子卡片骨架 */}
            <div className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="space-y-3 p-5">
                    <div className="h-6 w-3/4 rounded bg-rule/40" />
                    <div className="h-4 w-full rounded bg-rule/30" />
                    <div className="h-4 w-5/6 rounded bg-rule/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* -------- 知识问答：模式卡片骨架 -------- */
  if (variant === "quiz") {
    return (
      <main className="min-h-dvh bg-xuan pb-12 md:pb-16">
        <PageHeader title={title} subtitle={subtitle} compact />
        <div className="mx-auto max-w-[1100px] px-4 pt-8 md:px-6 md:pt-12">
          {/* 统计卡片骨架 */}
          <div className="mb-8 grid grid-cols-2 gap-3 md:mb-10 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-surface/60 p-4 md:p-5">
                <div className="h-3 w-16 rounded bg-rule/40" />
                <div className="mt-2 h-7 w-12 rounded bg-rule/50" />
              </div>
            ))}
          </div>
          {/* 模式卡片骨架 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} imageHeight="h-[140px]" lines={3} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  /* -------- 简单旋转加载 -------- */
  if (variant === "spinner") {
    return (
      <main className="min-h-dvh bg-xuan">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div
              className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cinnabar/20 border-t-cinnabar"
              aria-hidden="true"
            />
            <p className="mt-4 font-serif text-sm text-muted">加载中…</p>
          </div>
        </div>
      </main>
    );
  }

  /* -------- 默认：卡片网格骨架 -------- */
  return (
    <main className="min-h-dvh bg-xuan pb-12 md:pb-16">
      <PageHeader title={title} subtitle={subtitle} compact={compact} />
      <div className="mx-auto max-w-[1100px] px-4 pt-8 md:px-6 md:pt-12">
        {/* 筛选/进度区骨架 */}
        <div className="mb-8 flex animate-pulse items-center gap-4 md:mb-10">
          <div className="h-8 w-48 rounded-full bg-rule/40" />
          <div className="h-8 w-32 rounded-full bg-rule/30" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
