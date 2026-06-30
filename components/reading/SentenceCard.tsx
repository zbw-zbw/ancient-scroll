"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Sentence as SentenceType, DifficultChar } from "@/data/shanhaijing";
import HighlightedText from "./HighlightedText";
import AiTranslateButton from "./AiTranslateButton";
import ReadAloudButton from "./ReadAloudButton";
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
 className={`relative rounded-lg bg-surface/60 p-5 md:p-6 transition-all duration-700 ${
 visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
 }`}
 >
 {/* Index circle */}
 <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-cinnabar/5 font-serif text-sm text-cinnabar">
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
 <p
            className={`mt-5 font-serif leading-relaxed text-light-ink ${translationSizeClasses[fontSize]}`}
          >
 {translation}
 </p>

 <div className="mt-4 flex flex-wrap items-center gap-2">
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
