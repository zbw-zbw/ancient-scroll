"use client";

import Image from "next/image";
import type { PoemLine, ParticleType } from "@/data/poems";
import { poemImageExists } from "@/lib/knownImages";
import Particles from "./Particles";
import { IconFlower, IconSnow, IconRain, IconLeaf, IconStar, IconSparkles } from "@/components/icons";

interface PoemLineSlideProps {
  line: PoemLine;
  active: boolean;
  coverImage?: string;
  reciting?: boolean;
  onRecite?: () => void;
}

// 从粒子类型派生意境图标组件
const PARTICLE_ICON: Record<ParticleType, React.FC<{ className?: string }>> = {
  petals: IconFlower,
  snow: IconSnow,
  rain: IconRain,
  leaves: IconLeaf,
  stars: IconStar,
  fireflies: IconSparkles,
};

export default function PoemLineSlide({ line, active, coverImage, reciting, onRecite }: PoemLineSlideProps) {
  const textLight = line.textColor === "light";
  // 意境图标：根据粒子类型派生（如果有）
  const MoodIcon = line.particleType ? PARTICLE_ICON[line.particleType] : null;

  return (
    <section
      className="slide relative flex min-h-dvh items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${line.gradientFrom}, ${line.gradientTo})`,
      }}
    >
      {/* Cover image background */}
      {coverImage && poemImageExists(coverImage) && (
        <Image
          src={coverImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-15 mix-blend-overlay"
          loading="lazy"
        />
      )}

      {/* Scene image for this line */}
      {line.sceneImage && (
        <Image src={line.sceneImage} alt="" fill
          className="absolute inset-0 object-cover opacity-20"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      )}

      {/* Gradient overlay — 轻量遮罩，强度随文字颜色动态调整，不挡背景 */}
      <div
        className="absolute inset-0"
        style={{
          background: textLight
            ? "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.35) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Only render particles for the active slide (perf: avoid 30-60 simultaneous CSS animations) */}
      {active && <Particles type={line.particleType} />}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center break-words md:max-w-6xl md:px-6">
        {/* 2. 意境图标（如果有）从中心弹出：.animate-emoji-pop，delay 0.2s */}
        {MoodIcon && (
          <div
            className={`mb-4 ${active ? "animate-emoji-pop" : "opacity-0"}`}
            style={{ animationDelay: active ? "0.2s" : undefined }}
            aria-hidden="true"
          >
            <MoodIcon className={`h-12 w-12 md:h-16 md:w-16 ${textLight ? "text-white/80" : "text-ink/60"}`} />
          </div>
        )}

        {/* 3. 诗句文字从下方淡入上移：.animate-poem-rise，delay 0.4s */}
        <h3
          className={`font-calligraphy ${active ? "animate-poem-rise" : "opacity-0"} ${
            textLight ? "text-white" : "text-ink"
          } ${reciting ? "reciting-glow" : ""}`}
          style={{
            fontSize: "clamp(2.25rem, 8vw, 4.5rem)",
            animationDelay: active ? "0.4s" : undefined,
            textShadow: textLight
              ? "0 1px 3px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4), 0 8px 48px rgba(0,0,0,0.2)"
              : "0 1px 2px rgba(255,255,255,0.4), 0 2px 8px rgba(0,0,0,0.15), 0 4px 20px rgba(0,0,0,0.1)",
            WebkitTextStroke: textLight ? "0.5px rgba(0,0,0,0.4)" : "none",
          }}
        >
          {line.text}
        </h3>

        {/* 4. 白话注释淡入：delay 0.8s */}
        <p
          className={`mx-auto mt-6 max-w-xl break-words font-serif text-base leading-relaxed md:text-lg ${
            active ? "animate-poem-rise" : "opacity-0"
          } ${textLight ? "text-white/90" : "text-ink/80"}`}
          style={{
            animationDelay: active ? "0.8s" : undefined,
            textShadow: textLight
              ? "0 1px 3px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)"
              : "0 1px 2px rgba(255,255,255,0.3), 0 1px 6px rgba(0,0,0,0.15)",
          }}
        >
          {line.annotation}
        </p>

        {/* 朗诵按钮 — 放在诗句下方，与诗句视觉关联 */}
        {onRecite && (
          <div
            className={`mt-6 ${active ? "animate-poem-rise" : "opacity-0"}`}
            style={{ animationDelay: active ? "1.0s" : undefined }}
          >
            <button
              onClick={onRecite}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 font-serif text-xs transition-all hover:gap-2 active:scale-95 md:text-sm ${
                reciting
                  ? "bg-cinnabar text-white shadow-lg"
                  : textLight
                  ? "bg-white/15 text-white hover:bg-white/25"
                  : "bg-ink/10 text-ink hover:bg-ink/20"
              }`}
            >
              {reciting ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 md:h-4 md:w-4"
                >
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 md:h-4 md:w-4"
                >
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
              {reciting ? "朗诵中" : "朗诵这句"}
            </button>
          </div>
        )}

        {/* 5. 意境标签从右侧滑入：.animate-tag-slide，delay 1.2s */}
        <div
          className={`mt-6 ${active ? "animate-tag-slide" : "opacity-0"}`}
          style={{ animationDelay: active ? "1.2s" : undefined }}
        >
          <span
            className={`inline-block rounded-full px-4 py-1.5 font-serif text-xs ${
              textLight
                ? "bg-white/20 text-white"
                : "bg-ink/10 text-ink/80"
            }`}
          >
            {line.mood}
          </span>
        </div>
      </div>
    </section>
  );
}
