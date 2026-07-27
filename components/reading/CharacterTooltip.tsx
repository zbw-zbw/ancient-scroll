"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { DifficultChar } from "@/data/shanhaijing";
import { IconSparkles } from "@/components/icons";
import { saveNote } from "@/lib/notes";

interface CharacterTooltipProps {
  charData: DifficultChar;
  context: string;
  triggerRect: DOMRect;
  chapterId?: string;
  sentenceId?: string;
  onClose: () => void;
}

interface AnnotateResult {
  pinyin: string;
  meaning: string;
  detail: string;
  // 用法示例（可选，由 AI 返回；没有数据时不展示"更多"区域）
  examples?: string[];
}

export default function CharacterTooltip({
  charData,
  context,
  triggerRect,
  chapterId,
  sentenceId,
  onClose,
}: CharacterTooltipProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AnnotateResult | null>(null);
  const [error, setError] = useState("");
  // "更多"折叠区域：默认折叠
  const [expanded, setExpanded] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 280, height: 180 });
  const [isMobile, setIsMobile] = useState(false);
  const autoFetchedRef = useRef(false);

  useLayoutEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  // Load cached AI annotation on mount
  useEffect(() => {
    try {
      const cacheKey = `annotate-${charData.char}-${context}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setAiResult(JSON.parse(cached));
      } else if (!autoFetchedRef.current) {
        autoFetchedRef.current = true;
        handleAskAI();
      }
    } catch {
      if (!autoFetchedRef.current) {
        autoFetchedRef.current = true;
        handleAskAI();
      }
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Measure tooltip size after first render so position is correct on first paint
  useLayoutEffect(() => {
    if (tooltipRef.current) {
      const { offsetWidth, offsetHeight } = tooltipRef.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [aiResult, expanded]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!tooltipRef.current) return;
      if (tooltipRef.current.contains(e.target as Node)) return;
      // Don't close when clicking another highlighted character; let ReadingClient handle toggle
      if ((e.target as HTMLElement).closest("[data-char-highlight]")) return;
      onClose();
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleScroll = () => onClose();
    const handleResize = () => onClose();

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleResize);
    };
  }, [onClose]);

  const handleAskAI = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/annotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ char: charData.char, context }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "请求失败");
      const result: AnnotateResult = {
        pinyin: data.pinyin || charData.pinyin,
        meaning: data.meaning || charData.meaning,
        detail: data.detail || "",
        // 用法示例：如果 API 返回了 examples 数组则使用，否则置空（"更多"区域不会显示）
        examples: Array.isArray(data.examples) ? data.examples.slice(0, 3) : undefined,
      };
      setAiResult(result);
      // Cache result
      try {
        const cacheKey = `annotate-${charData.char}-${context}`;
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch { /* ignore */ }
      // Save to reading notes
      if (sentenceId && chapterId) {
        try {
          saveNote({
            id: `${chapterId}-${sentenceId}-${charData.char}`,
            sentenceId,
            chapterId,
            original: context,
            char: charData.char,
            annotation: result,
            createdAt: Date.now(),
          });
        } catch { /* ignore */ }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  const { style, arrowStyle, placeBelow, originX, originY } = getTooltipStyle(
    triggerRect,
    size.width,
    size.height,
    isMobile
  );

  // 是否存在用法示例数据
  const hasExamples = !!(aiResult?.examples && aiResult.examples.length > 0);

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={`fixed z-[100] min-w-[240px] max-w-[320px] rounded-md bg-surface shadow-lg ${mounted ? "opacity-100" : "opacity-0"}`}
      style={{
        ...style,
        // 从点击位置展开：transform-origin 设为触发点相对弹窗的位置
        transformOrigin: `${originX}px ${originY}px`,
        // mounted 时 scale(1)，未 mounted 时 scale(0.85) 实现从点击位置展开的效果
        transform: mounted ? "scale(1)" : "scale(0.85)",
        transition: "opacity 0.18s ease-out, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)",
        maxWidth: isMobile ? `calc(100vw - 16px)` : 320,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${charData.char}的字词注释`}
    >
      <div className="p-4">
        {/* Basic info */}
        <div className="mb-3 flex items-baseline gap-3">
          <span className="font-calligraphy text-3xl text-ink">{charData.char}</span>
          <span className="font-serif text-base text-cinnabar">{charData.pinyin}</span>
        </div>
        <p className="font-serif text-sm leading-relaxed text-light-ink">
          {charData.meaning}
        </p>

        {/* Detail */}
        {aiResult ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-serif text-xs text-muted">深度解读</p>
              <button
                onClick={handleAskAI}
                disabled={loading}
                className="flex items-center gap-1 font-serif text-xs text-cinnabar/70 hover:text-cinnabar transition-colors disabled:opacity-50"
              >
                <IconSparkles className="h-3 w-3 flex-shrink-0" />
                重新解读
              </button>
            </div>
            <p className="font-serif text-sm leading-relaxed text-ink">
              {aiResult.detail}
            </p>

            {/* "更多"折叠区域：仅在存在用法示例数据时显示 */}
            {hasExamples && (
              <div className="mt-2 border-t border-ink/5 pt-2">
                <button
                  type="button"
                  onClick={() => setExpanded((e) => !e)}
                  className="flex w-full items-center justify-between font-serif text-xs text-cinnabar/80 transition-colors hover:text-cinnabar"
                  aria-expanded={expanded}
                >
                  <span>查看更多 · 用法示例</span>
                  <span className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>▾</span>
                </button>
                {/* 折叠/展开过渡：用 grid-rows 技巧实现高度自适应过渡 */}
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <ul className="mt-2 space-y-1.5 pl-1">
                      {aiResult!.examples!.map((ex, i) => (
                        <li
                          key={i}
                          className="border-l-2 border-cinnabar/30 pl-2 font-serif text-xs leading-relaxed text-light-ink"
                        >
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cinnabar/5 px-3 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-thinking-dot rounded-full bg-cinnabar" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 animate-thinking-dot rounded-full bg-cinnabar" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 animate-thinking-dot rounded-full bg-cinnabar" style={{ animationDelay: "300ms" }} />
                </span>
                正在查阅古籍...
              </>
            ) : (
              <>
                <IconSparkles className="h-3 w-3" />
                深度解读
              </>
            )}
          </button>
        )}

        {error && (
          <p className="mt-2 font-serif text-xs text-cinnabar">{error}</p>
        )}
      </div>

      {/* Triangle arrow (desktop only) */}
      {!isMobile && (
        <div
          className="absolute h-2.5 w-2.5 rotate-45 bg-surface"
          style={arrowStyle}
        />
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(tooltipContent, document.body);
}

function getTooltipStyle(
  triggerRect: DOMRect,
  tooltipWidth: number,
  tooltipHeight: number,
  isMobile: boolean
): {
  style: React.CSSProperties;
  arrowStyle: React.CSSProperties;
  placeBelow: boolean;
  originX: number;
  originY: number;
} {
  const margin = isMobile ? 8 : 12;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
  let top = triggerRect.top - tooltipHeight - margin;
  let placeBelow = false;

  // If tooltip would go above viewport, place below trigger
  if (top < margin) {
    top = triggerRect.bottom + margin;
    placeBelow = true;
  }

  // Clamp horizontally
  if (left < margin) left = margin;
  if (left + tooltipWidth > viewportWidth - margin) {
    left = viewportWidth - tooltipWidth - margin;
  }

  // Ensure it stays within viewport vertically
  if (top + tooltipHeight > viewportHeight - margin) {
    top = viewportHeight - tooltipHeight - margin;
  }

  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  let arrowLeft = triggerCenter - left - 5;
  arrowLeft = Math.max(8, Math.min(tooltipWidth - 18, arrowLeft));

  const arrowStyle: React.CSSProperties = isMobile
    ? { display: "none" }
    : placeBelow
    ? { left: arrowLeft, top: "-5px", transform: "rotate(225deg)" }
    : { left: arrowLeft, bottom: "-5px" };

  // 计算 transform-origin：让弹窗从触发点（trigger 中心）展开
  // originX = 触发点中心相对弹窗左上角的 X 偏移
  // originY = 弹窗位于触发点下方时为 0（顶部），位于上方时为弹窗高度（底部）
  const originX = Math.max(0, Math.min(tooltipWidth, triggerCenter - left));
  const originY = placeBelow ? 0 : tooltipHeight;

  return { style: { left, top }, arrowStyle, placeBelow, originX, originY };
}
