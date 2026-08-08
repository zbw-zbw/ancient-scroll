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
      className="slide relative flex items-center justify-center overflow-hidden"
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

      <div className="relative z-10 flex h-full w-full max-w-2xl flex-col items-center justify-center px-5 py-4 text-center md:px-8">
        {/* 诗名 + 作者 */}
        <h2 className="font-calligraphy text-3xl text-ink md:text-4xl lg:text-5xl">
          {poem.title}
        </h2>
        <p className="mt-1 font-serif text-sm text-muted md:mt-2 md:text-base lg:text-lg">
          {poem.author} · {poem.dynasty}
        </p>

        {/* 完整诗文 - 竖排卷轴样式 */}
        <div className="my-4 flex items-center justify-center md:my-5 lg:my-6">
          <div
            className="rounded-xl border-2 border-xuan-dark/20 bg-surface/20 p-3 shadow-sm md:p-4 lg:p-6"
            style={{
              boxShadow:
                "inset 0 0 12px rgba(180, 150, 100, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex flex-row-reverse justify-center gap-2 overflow-x-auto md:gap-4 lg:gap-6">
              {poem.lines.map((line, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 md:gap-2 lg:gap-3">
                  <p
                    className="text-vertical font-calligraphy text-ink"
                    style={{
                      fontSize: "clamp(1.5rem, 7vw, 2.25rem)",
                      lineHeight: "1.6",
                    }}
                  >
                    {line.text}
                  </p>
                  <p
                    className="text-vertical font-serif text-muted"
                    style={{
                      fontSize: "clamp(0.75rem, 2.5vw, 1rem)",
                      lineHeight: "1.4",
                    }}
                  >
                    {line.annotation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 印章 + 赏析一句话 */}
        <div className="mb-4 flex items-center gap-2.5 md:mb-5 md:gap-3 lg:mb-6">
          <div
            className="flex h-9 w-9 flex-shrink-0 rotate-[-3deg] items-center justify-center rounded-sm border-2 border-seal-red/40 bg-seal-bg shadow-sm md:h-11 md:w-11 lg:h-14 lg:w-14"
            aria-label="诗境漫游印章"
          >
            <span className="text-center font-calligraphy text-[9px] leading-tight text-seal-red md:text-[11px] lg:text-sm">
              诗境
              <br />
              漫游
            </span>
          </div>
          <p className="font-handwrite text-sm italic text-light-ink md:text-base lg:text-lg">
            — 愿你读完这首诗，心中自有山河 —
          </p>
        </div>

        {/* 按钮组 */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 rounded-full bg-cinnabar/5 px-4 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10 md:text-base"
          >
            <IconRefresh className="h-4 w-4 md:h-5 md:w-5" /> 再读一遍
          </button>
          <CopyButton
            text={fullPoemText}
            label="复制全诗"
            successMessage="全诗已复制到剪贴板"
            className="rounded-full bg-surface/60 px-4 py-2 font-serif text-sm text-light-ink hover:bg-surface md:text-base"
          />
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface/60 px-4 py-2 font-serif text-sm text-light-ink transition-colors hover:bg-surface md:text-base"
          >
            选其他诗 <IconArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold/5 px-4 py-2 font-serif text-sm text-gold transition-colors hover:bg-gold/10 md:text-base"
          >
            <IconShare className="h-4 w-4 md:h-5 md:w-5" /> 分享
          </button>
          {poetToChar[poem.author] ? (
            <Link
              href={`/dialogue?character=${poetToChar[poem.author]}&ask=${encodeURIComponent(`我刚读了《${poem.title}》，想聊聊这首诗`)}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-indigo/5 px-4 py-2 font-serif text-sm text-indigo transition-colors hover:bg-indigo/10 md:text-base"
            >
              <IconChat className="h-4 w-4 md:h-5 md:w-5" /> 和{poem.author}聊聊
            </Link>
          ) : (
            <Link
              href="/dialogue"
              className="inline-flex items-center gap-1.5 rounded-full bg-indigo/5 px-4 py-2 font-serif text-sm text-indigo transition-colors hover:bg-indigo/10 md:text-base"
            >
              <IconChat className="h-4 w-4 md:h-5 md:w-5" /> 和古人聊聊
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
