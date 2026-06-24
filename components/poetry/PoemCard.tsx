"use client";

import type { Poem } from "@/data/poems";

interface PoemCardProps {
  poem: Poem;
  onSelect: (poem: Poem) => void;
}

export default function PoemCard({ poem, onSelect }: PoemCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-surface">
      {/* Theme bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: poem.theme }}
      />

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-calligraphy text-2xl text-ink">{poem.title}</h3>
        <p className="mt-1 font-serif text-sm text-muted">
          {poem.author} · {poem.dynasty}
        </p>

        <p className="mt-3 font-handwrite text-lg text-light-ink">
          {poem.lines[0]?.text}
        </p>

        <p className="mt-3 line-clamp-2 font-serif text-sm text-muted">
          {poem.description}
        </p>

        <button
          onClick={() => onSelect(poem)}
          className="mt-auto inline-flex items-center gap-1 self-start pt-4 font-serif text-sm text-cinnabar transition-colors group-hover:underline"
        >
          进入诗境
          <span>→</span>
        </button>
      </div>
    </article>
  );
}
