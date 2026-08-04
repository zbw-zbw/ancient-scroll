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

export default function PoemLineSlide({ line, active, coverImage, reciting }: PoemLineSlideProps) {
  const textLight = line.textColor === "light";
  // 意境图标：根据粒子类型派生（如果有）
  const MoodIcon = line.particleType ? PARTICLE_ICON[line.particleType] : null;

  return (
    <section
      className="slide relative flex min-h-dvh items-center justify-center overflow-hidden"
      style={{
        // 1. 背景渐变先显示（0s，始终显示）
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

      {/* Strong gradient overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Only render particles for the active slide (perf: avoid 30-60 simultaneous CSS animations) */}
      {active && <Particles type={line.particleType} />}

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center md:max-w-6xl md:px-6">
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
              ? "0 2px 24px rgba(0,0,0,0.5), 0 4px 48px rgba(0,0,0,0.3)"
              : "0 1px 8px rgba(0,0,0,0.3), 0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          {line.text}
        </h3>

        {/* 4. 白话注释淡入：delay 0.8s（复用 .animate-poem-rise 保持一致的上移淡入效果）*/}
        <p
          className={`mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed md:text-lg ${
            active ? "animate-poem-rise" : "opacity-0"
          } ${textLight ? "text-white/90" : "text-ink/80"}`}
          style={{
            animationDelay: active ? "0.8s" : undefined,
            textShadow: "0 1px 6px rgba(0,0,0,0.4)",
          }}
        >
          {line.annotation}
        </p>

        {/* 5. 意境标签从右侧滑入：.animate-tag-slide，delay 1.0s */}
        <div
          className={`mt-8 ${active ? "animate-tag-slide" : "opacity-0"}`}
          style={{ animationDelay: active ? "1.0s" : undefined }}
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
