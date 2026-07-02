"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapters, type Chapter } from "@/data/shanhaijing";
import { beasts, type Beast } from "@/data/beasts";
import { poems, type Poem } from "@/data/poems";

// Simple seeded random based on date string
function getDaySeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

function pickBySeed<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export default function DailyRecommendation() {
  const [data, setData] = useState<{
    chapter: Chapter;
    beast: Beast;
    poem: Poem;
  } | null>(null);

  useEffect(() => {
    const seed = getDaySeed();
    setData({
      chapter: pickBySeed(chapters, seed),
      beast: pickBySeed(beasts, seed + 1),
      poem: pickBySeed(poems, seed + 2),
    });
  }, []);

  if (!data) return null;

  const { chapter, beast, poem } = data;

  return (
    <section className="fade-in relative w-full py-8 md:py-12">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Section header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-calligraphy text-2xl text-ink">今日推荐</h2>
            <p className="font-serif text-xs text-muted">每日精选，发现新的故事</p>
          </div>
          <span className="font-serif text-xs text-muted">
            {new Date().toLocaleDateString("zh-CN", { month: "long", day: "numeric" })}
          </span>
        </div>

        {/* Three recommendation cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Daily sentence */}
          <Link
            href={`/reading?chapter=${chapter.id}`}
            className="card group flex flex-col p-5 no-link"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo/10 text-sm">
                📜
              </span>
              <span className="font-serif text-xs text-muted">今日一句</span>
            </div>
            <h3 className="font-calligraphy text-lg text-ink">{chapter.name}</h3>
            <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-light-ink">
              {chapter.sentences[0]?.original}
            </p>
            <p className="mt-1 line-clamp-2 font-serif text-xs leading-relaxed text-muted">
              {chapter.sentences[0]?.translation}
            </p>
            <span className="mt-auto pt-3 font-serif text-xs text-cinnabar group-hover:underline">
              去阅读 →
            </span>
          </Link>

          {/* Daily beast */}
          <Link
            href={`/bestiary?beast=${beast.id}`}
            className="card group flex flex-col p-5 no-link"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cinnabar/10 text-sm">
                🐾
              </span>
              <span className="font-serif text-xs text-muted">今日一兽</span>
            </div>
            <h3 className="font-calligraphy text-lg text-ink">{beast.name}</h3>
            <div
              className="mt-2 h-1 w-12 rounded-full"
              style={{ background: `linear-gradient(90deg, ${beast.gradient[0]}, ${beast.gradient[1]})` }}
            />
            <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-light-ink">
              {beast.description}
            </p>
            <span className="mt-auto pt-3 font-serif text-xs text-cinnabar group-hover:underline">
              查看图鉴 →
            </span>
          </Link>

          {/* Daily poem */}
          <Link
            href="/poetry"
            className="card group flex flex-col p-5 no-link"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-sm">
                🌸
              </span>
              <span className="font-serif text-xs text-muted">今日一诗</span>
            </div>
            <h3 className="font-calligraphy text-lg text-ink">{poem.title}</h3>
            <p className="mt-1 font-serif text-xs text-muted">{poem.author} · {poem.dynasty}</p>
            <p className="mt-2 line-clamp-2 font-handwrite text-base text-light-ink">
              {poem.lines[0]?.text}
            </p>
            <span className="mt-auto pt-3 font-serif text-xs text-cinnabar group-hover:underline">
              进入诗境 →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
