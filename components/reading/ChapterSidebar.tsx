"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { IconArrowLeft } from "@/components/icons";
import { getProgress } from "@/lib/progress";
import { useHorizontalOverflow } from "@/lib/useHorizontalOverflow";
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
  const { ref: mobileTabsContainerRef, isScrollable } = useHorizontalOverflow<HTMLDivElement>();
  const [readChapters, setReadChapters] = useState<string[]>([]);
  const [mobileTabsStuck, setMobileTabsStuck] = useState(false);

  useEffect(() => {
    setReadChapters(getProgress().readChapters);
  }, [selectedId]);

  // Detect when mobile tab bar becomes sticky, so we can add a background only then
  useEffect(() => {
    const el = mobileTabsRef.current;
    if (!el) return;
    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      // sticky top offset = 4rem = 64px; allow small rounding tolerance
      setMobileTabsStuck(rect.top <= 65);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Auto-scroll mobile tabs to selected chapter
  useEffect(() => {
    if (selectedTabRef.current && mobileTabsContainerRef.current) {
      const container = mobileTabsContainerRef.current;
      const tab = selectedTabRef.current;
      const scrollLeft = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedId]);

  return (
    <>
      {/* Desktop sidebar - sticky within flex layout */}
      <aside className="hidden md:flex md:w-[200px] lg:w-[240px] md:flex-shrink-0 md:flex-col md:sticky md:top-16 md:self-start md:h-[calc(100dvh-4rem)] md:overflow-hidden md:bg-xuan-dark md:border-r md:border-ink/5">
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          <h2 className="mb-5 font-calligraphy text-2xl text-ink">篇章目录</h2>
          <nav className="flex flex-col gap-1">
            {chapters.map((chapter) => {
              const isRead = readChapters.includes(chapter.id);
              return (
                <button
                  key={chapter.id}
                  onClick={() => onSelect(chapter.id)}
                  className={`group relative flex flex-col items-start rounded-md px-3 py-3 min-h-[44px] text-left transition-colors ${
                    selectedId === chapter.id
                      ? "bg-surface text-ink"
                      : "bg-transparent text-light-ink hover:bg-surface/50"
                  }`}
                  aria-current={selectedId === chapter.id ? "true" : undefined}
                  aria-label={`${chapter.name}${isRead ? "（已读）" : ""}`}
                >
                  {/* Indicator bar with animation */}
                  <span
                    className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-cinnabar transition-all duration-200 ${
                      selectedId === chapter.id ? "opacity-100" : "opacity-0 w-0 group-hover:opacity-40 group-hover:w-[2px]"
                    }`}
                  />
                  {/* 篇章名称（font-calligraphy 字体）+ 句数 badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-calligraphy text-lg">{chapter.name}</span>
                    {/* 句数 badge：小圆圈数字 */}
                    <span className="rounded-full bg-ink/5 px-1.5 text-[10px] text-muted">
                      {chapter.sentences.length}
                    </span>
                  </div>
                  <span className="mt-0.5 font-serif text-xs text-muted">
                    {chapter.subtitle}
                  </span>
                  {isRead && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-2 top-2 h-3 w-3 text-cinnabar/60">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-ink/5">
          {/* Reading progress */}
          <div className="mb-3 flex items-center justify-between">
            <span className="font-serif text-xs text-muted">阅读进度</span>
            <span className="font-serif text-xs text-cinnabar">{readChapters.length}/{chapters.length}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-cinnabar transition-all duration-500"
              style={{ width: `${chapters.length > 0 ? (readChapters.length / chapters.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Mobile horizontal scroll tabs */}
      <div
        ref={mobileTabsRef}
        className={`md:hidden w-full sticky top-16 z-30 flex-shrink-0 transition-colors duration-300 ${
          mobileTabsStuck
            ? "bg-xuan-dark/95 backdrop-blur-sm border-b border-ink/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1100px] relative">
          <div
            ref={mobileTabsContainerRef}
            className={`scroll-fade-edges flex items-center gap-2.5 overflow-x-auto py-4 px-4 scrollbar-hide ${isScrollable ? "is-scrollable" : ""}`}
          >
            {chapters.map((chapter) => {
              const isSelected = selectedId === chapter.id;
              const isRead = readChapters.includes(chapter.id);
              return (
                <button
                  key={chapter.id}
                  ref={isSelected ? selectedTabRef : null}
                  onClick={() => onSelect(chapter.id)}
                  className={`flex flex-shrink-0 items-center justify-center gap-1.5 rounded-full px-4 py-2 min-h-[36px] leading-none transition-all active:scale-95 ${
                    isSelected
                      ? "bg-cinnabar text-white"
                      : "bg-surface/50 text-light-ink hover:bg-surface"
                  }`}
                >
                  <span className="font-calligraphy text-base whitespace-nowrap">
                    {chapter.name}
                  </span>
                  {/* 句数 badge：小圆圈数字，仅在非选中态显示避免拥挤 */}
                  {!isSelected && (
                    <span className="rounded-full bg-ink/5 px-1.5 text-[10px] text-muted">
                      {chapter.sentences.length}
                    </span>
                  )}
                  {isRead && !isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cinnabar/60" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
