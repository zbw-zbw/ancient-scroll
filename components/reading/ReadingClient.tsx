"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { chapters } from "@/data/shanhaijing";
import type { DifficultChar } from "@/data/shanhaijing";
import PageHeader from "@/components/PageHeader";
import ChapterSidebar from "@/components/reading/ChapterSidebar";
import ReadingPanel from "@/components/reading/ReadingPanel";
import CharacterTooltip from "@/components/reading/CharacterTooltip";
import type { FontSize } from "@/components/reading/ReadingControls";
import { markChapterRead, setLastReadChapter, getLastReadChapter } from "@/lib/progress";

export default function ReadingClient() {
 const searchParams = useSearchParams();
 const [selectedChapterId, setSelectedChapterId] = useState(() => {
 const id = searchParams.get("chapter");
 if (id && chapters.some((c) => c.id === id)) return id;
 const lastRead = typeof window !== "undefined" ? getLastReadChapter() : null;
 if (lastRead && chapters.some((c) => c.id === lastRead)) return lastRead;
 return "nanshan";
 });
 const [fontSize, setFontSize] = useState<FontSize>("md");
 const [showTranslation, setShowTranslation] = useState(true);
 const [translations, setTranslations] = useState<Record<string, string>>({});
 const [activeTooltip, setActiveTooltip] = useState<{
 sentenceId: string;
 charData: DifficultChar;
 rect: DOMRect;
 } | null>(null);

 useEffect(() => {
 const id = searchParams.get("chapter");
 if (id && chapters.some((c) => c.id === id)) {
 setSelectedChapterId(id);
 }
 }, [searchParams]);

 const chapter = useMemo(
   () => chapters.find((c) => c.id === selectedChapterId) || chapters[0],
   [selectedChapterId]
 );

 // Track last read chapter on initial load and chapter change
 useEffect(() => {
   setLastReadChapter(selectedChapterId);
 }, [selectedChapterId]);

 const handleCharClick = (
 sentenceId: string,
 charData: DifficultChar,
 rect: DOMRect
 ) => {
 setActiveTooltip((prev) => {
 if (
 prev &&
 prev.sentenceId === sentenceId &&
 prev.charData.char === charData.char
 ) {
 return null;
 }
 return { sentenceId, charData, rect };
 });
 };

 const handleTranslation = (sentenceId: string, translation: string) => {
 setTranslations((prev) => ({ ...prev, [sentenceId]: translation }));
 };

 const tooltipContext = useMemo(() => {
 if (!activeTooltip) return "";
 return (
 chapter.sentences.find((s) => s.id === activeTooltip.sentenceId)
 ?.original || ""
 );
 }, [activeTooltip, chapter]);

 return (
 <div className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-xuan">
 <PageHeader
 title="双语阅读"
 subtitle="原文与译文对照，逐句品读山海经"
 compact
 />
 <div className="relative flex flex-1 min-h-0 flex-col md:flex-row">
 <ChapterSidebar
 chapters={chapters}
 selectedId={selectedChapterId}
 onSelect={(id) => {
 setSelectedChapterId(id);
 markChapterRead(id);
 setLastReadChapter(id);
 }}
 />

 <ReadingPanel
 chapter={chapter}
 fontSize={fontSize}
 showTranslation={showTranslation}
 translations={translations}
 onFontSizeChange={setFontSize}
 onShowTranslationChange={setShowTranslation}
 onCharClick={handleCharClick}
 onTranslation={handleTranslation}
 />
 </div>

 {activeTooltip && (
 <CharacterTooltip
 charData={activeTooltip.charData}
 context={tooltipContext}
 triggerRect={activeTooltip.rect}
 chapterId={chapter.id}
 sentenceId={activeTooltip.sentenceId}
 onClose={() => setActiveTooltip(null)}
 />
 )}
 </div>
 );
}
