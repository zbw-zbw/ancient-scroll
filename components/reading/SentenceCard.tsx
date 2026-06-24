"use client";

import { useEffect, useRef, useState } from "react";
import type { Sentence as SentenceType, DifficultChar } from "@/data/shanhaijing";
import HighlightedText from "./HighlightedText";
import AiTranslateButton from "./AiTranslateButton";
import type { FontSize } from "./ReadingControls";

interface SentenceCardProps {
  sentence: SentenceType;
  index: number;
  fontSize: FontSize;
  showTranslation: boolean;
  translation: string;
  chapterName: string;
  onCharClick: (sentenceId: string, charData: DifficultChar, rect: DOMRect) => void;
  onTranslation: (sentenceId: string, translation: string) => void;
}

const fontSizeClasses: Record<FontSize, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

const translationSizeClasses: Record<FontSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export default function SentenceCard({
  sentence,
  index,
  fontSize,
  showTranslation,
  translation,
  chapterName,
  onCharClick,
  onTranslation,
}: SentenceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCharClick = (charData: DifficultChar, rect: DOMRect) => {
    onCharClick(sentence.id, charData, rect);
  };

  return (
    <article
      ref={ref}
      className={`relative rounded-lg border-l-[3px] border-cinnabar bg-surface/60 p-5 md:p-6 transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Index circle */}
      <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-full border border-cinnabar/40 bg-cinnabar/5 font-serif text-sm text-cinnabar">
        {index + 1}
      </div>

      {/* Original text */}
      <div className="break-words">
        <HighlightedText
          text={sentence.original}
          difficultChars={sentence.difficultChars}
          fontSizeClass={fontSizeClasses[fontSize]}
          onCharClick={handleCharClick}
        />
      </div>

      {/* Translation section */}
      {showTranslation && (
        <>
          <div className="my-5 border-t border-rule/70" />
          <p
            className={`font-serif leading-relaxed text-light-ink ${translationSizeClasses[fontSize]}`}
          >
            {translation}
          </p>

          {/* AI re-translate button */}
          <div className="mt-4 flex justify-end">
            <AiTranslateButton
              sentenceId={sentence.id}
              original={sentence.original}
              context={chapterName}
              currentTranslation={translation}
              onTranslation={onTranslation}
            />
          </div>
        </>
      )}
    </article>
  );
}
