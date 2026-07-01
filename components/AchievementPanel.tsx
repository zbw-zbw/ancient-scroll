"use client";

import { useEffect, useState } from "react";
import { getAchievements, type Achievement } from "@/lib/achievements";

const categoryLabels: Record<Achievement["category"], string> = {
  reading: "双语阅读",
  poetry: "诗境漫游",
  bestiary: "异兽图鉴",
  dialogue: "古今对话",
  checkin: "每日签到",
  notes: "阅读笔记",
  favorites: "我的收藏",
};

const categoryColors: Record<Achievement["category"], string> = {
  reading: "#8b5cf6",
  poetry: "#f59e0b",
  bestiary: "#ef4444",
  dialogue: "#3b82f6",
  checkin: "#10b981",
  notes: "#6366f1",
  favorites: "#ec4899",
};

export default function AchievementPanel() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<Achievement["category"] | "all">("all");

  useEffect(() => {
    setAchievements(getAchievements());
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const filtered =
    filter === "all" ? achievements : achievements.filter((a) => a.category === filter);

  const categories = Array.from(new Set(achievements.map((a) => a.category)));

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center">
          <h2 className="font-calligraphy text-3xl text-ink md:text-4xl">成就之路</h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-base text-muted">
            每一步探索，都是一段旅程
          </p>
          <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-surface/60 px-5 py-2">
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
            className={`rounded-full px-4 py-1.5 font-serif text-xs transition-colors ${
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
              className={`rounded-full px-4 py-1.5 font-serif text-xs transition-colors ${
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
            return (
              <div
                key={ach.id}
                className={`relative overflow-hidden rounded-lg border p-5 transition-all duration-300 ${
                  ach.unlocked
                    ? "border-ink/10 bg-surface/60"
                    : "border-ink/5 bg-surface/30 opacity-60"
                }`}
                style={
                  ach.unlocked
                    ? { boxShadow: `0 0 0 1px ${color}15, 0 2px 8px ${color}10` }
                    : undefined
                }
              >
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1"
                  style={{ background: ach.unlocked ? color : "rgba(0,0,0,0.05)" }}
                />

                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl ${
                      ach.unlocked ? "" : "grayscale"
                    }`}
                    style={{ background: ach.unlocked ? `${color}15` : "rgba(0,0,0,0.03)" }}
                  >
                    {ach.unlocked ? ach.icon : "🔒"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-calligraphy text-lg text-ink">{ach.title}</h3>
                    <p className="mt-0.5 font-serif text-xs text-muted">{ach.description}</p>
                    {ach.progress && !ach.unlocked && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between font-serif text-[10px] text-muted">
                          <span>{ach.progress.current} / {ach.progress.total}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/10">
                          <div
                            className="h-full transition-all duration-700"
                            style={{
                              width: `${Math.min(100, (ach.progress.current / ach.progress.total) * 100)}%`,
                              background: color,
                            }}
                          />
                        </div>
                      </div>
                    )}
                    {ach.unlocked && (
                      <div className="mt-1.5 inline-flex items-center gap-1 font-serif text-[10px] text-cinnabar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        已达成
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
