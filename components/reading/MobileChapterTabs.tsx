"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { getProgress } from "@/lib/progress";
import type { Chapter } from "@/data/shanhaijing";

interface MobileChapterTabsProps {
  chapters: Chapter[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function MobileChapterTabs({
  chapters,
  selectedId,
  onSelect,
}: MobileChapterTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const selectedTabRef = useRef<HTMLButtonElement>(null);
  const [readChapters, setReadChapters] = useState<string[]>([]);

  useEffect(() => {
    setReadChapters(getProgress().readChapters);
  }, [selectedId]);

  // Auto-scroll tabs to selected chapter
  useEffect(() => {
    if (selectedTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const tab = selectedTabRef.current;
      const scrollLeft = tab.offsetLeft - container.clientWidth / 2 + tab.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [selectedId]);

  return (
    <div className="sticky top-16 z-30 -mx-4 mb-6 bg-xuan/95 backdrop-blur-sm border-b border-ink/5 px-4 py-3 md:hidden">
      <div
        ref={tabsRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-hide"
      >
        {chapters.map((chapter) => {
          const isSelected = selectedId === chapter.id;
          const isRead = readChapters.includes(chapter.id);
          return (
            <button
              key={chapter.id}
              ref={isSelected ? selectedTabRef : null}
              onClick={() => onSelect(chapter.id)}
              data-tab-key={chapter.id}
              className={`capsule-btn inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all active:scale-95 ${
                isSelected
                  ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                  : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
              }`}
            >
              <span className="font-calligraphy text-base whitespace-nowrap">
                {chapter.name}
              </span>
              {!isSelected && (
                <span className="ml-0.5 rounded-full bg-ink/5 px-1.5 py-0 text-[10px] text-muted">
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
  );
}
