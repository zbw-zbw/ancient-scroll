"use client";

import { useEffect, useState } from "react";
import { getCompletionRate } from "@/lib/progress";

const stats = [
  { value: "5", unit: "篇", label: "山海经篇章" },
  { value: "20", unit: "只", label: "异兽图鉴" },
  { value: "12", unit: "首", label: "经典诗词" },
  { value: "∞", unit: "", label: "探索可能" },
];

export default function DataStats() {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    setRate(getCompletionRate());
    const timer = setInterval(() => setRate(getCompletionRate()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="fade-in relative w-full py-16 md:py-24">
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

        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-12 md:px-12 md:py-16">
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
                <p className="font-serif text-sm text-xuan/70">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Watermark */}
          <span
            className="pointer-events-none absolute -bottom-6 -right-4 font-calligraphy text-[140px] leading-none opacity-10 select-none"
            style={{ color: "var(--gold)" }}
          >
            數
          </span>
        </div>
      </div>
    </section>
  );
}
