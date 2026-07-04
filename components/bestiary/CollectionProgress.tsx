"use client";

import { beasts, categoryLabels, type BeastCategory } from "../../data/beasts";

const categoryColors: Record<BeastCategory, string> = {
  beast: "#c84032",
  bird: "#2c3e6b",
  fish: "#2E8B57",
  serpent: "#b8860b",
};

interface CollectionProgressProps {
  collectedIds: string[];
}

export default function CollectionProgress({ collectedIds }: CollectionProgressProps) {
  const count = collectedIds.length;
  const total = beasts.length;

  const categoryStats = (Object.keys(categoryLabels) as BeastCategory[]).map(
    (cat) => ({
      name: cat,
      label: categoryLabels[cat],
      color: categoryColors[cat],
      count: beasts.filter((b) => b.category === cat && collectedIds.includes(b.id)).length,
      total: beasts.filter((b) => b.category === cat).length,
    })
  );

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-serif text-sm text-light-ink">收藏进度</span>
        <span className="font-serif text-sm text-cinnabar">{count}/{total}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cinnabar to-seal-red transition-all duration-700 ease-out"
          style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {categoryStats.map((cat) => (
          <div key={cat.name} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
            <span className="font-serif text-xs text-muted">
              {cat.label} {cat.count}/{cat.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
