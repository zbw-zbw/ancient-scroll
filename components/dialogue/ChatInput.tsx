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
    <div className="bg-xuan px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6 md:py-4">
      <div className="mx-auto flex max-w-[900px] items-end gap-2 md:gap-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={rows}
          maxLength={500}
          placeholder="请输入你的问题……"
          disabled={disabled}
          aria-label="输入消息"
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
          aria-label="发送消息"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cinnabar text-white transition-transform active:scale-90 hover:shadow-md disabled:bg-muted disabled:cursor-not-allowed md:h-11 md:w-11"
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
                d="M22 2L11 13M22 2l-7 20-4-9-9-4l20-7z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="mx-auto flex max-w-[900px] items-center justify-between">
        <p className="font-serif text-xs text-muted">
          Enter 发送，Shift + Enter 换行
        </p>
        <span className={`font-serif text-xs ${value.length > 450 ? "text-cinnabar" : "text-muted/50"}`}>
          {value.length}/500
        </span>
      </div>
    </div>
  );
}
