"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getQuizStats } from "@/lib/progress";
import { totalQuizQuestions } from "@/data/quiz";

export default function QuizEntryCard() {
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [totalAttempts, setTotalAttempts] = useState(0);

  useEffect(() => {
    const stats = getQuizStats();
    if (stats.totalAttempts > 0) {
      setBestScore(stats.bestScore);
      setTotalAttempts(stats.totalAttempts);
    }
  }, []);

  return (
    <section className="fade-in relative w-full py-12 md:py-16">
      <div className="relative mx-auto max-w-[1100px] px-6">
        <Link
          href="/quiz"
          className="group relative block overflow-hidden rounded-2xl border border-ink/8 bg-gradient-to-br from-surface via-xuan to-xuan-dark p-8 transition-all duration-300 hover:border-cinnabar/20 hover:shadow-xl active:scale-[0.99] md:p-10"
        >
          {/* Decorative ink splash */}
          <span
            className="pointer-events-none absolute -right-8 -top-8 font-calligraphy text-[120px] leading-none opacity-[0.06] select-none text-cinnabar"
            aria-hidden="true"
          >
            問
          </span>

          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-seal-bg font-calligraphy text-sm text-cinnabar">
                  伍
                </span>
                <span className="font-serif text-xs text-muted">知识问答</span>
              </div>
              <h3 className="font-calligraphy text-3xl text-ink md:text-4xl">
                来测试你的国学知识吧！
              </h3>
              <p className="max-w-md font-serif text-sm leading-relaxed text-light-ink">
                {totalQuizQuestions} 道题，涵盖诗词填空、异兽辨识、名人名句、看图识兽。
                闯关答题，解锁成就，看看你是国学大师还是初窥门径。
              </p>
            </div>

            {/* Best Score Badge */}
            <div className="flex-shrink-0">
              {bestScore !== null ? (
                <div className="rounded-2xl bg-cinnabar/5 px-6 py-4 text-center">
                  <p className="font-serif text-xs text-muted">你的最高分</p>
                  <p className="font-calligraphy text-4xl text-cinnabar">
                    {bestScore}
                    <span className="font-serif text-base text-muted">/10</span>
                  </p>
                  <p className="mt-1 font-serif text-xs text-muted">
                    已挑战 {totalAttempts} 次
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-ink/10 bg-surface px-6 py-4 text-center">
                  <p className="font-serif text-xs text-muted">尚未挑战</p>
                  <p className="mt-1 font-calligraphy text-2xl text-ink">
                    点击开始
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* CTA arrow */}
          <div className="mt-6 flex items-center gap-2 font-serif text-sm text-cinnabar">
            <span>进入问答</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
