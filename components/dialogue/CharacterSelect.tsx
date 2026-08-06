"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { characters, HistoricalCharacter } from "../../data/characters";
import { getProgress } from "@/lib/progress";
import PageHeader from "@/components/PageHeader";
import SectionProgress from "@/components/SectionProgress";
import { useHorizontalOverflow } from "@/lib/useHorizontalOverflow";
import CharacterCard from "./CharacterCard";
import Footer from "@/components/Footer";

interface CharacterSelectProps {
  onSelect: (character: HistoricalCharacter) => void;
}

/** Extract dynasty name from the era string for grouping */
function getDynasty(era: string): string {
  if (era.includes("春秋")) return "春秋";
  if (era.includes("战国")) return "战国";
  if (era.includes("汉")) return "汉";
  if (era.includes("三国")) return "三国";
  if (era.includes("晋")) return "魏晋";
  if (era.includes("唐")) return "唐";
  if (era.includes("宋")) return "宋";
  if (era.includes("明")) return "明";
  return "其他";
}

/** Fixed dynasty order for the tab bar */
const dynastyOrder: string[] = [
  "全部",
  "春秋",
  "战国",
  "汉",
  "三国",
  "魏晋",
  "唐",
  "宋",
  "明",
];

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
  const [activeDynasty, setActiveDynasty] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogueCount, setDialogueCount] = useState(0);
  const { ref: tabsRef, isScrollable } = useHorizontalOverflow<HTMLDivElement>();

  const handleDynastyChange = useCallback((dynasty: string) => {
    setActiveDynasty(dynasty);
    requestAnimationFrame(() => {
      const container = tabsRef.current;
      if (!container) return;
      const tab = container.querySelector(`[data-tab-key="${dynasty}"]`) as HTMLElement | null;
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

  // Load dialogue progress
  useEffect(() => {
    const updateProgress = () => {
      setDialogueCount(getProgress().dialogueCharacters.length);
    };
    updateProgress();
    window.addEventListener("ancient-scroll:progress-changed", updateProgress);
    return () => window.removeEventListener("ancient-scroll:progress-changed", updateProgress);
  }, []);

  // Precompute dynasty for each character
  const charactersWithDynasty = useMemo(
    () => characters.map((c) => ({ ...c, dynasty: getDynasty(c.era) })),
    []
  );

  // Count characters per dynasty
  const dynastyCounts = useMemo(() => {
    const counts: Record<string, number> = { 全部: characters.length };
    for (const c of charactersWithDynasty) {
      counts[c.dynasty] = (counts[c.dynasty] || 0) + 1;
    }
    return counts;
  }, [charactersWithDynasty]);

  // Filter by dynasty and search query
  const filteredCharacters = useMemo(() => {
    let result = charactersWithDynasty;
    if (activeDynasty !== "全部") {
      result = result.filter((c) => c.dynasty === activeDynasty);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.era.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [charactersWithDynasty, activeDynasty, searchQuery]);

  return (
    <>
      <PageHeader
        title="古今对话"
        subtitle="与古人促膝长谈，问你所想"
        compact
      />
      <div className="relative z-10 mx-auto max-w-[1100px] px-4 pb-16 md:px-6 md:pb-24 md:pt-4">
        {/* 对话进度 */}
        <SectionProgress
          label="已对话人物"
          current={dialogueCount}
          total={characters.length}
        />

        <div className="mb-8 mt-8 text-center md:mb-10">
          <p className="font-serif text-base text-muted md:text-lg">
            选择一位古人，开启穿越时空的对话
          </p>
        </div>

        {/* 朝代分类 Tab + 搜索（样式与异兽图鉴/诗境漫游一致） */}
        <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-center md:justify-between">
          <div
            ref={tabsRef}
            className={`scroll-fade-edges flex flex-1 min-w-0 flex-nowrap gap-2 overflow-x-auto scrollbar-hide ${isScrollable ? "is-scrollable" : ""}`}
            role="group"
            aria-label="朝代分类筛选"
          >
            {dynastyOrder.map((dynasty) => {
              const isActive = activeDynasty === dynasty;
              const count = dynastyCounts[dynasty] || 0;
              return (
                <button
                  key={dynasty}
                  type="button"
                  onClick={() => handleDynastyChange(dynasty)}
                  data-tab-key={dynasty}
                  aria-pressed={isActive}
                  className={`capsule-btn inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
                    isActive
                      ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                      : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
                  }`}
                >
                  <span>{dynasty}</span>
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
              placeholder="搜索人物名、朝代..."
              aria-label="搜索人物"
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

        {/* Character grid */}
        {filteredCharacters.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-sm text-muted">未找到匹配的人物，试试其他关键词</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
