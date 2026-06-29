"use client";

import Image from "next/image";
import type { HistoricalCharacter } from "@/data/characters";

interface ChatHeaderProps {
 character: HistoricalCharacter;
 onBack: () => void;
 onClear: () => void;
}

export default function ChatHeader({ character, onBack, onClear }: ChatHeaderProps) {
 return (
 <div className="flex items-center justify-between bg-xuan/95 px-3 py-3 md:px-6 md:py-4 backdrop-blur-md">
 <div className="flex items-center gap-2 md:gap-3">
 <button
 onClick={onBack}
 className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-rule/30"
 aria-label="返回选择"
 >
 <svg
 className="h-5 w-5 text-ink"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M15 19l-7-7 7-7"
 />
 </svg>
 </button>

 <div
 className="h-7 w-7 shrink-0 overflow-hidden rounded-full md:h-10 md:w-10"
 style={{ backgroundColor: `${character.color}15` }}
 >
 <Image
 src={character.avatarPath}
 alt={character.name}
 width={40}
 height={40}
 className="h-full w-full object-cover"
 loading="lazy"
 />
 </div>

 <div className="min-w-0">
 <h2 className="font-calligraphy text-sm text-ink md:text-lg truncate">
 {character.name}
 </h2>
 <p className="font-serif text-xs text-muted truncate">
 {character.title} · {character.era}
 </p>
 </div>
 </div>

 <button
 onClick={onClear}
 className="shrink-0 cursor-pointer whitespace-nowrap rounded-md px-1.5 py-1 font-serif text-xs text-muted transition-colors hover:bg-surface/60 hover:text-cinnabar md:px-2 md:text-sm"
 >
 清空对话
 </button>
 </div>
 );
}
