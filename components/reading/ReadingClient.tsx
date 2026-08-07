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
 const [introCollapsed, setIntroCollapsed] = useState(false);

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

  // Load intro collapsed state from localStorage
  useEffect(() => {
    setIntroCollapsed(localStorage.getItem("gj_shj_intro_collapsed") === "true");
  }, []);

  const toggleIntro = () => {
    const next = !introCollapsed;
    setIntroCollapsed(next);
    localStorage.setItem("gj_shj_intro_collapsed", String(next));
  };

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

 {/* PageHeader 全宽渲染（在 sidebar 偏移容器之外），
     使印章 logo 定位在视口最右侧，与其他页面一致。
     固定侧边栏会叠加在 PageHeader 左侧上方，不影响居中标题。 */}
 <PageHeader
 title="双语阅读"
 subtitle="原文与译文对照，逐句品读山海经"
 compact
 />

 {/* 内容区在 sidebar 右侧：用 margin-left 避让 fixed sidebar。
     lg 以上加动态左右内边距，使内容左边缘对齐 Navbar logo 左边缘、
     右边缘对齐 Navbar 内容区右边缘。 */}
 <div className="md:ml-[200px] lg:ml-[240px] lg:pl-[calc(max((100vw-1100px)/2-240px,0px)+1.5rem)] lg:pr-[calc(max((100vw-1100px)/2,0px)+1.5rem)]">
 <div className="w-full px-4 pb-8 md:px-6">
          {/* 山海经简介卡片 */}
          <div className="pt-8 md:pt-12">
            {introCollapsed ? (
              <button
                onClick={toggleIntro}
                className="flex items-center gap-1.5 font-serif text-sm text-cinnabar transition-colors hover:text-seal-red"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                关于山海经
              </button>
            ) : (
              <div className="rounded-xl border border-ink/8 bg-seal-bg/40 p-4 md:p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-calligraphy text-base text-ink md:text-lg">关于山海经</span>
                  <button
                    onClick={toggleIntro}
                    className="flex items-center gap-1 font-serif text-xs text-muted transition-colors hover:text-cinnabar"
                  >
                    收起
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                </div>
                <p className="font-serif text-sm leading-relaxed text-light-ink">
                  《山海经》是中国先秦时期的奇书，全书共十八篇，记载了上古时期的山川地理、奇珍异兽与神话传说。它是中国神话的重要源头，鲁迅称之为&ldquo;古之巫书&rdquo;。本平台收录全部十八篇共267句原文，配有白话译文，帮助你轻松读懂这部两千多年前的瑰宝。
                </p>
              </div>
            )}
          </div>

          <SectionProgress
            label="阅读进度"
            current={readCount}
            total={sortedChapters.length}
            className="mt-6 mb-8 md:mt-8 md:mb-10"
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
