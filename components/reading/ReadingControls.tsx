"use client";

import { getAllNotes, exportNotesAsMarkdown, downloadMarkdown } from "@/lib/notes";

export type FontSize = "sm" | "md" | "lg";

interface ReadingControlsProps {
  fontSize: FontSize;
  showTranslation: boolean;
  onFontSizeChange: (size: FontSize) => void;
  onShowTranslationChange: (show: boolean) => void;
  /** 听书模式状态：idle / playing / paused */
  listenMode?: "idle" | "playing" | "paused";
  onToggleListen?: () => void;
}

const fontSizeOptions: { value: FontSize; label: string }[] = [
  { value: "sm", label: "小" },
  { value: "md", label: "中" },
  { value: "lg", label: "大" },
];

export default function ReadingControls({
  fontSize,
  showTranslation,
  onFontSizeChange,
  onShowTranslationChange,
  listenMode = "idle",
  onToggleListen,
}: ReadingControlsProps) {
  return (
    <div className="flex items-center justify-end gap-2 overflow-x-auto scrollbar-hide">
      {/* 听书模式按钮 */}
      {onToggleListen && (
        <button
          onClick={onToggleListen}
          className={`capsule-btn inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
            listenMode === "playing"
              ? "border-cinnabar bg-cinnabar text-white"
              : listenMode === "paused"
                ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
          }`}
          title={
            listenMode === "playing"
              ? "暂停听书"
              : listenMode === "paused"
                ? "继续听书"
                : "开启听书模式"
          }
        >
          {listenMode === "playing" ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
          {listenMode === "playing" ? "暂停听书" : listenMode === "paused" ? "继续听书" : "听书"}
        </button>
      )}

      {/* Display mode: 逐句对照 / 仅原文 */}
      <button
        onClick={() => onShowTranslationChange(true)}
        className={`capsule-btn inline-flex flex-shrink-0 items-center rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
          showTranslation
            ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
            : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
        }`}
      >
        逐句对照
      </button>
      <button
        onClick={() => onShowTranslationChange(false)}
        className={`capsule-btn inline-flex flex-shrink-0 items-center rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
          !showTranslation
            ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
            : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
        }`}
      >
        仅原文
      </button>

      {/* Font size */}
      <span className="hidden flex-shrink-0 font-serif text-sm text-muted sm:inline">字号</span>
      {fontSizeOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onFontSizeChange(option.value)}
          className={`capsule-btn inline-flex flex-shrink-0 items-center justify-center rounded-full border px-3 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
            fontSize === option.value
              ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
              : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
          }`}
        >
          {option.label}
        </button>
      ))}

      {/* Export notes */}
      <button
        onClick={() => {
          const md = exportNotesAsMarkdown();
          if (md) {
            downloadMarkdown(md);
          }
        }}
        className="capsule-btn inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-ink/15 bg-transparent px-3.5 py-1.5 min-h-[36px] font-serif text-sm text-ink transition-all hover:bg-ink/5"
        title="导出阅读笔记为 Markdown"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        导出笔记
        <span className="text-muted">({getAllNotes().length})</span>
      </button>
    </div>
  );
}
