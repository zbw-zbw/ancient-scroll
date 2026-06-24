"use client";

import type { Beast } from "@/data/beasts";
import BeastCard from "./BeastCard";

interface BeastGridProps {
  beasts: Beast[];
  collectedIds: string[];
  onToggleCollect: (id: string) => void;
  onViewDetail: (beast: Beast) => void;
}

export default function BeastGrid({
  beasts,
  collectedIds,
  onToggleCollect,
  onViewDetail,
}: BeastGridProps) {
  if (beasts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="emoji mb-3 text-4xl">🔍</span>
        <p className="font-serif text-light-ink">未找到匹配的异兽</p>
      </div>
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
        />
      ))}
    </div>
  );
}
