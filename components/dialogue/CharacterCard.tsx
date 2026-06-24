"use client";

import { HistoricalCharacter } from "../../data/characters";

interface CharacterCardProps {
  character: HistoricalCharacter;
  onSelect: (character: HistoricalCharacter) => void;
}

export default function CharacterCard({
  character,
  onSelect,
}: CharacterCardProps) {
  return (
    <button
      onClick={() => onSelect(character)}
      className="group relative overflow-hidden rounded-lg bg-surface/60 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-surface"
    >
      {/* Decorative color block */}
      <div
        className="absolute left-0 top-0 h-16 w-2 transition-all duration-300 group-hover:h-full group-hover:w-3"
        style={{ backgroundColor: character.color }}
      />

      <div className="relative pl-4">
        {/* Avatar */}
        <div
          className="emoji mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
          style={{
            backgroundColor: `${character.color}15`,
          }}
        >
          {character.emoji}
        </div>

        {/* Name */}
        <h3 className="font-calligraphy text-2xl text-ink mb-1">
          {character.name}
        </h3>

        {/* Title + Era */}
        <p className="font-serif text-xs text-muted mb-3">
          {character.title} · {character.era}
        </p>

        {/* Description */}
        <p className="font-serif text-sm text-light-ink leading-relaxed line-clamp-2 mb-4">
          {character.description}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-1 font-serif text-sm text-cinnabar transition-all group-hover:gap-2">
          开始对话 <span>→</span>
        </span>
      </div>
    </button>
  );
}
