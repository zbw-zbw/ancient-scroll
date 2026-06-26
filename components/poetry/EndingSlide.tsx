"use client";

import Image from "next/image";
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
    <section
      className="slide relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--xuan-dark) 0%, var(--xuan) 100%)",
      }}
    >
      {/* 背景装饰：用封面图做半透明底图 */}
      {poem.coverImage && (
        <Image
          src={poem.coverImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-10"
        />
      )}

      {/* 装饰元素 */}
      <div className="pointer-events-none absolute left-10 top-10 select-none font-calligraphy text-[120px] leading-none text-ink/5">
        詩
      </div>

      <div
        className={`relative z-10 mx-auto max-w-2xl px-6 pb-20 text-center transition-all duration-1000 md:pb-0 ${
          active ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* 红色印章装饰 */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 rotate-[-3deg] items-center justify-center rounded-sm border-2 border-cinnabar bg-cinnabar/5 shadow-sm">
            <span className="text-center font-calligraphy text-sm leading-tight text-cinnabar">
              诗境
              <br />
              漫游
            </span>
          </div>
        </div>

        {/* 诗名 */}
        <h2 className="mb-2 font-calligraphy text-4xl text-ink md:text-5xl">
          {poem.title}
        </h2>
        <p className="mb-8 font-serif text-base text-muted">
          {poem.author} · {poem.dynasty}
        </p>

        {/* 分隔线 */}
        <div className="mx-auto mb-8 h-px w-24 bg-cinnabar/30" />

        {/* 完整诗文 */}
        <div className="mb-10 space-y-4">
          {poem.lines.map((line, i) => (
            <div key={i} className="space-y-1">
              <p className="font-calligraphy text-2xl leading-relaxed text-ink md:text-3xl">
                {line.text}
              </p>
              <p className="font-serif text-sm text-muted">{line.annotation}</p>
            </div>
          ))}
        </div>

        {/* 分隔线 */}
        <div className="mx-auto mb-8 h-px w-24 bg-cinnabar/30" />

        {/* 诗词赏析一句话 */}
        <p className="mb-10 font-handwrite text-lg italic text-light-ink">
          — 愿你读完这首诗，心中自有山河 —
        </p>

        {/* 按钮组 */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onRestart}
            className="rounded-full border border-cinnabar/40 bg-cinnabar/5 px-6 py-2.5 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10"
          >
            ↑ 再读一遍
          </button>
          <button
            onClick={onBack}
            className="rounded-full border border-rule bg-surface/60 px-6 py-2.5 font-serif text-sm text-light-ink transition-colors hover:bg-surface"
          >
            选择其他诗 →
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
