"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Poem } from "@/data/poems";
import { markPoemComplete } from "@/lib/progress";
import { IconRefresh, IconChat, IconArrowRight, IconShare } from "@/components/icons";
import CopyButton from "@/components/CopyButton";
import ShareCardModal from "./ShareCardModal";
import { poemImageExists } from "@/lib/knownImages";

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

  // Stop speech synthesis when leaving the page
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      className="slide relative flex h-dvh items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--xuan-dark) 0%, var(--xuan) 100%)",
      }}
    >
      {/* 背景装饰：用封面图做半透明底图 */}
      {poem.coverImage && poemImageExists(poem.coverImage) && (
        <Image
          src={poem.coverImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-10"
        />
      )}

      {/* 装饰元素 */}
      <div className="pointer-events-none absolute left-4 top-4 select-none font-calligraphy text-[60px] leading-none text-ink/5 md:left-10 md:top-10 md:text-[120px]">
        詩
      </div>

      <div
        className={`relative z-10 mx-auto flex max-w-2xl flex-1 flex-col justify-center px-4 py-3 text-center transition-all duration-1000 md:px-6 md:pb-12 ${
          active ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* 诗名 */}
        <h2 className="mb-1 font-calligraphy text-4xl text-ink md:mb-2 md:text-5xl">
          {poem.title}
        </h2>
        <p className="mb-3 font-serif text-sm text-muted md:mb-8 md:text-base">
          {poem.author} · {poem.dynasty}
        </p>

        {/* 完整诗文 - 竖排卷轴样式：从右到左展开，模拟卷轴 */}
        <div className="mb-4 flex flex-1 items-center justify-center md:mb-10">
          <div
            className="rounded-lg border-2 border-xuan-dark/30 bg-surface/30 p-3 shadow-sm md:border-4 md:p-6"
            style={{
              boxShadow:
                "inset 0 0 12px rgba(180, 150, 100, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            {/* flex-row-reverse：让第一句在最右，符合古文从右到左的阅读顺序 */}
            <div className="flex flex-row-reverse justify-center gap-3 overflow-x-auto md:gap-6">
              {poem.lines.map((line, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 md:gap-3">
                  {/* 诗句竖排：移动端字号显著增大，让诗句成为绝对视觉主角 */}
                  <p
                    className="text-vertical font-calligraphy text-ink"
                    style={{
                      fontSize: "clamp(1.5rem, 6.5vw, 2.25rem)",
                      lineHeight: "1.7",
                    }}
                  >
                    {line.text}
                  </p>
                  {/* 注释竖排（小字） */}
                  <p
                    className="text-vertical font-serif text-muted"
                    style={{
                      fontSize: "clamp(0.625rem, 2vw, 1rem)",
                      lineHeight: "1.5",
                    }}
                  >
                    {line.annotation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部红色印章「诗境漫游」 */}
        <div className="mb-2 flex justify-center md:mb-8">
          <div
            className="flex h-8 w-8 rotate-[-3deg] items-center justify-center rounded-sm border-2 border-seal-red/40 bg-seal-bg shadow-sm md:h-16 md:w-16"
            aria-label="诗境漫游印章"
          >
            <span className="text-center font-calligraphy text-[9px] leading-tight text-seal-red md:text-sm">
              诗境
              <br />
              漫游
            </span>
          </div>
        </div>

        {/* 诗词赏析一句话 */}
        <p className="mb-3 font-handwrite text-sm italic text-light-ink md:mb-6 md:text-lg">
          — 愿你读完这首诗，心中自有山河 —
        </p>

        {/* Creation background */}
        {poem.background && (
          <div className="mb-3 mx-auto hidden max-w-lg rounded-xl bg-surface/40 p-3 text-left md:mb-8 md:block md:p-4">
            <p className="mb-1.5 font-serif text-xs text-cinnabar">创作背景</p>
            <p className="font-serif text-sm leading-relaxed text-light-ink">
              {poem.background}
            </p>
          </div>
        )}

        {/* 按钮组：移动端更紧凑，按钮缩小不抢视觉 */}
        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-2.5 py-1 min-h-[32px] font-serif text-[11px] text-cinnabar transition-colors hover:bg-cinnabar/10 md:px-4 md:py-1.5 md:min-h-[36px] md:text-sm"
          >
            <IconRefresh className="h-3 w-3 md:h-4 md:w-4" /> 再读一遍
          </button>
          <CopyButton
            text={fullPoemText}
            label="复制全诗"
            successMessage="全诗已复制到剪贴板"
            className="rounded-full bg-surface/60 px-2.5 py-1 min-h-[32px] text-[11px] text-light-ink hover:bg-surface md:px-4 md:py-1.5 md:min-h-[36px] md:text-sm"
          />
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-full bg-surface/60 px-2.5 py-1 min-h-[32px] font-serif text-[11px] text-light-ink transition-colors hover:bg-surface md:px-4 md:py-1.5 md:min-h-[36px] md:text-sm"
          >
            选择其他诗 <IconArrowRight className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-1 rounded-full bg-gold/5 px-2.5 py-1 min-h-[32px] font-serif text-[11px] text-gold transition-colors hover:bg-gold/10 md:px-4 md:py-1.5 md:min-h-[36px] md:text-sm"
          >
            <IconShare className="h-3 w-3 md:h-4 md:w-4" /> 分享
          </button>
          {poetToChar[poem.author] ? (
            <Link
              href={`/dialogue?character=${poetToChar[poem.author]}&ask=${encodeURIComponent(`我刚读了《${poem.title}》，想聊聊这首诗`)}`}
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-2.5 py-1 min-h-[32px] font-serif text-[11px] text-indigo transition-colors hover:bg-indigo/10 md:px-4 md:py-1.5 md:min-h-[36px] md:text-sm"
            >
              <IconChat className="h-3 w-3 md:h-4 md:w-4" /> 和{poem.author}聊聊
            </Link>
          ) : (
            <Link
              href="/dialogue"
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-2.5 py-1 min-h-[32px] font-serif text-[11px] text-indigo transition-colors hover:bg-indigo/10 md:px-4 md:py-1.5 md:min-h-[36px] md:text-sm"
            >
              <IconChat className="h-3 w-3 md:h-4 md:w-4" /> 和古人聊聊
            </Link>
          )}
        </div>
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
