"use client";

interface CollectionProgressProps {
  collected: number;
  total: number;
}

export default function CollectionProgress({
  collected,
  total,
}: CollectionProgressProps) {
  const percentage = total > 0 ? Math.round((collected / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3 rounded-full border border-rule bg-surface/60 px-4 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/10">
        <span className="emoji text-sm">📜</span>
      </div>
      <div>
        <p className="font-serif text-xs text-muted">已收藏</p>
        <p className="font-serif text-sm font-medium text-ink">
          {collected}/{total}
          <span className="ml-1 text-xs text-cinnabar">({percentage}%)</span>
        </p>
      </div>
    </div>
  );
}
