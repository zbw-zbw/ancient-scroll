"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/components/Toast";

interface CopyButtonProps {
  text: string;
  label?: string;
  successMessage?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CopyButton({
  text,
  label = "复制",
  successMessage = "已复制到剪贴板",
  className = "",
  children,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast(successMessage, "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        toast(successMessage, "success");
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast("复制失败，请手动复制", "error");
      }
      document.body.removeChild(textarea);
    }
  }, [text, successMessage, toast]);

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs transition-all active:scale-95 ${
        copied
          ? "bg-emerald-800/10 text-emerald-700 dark:text-emerald-400"
          : "text-light-ink hover:bg-ink/5 hover:text-cinnabar"
      } ${className}`}
      aria-label={copied ? "已复制" : label}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : children ? (
        children
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied ? "已复制" : label}
    </button>
  );
}
