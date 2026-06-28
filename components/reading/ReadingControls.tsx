"use client";

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
