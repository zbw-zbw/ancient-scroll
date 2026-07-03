"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

const categoryIcons: Record<Achievement["category"], string> = {
  reading: "📖",
  poetry: "🌸",
  bestiary: "🐾",
  dialogue: "💬",
  checkin: "📅",
  notes: "✏️",
  favorites: "❤️",
};

export default function AchievementSummary() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAchievements(getAchievements());
  }, []);

  if (!mounted) {
    return (
      <section className="fade-in relative w-full py-8 md:py-12">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="h-40 animate-pulse rounded-2xl bg-surface/60" />
        </div>
      </section>
    );
  }

  const unlocked = achievements.filter((a) => a.unlocked);
  const total = achievements.length;
  const percent = total > 0 ? Math.round((unlocked.length / total) * 100) : 0;

  // Get category-level progress
  const categories = Array.from(new Set(achievements.map((a) => a.category)));
  const categoryProgress = categories.map((cat) => {
    const catAchs = achievements.filter((a) => a.category === cat);
    const catUnlocked = catAchs.filter((a) => a.unlocked).length;
    return { category: cat, unlocked: catUnlocked, total: catAchs.length };
  });

  // Recently unlocked (max 3)
  const recentUnlocked = unlocked.slice(-3).reverse();

  return (
    <section className="fade-in relative w-full py-8 md:py-12">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="overflow-hidden rounded-2xl border border-gold/20 bg-surface/60">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-ink/5 p-5 md:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-gold"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-calligraphy text-xl text-ink">成就之路</h3>
                <p className="font-serif text-xs text-muted">每一步探索，都是一段旅程</p>
              </div>
            </div>
            <Link
              href="/achievements"
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold/10 px-4 py-2 font-serif text-xs text-gold transition-all hover:bg-gold/20 active:scale-95"
            >
              查看全部
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Progress bar */}
          <div className="p-5 md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1">
                <span className="font-calligraphy text-3xl text-cinnabar">{unlocked.length}</span>
                <span className="font-serif text-sm text-muted">/ {total}</span>
              </div>
              <div className="flex-1">
                <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cinnabar to-gold transition-all duration-700"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="mt-1 font-serif text-xs text-muted">{percent}% 已完成</p>
              </div>
            </div>

            {/* Category mini progress */}
            <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-4 xl:grid-cols-7">
              {categoryProgress.map((cp) => (
                <div
                  key={cp.category}
                  className="flex flex-col items-center gap-1 rounded-lg bg-xuan/40 p-2.5 text-center"
                >
                  <span className="text-base">{categoryIcons[cp.category]}</span>
                  <span className="font-serif text-[10px] text-muted">{categoryLabels[cp.category]}</span>
                  <span className={`font-calligraphy text-sm ${cp.unlocked === cp.total ? "text-cinnabar" : "text-light-ink"}`}>
                    {cp.unlocked}/{cp.total}
                  </span>
                </div>
              ))}
            </div>

            {/* Recent unlocks */}
            {recentUnlocked.length > 0 && (
              <div className="mt-5 border-t border-ink/5 pt-4">
                <p className="mb-2 font-serif text-xs text-muted">最近解锁</p>
                <div className="flex flex-wrap gap-2">
                  {recentUnlocked.map((ach) => (
                    <span
                      key={ach.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cinnabar/10 px-3 py-1 font-serif text-xs text-cinnabar"
                    >
                      <span>{ach.icon}</span>
                      {ach.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
