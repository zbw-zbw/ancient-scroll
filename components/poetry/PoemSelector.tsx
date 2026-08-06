"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { poems, type Poem } from "@/data/poems";
import { getProgress } from "@/lib/progress";
import PageHeader from "@/components/PageHeader";
import SectionProgress from "@/components/SectionProgress";
import { useHorizontalOverflow } from "@/lib/useHorizontalOverflow";
import PoemCard from "./PoemCard";
import ShareCardModal from "./ShareCardModal";
import Footer from "@/components/Footer";

interface PoemSelectorProps {
  onSelect: (poem: Poem) => void;
}

type CategoryFilter = "all" | string;

// 固定分类顺序（与异兽图鉴筛选栏一致的胶囊标签风格）
const categoryOrder: string[] = [
  "全部",
  "思乡",
  "送别",
  "山水",
  "边塞",
  "哲理",
  "民生",
  "抒情",
];

export default function PoemSelector({ onSelect }: PoemSelectorProps) {
  const [sharePoem, setSharePoem] = useState<Poem | null>(null);
  const [completedPoems, setCompletedPoems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const { ref: tabsRef, isScrollable } = useHorizontalOverflow<HTMLDivElement>();

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    // Auto-scroll clicked tab into view, revealing the next tab too
    requestAnimationFrame(() => {
      const container = tabsRef.current;
      if (!container) return;
      const tab = container.querySelector(`[data-tab-key="${category}"]`) as HTMLElement | null;
      if (!tab) return;
      const tabLeft = tab.offsetLeft;
      const tabRight = tabLeft + tab.offsetWidth;
      const viewLeft = container.scrollLeft;
      const viewRight = viewLeft + container.clientWidth;
      if (tabLeft < viewLeft) {
        container.scrollTo({ left: Math.max(0, tabLeft - 16), behavior: "smooth" });
      } else if (tabRight > viewRight) {
        container.scrollTo({ left: tabRight - container.clientWidth + 16, behavior: "smooth" });
      }
    });
  }, []);

  // 客户端加载已读诗词进度
  useEffect(() => {
    const updateProgress = () => {
      setCompletedPoems(getProgress().completedPoems);
    };
    updateProgress();
    window.addEventListener("ancient-scroll:progress-changed", updateProgress);
    return () => window.removeEventListener("ancient-scroll:progress-changed", updateProgress);
  }, []);

  // 按选中分类和搜索关键词筛选诗词
  const filteredPoems = useMemo(() => {
    let result = poems;
    if (activeCategory !== "全部") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.dynasty.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  // 计算每个分类的诗数（用于胶囊标签上的计数）
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 全部: poems.length };
    for (const p of poems) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <main className="min-h-dvh bg-xuan pb-16">
      <PageHeader
        title="诗境漫游"
        subtitle="一字一句，走进古诗的意境"
        compact
      />
      <div className="mx-auto max-w-[1100px] px-4 pt-8 md:px-6 md:pt-12">
        {/* 诗词阅读进度 */}
        <SectionProgress
          label="已读诗词"
          current={completedPoems.length}
          total={poems.length}
          className="mb-8 md:mb-10"
        />

        {/* 分类筛选 + 搜索（样式与异兽图鉴一致） */}
        <div className="mb-8 md:mb-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div
            ref={tabsRef}
            className={`scroll-fade-edges flex flex-1 min-w-0 flex-nowrap gap-2 overflow-x-auto scrollbar-hide ${isScrollable ? "is-scrollable" : ""}`}
            role="group"
            aria-label="诗词分类筛选"
          >
            {categoryOrder.map((category) => {
              const isActive = activeCategory === category;
              const count = categoryCounts[category] || 0;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  data-tab-key={category}
                  aria-pressed={isActive}
                  className={`capsule-btn inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
                    isActive
                      ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                      : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0 text-[10px] transition-colors ${
                      isActive
                        ? "bg-cinnabar/15 text-cinnabar"
                        : "bg-ink/5 text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 搜索框 */}
          <div className="relative flex-shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索诗名、作者..."
              aria-label="搜索诗词"
              className="w-full rounded-full bg-surface/60 px-4 py-1.5 pl-9 pr-8 font-serif text-sm text-ink placeholder:text-muted outline-none transition-colors focus:bg-surface focus:ring-2 focus:ring-cinnabar/30 md:w-56"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="清空搜索"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {filteredPoems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-sm text-muted">未找到匹配的诗词，试试其他关键词</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPoems.map((poem) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              onSelect={onSelect}
              isRead={completedPoems.includes(poem.id)}
              onShare={(e) => {
                e.stopPropagation();
                setSharePoem(poem);
              }}
            />
          ))}
        </div>
        )}
      </div>

      <ShareCardModal
        open={sharePoem !== null}
        onClose={() => setSharePoem(null)}
        poem={sharePoem}
      />
      <Footer />
    </main>
  );
}
