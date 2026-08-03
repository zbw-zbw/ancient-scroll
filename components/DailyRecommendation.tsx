"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { poems } from "@/data/poems";
import { beasts } from "@/data/beasts";
import { chapters } from "@/data/shanhaijing";
import { characters } from "@/data/characters";

interface Recommendation {
  type: "poem" | "beast" | "chapter" | "character";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

function getRecommendations(seed: number): Recommendation[] {
  const rand = (max: number) => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed % max;
  };

  const recs: Recommendation[] = [];

  // Pick a random poem
  if (poems.length > 0) {
    const p = poems[rand(poems.length)];
    recs.push({
      type: "poem",
      id: p.id,
      title: p.title,
      subtitle: `${p.author} · ${p.dynasty}`,
      href: `/poetry?id=${p.id}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" />
          <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(72 12 12)" />
          <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(144 12 12)" />
          <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(216 12 12)" />
          <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(288 12 12)" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      ),
      color: "from-cinnabar/20 to-seal-red/10",
    });
  }

  // Pick a random beast
  if (beasts.length > 0) {
    const b = beasts[rand(beasts.length)];
    recs.push({
      type: "beast",
      id: b.id,
      title: b.name,
      subtitle: `${b.category} · ${b.chapter}`,
      href: `/bestiary?beast=${b.id}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 2C8 6 6 8 6 12c0 4 2 6 6 6s6-2 6-6c0-4-2-6-6-10z" />
          <path d="M9 12h.01" />
          <path d="M15 12h.01" />
          <path d="M8 5l-2-2" />
          <path d="M16 5l2-2" />
        </svg>
      ),
      color: "from-indigo/20 to-blue-600/10",
    });
  }

  // Pick a random chapter
  if (chapters.length > 0) {
    const c = chapters[rand(chapters.length)];
    recs.push({
      type: "chapter",
      id: c.id,
      title: c.name,
      subtitle: `${c.sentences.length} 段经文`,
      href: `/reading?chapter=${c.id}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      color: "from-gold/20 to-amber-600/10",
    });
  }

  // Pick a random character
  if (characters.length > 0) {
    const ch = characters[rand(characters.length)];
    recs.push({
      type: "character",
      id: ch.id,
      title: ch.name,
      subtitle: `${ch.era} · ${ch.title}`,
      href: `/dialogue?character=${ch.id}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      color: "from-emerald-600/20 to-green-600/10",
    });
  }

  return recs;
}

export default function DailyRecommendation() {
  const [seed, setSeed] = useState(() => {
    // Use date as initial seed for "daily" feel
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  });

  const recommendations = useMemo(() => getRecommendations(seed), [seed]);

  const handleShuffle = useCallback(() => {
    setSeed(Date.now());
  }, []);

  return (
    <section className="fade-in relative w-full py-10 md:py-16">
      <div className="relative mx-auto max-w-[1100px] px-6">
        {/* Header with shuffle button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-calligraphy text-2xl text-ink">每日推荐</h2>
            <p className="mt-1 font-serif text-sm text-muted">探索古典文化的更多可能</p>
          </div>
          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface/60 px-4 py-2 min-h-[44px] font-serif text-xs text-light-ink transition-colors hover:bg-cinnabar/5 hover:text-cinnabar active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M3 12a9 9 0 0 1 9-9c2.52 0 4.93 1 6.74 2.74" />
              <path d="M3 21v-5h5" />
            </svg>
            换一换
          </button>
        </div>

        {/* Recommendation cards */}
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map((rec) => (
            <Link key={`${rec.type}-${rec.id}-${seed}`} href={rec.href} className="group flex">
              <div className="card animate-fade-in flex h-full w-full flex-col overflow-hidden rounded-2xl bg-surface/60 p-5 transition-all duration-300 hover:border-cinnabar/30 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${rec.color} text-ink`}
                  >
                    {rec.icon}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-0.5 group-hover:text-cinnabar"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>

                <h3 className="mt-4 font-calligraphy text-xl text-ink transition-colors group-hover:text-cinnabar">
                  {rec.title}
                </h3>
                <p className="mt-1 font-serif text-sm text-muted">{rec.subtitle}</p>
                <div className="flex-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
