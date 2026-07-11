"use client";

import { useEffect, useRef } from "react";
import type { Chapter, DifficultChar } from "@/data/shanhaijing";
import ReadingControls, { type FontSize } from "./ReadingControls";
import SentenceCard from "./SentenceCard";

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
}: ReadingPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top when chapter changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter.id]);

  // Estimate reading time: ~2 minutes per sentence for classical Chinese
  const readingTime = Math.max(1, Math.ceil(chapter.sentences.length * 2));

  return (
    <main className="flex flex-1 flex-col min-h-0">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8"
      >
        <div className="mx-auto max-w-[780px]">
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
            />
          </div>

          {/* Sentences */}
          <div className="flex flex-col gap-4">
            {chapter.sentences.map((sentence, idx) => (
              <SentenceCard
                key={sentence.id}
                sentence={sentence}
                index={idx}
                fontSize={fontSize}
                showTranslation={showTranslation}
                translation={translations[sentence.id] ?? sentence.translation}
                chapterName={chapter.name}
                onCharClick={onCharClick}
                onTranslation={onTranslation}
              />
            ))}
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
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
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
    </main>
  );
}
