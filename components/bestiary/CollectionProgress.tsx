"use client";

import { useEffect, useState } from "react";
import { beasts, categoryLabels, type BeastCategory } from "../../data/beasts";
import { getCollectedBeasts } from "../../lib/collection";

const categoryColors: Record<BeastCategory, string> = {
  beast: "#c84032",
  bird: "#2c3e6b",
  fish: "#2E8B57",
  serpent: "#b8860b",
};

export default function CollectionProgress() {
  const [collected, setCollected] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setCollected(getCollectedBeasts());
    update();
    // Listen for progress changes (dispatched by toggleFavoriteBeast)
    window.addEventListener("ancient-scroll:progress-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("ancient-scroll:progress-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const count = collected.length;
  const total = beasts.length;

  // Per-category counts
  const categoryStats = (Object.keys(categoryLabels) as BeastCategory[]).map(
    (cat) => ({
      name: cat,
      label: categoryLabels[cat],
      color: categoryColors[cat],
      count: beasts.filter((b) => b.category === cat && collected.includes(b.id)).length,
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
      {/* Category dots */}
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
