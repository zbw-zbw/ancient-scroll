"use client";

import { getAllNotes, exportNotesAsMarkdown, downloadMarkdown } from "@/lib/notes";

export type FontSize = "sm" | "md" | "lg";

interface ReadingControlsProps {
 fontSize: FontSize;
 showTranslation: boolean;
 onFontSizeChange: (size: FontSize) => void;
 onShowTranslationChange: (show: boolean) => void;
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
}: ReadingControlsProps) {
 return (
 <div className="flex flex-wrap items-center justify-end gap-3">
 {/* Export notes */}
 <button
   onClick={() => {
     const md = exportNotesAsMarkdown();
     if (md) {
       downloadMarkdown(md);
     }
   }}
   className="inline-flex items-center gap-1.5 rounded-full bg-surface/60 px-3 py-1.5 font-serif text-xs text-light-ink transition-colors hover:bg-cinnabar/5 hover:text-cinnabar"
   title="导出阅读笔记为 Markdown"
 >
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
     <polyline points="7 10 12 15 17 10" />
     <line x1="12" y1="15" x2="12" y2="3" />
   </svg>
   导出笔记
   <span className="text-muted">({getAllNotes().length})</span>
 </button>

 {/* Font size */}
 <div className="flex items-center gap-1 rounded-full bg-surface/60 p-1">
 <span className="hidden px-2 font-serif text-xs text-muted sm:inline">字号</span>
 {fontSizeOptions.map((option) => (
 <button
 key={option.value}
 onClick={() => onFontSizeChange(option.value)}
 className={`rounded-full px-3 py-1 font-serif text-xs transition-colors ${
 fontSize === option.value
 ? "bg-cinnabar text-white"
 : "text-light-ink hover:bg-cinnabar/5"
 }`}
 >
 {option.label}
 </button>
 ))}
 </div>

 {/* Display mode */}
 <div className="flex items-center gap-1 rounded-full bg-surface/60 p-1">
 <button
 onClick={() => onShowTranslationChange(true)}
 className={`rounded-full px-3 py-1 font-serif text-xs transition-colors ${
 showTranslation
 ? "bg-cinnabar text-white"
 : "text-light-ink hover:bg-cinnabar/5"
 }`}
 >
 逐句对照
 </button>
 <button
 onClick={() => onShowTranslationChange(false)}
 className={`rounded-full px-3 py-1 font-serif text-xs transition-colors ${
 !showTranslation
 ? "bg-cinnabar text-white"
 : "text-light-ink hover:bg-cinnabar/5"
 }`}
 >
 仅原文
 </button>
 </div>
 </div>
 );
}
