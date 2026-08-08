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

      <div
        className="relative z-10 flex h-full w-full max-w-2xl flex-col items-center justify-center px-4 py-3 text-center md:px-6 md:py-4"
      >
        {/* 诗名 + 作者 */}
        <h2 className="font-calligraphy text-2xl text-ink md:text-4xl lg:text-5xl">
          {poem.title}
        </h2>
        <p className="mb-2 font-serif text-[11px] text-muted md:mb-3 md:text-sm lg:mb-4 lg:text-base">
          {poem.author} · {poem.dynasty}
        </p>

        {/* 完整诗文 - 竖排卷轴样式，弹性占据剩余空间 */}
        <div className="flex min-h-0 w-full flex-1 items-center justify-center">
          <div
            className="rounded-lg border border-xuan-dark/20 bg-surface/20 p-1.5 shadow-sm md:border-2 md:p-3 lg:p-5"
            style={{
              boxShadow:
                "inset 0 0 12px rgba(180, 150, 100, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="flex flex-row-reverse justify-center gap-1.5 overflow-x-auto md:gap-3 lg:gap-5">
              {poem.lines.map((line, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 md:gap-1.5 lg:gap-2">
                  <p
                    className="text-vertical font-calligraphy text-ink"
                    style={{
                      fontSize: "clamp(1rem, 4.5vw, 1.75rem)",
                      lineHeight: "1.5",
                    }}
                  >
                    {line.text}
                  </p>
                  <p
                    className="text-vertical font-serif text-muted"
                    style={{
                      fontSize: "clamp(0.5rem, 1.2vw, 0.75rem)",
                      lineHeight: "1.3",
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
        <div className="mt-2 flex items-center gap-2 md:mt-3 lg:mt-4">
          <div
            className="flex h-6 w-6 flex-shrink-0 rotate-[-3deg] items-center justify-center rounded-sm border-2 border-seal-red/40 bg-seal-bg shadow-sm md:h-9 md:w-9 lg:h-12 lg:w-12"
            aria-label="诗境漫游印章"
          >
            <span className="text-center font-calligraphy text-[7px] leading-tight text-seal-red md:text-[9px] lg:text-xs">
              诗境
              <br />
              漫游
            </span>
          </div>
          <p className="font-handwrite text-[11px] italic text-light-ink md:text-sm lg:text-base">
            — 愿你读完这首诗，心中自有山河 —
          </p>
        </div>

        {/* 按钮组 */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1 md:mt-3 md:gap-2 lg:gap-3">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-2 py-1 font-serif text-[10px] text-cinnabar transition-colors hover:bg-cinnabar/10 md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:text-sm"
          >
            <IconRefresh className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" /> 再读一遍
          </button>
          <CopyButton
            text={fullPoemText}
            label="复制全诗"
            successMessage="全诗已复制到剪贴板"
            className="rounded-full bg-surface/60 px-2 py-1 font-serif text-[10px] text-light-ink hover:bg-surface md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:text-sm"
          />
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 rounded-full bg-surface/60 px-2 py-1 font-serif text-[10px] text-light-ink transition-colors hover:bg-surface md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:text-sm"
          >
            选其他诗 <IconArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" />
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="inline-flex items-center gap-1 rounded-full bg-gold/5 px-2 py-1 font-serif text-[10px] text-gold transition-colors hover:bg-gold/10 md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:text-sm"
          >
            <IconShare className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" /> 分享
          </button>
          {poetToChar[poem.author] ? (
            <Link
              href={`/dialogue?character=${poetToChar[poem.author]}&ask=${encodeURIComponent(`我刚读了《${poem.title}》，想聊聊这首诗`)}`}
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-2 py-1 font-serif text-[10px] text-indigo transition-colors hover:bg-indigo/10 md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:text-sm"
            >
              <IconChat className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" /> 和{poem.author}聊聊
            </Link>
          ) : (
            <Link
              href="/dialogue"
              className="inline-flex items-center gap-1 rounded-full bg-indigo/5 px-2 py-1 font-serif text-[10px] text-indigo transition-colors hover:bg-indigo/10 md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:text-sm"
            >
              <IconChat className="h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4" /> 和古人聊聊
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
