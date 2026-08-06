"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import { getAchievements, type Achievement } from "@/lib/achievements";
import PageHeader from "@/components/PageHeader";
import SectionProgress from "@/components/SectionProgress";
import { useHorizontalOverflow } from "@/lib/useHorizontalOverflow";
import {
  IconBook,
  IconScroll,
  IconMountain,
  IconFlower,
  IconPalette,
  IconSparkles,
  IconPaw,
  IconFox,
  IconDragon,
  IconChat,
  IconLantern,
  IconCalendar,
  IconFire,
  IconTrophy,
  IconPencil,
  IconBooks,
  IconHeart,
  IconGem,
  IconLock,
} from "@/components/icons";

const categoryLabels: Record<Achievement["category"], string> = {
  reading: "双语阅读",
  poetry: "诗境漫游",
  bestiary: "异兽图鉴",
  dialogue: "古今对话",
  checkin: "每日签到",
  notes: "阅读笔记",
  favorites: "我的收藏",
  quiz: "知识问答",
};

const categoryColors: Record<Achievement["category"], string> = {
  reading: "#8b5cf6",
  poetry: "#f59e0b",
  bestiary: "#ef4444",
  dialogue: "#3b82f6",
  checkin: "#10b981",
  notes: "#6366f1",
  favorites: "#ec4899",
  quiz: "#c84032",
};

const achievementIconMap: Record<string, ComponentType<{ className?: string }>> = {
  book: IconBook,
  scroll: IconScroll,
  mountain: IconMountain,
  flower: IconFlower,
  palette: IconPalette,
  sparkles: IconSparkles,
  paw: IconPaw,
  fox: IconFox,
  dragon: IconDragon,
  chat: IconChat,
  lantern: IconLantern,
  calendar: IconCalendar,
  fire: IconFire,
  trophy: IconTrophy,
  pencil: IconPencil,
  books: IconBooks,
  heart: IconHeart,
  gem: IconGem,
};

export function renderAchievementIcon(iconName: string, className = "h-6 w-6") {
  const Icon = achievementIconMap[iconName] ?? IconSparkles;
  return <Icon className={className} />;
}

