"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Poem } from "@/data/poems";
import { markPoemComplete } from "@/lib/progress";
import { IconRefresh, IconChat, IconArrowRight, IconShare } from "@/components/icons";
import CopyButton from "@/components/CopyButton";
import ShareCardModal from "./ShareCardModal";

interface EndingSlideProps {
  poem: Poem;
  active: boolean;
  onRestart: () => void;
  onBack: () => void;
}

const poetToChar: Record<string, string> = {
  李白: "libai",
  苏轼: "sushi",
  曹操: "caocao",
  李清照: "liqingzhao",
};

export default function EndingSlide({
  poem,
  active,
  onRestart,
  onBack,
}: EndingSlideProps) {
  const [showShare, setShowShare] = useState(false);

  const fullPoemText = `${poem.title}\n${poem.author} · ${poem.dynasty}\n\n${poem.lines.map((l) => l.text).join("\n")}`;

  useEffect(() => {
    if (active) {
      markPoemComplete(poem.id);
    }
  }, [active, poem.id]);

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
          <div className="flex h-16 w-16 rotate-[-3deg] items-center justify-center rounded-sm bg-cinnabar/5 shadow-sm">
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

        {/* 诗词赏析一句话 */}
        <p className="mb-6 font-handwrite text-lg italic text-light-ink">
          — 愿你读完这首诗，心中自有山河 —
        </p>

        {/* Creation background */}
        {poem.background && (
          <div className="mb-8 mx-auto max-w-lg rounded-xl bg-surface/40 p-4 text-left">
            <p className="mb-1.5 font-serif text-xs text-cinnabar">创作背景</p>
            <p className="font-serif text-sm leading-relaxed text-light-ink">
              {poem.background}
            </p>
          </div>
        )}

        {/* 按钮组 */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-6 py-2.5 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10"
          >
            <IconRefresh className="h-3.5 w-3.5" /> 再读一遍
          </button>
          <CopyButton
            text={fullPoemText}
            label="复制全诗"
            successMessage="全诗已复制到剪贴板"
            className="rounded-full bg-surface/60 px-6 py-2.5 text-sm text-light-ink hover:bg-surface"
          />
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-full bg-surface/60 px-6 py-2.5 font-serif text-sm text-light-ink transition-colors hover:bg-surface"
          >
            选择其他诗 <IconArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-1 rounded-full bg-gold/5 px-6 py-2.5 font-serif text-sm text-gold transition-colors hover:bg-gold/10"
          >
            <IconShare className="h-3.5 w-3.5" /> 分享这首诗
          </button>
          {poetToChar[poem.author] ? (
            <Link
              href={`/dialogue?character=${poetToChar[poem.author]}&ask=${encodeURIComponent(`我刚读了《${poem.title}》，想聊聊这首诗`)}`}
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-6 py-2.5 font-serif text-sm text-indigo transition-colors hover:bg-indigo/10"
            >
              <IconChat className="h-3.5 w-3.5" /> 和{poem.author}聊聊这首诗
            </Link>
          ) : (
            <Link
              href="/dialogue"
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-6 py-2.5 font-serif text-sm text-indigo transition-colors hover:bg-indigo/10"
            >
              <IconChat className="h-3.5 w-3.5" /> 和古人聊聊
            </Link>
          )}
        </div>

        <Link
          href="/"
          className="mt-6 inline-block font-serif text-sm text-muted transition-colors hover:text-cinnabar"
        >
          返回首页
        </Link>
      </div>

      {/* Share card modal */}
      <ShareCardModal
        open={showShare}
        onClose={() => setShowShare(false)}
        poem={poem}
      />
    </section>
  );
}
