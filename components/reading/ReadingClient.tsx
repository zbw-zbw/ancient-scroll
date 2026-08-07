"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { chapters } from "@/data/shanhaijing";
import type { DifficultChar } from "@/data/shanhaijing";
import { beasts } from "@/data/beasts";
import { getReadingPrefs, saveReadingPrefs } from "@/lib/progress";
import PageHeader from "@/components/PageHeader";
import SectionProgress from "@/components/SectionProgress";
import ChapterSidebar from "@/components/reading/ChapterSidebar";
import ReadingPanel from "@/components/reading/ReadingPanel";
import CharacterTooltip from "@/components/reading/CharacterTooltip";
import Footer from "@/components/Footer";
import type { FontSize } from "@/components/reading/ReadingControls";
import { markChapterRead, setLastReadChapter, getLastReadChapter, getProgress } from "@/lib/progress";

// Define the canonical chapter order for the sidebar (18 chapters — full 山海经)
const chapterOrder = [
  "nanshan",
  "xishan",
  "beishan",
  "dongshan",
  "zhongshan",
  "haineinan",
  "haineixi",
  "haineibei",
  "haineidong",
  "hainei",
  "haiwainan",
  "haiwaixi",
  "haiwaidong",
  "haiwaibei",
  "dahuangdong",
  "dahuangbei",
  "dahuangnan",
  "dahuangxi",
];

// Sort chapters to match the canonical order
const sortedChapters = [...chapters].sort((a, b) => {
  const aIdx = chapterOrder.indexOf(a.id);
  const bIdx = chapterOrder.indexOf(b.id);
  return aIdx - bIdx;
});

export default function ReadingClient() {
 const searchParams = useSearchParams();
 const [selectedChapterId, setSelectedChapterId] = useState(() => {
 const id = searchParams.get("chapter");
 if (id && sortedChapters.some((c) => c.id === id)) return id;
 const lastRead = typeof window !== "undefined" ? getLastReadChapter() : null;
 if (lastRead && sortedChapters.some((c) => c.id === lastRead)) return lastRead;
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
 const [mounted, setMounted] = useState(false);
 const [readCount, setReadCount] = useState(0);

 // Beast highlight from bestiary "在原文中阅读" link
 const beastParam = searchParams.get("beast");
 const [highlightSentenceId, setHighlightSentenceId] = useState<string | null>(null);
 const [highlightBeastName, setHighlightBeastName] = useState<string | null>(null);

 // Load persisted reading prefs on mount
  useEffect(() => {
    setMounted(true);
    const prefs = getReadingPrefs();
    setFontSize(prefs.fontSize as FontSize);
    setShowTranslation(prefs.showTranslation);
  }, []);

  // Persist prefs when they change
  useEffect(() => {
    if (mounted) {
      saveReadingPrefs({ fontSize, showTranslation });
    }
  }, [fontSize, showTranslation, mounted]);

 useEffect(() => {
 const id = searchParams.get("chapter");
 if (id && sortedChapters.some((c) => c.id === id)) {
 setSelectedChapterId(id);
 }
 }, [searchParams]);

 const chapter = useMemo(
   () => sortedChapters.find((c) => c.id === selectedChapterId) || sortedChapters[0],
   [selectedChapterId]
 );

 // Find matching sentence when navigating from bestiary
 useEffect(() => {
   if (!beastParam || !chapter) {
     setHighlightSentenceId(null);
     setHighlightBeastName(null);
     return;
   }

   const beast = beasts.find((b) => b.name === beastParam);
   if (!beast) {
     setHighlightSentenceId(null);
     setHighlightBeastName(null);
     return;
   }

   // Try matching by relatedBeastId first, then by originalText inclusion
   const matchedSentence = chapter.sentences.find(
     (s) => s.relatedBeastId === beast.id
   ) || chapter.sentences.find(
     (s) => s.original.includes(beast.originalText) || beast.originalText.includes(s.original)
   );

   if (matchedSentence) {
     setHighlightSentenceId(matchedSentence.id);
     setHighlightBeastName(beast.name);
     // Clear highlight after 6 seconds (3 pulses × 1.5s + buffer)
     const timer = setTimeout(() => {
       setHighlightSentenceId(null);
       setHighlightBeastName(null);
     }, 6000);
     return () => clearTimeout(timer);
   } else {
     setHighlightSentenceId(null);
     setHighlightBeastName(null);
   }
 }, [beastParam, chapter]);

 const chapterIndex = sortedChapters.findIndex((c) => c.id === selectedChapterId);
 const hasPrev = chapterIndex > 0;
 const hasNext = chapterIndex >= 0 && chapterIndex < sortedChapters.length - 1;

 const handlePrevChapter = () => {
   if (hasPrev) {
     const prevId = sortedChapters[chapterIndex - 1].id;
     setSelectedChapterId(prevId);
     markChapterRead(prevId);
     setLastReadChapter(prevId);
   }
 };

 const handleNextChapter = () => {
   if (hasNext) {
     const nextId = sortedChapters[chapterIndex + 1].id;
     setSelectedChapterId(nextId);
     markChapterRead(nextId);
     setLastReadChapter(nextId);
   }
 };

 // Track last read chapter on initial load and chapter change
 useEffect(() => {
   setLastReadChapter(selectedChapterId);
   setReadCount(new Set(getProgress().readChapters).size);
 }, [selectedChapterId]);

 // Listen for progress changes from other components
 useEffect(() => {
   const updateProgress = () => {
     setReadCount(new Set(getProgress().readChapters).size);
   };
   window.addEventListener("ancient-scroll:progress-changed", updateProgress);
   return () => window.removeEventListener("ancient-scroll:progress-changed", updateProgress);
 }, []);

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
 <main className="min-h-[calc(100dvh-4rem)] w-full bg-xuan">
 <ChapterSidebar
 chapters={sortedChapters}
 selectedId={selectedChapterId}
 onSelect={(id) => {
 setSelectedChapterId(id);
 markChapterRead(id);
 setLastReadChapter(id);
 }}
 />

 {/* 所有可见内容在 sidebar 右侧：用 margin-left 避让 fixed sidebar。
     lg 以上加动态左右内边距，使内容左边缘对齐 Navbar logo 左边缘、
     右边缘对齐 Navbar 内容区右边缘。 */}
 <div className="md:ml-[200px] lg:ml-[240px] lg:pl-[calc(max((100vw-1100px)/2-240px,0px)+1.5rem)] lg:pr-[calc(max((100vw-1100px)/2,0px)+1.5rem)]">
 <PageHeader
 title="双语阅读"
 subtitle="原文与译文对照，逐句品读山海经"
 compact
 />
 <div className="w-full px-4 pb-8 md:px-6">
          <SectionProgress
 label="阅读进度"
 current={readCount}
 total={sortedChapters.length}
 className="pt-2 mb-6"
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
 onPrevChapter={handlePrevChapter}
 onNextChapter={handleNextChapter}
 hasPrev={hasPrev}
 hasNext={hasNext}
 highlightSentenceId={highlightSentenceId}
 highlightBeastName={highlightBeastName}
 />
 </div>
 <Footer />
 </div>

 {activeTooltip && (
        <CharacterTooltip
          key={activeTooltip.charData.char + activeTooltip.sentenceId}
          charData={activeTooltip.charData}
          context={tooltipContext}
          triggerRect={activeTooltip.rect}
          chapterId={chapter.id}
          sentenceId={activeTooltip.sentenceId}
          onClose={() => setActiveTooltip(null)}
        />
 )}
 </main>
 );
}
