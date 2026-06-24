"use client";

import type { Beast } from "@/data/beasts";
import { categoryLabels } from "@/data/beasts";

interface BeastCardProps {
  beast: Beast;
  index: number;
  collected: boolean;
  onToggleCollect: (id: string) => void;
  onViewDetail: (beast: Beast) => void;
}

export default function BeastCard({
  beast,
  index,
  collected,
  onToggleCollect,
  onViewDetail,
}: BeastCardProps) {
  const handleCardClick = () => {
    onViewDetail(beast);
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
      style={{ animationDelay: `${index * 0.1}s` }}
      aria-label={`查看${beast.name}详情`}
    >
      {/* Gradient image area */}
      <div
        className="relative m-3 flex h-[180px] items-center justify-center overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${beast.gradient[0]}, ${beast.gradient[1]})`,
        }}
      >
        <span
          className="emoji text-6xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          style={{ textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
        >
          {beast.emoji}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-4 pb-4">
        <h3 className="font-calligraphy text-xl text-ink">{beast.name}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-serif text-xs text-muted">{beast.chapter}</span>
          <span className="rounded-full bg-cinnabar/10 px-2 py-0.5 font-serif text-[10px] text-cinnabar">
            {categoryLabels[beast.category]}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 font-serif text-sm leading-relaxed text-light-ink">
          {beast.originalText}
        </p>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollect(beast.id);
            }}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-xs transition-all active:scale-95 ${
              collected
                ? "bg-cinnabar/10 text-cinnabar"
                : "bg-ink/5 text-light-ink hover:bg-ink/10"
            }`}
          >
            <span className="transition-transform duration-200">
              {collected ? "♥" : "♡"}
            </span>
            {collected ? "已收藏" : "收藏"}
          </button>

          <span className="inline-flex items-center gap-1 font-serif text-sm text-cinnabar transition-colors group-hover:underline">
            查看详情
            <span>→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
