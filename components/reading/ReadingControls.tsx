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
  { value: "sm", label: "小字" },
  { value: "md", label: "中字" },
  { value: "lg", label: "大字" },
];

// 统一按钮样式：所有按钮使用相同的 padding / min-height / font-size
const btnBase =
  "capsule-btn inline-flex flex-shrink-0 items-center justify-center gap-1 rounded-full border font-serif transition-all md:gap-1.5";

// 移动端 & 桌面端统一尺寸
const btnSize =
  "px-2 py-1 min-h-[30px] text-xs md:px-3.5 md:py-1.5 md:min-h-[36px] md:text-sm";

// 选中态
const activeCls = "border-cinnabar bg-cinnabar/10 text-cinnabar";
// 默认态
const idleCls = "border-ink/15 bg-transparent text-ink hover:bg-ink/5";

export default function ReadingControls({
  fontSize,
  showTranslation,
  onFontSizeChange,
  onShowTranslationChange,
  listenMode = "idle",
  onToggleListen,
}: ReadingControlsProps) {
  return (
    <div className="flex flex-nowrap items-center justify-between gap-1 md:gap-3">
      {/* ===== 左：听书 ===== */}
      <div className="flex items-center gap-1 md:gap-1.5">
        {onToggleListen && (
          <button
            onClick={onToggleListen}
            className={`${btnBase} ${btnSize} ${
              listenMode === "playing"
                ? "border-cinnabar bg-cinnabar text-white"
                : listenMode === "paused"
                  ? activeCls
                  : idleCls
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 md:h-4 md:w-4">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 md:h-4 md:w-4">
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
            <span className="hidden md:inline">
              {listenMode === "playing" ? "暂停听书" : listenMode === "paused" ? "继续听书" : "听书"}
            </span>
            <span className="md:hidden">
              {listenMode === "playing" ? "暂停" : listenMode === "paused" ? "继续" : "听书"}
            </span>
          </button>
        )}
      </div>

      {/* ===== 中：翻译 + 字号 ===== */}
      <div className="flex items-center gap-1 md:gap-1.5">
        {/* 翻译开关 */}
        <button
          onClick={() => onShowTranslationChange(!showTranslation)}
          className={`${btnBase} ${btnSize} ${showTranslation ? activeCls : idleCls}`}
          title={showTranslation ? "当前：显示翻译，点击切换为仅原文" : "当前：仅原文，点击切换为显示翻译"}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 md:h-4 md:w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5 9-9" />
          </svg>
          {showTranslation ? "翻译" : "原文"}
        </button>

        {/* 分隔线 — 仅桌面端 */}
        <div className="hidden md:block h-5 w-px flex-shrink-0 bg-ink/10" />

        {/* 字号 */}
        {fontSizeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFontSizeChange(option.value)}
            className={`${btnBase} ${btnSize} ${fontSize === option.value ? activeCls : idleCls}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* ===== 右：导出笔记 ===== */}
      <div className="flex items-center gap-1 md:gap-1.5">
        <button
          onClick={() => {
            const md = exportNotesAsMarkdown();
            if (md) {
              downloadMarkdown(md);
            }
          }}
          className={`${btnBase} ${btnSize} ${idleCls}`}
          title="导出阅读笔记为 Markdown"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 md:h-4 md:w-4">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span className="hidden md:inline">导出笔记</span>
          <span className="text-muted text-[10px] md:text-xs">({getAllNotes().length})</span>
        </button>
      </div>
    </div>
  );
}
