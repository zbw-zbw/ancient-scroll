"use client";

import Image from "next/image";
import { HistoricalCharacter } from "@/data/characters";
import { IconArrowRight } from "@/components/icons";

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
      className="card group relative p-6 text-left"
    >
      {/* Decorative color block */}
      <div
        className="absolute left-0 top-0 h-16 w-2 transition-all duration-300 group-hover:h-full group-hover:w-3"
        style={{ backgroundColor: character.color }}
      />

      <div className="relative pl-4">
        {/* Avatar */}
        <div
          className="mb-4 h-20 w-20 overflow-hidden rounded-full shadow-inner"
          style={{
            backgroundColor: `${character.color}15`,
          }}
        >
          <Image
            src={character.avatarPath}
            alt={character.name}
            width={80}
            height={80}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
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
        {typeof window !== 'undefined' && localStorage.getItem(`ancient-scroll-chat-history-${character.id}`)
          ? '继续对话'
          : '开始对话'} <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
 </div>
 </button>
 );
}
