"use client";

import { useEffect, useState, useRef } from "react";
import { getCompletionRate } from "@/lib/progress";
import { chapters } from "@/data/shanhaijing";
import { beasts } from "@/data/beasts";
import { poems } from "@/data/poems";
import { characters } from "@/data/characters";

// Count-up animation hook: animates from 0 to target when element enters viewport
function useCountUp(target: number, duration: number = 1000, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let rafId: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, start]);

  return value;
}

// Special stat for "20万+" — displays as text, no count animation needed
const ancientBooksStat = { value: "20万+", unit: "种", label: "中国存世古籍", note: "但大部分人一辈子不会翻开一本" };

export default function DataStats() {
  const [rate, setRate] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setRate(getCompletionRate());
    update();
    window.addEventListener("ancient-scroll:progress-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("ancient-scroll:progress-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  // Trigger count animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animated counts
  const chapterCount = useCountUp(chapters.length, 1000, inView);
  const beastCount = useCountUp(beasts.length, 1000, inView);
  const poemCount = useCountUp(poems.length, 1000, inView);
  const characterCount = useCountUp(characters.length, 1000, inView);

  const stats = [
    { value: String(chapterCount), unit: "篇", label: "山海经篇章", note: "约290句原文逐句翻译" },
    { value: String(beastCount), unit: "只", label: "异兽图鉴", note: "5大分类，水墨风格插画" },
    { value: String(poemCount), unit: "首", label: "经典诗词", note: "7大主题，沉浸式体验" },
    { value: String(characterCount), unit: "位", label: "古今人物", note: "横跨春秋至明代" },
  ];

  return (
    <section ref={sectionRef} className="fade-in relative w-full py-16 md:py-24">
      <div className="relative mx-auto max-w-[1100px] px-6">
        {/* 探索进度条 */}
        <div className="mb-6 text-center">
          <p className="font-serif text-sm text-ink/70">你的探索进度</p>
          <div className="mx-auto mt-2 h-2 w-48 rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-cinnabar transition-all duration-500"
              style={{ width: `${rate}%` }}
            />
          </div>
          <p className="mt-1 font-serif text-xs text-ink/60">{rate}%</p>
        </div>

        {/* Ancient books highlight banner */}
        <div className="mb-6 text-center">
          <p className="font-serif text-sm text-ink/60">
            中国有超过 <span className="font-calligraphy text-lg text-cinnabar">{ancientBooksStat.value}</span> {ancientBooksStat.unit}{ancientBooksStat.label}
            <span className="ml-1 text-muted text-xs">— {ancientBooksStat.note}</span>
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[#1a1a2e] px-6 py-12 md:px-12 md:py-16 dark:bg-[#1a1a2e]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex items-baseline justify-center gap-1">
                  <span className="font-calligraphy text-4xl text-gold md:text-5xl">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="font-serif text-sm text-gold/80">{stat.unit}</span>
                  )}
                </div>
                <p className="font-serif text-sm text-[#e8dcc8]/70">{stat.label}</p>
                <p className="mt-0.5 font-serif text-[10px] text-[#e8dcc8]/40">{stat.note}</p>
              </div>
            ))}
          </div>

          {/* Watermark */}
          <span
            className="pointer-events-none absolute -bottom-6 -right-4 font-calligraphy text-[140px] leading-none opacity-10 select-none text-gold"
            aria-hidden="true"
          >
            數
          </span>
        </div>
      </div>
    </section>
  );
}
