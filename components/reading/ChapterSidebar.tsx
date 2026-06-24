"use client";

import Link from "next/link";
import type { Chapter } from "@/data/shanhaijing";

interface ChapterSidebarProps {
  chapters: Chapter[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ChapterSidebar({
  chapters,
  selectedId,
  onSelect,
}: ChapterSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[200px] lg:w-[240px] md:flex-col md:fixed md:top-16 md:bottom-0 md:left-0 md:border-r md:border-rule/50 md:bg-xuan-dark">
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <h2 className="mb-5 font-calligraphy text-2xl text-ink">篇章目录</h2>
          <nav className="flex flex-col gap-2">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onSelect(chapter.id)}
                className={`group relative flex flex-col items-start rounded-md px-3 py-3 text-left transition-colors ${
                  selectedId === chapter.id
                    ? "bg-surface text-ink"
                    : "bg-transparent text-light-ink hover:bg-surface/50"
                }`}
              >
                {selectedId === chapter.id && (
                  <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-cinnabar" />
                )}
                <span className="font-calligraphy text-lg">{chapter.name}</span>
                <span className="mt-0.5 font-serif text-xs text-muted">
                  {chapter.subtitle}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-rule/50 p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-serif text-sm text-muted transition-colors hover:text-cinnabar"
          >
            <span>←</span>
            返回首页
          </Link>
        </div>
      </aside>

      {/* Mobile horizontal scroll tabs */}
      <div className="md:hidden sticky top-16 z-30 border-b border-rule/50 bg-xuan-dark">
        <div className="mx-auto max-w-[1100px] px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onSelect(chapter.id)}
                className={`flex flex-shrink-0 items-center justify-center rounded-full border px-4 py-2 leading-none transition-colors ${
                  selectedId === chapter.id
                    ? "border-cinnabar/40 bg-cinnabar text-white"
                    : "border-rule bg-surface/50 text-light-ink hover:bg-surface"
                }`}
              >
                <span className="font-calligraphy text-base whitespace-nowrap">
                  {chapter.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
