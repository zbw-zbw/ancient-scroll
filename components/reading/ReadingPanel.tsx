"use client";

import { useEffect, useRef, useState } from "react";
import type { Chapter, DifficultChar } from "@/data/shanhaijing";
import ReadingControls, { type FontSize } from "./ReadingControls";
import SentenceCard from "./SentenceCard";
import { IconPaw } from "@/components/icons";
import { stop } from "@/lib/tts";
import { speakAI, stopAI } from "@/lib/ai-tts";

interface ReadingPanelProps {
  chapter: Chapter;
  fontSize: FontSize;
  showTranslation: boolean;
  translations: Record<string, string>;
  onFontSizeChange: (size: FontSize) => void;
  onShowTranslationChange: (show: boolean) => void;
  onCharClick: (sentenceId: string, charData: DifficultChar, rect: DOMRect) => void;
  onTranslation: (sentenceId: string, translation: string) => void;
  onPrevChapter?: () => void;
  onNextChapter?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  highlightSentenceId?: string | null;
  highlightBeastName?: string | null;
}

export default function ReadingPanel({
  chapter,
  fontSize,
  showTranslation,
  translations,
  onFontSizeChange,
  onShowTranslationChange,
  onCharClick,
  onTranslation,
  onPrevChapter,
  onNextChapter,
  hasPrev = false,
  hasNext = false,
  highlightSentenceId,
  highlightBeastName,
}: ReadingPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // 当前正在阅读的句子 id（用于 SentenceCard 的 active 高亮）
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  // 局部返回顶部按钮可见性
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ===== 听书模式状态 =====
  const [listenMode, setListenMode] = useState<"idle" | "playing" | "paused">("idle");
  const [listenIndex, setListenIndex] = useState<number>(-1);
  // refs 供回调中读取最新值，避免闭包陈旧
  const listenModeRef = useRef(listenMode);
  const showTranslationRef = useRef(showTranslation);
  const translationsRef = useRef(translations);

  useEffect(() => { listenModeRef.current = listenMode; }, [listenMode]);
  useEffect(() => { showTranslationRef.current = showTranslation; }, [showTranslation]);
  useEffect(() => { translationsRef.current = translations; }, [translations]);

  // 组件卸载时停止朗读
  useEffect(() => {
    return () => {
      stopAI();
      stop();
    };
  }, []);

  // Scroll to top when chapter changes (instant, not smooth, for clear context switch)
  useEffect(() => {
    stopAI();
    stop();
    setListenMode("idle");
    setListenIndex(-1);
    setActiveSentenceId(null);
    // Double rAF: first frame renders new content, second frame ensures layout is settled
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    });
  }, [chapter.id]);

  // ===== 听书核心逻辑：当 listenMode=playing 时逐句朗读 =====
  useEffect(() => {
    if (listenMode !== "playing") return;
    // 读完所有句子 → 停止
    if (listenIndex < 0 || listenIndex >= chapter.sentences.length) {
      setListenMode("idle");
      setListenIndex(-1);
      return;
    }

    const sentence = chapter.sentences[listenIndex];
    // 构建朗读文本：原文 + 译文（如果开启翻译）
    let text = sentence.original;
    if (showTranslationRef.current) {
      const tr = translationsRef.current[sentence.id] ?? sentence.translation;
      text += "。" + tr;
    }

    // 自动滚动到当前朗读句
    if (scrollRef.current) {
      const target = scrollRef.current.querySelector(`[data-sentence-id="${sentence.id}"]`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // 读完一句后的回调：朗读下一句
    const handleAdvance = () => {
      if (listenModeRef.current !== "playing") return;
      setListenIndex((prev) => prev + 1);
    };

    // AI TTS 内部已有降级逻辑，onError 时直接跳到下一句
    speakAI(text, {
      voice: "yunjian",
      rate: -10,
      onEnd: handleAdvance,
      onError: () => handleAdvance(),
    });

    return () => {
      stopAI();
      stop();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listenMode, listenIndex, chapter.id, chapter.sentences]);

  // 切换听书模式
  const handleToggleListen = () => {
    if (listenMode === "idle") {
      // 从当前可见句子开始，否则从第一句开始
      const startIdx = activeSentenceId
        ? chapter.sentences.findIndex((s) => s.id === activeSentenceId)
        : 0;
      setListenIndex(startIdx >= 0 ? startIdx : 0);
      setListenMode("playing");
    } else if (listenMode === "playing") {
      stopAI();
      stop();
      setListenMode("paused");
    } else {
      // paused → 继续播放
      setListenMode("playing");
    }
  };

  // Scroll to highlighted sentence when coming from bestiary
  useEffect(() => {
    if (!highlightSentenceId || !scrollRef.current) return;
    const target = scrollRef.current.querySelector(`[data-sentence-id="${highlightSentenceId}"]`);
    if (target) {
      // Small delay to ensure layout is settled
      const timer = setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [highlightSentenceId]);

  // 通过 IntersectionObserver 追踪当前可见度最高的句子，作为 active 句子
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const sentenceEls = container.querySelectorAll<HTMLElement>("[data-sentence-id]");
    if (sentenceEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 选择交叉比例最高的可见句子作为当前 active 句子
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best) {
          const id = (best.target as HTMLElement).dataset.sentenceId;
          if (id) setActiveSentenceId(id);
        }
      },
      { root: null, threshold: [0.3, 0.5, 0.75, 1] }
    );
    sentenceEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapter.id, chapter.sentences.length]);

  // 滚动追踪：控制返回顶部按钮显隐（页面级滚动）
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [chapter.id]);

  // Estimate reading time: ~2 minutes per sentence for classical Chinese
  const readingTime = Math.max(1, Math.ceil(chapter.sentences.length * 2));

  return (
    <div className="flex flex-col min-w-0">
      <div
        ref={scrollRef}
        className="px-4 py-6 md:px-8 md:py-8"
      >
        <div className="w-full">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-2 pb-5 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <h1 className="font-calligraphy text-3xl text-ink md:text-4xl">
                {chapter.name}
              </h1>
              <p className="mt-1 font-handwrite text-lg text-muted md:text-xl">
                {chapter.subtitle}
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2 self-start md:self-auto">
              <span className="rounded-full bg-surface/60 px-3 py-1 font-serif text-xs text-muted">
                共{chapter.sentences.length}句
              </span>
              <span className="rounded-full bg-surface/60 px-3 py-1 font-serif text-xs text-muted">
                约{readingTime}分钟
              </span>
            </div>
          </header>

          {/* Introduction */}
          {chapter.introduction && (
            <blockquote className="mb-6 rounded-lg bg-cinnabar/[0.04] px-4 py-3 md:mb-8 md:px-5 md:py-4">
              <p className="font-serif text-sm italic leading-relaxed text-light-ink">
                {chapter.introduction}
              </p>
            </blockquote>
          )}

          {/* Controls */}
          <div className="mb-6 md:mb-8">
            <ReadingControls
              fontSize={fontSize}
              showTranslation={showTranslation}
              onFontSizeChange={onFontSizeChange}
              onShowTranslationChange={onShowTranslationChange}
              listenMode={listenMode}
              onToggleListen={handleToggleListen}
            />
          </div>

          {/* Sentences */}
          <div className="flex flex-col gap-4">
            {chapter.sentences.map((sentence, idx) => {
              const isHighlighted = highlightSentenceId === sentence.id;
              const isListening = listenMode !== "idle" && listenIndex === idx;
              return (
                <div key={sentence.id} data-sentence-id={sentence.id} className="relative">
                  {/* Beast highlight badge */}
                  {isHighlighted && highlightBeastName && (
                    <div className="absolute -top-3 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-cinnabar px-3 py-1 font-serif text-xs text-white shadow-md animate-fade-in-down">
                      <IconPaw className="h-3 w-3" />
                      异兽图鉴 · {highlightBeastName}
                    </div>
                  )}
                  <div className={`${isHighlighted ? "beast-highlight rounded-xl" : ""} ${isListening ? "listening-active rounded-xl" : ""}`}>
                    <SentenceCard
                      sentence={sentence}
                      index={idx}
                      fontSize={fontSize}
                      showTranslation={showTranslation}
                      translation={translations[sentence.id] ?? sentence.translation}
                      chapterName={chapter.name}
                      onCharClick={onCharClick}
                      onTranslation={onTranslation}
                      active={activeSentenceId === sentence.id}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chapter navigation */}
          {(hasPrev || hasNext) && (
            <nav className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6" aria-label="章节导航">
              {hasPrev && onPrevChapter ? (
                <button
                  onClick={onPrevChapter}
                  className="group inline-flex items-center gap-2 rounded-xl bg-surface/60 px-4 py-3 min-h-[44px] font-serif text-sm text-light-ink transition-all hover:bg-surface hover:text-cinnabar active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span className="hidden sm:inline">上一章</span>
                  <span className="sm:hidden">上</span>
                </button>
              ) : (
                <span />
              )}

              {hasNext && onNextChapter ? (
                <button
                  onClick={onNextChapter}
                  className="group inline-flex items-center gap-2 rounded-xl bg-cinnabar px-4 py-3 min-h-[44px] font-serif text-sm text-white shadow-sm transition-all hover:bg-cinnabar/90 hover:shadow-md active:scale-95"
                >
                  <span className="hidden sm:inline">下一章</span>
                  <span className="sm:hidden">下</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-active:translate-x-0.5">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              ) : (
                <span />
              )}
            </nav>
          )}

          {/* Bottom spacing */}
          <div className="h-12" />
        </div>
      </div>

      {/* 悬浮听书控制按钮 — 听书模式激活时显示，方便随时暂停/继续 */}
      {/* 放在右侧中间位置，显眼且不挡住内容 */}
      {listenMode !== "idle" && (
        <button
          onClick={handleToggleListen}
          className="fixed top-1/2 right-[max(1rem,env(safe-area-inset-right))] z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-all duration-300 active:scale-95 md:h-14 md:w-14"
          style={{
            backgroundColor: listenMode === "playing" ? "var(--cinnabar)" : "var(--surface)",
            color: listenMode === "playing" ? "#fff" : "var(--cinnabar)",
            border: listenMode === "playing" ? "none" : "1px solid rgba(200, 64, 50, 0.2)",
          }}
          title={listenMode === "playing" ? "暂停听书" : "继续听书"}
          aria-label={listenMode === "playing" ? "暂停听书" : "继续听书"}
        >
          {listenMode === "playing" ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* 局部返回顶部按钮 — 针对阅读内容滚动区域 */}
      {showScrollTop && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-40 flex h-11 w-11 items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm shadow-md border border-ink/10 text-light-ink hover:text-cinnabar hover:border-cinnabar/30 transition-opacity duration-300 active:scale-95"
          aria-label="回到顶部"
          title="回到顶部"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
