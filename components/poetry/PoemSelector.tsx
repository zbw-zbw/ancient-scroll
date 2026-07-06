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

type DynastyFilter = "all" | string;

export default function PoemSelector({ onSelect }: PoemSelectorProps) {
  const [sharePoem, setSharePoem] = useState<Poem | null>(null);
  const [completedPoems, setCompletedPoems] = useState<string[]>([]);
  const [activeDynasty, setActiveDynasty] = useState<DynastyFilter>("all");

  // 客户端加载已读诗词进度
  useEffect(() => {
    setCompletedPoems(getProgress().completedPoems);
  }, []);

  // 提取所有不重复的朝代
  const dynasties = useMemo(
    () => Array.from(new Set(poems.map((p) => p.dynasty))),
    []
  );

  // 筛选按钮组："全部" + 各朝代
  const dynastyOptions: DynastyFilter[] = useMemo(
    () => ["all", ...dynasties],
    [dynasties]
  );

  // 按选中朝代筛选诗词
  const filteredPoems = useMemo(() => {
    if (activeDynasty === "all") return poems;
    return poems.filter((p) => p.dynasty === activeDynasty);
  }, [activeDynasty]);

  return (
    <div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
      <PageHeader
        title="诗境漫游"
        subtitle="一字一句，走进古诗的意境"
      />
      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        {/* 朝代筛选条 */}
        <div className="mb-8 md:mb-10">
          <div
            className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide"
            role="group"
            aria-label="朝代筛选"
          >
            {dynastyOptions.map((dynasty) => {
              const isActive = activeDynasty === dynasty;
              const label = dynasty === "all" ? "全部" : dynasty;
              return (
                <button
                  key={dynasty}
                  type="button"
                  onClick={() => setActiveDynasty(dynasty)}
                  aria-pressed={isActive}
                  className={`inline-flex flex-shrink-0 items-center rounded-full px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
                    isActive
                      ? "bg-cinnabar/10 text-cinnabar"
                      : "bg-surface/60 text-light-ink hover:bg-surface"
                  }`}
                >
                  <span>{label}</span>
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