export default function AchievementPanel() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<Achievement["category"] | "all">("all");
  const searchParams = useSearchParams();
  const highlightId = searchParams?.get("highlight") ?? null;
  const highlightRef = useRef<HTMLDivElement>(null);
  const { ref: tabsRef, isScrollable } = useHorizontalOverflow<HTMLDivElement>();

  // Auto-scroll clicked tab into view
  const handleFilterChange = (cat: Achievement["category"] | "all") => {
    setFilter(cat);
    requestAnimationFrame(() => {
      const container = tabsRef.current;
      if (!container) return;
      const tab = container.querySelector(`[data-tab-key="${cat}"]`) as HTMLElement | null;
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
  };

  useEffect(() => {
    setMounted(true);
    setAchievements(getAchievements());
  }, []);

  // Scroll to highlighted achievement
  useEffect(() => {
    if (!mounted || !highlightId) return;
    const timer = setTimeout(() => {
      highlightRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
    return () => clearTimeout(timer);
  }, [mounted, highlightId]);

  if (!mounted) {
    return (
      <main className="min-h-dvh bg-xuan px-4 pt-24 pb-16 md:px-6 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center">
            <div className="mx-auto h-9 w-32 animate-pulse rounded-lg bg-ink/10" />
            <div className="mx-auto mt-3 h-5 w-56 animate-pulse rounded bg-ink/5" />
          </div>
          <div className="mt-8 flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 w-16 animate-pulse rounded-full bg-ink/5" />
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-xl bg-ink/5" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const filtered =
    filter === "all" ? achievements : achievements.filter((a) => a.category === filter);

  const categories = Array.from(new Set(achievements.map((a) => a.category)));

  return (
    <main className="min-h-dvh bg-xuan pb-16 md:pb-24">
      <PageHeader title="成就之路" subtitle="每一步探索，都是一段旅程" compact />
      <div className="mx-auto max-w-[1100px] px-4 pt-8 md:px-6 md:pt-12">
        {/* 成就进度条 - 与异兽图鉴样式统一 */}
        <SectionProgress
          label="成就解锁进度"
          current={unlockedCount}
          total={totalCount}
        />

        {/* Category filter — 左对齐横滚，不换行，与其他页面一致 */}
        <div
          ref={tabsRef}
          className={`scroll-fade-edges mt-6 flex flex-nowrap justify-start gap-2 overflow-x-auto pb-2 scrollbar-hide ${isScrollable ? "is-scrollable" : ""}`}
        >
          <button
            onClick={() => handleFilterChange("all")}
            data-tab-key="all"
            className={`capsule-btn flex-shrink-0 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
              filter === "all"
                ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
            }`}
          >
            全部 ({totalCount})
          </button>
          {categories.map((cat) => {
            const catCount = achievements.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                data-tab-key={cat}
                className={`capsule-btn flex-shrink-0 rounded-full border px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
                  filter === cat
                    ? "border-cinnabar bg-cinnabar/10 text-cinnabar"
                    : "border-ink/15 bg-transparent text-ink hover:bg-ink/5"
                }`}
              >
                {categoryLabels[cat]} ({catCount})
              </button>
            );
          })}
        </div>

        {/* Achievement grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ach) => {
            const color = categoryColors[ach.category];
            const isHighlighted = ach.id === highlightId;
            return (
              <div
                key={ach.id}
                ref={isHighlighted ? highlightRef : undefined}
                className={`group relative overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
                  ach.unlocked
                    ? "cursor-pointer border-ink/10 bg-surface/60 hover:border-ink/25 hover:shadow-lg hover:-translate-y-1"
                    : "cursor-pointer border-ink/10 bg-surface/30 opacity-70 hover:opacity-85 hover:border-ink/20 hover:bg-surface/50"
                } ${isHighlighted ? "ring-2 ring-cinnabar ring-offset-2 ring-offset-xuan animate-pulse" : ""}`}
                style={
                  ach.unlocked
                    ? { boxShadow: `0 0 0 1px ${color}10, 0 2px 8px rgba(0,0,0,0.03)` }
                    : undefined
                }
              >
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1.5 transition-all duration-300 group-hover:w-2"
                  style={{ background: ach.unlocked ? color : "rgba(0,0,0,0.06)" }}
                />

                {/* Decorative glow for unlocked cards */}
                {ach.unlocked && (
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: color }}
                  />
                )}

                <div className="relative flex items-start gap-3">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-active:scale-110 ${
                      ach.unlocked ? "" : "grayscale opacity-50"
                    }`}
                    style={{ background: ach.unlocked ? `${color}15` : "rgba(0,0,0,0.04)" }}
                  >
                    {ach.unlocked ? (
                      renderAchievementIcon(ach.icon, "h-6 w-6")
                    ) : (
                      <IconLock className="h-6 w-6 text-muted/60" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-calligraphy text-lg ${ach.unlocked ? "text-ink" : "text-muted"}`}>{ach.title}</h3>
                    <p className="mt-0.5 font-serif text-xs text-muted">{ach.description}</p>
                    {ach.progress && !ach.unlocked && (
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between font-serif text-[10px] text-muted">
                          <span>{ach.progress.current} / {ach.progress.total}</span>
                          <span>{Math.min(100, Math.round((ach.progress.current / ach.progress.total) * 100))}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink/8">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${Math.min(100, (ach.progress.current / ach.progress.total) * 100)}%`,
                              background: color,
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {ach.unlocked && (
                      <div className="mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-serif text-[10px] text-cinnabar" style={{ background: `${color}10` }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        已达成
                      </div>
                    )}
                    {!ach.unlocked && (
                      <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-ink/5 px-2 py-0.5 font-serif text-[10px] text-muted">
                        <IconLock className="h-3 w-3" />
                        未解锁
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
