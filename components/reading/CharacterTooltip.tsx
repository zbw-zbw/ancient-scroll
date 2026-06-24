"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { DifficultChar } from "@/data/shanhaijing";

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

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleAskAI = async () => {
    if (loading || aiResult) return;
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
      setAiResult({
        pinyin: data.pinyin || charData.pinyin,
        meaning: data.meaning || charData.meaning,
        detail: data.detail || "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败");
    } finally {
      setLoading(false);
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={`fixed z-[100] min-w-[240px] max-w-[320px] rounded-md border border-rule bg-surface shadow-lg transition-all duration-200 ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={getTooltipStyle(triggerRect, tooltipRef.current, isMobile)}
      role="dialog"
      aria-modal="true"
      aria-label={`${charData.char}的字词注释`}
    >
      {/* Top cinnabar line */}
      <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-md bg-cinnabar" />

      <div className="p-4">
        {/* Basic info */}
        <div className="mb-3 flex items-baseline gap-3">
          <span className="font-calligraphy text-3xl text-ink">{charData.char}</span>
          <span className="font-serif text-base text-cinnabar">{charData.pinyin}</span>
        </div>
        <p className="font-serif text-sm leading-relaxed text-light-ink">
          {charData.meaning}
        </p>

        {/* Divider */}
        <div className="my-3 border-t border-rule" />

        {/* AI detail */}
        {aiResult ? (
          <div className="space-y-2">
            <p className="font-serif text-xs text-muted">AI 深度解读</p>
            <p className="font-serif text-sm leading-relaxed text-ink">
              {aiResult.detail}
            </p>
          </div>
        ) : (
          <button
            onClick={handleAskAI}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-cinnabar/30 bg-cinnabar/5 px-3 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10 disabled:cursor-not-allowed disabled:opacity-60"
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
                <span className="text-xs">✦</span>
                问 AI 深度解读
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
          className="absolute h-2.5 w-2.5 rotate-45 border-b border-r border-rule bg-surface"
          style={getArrowStyle(triggerRect, tooltipRef.current)}
        />
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(tooltipContent, document.body);
}

function getTooltipStyle(
  triggerRect: DOMRect,
  tooltipEl: HTMLDivElement | null,
  isMobile: boolean
): React.CSSProperties {
  if (isMobile) {
    return {
      left: "1rem",
      right: "1rem",
      bottom: "1rem",
    };
  }

  const margin = 12;
  const tooltipWidth = tooltipEl?.offsetWidth || 280;
  const tooltipHeight = tooltipEl?.offsetHeight || 180;

  let left = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
  let top = triggerRect.top - tooltipHeight - margin;

  // If tooltip would go above viewport, place below trigger
  if (top < margin) {
    top = triggerRect.bottom + margin;
  }

  // Clamp horizontally
  const viewportWidth = window.innerWidth;
  if (left < margin) left = margin;
  if (left + tooltipWidth > viewportWidth - margin) {
    left = viewportWidth - tooltipWidth - margin;
  }

  return { left, top };
}

function getArrowStyle(
  triggerRect: DOMRect,
  tooltipEl: HTMLDivElement | null
): React.CSSProperties {
  const margin = 12;
  const tooltipHeight = tooltipEl?.offsetHeight || 180;
  const top = triggerRect.top - tooltipHeight - margin;
  const placeBelow = top < margin;

  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  const tooltipWidth = tooltipEl?.offsetWidth || 280;
  let left = triggerCenter - 5;
  const tooltipLeft = Math.max(
    12,
    Math.min(window.innerWidth - tooltipWidth - 12, triggerCenter - tooltipWidth / 2)
  );
  left = triggerCenter - tooltipLeft - 5;

  if (placeBelow) {
    return {
      left,
      top: "-5px",
      transform: "rotate(225deg)",
    };
  }
  return {
    left,
    bottom: "-5px",
  };
}
