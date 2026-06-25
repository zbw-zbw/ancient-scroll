"use client";

import Image from "next/image";
import type { Poem } from "@/data/poems";

interface PoemCardProps {
  poem: Poem;
  onSelect: (poem: Poem) => void;
}

export default function PoemCard({ poem, onSelect }: PoemCardProps) {
  const handleCardClick = () => {
    onSelect(poem);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:bg-surface hover:shadow-lg"
      aria-label={`进入《${poem.title}》诗境`}
    >
      {/* Theme bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: poem.theme }}
      />

      {/* Cover image - fallback to gradient if no image */}
      <div className="relative h-[140px] overflow-hidden rounded-t-lg" style={{ background: poem.coverImage ? undefined : `linear-gradient(135deg, ${poem.theme}40, ${poem.theme}15)` }}>
        {poem.coverImage && (
          <>
            <Image
              src={poem.coverImage}
              alt={poem.title}
              fill
              className="object-cover opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          </>
        )}
        {!poem.coverImage && (
          <div className="flex h-full items-center justify-center">
            <span className="font-calligraphy text-5xl text-ink/10">{poem.title[0]}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-calligraphy text-2xl text-ink">{poem.title}</h3>
        <p className="mt-1 font-serif text-sm text-muted">
          {poem.author} · {poem.dynasty}
        </p>

        <p className="mt-3 font-handwrite text-lg text-light-ink">
          {poem.lines[0]?.text}
        </p>

        <p className="mt-3 line-clamp-2 font-serif text-sm text-muted">
          {poem.description}
        </p>

        <span className="mt-auto inline-flex items-center gap-1 self-start pt-4 font-serif text-sm text-cinnabar transition-colors group-hover:underline">
          进入诗境
          <span>→</span>
        </span>
      </div>
    </article>
  );
}
