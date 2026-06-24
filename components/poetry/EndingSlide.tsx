"use client";

import Link from "next/link";
import type { Poem } from "@/data/poems";

interface EndingSlideProps {
  poem: Poem;
  active: boolean;
  onRestart: () => void;
  onBack: () => void;
}

export default function EndingSlide({
  poem,
  active,
  onRestart,
  onBack,
}: EndingSlideProps) {
  return (
    <section className="slide relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-xuan via-xuan to-xuan-dark">
      <div
        className={`relative z-10 mx-auto w-full max-w-2xl px-6 py-20 text-center transition-all duration-1000 ${
          active ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <h3 className="font-calligraphy text-3xl text-ink md:text-4xl">
          {poem.title}
        </h3>
        <p className="mt-2 font-serif text-sm text-muted">
          {poem.author} · {poem.dynasty}
        </p>

        <div className="mt-10 space-y-6 text-center">
          {poem.lines.map((line, index) => (
            <div key={index}>
              <p className="font-calligraphy text-2xl leading-relaxed text-ink md:text-3xl">
                {line.text}
              </p>
              <p className="mt-1 font-serif text-sm text-muted">
                {line.annotation}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 rounded-full bg-cinnabar px-6 py-2.5 font-serif text-sm text-white transition-colors hover:bg-cinnabar/90"
          >
            <span>↑</span>
            再读一遍
          </button>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-surface px-6 py-2.5 font-serif text-sm text-ink transition-colors hover:bg-surface/80"
          >
            选择其他诗
            <span>→</span>
          </button>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block font-serif text-sm text-muted transition-colors hover:text-cinnabar"
        >
          返回首页
        </Link>
      </div>
    </section>
  );
}
