"use client";

import { useRef, useState } from "react";

interface ChatInputProps {
 value: string;
 onChange: (value: string) => void;
 onSend: () => void;
 disabled?: boolean;
}

export default function ChatInput({
 value,
 onChange,
 onSend,
 disabled,
}: ChatInputProps) {
 const textareaRef = useRef<HTMLTextAreaElement>(null);
 const [rows, setRows] = useState(1);

 const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
 if (e.key === "Enter" && !e.shiftKey) {
 e.preventDefault();
 if (value.trim() && !disabled) {
 onSend();
 setRows(1);
 }
 }
 };

 const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 const newValue = e.target.value;
 onChange(newValue);

 // Auto-resize up to 3 rows
 const lineCount = Math.min(
 Math.max(newValue.split("\n").length, 1),
 3,
 );
 setRows(lineCount);
 };

 return (
    <div className="bg-xuan px-4 py-3 md:px-6 md:py-4">
 <div className="mx-auto flex max-w-[900px] items-end gap-2 md:gap-3">
 <textarea
 ref={textareaRef}
 value={value}
 onChange={handleChange}
 onKeyDown={handleKeyDown}
 rows={rows}
 placeholder="请输入你的问题……"
 disabled={disabled}
 className="max-h-28 flex-1 resize-none rounded-2xl bg-surface px-4 py-3 font-serif text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cinnabar/30 disabled:opacity-60"
 />
 <button
 onClick={() => {
 if (value.trim() && !disabled) {
 onSend();
 setRows(1);
 }
 }}
 disabled={disabled || !value.trim()}
 className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cinnabar text-white transition-all hover:bg-cinnabar/90 disabled:bg-muted disabled:cursor-not-allowed md:h-11 md:w-11"
 >
 {disabled ? (
 <span className="inline-flex gap-0.5">
 <span className="h-1.5 w-1.5 rounded-full bg-white animate-thinking-dot" style={{ animationDelay: "0s" }} />
 <span className="h-1.5 w-1.5 rounded-full bg-white animate-thinking-dot" style={{ animationDelay: "0.2s" }} />
 <span className="h-1.5 w-1.5 rounded-full bg-white animate-thinking-dot" style={{ animationDelay: "0.4s" }} />
 </span>
 ) : (
 <svg
 className="h-5 w-5"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M5 10l7-7m0 0l7 7m-7-7v18"
 />
 </svg>
 )}
 </button>
 </div>
 <p className="mt-2 text-center font-serif text-xs text-muted">
 Enter 发送，Shift + Enter 换行
 </p>
 </div>
 );
}
