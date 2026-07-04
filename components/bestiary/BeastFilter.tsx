"use client";

import {
 type BeastCategory,
 categoryLabels,
 categoryCounts,
} from "@/data/beasts";
import {
 IconSparkles,
 IconPaw,
 IconBird,
 IconFish,
 IconSnake,
 IconSearch,
} from "@/components/icons";

const categoryIcons: Record<string, React.ReactNode> = {
 all: <IconSparkles className="h-3.5 w-3.5" />,
 beast: <IconPaw className="h-3.5 w-3.5" />,
 bird: <IconBird className="h-3.5 w-3.5" />,
 fish: <IconFish className="h-3.5 w-3.5" />,
 serpent: <IconSnake className="h-3.5 w-3.5" />,
};

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
 <div className="sticky top-16 z-30 -mx-4 bg-xuan px-4 py-3 md:-mx-6 md:px-6">
 <div className="mx-auto flex max-w-[1100px] flex-col gap-3 md:flex-row md:items-center md:justify-between">
 <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide" role="group" aria-label="异兽分类筛选">
 {options.map((key) => {
 const label = key === "all" ? "全部" : categoryLabels[key as BeastCategory];
 const icon = categoryIcons[key];
 const count = categoryCounts[key];
 const isActive = active === key;

 return (
 <button
 key={key}
 onClick={() => onChange(key)}
 aria-pressed={isActive}
 className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 min-h-[36px] font-serif text-sm transition-all ${
 isActive
 ? "bg-cinnabar/10 text-cinnabar"
 : "bg-surface/60 text-light-ink hover:bg-surface"
 }`}
 >
 {icon}
 <span>{label}</span>
 <span
 className={`ml-0.5 rounded-full px-1.5 py-0 text-[10px] ${
 isActive ? "bg-cinnabar/20 text-cinnabar" : "bg-ink/5 text-muted"
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
 aria-label="搜索异兽"
 className="w-full rounded-full bg-surface/60 px-4 py-1.5 pl-9 pr-8 font-serif text-sm text-ink placeholder:text-muted outline-none transition-colors focus:bg-surface focus:ring-2 focus:ring-cinnabar/30 md:w-56"
 />
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
 <IconSearch className="h-4 w-4" />
 </span>
 {search && (
 <button
 onClick={() => onSearch("")}
 aria-label="清空搜索"
 className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink transition-colors"
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
 <path d="M18 6 6 18" />
 <path d="m6 6 12 12" />
 </svg>
 </button>
 )}
 </div>
 </div>
 </div>
 );
}
