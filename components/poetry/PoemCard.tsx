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
  isRead: boolean;
}

export default function PoemCard({ poem, onSelect, onShare, isRead }: PoemCardProps) {
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
      {/* 已读印章 */}
      {isRead && (
        <div
          className="pointer-events-none absolute right-3 top-3 z-10 flex h-10 w-10 rotate-[-12deg] items-center justify-center rounded-sm border-[1.5px] border-cinnabar bg-xuan/40 opacity-70"
          aria-hidden="true"
        >
          <span className="text-center font-serif text-[10px] leading-none text-cinnabar">
            已读
          </span>
        </div>
      )}

      {/* Cover image - same approach as BeastCard */}
      <div className="relative h-[200px] overflow-hidden rounded-t-2xl img-placeholder" style={{ background: poem.coverImage && !imgError ? undefined : `linear-gradient(135deg, ${poem.theme}40, ${poem.theme}15)` }}>
        {poem.coverImage && !imgError ? (
          <Image
            src={poem.coverImage}
            alt={poem.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            placeholder="empty"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-calligraphy text-5xl text-ink/10">{poem.title[0]}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-4">
        <h3 className="font-calligraphy text-xl text-ink">{poem.title}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-serif text-xs text-muted">{poem.author}</span>
          <span className="font-serif text-xs text-muted">·</span>
          <span className="font-serif text-xs text-muted">{poem.dynasty}</span>
        </div>

        <p className="mt-3 font-handwrite text-base text-light-ink line-clamp-1">
          {poem.lines[0]?.text}
        </p>

        <p className="mt-2 line-clamp-2 font-serif text-sm leading-relaxed text-muted">
          {poem.description}
        </p>

        {/* Actions - matching BeastCard: collect on left, enter on right */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleFavorite}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs transition-all active:scale-95 ${
                favorited
                  ? "bg-cinnabar/10 text-cinnabar hover:bg-cinnabar/20"
                  : "bg-ink/5 text-light-ink hover:bg-ink/10"
              }`}
              aria-label={favorited ? `取消收藏《${poem.title}》` : `收藏《${poem.title}》`}
            >
              <span className={`transition-transform duration-200 ${favorited ? "animate-heart-beat" : ""}`}>
                {favorited ? (
                  <IconHeart className="h-3.5 w-3.5" />
                ) : (
                  <IconHeartOutline className="h-3.5 w-3.5" />
                )}
              </span>
              {favorited ? "已收藏" : "收藏"}
            </button>

            {/* Share button */}
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(e);
                }}
                className="inline-flex items-center justify-center rounded-full bg-ink/5 px-2.5 py-1.5 text-light-ink transition-all hover:bg-ink/10 hover:text-cinnabar active:scale-95"
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
                  className="h-3.5 w-3.5"
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

          <span
            className="inline-flex items-center gap-1 font-serif text-sm text-cinnabar transition-colors group-hover:underline group-focus-within:underline cursor-pointer"
          >
            进入诗境
            <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
