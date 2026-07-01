"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { IconArrowLeft } from "@/components/icons";
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
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const selectedTabRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll mobile tabs to selected chapter
  useEffect(() => {
    if (selectedTabRef.current && mobileTabsRef.current) {
      const container = mobileTabsRef.current;
      const tab = selectedTabRef.current;
      const containerRect = container.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      const scrollLeft = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedId]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[200px] lg:w-[240px] md:flex-col md:fixed md:top-16 md:bottom-0 md:left-0 md:bg-xuan-dark">
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <h2 className="mb-5 font-calligraphy text-2xl text-ink">篇章目录</h2>
          <nav className="flex flex-col gap-1">
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
                {/* Indicator bar with animation */}
                <span
                  className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-cinnabar transition-all duration-200 ${
                    selectedId === chapter.id ? "opacity-100" : "opacity-0 w-0 group-hover:opacity-40 group-hover:w-[2px]"
                  }`}
                />
                <span className="font-calligraphy text-lg">{chapter.name}</span>
                <span className="mt-0.5 font-serif text-xs text-muted">
                  {chapter.subtitle}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-serif text-sm text-muted transition-colors hover:text-cinnabar"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            返回首页
          </Link>
        </div>
      </aside>

      {/* Mobile horizontal scroll tabs */}
      <div className="md:hidden sticky top-16 z-30 bg-xuan-dark">
        <div className="mx-auto max-w-[1100px] relative">
          {/* Left fade mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-r from-xuan-dark to-transparent" />
          {/* Right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-6 bg-gradient-to-l from-xuan-dark to-transparent" />
          <div
            ref={mobileTabsRef}
            className="flex items-center gap-2.5 overflow-x-auto py-4 px-4 scrollbar-hide"
          >
            {chapters.map((chapter) => {
              const isSelected = selectedId === chapter.id;
              return (
                <button
                  key={chapter.id}
                  ref={isSelected ? selectedTabRef : null}
                  onClick={() => onSelect(chapter.id)}
                  className={`flex flex-shrink-0 items-center justify-center rounded-full px-4 py-2 leading-none transition-all active:scale-95 ${
                    isSelected
                      ? "bg-cinnabar text-white"
                      : "bg-surface/50 text-light-ink hover:bg-surface"
                  }`}
                >
                  <span className="font-calligraphy text-base whitespace-nowrap">
                    {chapter.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
