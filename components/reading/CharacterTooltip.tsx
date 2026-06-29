"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { DifficultChar } from "@/data/shanhaijing";
import { IconSparkles } from "@/components/icons";

interface CharacterTooltipProps {
 charData: DifficultChar;
 context: string;
 triggerRect: DOMRect;
 onClose: () => void;
}

interface AnnotateResult {
 pinyin: string;
 meaning: string;
 detail: string;
}

export default function CharacterTooltip({
 charData,
 context,
 triggerRect,
 onClose,
}: CharacterTooltipProps) {
 const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AnnotateResult | null>(null);
  const [error, setError] = useState("");
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
      const cacheKey = `annotate-${charData.char}-${context.slice(0, 20)}`;
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
 }, [aiResult]);

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

 document.addEventListener("mousedown", handleClickOutside);
 document.addEventListener("keydown", handleEsc);
 window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
 window.addEventListener("resize", handleResize);

 return () => {
 document.removeEventListener("mousedown", handleClickOutside);
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
      };
      setAiResult(result);
      // Cache result
      try {
        const cacheKey = `annotate-${charData.char}-${context.slice(0, 20)}`;
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch { /* ignore */ }
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

 const { style, arrowStyle, placeBelow } = getTooltipStyle(
    triggerRect,
    size.width,
    size.height,
    isMobile
  );

 const tooltipContent = (
    <div
      ref={tooltipRef}
      className={`fixed z-[100] min-w-[240px] max-w-[320px] rounded-md bg-surface shadow-lg ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{
        ...style,
        transform: mounted ? "none" : (placeBelow ? "translateY(-8px)" : "translateY(8px)"),
        transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
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
 <IconSparkles className="h-3 w-3" />
 重新解读
 </button>
 </div>
 <p className="font-serif text-sm leading-relaxed text-ink">
 {aiResult.detail}
 </p>
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
): { style: React.CSSProperties; arrowStyle: React.CSSProperties; placeBelow: boolean } {
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

 return { style: { left, top }, arrowStyle, placeBelow };
}
