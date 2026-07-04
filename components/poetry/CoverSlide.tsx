"use client";

import Image from "next/image";
import type { Poem } from "@/data/poems";

interface CoverSlideProps {
 poem: Poem;
 active: boolean;
}

export default function CoverSlide({ poem, active }: CoverSlideProps) {
 const firstLine = poem.lines[0];
 const textLight = firstLine?.textColor === "light";

 return (
 <section
 className="slide relative flex min-h-screen items-center justify-center overflow-hidden"
 style={{
 background: `linear-gradient(135deg, ${firstLine?.gradientFrom ?? "#fef3c7"}, ${firstLine?.gradientTo ?? "#fde68a"})`,
 }}
 >
 <Image
src={poem.coverImage}
alt=""
fill
className="object-cover opacity-30"
priority
/>
 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink/70" />

 <div
 className={`relative z-10 mx-auto max-w-2xl px-6 text-center transition-all duration-1000 ${
 active ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
 }`}
 >
 <p className="mb-3 font-serif text-sm tracking-widest text-ink/70">
 {poem.author} · {poem.dynasty}
 </p>
 <h2
 className={`font-calligraphy text-5xl md:text-7xl ${
 textLight ? "text-white" : "text-ink"
 }`}
 style={{ textShadow: textLight ? "0 2px 20px rgba(0,0,0,0.3)" : "none" }}
 >
 {poem.title}
 </h2>
 <p
 className={`mx-auto mt-6 max-w-md font-serif text-base md:text-lg ${
 textLight ? "text-white/80" : "text-ink/70"
 }`}
 >
 {poem.description}
 </p>

 {/* Author bio */}
 {poem.authorBio && (
 <p
 className={`mx-auto mt-4 max-w-lg font-serif text-xs leading-relaxed ${
 textLight ? "text-white/60" : "text-ink/50"
 }`}
 style={{ textShadow: textLight ? "0 1px 6px rgba(0,0,0,0.3)" : "none" }}
 >
 {poem.authorBio}
 </p>
 )}

 {/* Scroll hint */}
 <div className="mt-12 flex flex-col items-center gap-2">
 <span className={`font-serif text-xs ${textLight ? "text-white/50" : "text-ink/40"}`}>
 向下滚动，走进诗境
 </span>
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={`h-5 w-5 animate-bounce ${textLight ? "text-white/50" : "text-ink/40"}`}
 >
 <path d="M12 5v14" />
 <path d="m19 12-7 7-7-7" />
 </svg>
 </div>
 </div>
 </section>
 );
}
