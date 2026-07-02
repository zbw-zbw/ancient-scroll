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
}

export default function BeastGrid({
 beasts,
 collectedIds,
 onToggleCollect,
 onViewDetail,
 onShare,
}: BeastGridProps) {
 if (beasts.length === 0) {
    return <EmptyState message="未找到匹配的异兽" />;
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
