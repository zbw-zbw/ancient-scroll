"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Poem } from "@/data/poems";
import { IconArrowRight, IconHeart, IconHeartOutline } from "@/components/icons";
import { isFavoritePoem, toggleFavoritePoem } from "@/lib/progress";

interface PoemCardProps {
  poem: Poem;
  onSelect: (poem: Poem) => void;
  onShare?: (e: React.MouseEvent) => void;
}

export default function PoemCard({ poem, onSelect, onShare }: PoemCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setFavorited(isFavoritePoem(poem.id));
  }, [poem.id]);

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavoritePoem(poem.id);
      setFavorited((prev) => !prev);
    },
    [poem.id]
  );

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
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className="card group flex cursor-pointer flex-col relative"
      style={{ borderTop: `2px solid ${poem.theme}` }}
      aria-label={`进入《${poem.title}》诗境`}
    >
      {/* Cover image - fallback to gradient if no image */}
      <div className="relative h-[140px] overflow-hidden img-placeholder" style={{ background: poem.coverImage && !imgError ? undefined : `linear-gradient(135deg, ${poem.theme}40, ${poem.theme}15)` }}>
        {poem.coverImage && !imgError ? (
          <>
            <Image
              src={poem.coverImage}
              alt={poem.title}
              fill
              className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              placeholder="empty"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-calligraphy text-5xl text-ink/10">{poem.title[0]}</span>
          </div>
        )}

        {/* Favorite button - top right corner */}
        <button
          onClick={handleToggleFavorite}
          className={`favorite-btn absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-all active:scale-90 ${
            favorited
              ? "bg-cinnabar/20 text-cinnabar opacity-100"
              : "bg-surface/70 text-light-ink hover:bg-surface hover:text-cinnabar md:opacity-0 md:group-hover:opacity-100"
          }`}
          aria-label={favorited ? `取消收藏《${poem.title}》` : `收藏《${poem.title}》`}
        >
          {favorited ? (
            <IconHeart className="h-4 w-4" />
          ) : (
            <IconHeartOutline className="h-4 w-4" />
          )}
        </button>

        {/* Share button */}
        {onShare && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(e);
            }}
            className="action-btn absolute right-14 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface/70 text-light-ink shadow-sm backdrop-blur-sm transition-all hover:bg-surface hover:text-cinnabar active:scale-90 md:opacity-0 md:group-hover:opacity-100"
            aria-label={`分享《${poem.title}》`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="m8.59 13.51 6.83 3.98" />
              <path d="M15.41 6.51 8.59 10.49" />
            </svg>
          </button>
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

        <span className="mt-auto inline-flex items-center gap-1 self-start pt-4 font-serif text-sm text-cinnabar transition-colors group-hover:underline group-focus-within:underline cursor-pointer">
          进入诗境
          <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
