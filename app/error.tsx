"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error caught:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-xuan overflow-hidden px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cinnabar/[0.03] to-transparent blur-3xl" />
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full bg-ink/[0.03] blur-2xl" />
      </div>

      <div className="relative z-10 text-center">
        {/* Decorative icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cinnabar/5" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-cinnabar/60">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>

        <h1 className="font-calligraphy text-4xl text-ink md:text-5xl">
          墨痕中断
        </h1>

        <p className="mx-auto mt-6 max-w-md font-serif text-base leading-relaxed text-muted">
          页面在渲染过程中遇到了意外错误。<br />
          这可能是暂时性的问题，请稍后重试。
        </p>

        {error.message && process.env.NODE_ENV === "development" && (
          <pre className="mx-auto mt-4 max-w-lg overflow-auto rounded-lg bg-ink/5 p-3 font-mono text-xs text-muted/70">
            {error.message}
          </pre>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-cinnabar px-7 py-3 min-h-[44px] font-serif text-sm text-white transition-all hover:bg-cinnabar/90 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            重新加载
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-full border border-ink/10 px-7 py-3 min-h-[44px] font-serif text-sm text-light-ink transition-colors hover:border-cinnabar/30 hover:text-cinnabar"
          >
            返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
