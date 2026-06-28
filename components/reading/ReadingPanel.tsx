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
 <main className="flex flex-1 flex-col md:ml-[200px] lg:ml-[240px] min-h-0">
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
 <span className="flex-shrink-0 self-start rounded-full bg-surface/60 px-3 py-1 font-serif text-xs text-muted md:self-auto">
 共{chapter.sentences.length}句
 </span>
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

 {/* Bottom spacing */}
 <div className="h-12" />
 </div>
 </div>
 </main>
 );
}
