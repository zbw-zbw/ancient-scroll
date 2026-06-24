"use client";

import { HistoricalCharacter } from "../../data/characters";

interface ChatHeaderProps {
  character: HistoricalCharacter;
  onBack: () => void;
  onClear: () => void;
}

export default function ChatHeader({
  character,
  onBack,
  onClear,
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-rule/60 bg-xuan/80 px-4 py-3 backdrop-blur-sm md:px-6 md:py-4">
      <button
        onClick={onBack}
        className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-serif text-sm text-muted transition-colors hover:bg-surface/60 hover:text-ink"
      >
        <span>←</span>
        <span className="hidden sm:inline">返回</span>
      </button>

      <div className="flex items-center gap-2 md:gap-3">
        <div
          className="emoji flex h-8 w-8 items-center justify-center rounded-full text-lg md:h-10 md:w-10 md:text-xl"
          style={{ backgroundColor: `${character.color}20` }}
        >
          {character.emoji}
        </div>
        <div className="text-center">
          <h2 className="font-calligraphy text-lg text-ink md:text-xl">
            {character.name}
          </h2>
          <p className="font-serif text-xs text-muted">
            {character.title}
          </p>
        </div>
      </div>

      <button
        onClick={onClear}
        className="cursor-pointer rounded-md px-2 py-1 font-serif text-xs text-muted transition-colors hover:bg-surface/60 hover:text-cinnabar md:text-sm"
      >
        清空对话
      </button>
    </div>
  );
}
