"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * 通用自定义下拉框组件。
 * 风格统一：宣纸底色 + 朱砂红强调 + 书法/宋体字体。
 * 替代原生 <select>，支持点击外部关闭、键盘导航。
 */
export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "请选择",
  disabled = false,
  className = "",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // 打开时滚动到选中项
  useEffect(() => {
    if (open && listRef.current) {
      const selectedEl = listRef.current.querySelector<HTMLDivElement>(
        `[data-index="${highlightedIndex}"]`
      );
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [open, highlightedIndex]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => {
      if (!prev) {
        // 打开时定位到当前选中项
        const idx = options.findIndex((o) => o.value === value);
        setHighlightedIndex(idx >= 0 ? idx : 0);
      }
      return !prev;
    });
  }, [disabled, options, value]);

  const handleSelect = useCallback(
    (option: DropdownOption) => {
      onChange(option.value);
      setOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (open && highlightedIndex >= 0) {
            handleSelect(options[highlightedIndex]);
          } else {
            handleToggle();
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            handleToggle();
          } else {
            setHighlightedIndex((prev) =>
              prev < options.length - 1 ? prev + 1 : prev,
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (open) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;
        case "Tab":
          setOpen(false);
          break;
      }
    },
    [disabled, open, highlightedIndex, options, handleSelect, handleToggle],
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-xl bg-xuan/50 px-4 py-2.5 min-h-[44px] font-serif text-sm text-ink border transition-all ${
          open
            ? "border-cinnabar/40 ring-2 ring-cinnabar/10"
            : "border-ink/10 hover:border-ink/20"
        } cursor-pointer focus:outline-none`}
      >
        <span className={`truncate ${selectedOption ? "text-ink" : "text-muted"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-cinnabar" : ""
          }`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-lg shadow-ink/5 max-h-60 overflow-y-auto"
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              data-index={index}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option)}
              className={`flex items-center gap-2 px-4 py-2.5 font-serif text-sm cursor-pointer transition-colors ${
                option.value === value
                  ? "bg-cinnabar/8 text-cinnabar"
                  : highlightedIndex === index
                    ? "bg-ink/5 text-ink"
                    : "text-light-ink hover:bg-ink/5"
              }`}
            >
              <span className="flex-1 truncate">{option.label}</span>
              {option.value === value && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
