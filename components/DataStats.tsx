"use client";

import { useEffect, useState, useRef } from "react";
import { getCompletionRate, getProgress, getQuizStats, getFavorites } from "@/lib/progress";
import { getCollectedBeasts } from "@/lib/collection";
import { chapters } from "@/data/shanhaijing";
import { beasts } from "@/data/beasts";
import { poems } from "@/data/poems";
import { characters } from "@/data/characters";
import { totalQuizQuestions } from "@/data/quiz";
import { AI_VOICES } from "@/lib/ai-tts";

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

  const [personalStats, setPersonalStats] = useState({
    readChapters: 0,
    completedPoems: 0,
    dialogueCharacters: 0,
    collectedBeasts: 0,
    quizCorrectRate: 0,
    totalFavorites: 0,
  });

  useEffect(() => {
    const update = () => {
      setRate(getCompletionRate());
      const progress = getProgress();
      const quizStats = getQuizStats();
      const collected = getCollectedBeasts();
      const favorites = getFavorites();

      setPersonalStats({
        readChapters: new Set(progress.readChapters).size,
        completedPoems: new Set(progress.completedPoems).size,
        dialogueCharacters: new Set(progress.dialogueCharacters).size,
        collectedBeasts: collected.length,
        quizCorrectRate: quizStats.totalAttempts > 0
          ? Math.round((quizStats.totalCorrect / (quizStats.totalAttempts * 10)) * 100)
          : 0,
        totalFavorites: (favorites.favoritePoems?.length || 0) + (favorites.favoriteBeasts?.length || 0),
      });
    };
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

  // 从数据文件派生真实句子总数，避免文案与实际数据不一致
  const totalSentences = chapters.reduce((n, c) => n + c.sentences.length, 0);

  // Animated counts
  const sentenceCount = useCountUp(totalSentences, 1200, inView);
  const beastCount = useCountUp(beasts.length, 1000, inView);
  const characterCount = useCountUp(characters.length, 1000, inView);
  const poemCount = useCountUp(poems.length, 1000, inView);
  const quizCount = useCountUp(totalQuizQuestions, 1000, inView);
  const voiceCount = useCountUp(AI_VOICES.length, 800, inView);

  const stats: { value: string; unit: string; label: string; note: string; suffix?: string }[] = [
    { value: String(sentenceCount), unit: "句", label: "山海经原文", note: "逐句翻译，对照阅读" },
    { value: String(beastCount), unit: "只", label: "上古异兽", note: "5大分类，水墨风格插画" },
    { value: String(characterCount), unit: "位", label: "历史人物", note: "横跨春秋至明代" },
    { value: String(poemCount), unit: "首", label: "经典诗词", note: "7大主题，沉浸式体验" },
    { value: String(quizCount), suffix: "+", unit: "题", label: "知识题目", note: "4大题型，闯关挑战" },
    { value: String(voiceCount), unit: "种", label: "朗读音色", note: "AI语音，沉浸聆听" },
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

        {/* 个人学习数据 */}
        {rate > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {[
              { value: personalStats.readChapters, total: chapters.length, label: "已读篇章", unit: "篇" },
              { value: personalStats.collectedBeasts, total: beasts.length, label: "已集异兽", unit: "只" },
              { value: personalStats.completedPoems, total: poems.length, label: "已赏诗词", unit: "首" },
              { value: personalStats.dialogueCharacters, total: characters.length, label: "已对话", unit: "位" },
              { value: personalStats.totalFavorites, total: null as number | null, label: "收藏", unit: "条" },
              { value: personalStats.quizCorrectRate, total: null as number | null, label: "答题正确率", unit: "%" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-ink/5 bg-surface/60 p-3 text-center">
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="font-calligraphy text-xl text-cinnabar">{item.value}</span>
                  {item.total !== null && (
                    <span className="font-serif text-xs text-muted">/{item.total}</span>
                  )}
                  <span className="font-serif text-xs text-muted">{item.unit}</span>
                </div>
                <p className="mt-0.5 font-serif text-[10px] text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Ancient books highlight banner */}
        <div className="mb-6 text-center">
          <p className="font-serif text-sm text-ink/60">
            中国有超过 <span className="font-calligraphy text-lg text-cinnabar">{ancientBooksStat.value}</span> {ancientBooksStat.unit}{ancientBooksStat.label}
            <span className="ml-1 text-muted text-xs">— {ancientBooksStat.note}</span>
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[#1a1a2e] px-6 py-12 md:px-12 md:py-16 dark:bg-[#1a1a2e]">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 flex items-baseline justify-center gap-1">
                  <span className="font-calligraphy text-4xl text-gold md:text-5xl">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="font-calligraphy text-2xl text-gold md:text-3xl">{stat.suffix}</span>
                  )}
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
