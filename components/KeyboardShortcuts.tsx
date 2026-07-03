"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const shortcuts = [
  { keys: "Ctrl + K", description: "搜索" },
  { keys: "Esc", description: "关闭弹窗" },
  { keys: "?", description: "快捷键帮助" },
  { keys: "G", description: "回首页" },
  { keys: "B", description: "返回上一页" },
];

export default function KeyboardShortcuts() {
  const [helpOpen, setHelpOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
      // Ignore IME composition
      if (e.isComposing || e.keyCode === 229) return;

      // Ignore when typing in input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // Also ignore contentEditable elements
      if ((e.target as HTMLElement).isContentEditable) return;

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
      } else if (e.key === "Escape" && helpOpen) {
        setHelpOpen(false);
      } else if (e.key === "g" && !e.ctrlKey && !e.metaKey && !helpOpen) {
        e.preventDefault();
        if (pathname !== "/") router.push("/");
      } else if (e.key === "b" && !e.ctrlKey && !e.metaKey && !helpOpen) {
        e.preventDefault();
        router.back();
      }
    },
    [helpOpen, pathname, router]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!helpOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] bg-ink/40 backdrop-blur-sm"
      onClick={() => setHelpOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="快捷键帮助"
    >
      <div
        className="w-full max-w-xs mx-4 overflow-hidden bg-surface/80 backdrop-blur-md rounded-2xl shadow-2xl border border-ink/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-ink/10">
          <h3 className="font-calligraphy text-lg text-ink">快捷键</h3>
        </div>
        <div className="px-5 py-3 space-y-2.5">
          {shortcuts.map((s) => (
            <div
              key={s.keys}
              className="flex items-center justify-between gap-4"
            >
              <span className="font-serif text-sm text-light-ink">
                {s.description}
              </span>
              <kbd className="bg-xuan-dark/80 rounded-lg px-2.5 py-1 text-xs font-mono text-ink border border-ink/10 shadow-sm">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
        <div className="px-5 py-2.5 border-t border-ink/10 text-center text-xs text-light-ink/40 font-serif">
          <kbd className="bg-ink/5 rounded px-1.5 py-0.5 text-xs font-mono">
            ESC
          </kbd>{" "}
          关闭
        </div>
      </div>
    </div>
  );
}
