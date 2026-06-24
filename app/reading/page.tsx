"use client";

import { useMemo, useState } from "react";
import { chapters } from "@/data/shanhaijing";
import type { DifficultChar } from "@/data/shanhaijing";
import ChapterSidebar from "@/components/reading/ChapterSidebar";
import ReadingPanel from "@/components/reading/ReadingPanel";
import CharacterTooltip from "@/components/reading/CharacterTooltip";
import type { FontSize } from "@/components/reading/ReadingControls";

export default function ReadingPage() {
  const [selectedChapterId, setSelectedChapterId] = useState("nanshan");
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [showTranslation, setShowTranslation] = useState(true);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [activeTooltip, setActiveTooltip] = useState<{
    sentenceId: string;
    charData: DifficultChar;
    rect: DOMRect;
  } | null>(null);

  const chapter = useMemo(
    () => chapters.find((c) => c.id === selectedChapterId) || chapters[0],
    [selectedChapterId]
  );

  const handleCharClick = (
    sentenceId: string,
    charData: DifficultChar,
    rect: DOMRect
  ) => {
    setActiveTooltip({ sentenceId, charData, rect });
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
    <div className="relative flex min-h-[calc(100vh-4rem)] bg-xuan">
      <ChapterSidebar
        chapters={chapters}
        selectedId={selectedChapterId}
        onSelect={setSelectedChapterId}
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

      {activeTooltip && (
        <CharacterTooltip
          charData={activeTooltip.charData}
          context={tooltipContext}
          triggerRect={activeTooltip.rect}
          onClose={() => setActiveTooltip(null)}
        />
      )}
    </div>
  );
}
