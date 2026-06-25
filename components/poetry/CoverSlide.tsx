"use client";

import Image from "next/image";
import type { Poem } from "@/data/poems";

interface CoverSlideProps {
  poem: Poem;
  active: boolean;
}

export default function CoverSlide({ poem, active }: CoverSlideProps) {
  const firstLine = poem.lines[0];

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
        loading="lazy"
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
            firstLine?.textColor === "light" ? "text-white" : "text-ink"
          }`}
          style={{ textShadow: firstLine?.textColor === "light" ? "0 2px 20px rgba(0,0,0,0.3)" : "none" }}
        >
          {poem.title}
        </h2>
        <p
          className={`mx-auto mt-6 max-w-md font-serif text-base md:text-lg ${
            firstLine?.textColor === "light" ? "text-white/80" : "text-ink/70"
          }`}
        >
          {poem.description}
        </p>

        <div
          className={`mt-12 animate-bounce-down font-serif text-sm ${
            firstLine?.textColor === "light" ? "text-white/70" : "text-ink/60"
          }`}
        >
          <p className="mb-1">向下滚动开始</p>
          <span className="text-xl">▼</span>
        </div>
      </div>
    </section>
  );
}
