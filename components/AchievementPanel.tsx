"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { useSearchParams } from "next/navigation";
import { getAchievements, type Achievement } from "@/lib/achievements";
import PageHeader from "@/components/PageHeader";
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

  useEffect(() => {
    setMounted(true);
    setAchievements(getAchievements());
  }, []);

  // 滚动并高亮刚刚解锁的成就
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
            <div className="mx-auto mt-4 inline-flex items-center gap-3 rounded-full bg-surface/60 px-5 py-2">
              <div className="h-6 w-16 animate-pulse rounded bg-ink/10" />
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-16 animate-pulse rounded-full bg-ink/5" />
            ))}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-ink/5" />
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
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full bg-surface/60 px-5 py-2">
            <span className="font-calligraphy text-2xl text-cinnabar">
              {unlockedCount}
              <span className="text-base text-muted"> / {totalCount}</span>
            </span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full bg-gradient-to-r from-cinnabar to-gold transition-all duration-700"
                style={{ width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-1.5 min-h-[32px] font-serif text-xs transition-all capsule-btn ${
              filter === "all"
                ? "bg-cinnabar/10 text-cinnabar"
                : "text-muted hover:bg-ink/5 hover:text-light-ink"
            }`}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 min-h-[32px] font-serif text-xs transition-all capsule-btn ${
                filter === cat
                  ? "bg-cinnabar/10 text-cinnabar"
                  : "text-muted hover:bg-ink/5 hover:text-light-ink"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Achievement grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ach) => {
            const color = categoryColors[ach.category];
            const isHighlighted = ach.id === highlightId;
            return (
              <div
                key={ach.id}
                ref={isHighlighted ? highlightRef : undefined}
                className={`group relative overflow-hidden rounded-xl border-2 p-5 transition-all duration-300 ${
                  ach.unlocked
                    ? "cursor-pointer border-ink/10 bg-surface/60 hover:border-ink/25 hover:shadow-lg hover:-translate-y-1"
                    : "cursor-pointer border-dashed border-ink/15 bg-surface/20 hover:border-ink/30 hover:bg-surface/40"
                } ${isHighlighted ? "ring-2 ring-cinnabar ring-offset-2 ring-offset-xuan animate-pulse" : ""}`}
                style={
                  ach.unlocked
                    ? { boxShadow: `0 0 0 1px ${color}10, 0 2px 8px rgba(0,0,0,0.03)` }
                    : undefined
                }
              >
                {/* Accent bar — animates on hover */}
                <div
                  className="absolute left-0 top-0 h-full w-1.5 transition-all duration-300 group-hover:w-2"
                  style={{ background: ach.unlocked ? color : "rgba(0,0,0,0.06)" }}
                />

                {/* Decorative glow on hover for unlocked cards */}
                {ach.unlocked && (
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: color }}
                  />
                )}

                {/* Lock pattern overlay for locked cards */}
                {!ach.unlocked && (
                  <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 1px, transparent 12px)`,
                  }} />
                )}

                <div className="relative flex items-start gap-3">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-active:scale-110 ${
                      ach.unlocked ? "" : "grayscale"
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
