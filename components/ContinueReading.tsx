"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { getLastReadChapter, getReadHistory, getCompletionRate } from "@/lib/progress";
import { chapters } from "@/data/shanhaijing";

export default function ContinueReading() {
  const [lastChapterId, setLastChapterId] = useState<string | null>(null);
  const [completionRate, setCompletionRate] = useState(0);
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const update = () => {
      setLastChapterId(getLastReadChapter());
      setCompletionRate(getCompletionRate());
      setTimestamp(getReadHistory().lastReadTimestamp);
    };
    update();
    window.addEventListener("ancient-scroll:progress-changed", update);
    return () => window.removeEventListener("ancient-scroll:progress-changed", update);
  }, []);

  const chapter = useMemo(() => {
    if (!lastChapterId) return null;
    return chapters.find((c) => c.id === lastChapterId);
  }, [lastChapterId]);

  if (!chapter) return null;

  const timeAgo = (() => {
    if (!timestamp) return "";
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    return `${days}天前`;
  })();

  return (
    <section className="relative w-full py-8 md:py-16">
      <div className="relative mx-auto max-w-[1100px] px-6">
        <div className="card overflow-hidden rounded-2xl border border-cinnabar/20 bg-surface/60 transition-all duration-300 hover:border-cinnabar/40 hover:shadow-lg w-fit max-w-full mx-auto md:w-full md:max-w-none">
          <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-6 md:p-8">
            {/* Left: Chapter info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-cinnabar/10 px-2.5 py-0.5 font-serif text-xs text-cinnabar md:px-3 md:py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cinnabar animate-pulse" />
                  继续阅读
                </span>
                {timeAgo && (
                  <span className="font-serif text-xs text-muted">{timeAgo}</span>
                )}
              </div>
              <h3 className="font-calligraphy text-xl text-ink md:text-2xl">
                {chapter.name}
              </h3>
              <p className="mt-1 font-serif text-xs text-muted md:text-sm">
                {chapter.sentences.length} 段经文 · 上次阅读
              </p>
            </div>

            {/* Center: Progress ring */}
            <div className="flex items-center gap-3 flex-shrink-0 md:gap-4">
              <div className="relative h-12 w-12 md:h-16 md:w-16">
                <svg className="h-12 w-12 md:h-16 md:w-16 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-ink/10"
                  />
                  <circle
                    cx="18" cy="18" r="15.5"
                    fill="none"
                    stroke="var(--cinnabar, #c84032)"
                    strokeWidth="2"
                    // CIRCUMFERENCE_RATIO = (2 * π * 15.5) / 100 ≈ 0.9739
                    strokeDasharray={`${completionRate * 0.9739} 100`}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-calligraphy text-sm text-cinnabar md:text-lg">
                  {completionRate}
                </span>
              </div>
              <span className="font-serif text-xs text-muted">总进度</span>
            </div>

            {/* Right: CTA */}
            <Link
              href={`/reading?chapter=${chapter.id}`}
              className="inline-flex self-start items-center gap-2 rounded-full bg-cinnabar px-5 py-2.5 min-h-[44px] font-serif text-sm text-white shadow-sm transition-all hover:bg-cinnabar/90 hover:shadow-md active:scale-95 md:px-6 md:py-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              继续阅读
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
