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
}: ReadingPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top when chapter changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter.id]);

  return (
    <main className="flex-1 md:ml-[200px] lg:ml-[240px]">
      <div
        ref={scrollRef}
        className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 md:px-8 md:py-8"
      >
        <div className="mx-auto max-w-[780px]">
          {/* Header */}
          <header className="mb-6 flex flex-col gap-2 border-b border-rule/50 pb-5 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-calligraphy text-3xl text-ink md:text-4xl">
                {chapter.name}
              </h1>
              <p className="mt-1 font-handwrite text-lg text-muted md:text-xl">
                {chapter.subtitle}
              </p>
            </div>
            <span className="rounded-full border border-rule bg-surface/60 px-3 py-1 font-serif text-xs text-muted">
              共{chapter.sentences.length}句
            </span>
          </header>

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
          <div className="flex flex-col gap-6">
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

          {/* Bottom spacing */}
          <div className="h-12" />
        </div>
      </div>
    </main>
  );
}
