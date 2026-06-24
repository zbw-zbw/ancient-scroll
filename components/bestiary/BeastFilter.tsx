"use client";

import {
  type BeastCategory,
  categoryLabels,
  categoryEmojis,
  categoryCounts,
} from "@/data/beasts";

interface BeastFilterProps {
  active: BeastCategory | "all";
  onChange: (category: BeastCategory | "all") => void;
  search: string;
  onSearch: (value: string) => void;
}

const options: (BeastCategory | "all")[] = ["all", "beast", "bird", "fish", "serpent"];

export default function BeastFilter({
  active,
  onChange,
  search,
  onSearch,
}: BeastFilterProps) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-rule/50 bg-xuan px-4 py-3 md:-mx-6 md:px-6">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide">
          {options.map((key) => {
            const label = key === "all" ? "全部" : categoryLabels[key as BeastCategory];
            const emoji = key === "all" ? "✨" : categoryEmojis[key as BeastCategory];
            const count = categoryCounts[key];
            const isActive = active === key;

            return (
              <button
                key={key}
                onClick={() => onChange(key)}
                className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-serif text-sm transition-all ${
                  isActive
                    ? "border-cinnabar/40 bg-cinnabar text-white shadow-sm"
                    : "border-rule bg-surface/60 text-light-ink hover:bg-surface"
                }`}
              >
                <span className="emoji">{emoji}</span>
                <span>{label}</span>
                <span
                  className={`ml-0.5 rounded-full px-1.5 py-0 text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-ink/5 text-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative flex-shrink-0">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="搜索异兽名称..."
            className="w-full rounded-full border border-rule bg-surface/60 px-4 py-1.5 pl-9 font-serif text-sm text-ink placeholder:text-muted outline-none transition-colors focus:border-cinnabar/40 focus:bg-surface md:w-56"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted">
            🔍
          </span>
        </div>
      </div>
    </div>
  );
}
