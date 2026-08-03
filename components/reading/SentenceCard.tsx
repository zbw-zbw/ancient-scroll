"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Sentence as SentenceType, DifficultChar } from "@/data/shanhaijing";
import HighlightedText from "./HighlightedText";
import AiTranslateButton from "./AiTranslateButton";
import ReadAloudButton from "./ReadAloudButton";
import CopyButton from "@/components/CopyButton";
import type { FontSize } from "./ReadingControls";
import { IconPaw, IconChat, IconArrowRight } from "@/components/icons";

interface SentenceCardProps {
  sentence: SentenceType;
  index: number;
  fontSize: FontSize;
  showTranslation: boolean;
  translation: string;
  chapterName: string;
  onCharClick: (sentenceId: string, charData: DifficultChar, rect: DOMRect) => void;
  onTranslation: (sentenceId: string, translation: string) => void;
  active?: boolean;
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
  active = false,
}: SentenceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVertical, setIsVertical] = useState(false);
  const [localShowTranslation, setLocalShowTranslation] = useState(showTranslation);

  // Sync with global toggle
  useEffect(() => {
    setLocalShowTranslation(showTranslation);
  }, [showTranslation]);

  const handleCharClick = (charData: DifficultChar, rect: DOMRect) => {
    onCharClick(sentence.id, charData, rect);
  };

  return (
    <article
      ref={ref}
      className={`relative rounded-xl border border-ink/8 bg-surface/60 p-5 md:p-6 ${
        active ? "border-cinnabar/20 bg-cinnabar/[0.03]" : ""
      }`}
    >
      {/* Header row: index circle + vertical toggle */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cinnabar/5 font-serif text-sm text-cinnabar">
          {index + 1}
        </div>
        <button
          type="button"
          onClick={() => setIsVertical((v) => !v)}
          aria-label={isVertical ? "切换为横排阅读" : "切换为竖排阅读"}
          title={isVertical ? "横排阅读" : "竖排阅读"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-muted transition-colors hover:bg-ink/10 hover:text-cinnabar active:scale-95"
        >
          {isVertical ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M7 3v18" />
              <path d="M12 3v18" />
              <path d="M17 3v18" />
            </svg>
          )}
        </button>
      </div>

      {/* 原文区域 */}
      {isVertical ? (
        <div className="flex justify-center overflow-x-auto py-2">
          <div
            className="text-vertical mx-auto"
            style={{
              lineHeight: "2.4",
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
            }}
          >
            <HighlightedText
              text={sentence.original}
              difficultChars={sentence.difficultChars}
              fontSizeClass={fontSizeClasses[fontSize]}
              onCharClick={handleCharClick}
              vertical
            />
          </div>
        </div>
      ) : (
        <div className="break-words">
          <HighlightedText
            text={sentence.original}
            difficultChars={sentence.difficultChars}
            fontSizeClass={fontSizeClasses[fontSize]}
            onCharClick={handleCharClick}
          />
        </div>
      )}

      {/* Translation section — 逐句翻译开关 */}
      {localShowTranslation && (
        <p
          className={`mt-5 border-t border-ink/8 pt-4 font-serif leading-relaxed text-light-ink ${translationSizeClasses[fontSize]}`}
        >
          {translation}
        </p>
      )}

      {/* Action toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* 逐句翻译/隐藏按钮 */}
        <button
          type="button"
          onClick={() => setLocalShowTranslation((v) => !v)}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs transition-colors ${
            localShowTranslation
              ? "text-muted hover:bg-ink/5"
              : "text-cinnabar hover:bg-cinnabar/5"
          }`}
          title={localShowTranslation ? "隐藏本句翻译" : "显示本句翻译"}
        >
          {localShowTranslation ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
          {localShowTranslation ? "隐藏翻译" : "显示翻译"}
        </button>
        {/* 异兽图鉴链接 — 始终显示，不依赖全局翻译开关 */}
        {sentence.relatedBeastId && (
          <Link
            href={`/bestiary?beast=${sentence.relatedBeastId}`}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs text-indigo transition-colors hover:bg-indigo/5"
          >
            <IconPaw className="h-3.5 w-3.5" /> 查看异兽图鉴 <IconArrowRight className="h-3 w-3" />
          </Link>
        )}
        <Link
          href={`/dialogue?ask=${encodeURIComponent(sentence.original.slice(0, 50))}`}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs text-muted transition-colors hover:bg-cinnabar/5 hover:text-cinnabar"
        >
          <IconChat className="h-3.5 w-3.5" /> 问问古人
        </Link>
        <ReadAloudButton text={sentence.original} />
        <CopyButton
          text={localShowTranslation ? `《${chapterName}》\n${sentence.original}\n${translation}` : `《${chapterName}》\n${sentence.original}`}
          label="复制"
          successMessage="已复制到剪贴板"
        />
        {localShowTranslation && (
          <AiTranslateButton
            sentenceId={sentence.id}
            original={sentence.original}
            context={chapterName}
            currentTranslation={translation}
            onTranslation={onTranslation}
          />
        )}
      </div>

      {/* 分隔线 */}
      <div className="mt-6 flex items-center justify-center" aria-hidden="true">
        <span className="text-[10px] text-cinnabar/40">◆</span>
      </div>
    </article>
  );
}
