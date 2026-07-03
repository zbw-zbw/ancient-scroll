"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapters } from "@/data/shanhaijing";
import { getReadHistory } from "@/lib/progress";

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days === 1) return "昨天";
  if (days < 30) return `${days}天前`;
  return `${Math.floor(days / 30)}个月前`;
}

export default function ContinueReading() {
  const [chapterName, setChapterName] = useState<string | null>(null);
  const [chapterId, setChapterId] = useState<string | null>(null);
  const [relativeTime, setRelativeTime] = useState<string>("");

  useEffect(() => {
    const history = getReadHistory();
    if (history.lastReadChapter) {
      const chapter = chapters.find((c) => c.id === history.lastReadChapter);
      if (chapter) {
        setChapterName(chapter.name);
        setChapterId(chapter.id);
        setRelativeTime(formatRelativeTime(history.lastReadTimestamp));
      }
    }
  }, []);

  if (!chapterId || !chapterName) return null;

  return (
    <section className="fade-in relative w-full py-8 md:py-12">
      <div className="relative mx-auto max-w-[1100px] px-6">
        <div className="card overflow-hidden rounded-2xl border border-cinnabar/20 bg-surface/60 transition-all duration-300 hover:border-cinnabar/40 hover:shadow-lg">
          <div className="flex items-center gap-4 p-5 md:p-6">
            {/* Book icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cinnabar/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-cinnabar"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-serif text-xs text-muted">上次阅读</p>
              <p className="mt-0.5 truncate font-calligraphy text-lg text-ink">
                {chapterName}
              </p>
              {relativeTime && (
                <p className="mt-0.5 font-serif text-xs text-muted">{relativeTime}</p>
              )}
            </div>

            <Link
              href={`/reading?chapter=${chapterId}`}
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cinnabar px-4 py-2 font-serif text-sm text-white shadow-sm transition-all hover:bg-cinnabar/90 hover:shadow-md active:scale-95"
            >
              继续阅读
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
