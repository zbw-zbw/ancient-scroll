"use client";

import { poems, type Poem } from "@/data/poems";
import PoemCard from "./PoemCard";

interface PoemSelectorProps {
 onSelect: (poem: Poem) => void;
}

export default function PoemSelector({ onSelect }: PoemSelectorProps) {
 return (
 <div className="min-h-screen bg-xuan px-4 pb-16 pt-20 md:px-6 md:pt-24">
 <div className="mx-auto max-w-[1100px]">
 <header className="mb-10 text-center md:mb-12">
 <h1 className="font-calligraphy text-4xl text-ink md:text-5xl">
 诗境漫游
 </h1>
 <p className="mx-auto mt-3 max-w-md font-serif text-base text-muted md:text-lg">
 选一首诗，开启一段沉浸式视觉旅程
 </p>
 </header>

 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {poems.map((poem) => (
 <PoemCard key={poem.id} poem={poem} onSelect={onSelect} />
 ))}
 </div>
 </div>
 </div>
 );
}
