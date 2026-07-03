"use client";

import type { Beast } from "@/data/beasts";
import EmptyState from "@/components/EmptyState";
import BeastCard from "./BeastCard";

interface BeastGridProps {
  beasts: Beast[];
  collectedIds: string[];
  onToggleCollect: (id: string) => void;
  onViewDetail: (beast: Beast) => void;
  onShare?: (beast: Beast) => void;
  onClearFilters?: () => void;
}

export default function BeastGrid({
  beasts,
  collectedIds,
  onToggleCollect,
  onViewDetail,
  onShare,
  onClearFilters,
}: BeastGridProps) {
  if (beasts.length === 0) {
    return (
      <EmptyState
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 h-12 w-12 text-ink/20">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        }
        title="未找到匹配的异兽"
        description="试试调整筛选条件或清空搜索关键词"
        action={
          onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-5 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              清除筛选
            </button>
          )
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {beasts.map((beast, index) => (
        <BeastCard
          key={beast.id}
          beast={beast}
          index={index}
          collected={collectedIds.includes(beast.id)}
          onToggleCollect={onToggleCollect}
          onViewDetail={onViewDetail}
          onShare={onShare}
        />
      ))}
    </div>
  );
}
