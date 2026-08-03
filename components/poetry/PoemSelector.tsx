"use client";

import { useEffect, useMemo, useState } from "react";
import { poems, type Poem } from "@/data/poems";
import { getProgress } from "@/lib/progress";
import PageHeader from "@/components/PageHeader";
import PoemCard from "./PoemCard";
import ShareCardModal from "./ShareCardModal";

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

  // 客户端加载已读诗词进度
  useEffect(() => {
    setCompletedPoems(getProgress().completedPoems);
  }, []);

  // 按选中分类筛选诗词
  const filteredPoems = useMemo(() => {
    if (activeCategory === "全部") return poems;
    return poems.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // 计算每个分类的诗数（用于胶囊标签上的计数）
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 全部: poems.length };
    for (const p of poems) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-dvh bg-xuan px-4 pb-16 md:px-6">
      <PageHeader
        title="诗境漫游"
        subtitle="一字一句，走进古诗的意境"
        compact
      />
      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        {/* 分类筛选条（胶囊标签，样式与异兽图鉴一致） */}
        <div className="mb-8 md:mb-10">
          <div
            className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide"
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
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`capsule-btn inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
                    isActive
                      ? "border-cinnabar bg-cinnabar text-white"
                      : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0 text-[10px] transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-ink/5 text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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
      </div>

      <ShareCardModal
        open={sharePoem !== null}
        onClose={() => setSharePoem(null)}
        poem={sharePoem}
      />
    </div>
  );
}
