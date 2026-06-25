"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PoemLine } from "@/data/poems";
import Particles from "./Particles";

interface PoemLineSlideProps {
  line: PoemLine;
  active: boolean;
  coverImage?: string;
}

export default function PoemLineSlide({ line, active, coverImage }: PoemLineSlideProps) {
  const textLight = line.textColor === "light";

  return (
    <section
      className="slide relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${line.gradientFrom}, ${line.gradientTo})`,
      }}
    >
      {/* Cover image background */}
      {coverImage && (
        <Image
          src={coverImage}
          alt=""
          fill
          className="absolute inset-0 object-cover opacity-15 mix-blend-overlay"
          loading="lazy"
        />
      )}

      <Particles type={line.particleType} />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        {/* Poem line */}
        <h3
          className={`font-calligraphy transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            textLight ? "text-white" : "text-ink"
          } ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            fontSize: "clamp(2.25rem, 8vw, 4.5rem)",
            textShadow: textLight
              ? "0 2px 24px rgba(0,0,0,0.35)"
              : "none",
            transitionDelay: active ? "0.25s" : "0s",
          }}
        >
          {line.text}
        </h3>

        {/* Annotation */}
        <p
          className={`mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:text-lg ${
            textLight ? "text-white/80" : "text-ink/80"
          } ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: active ? "0.55s" : "0s" }}
        >
          {line.annotation}
        </p>

        {/* Mood tag */}
        <div
          className={`mt-8 transition-all duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: active ? "0.8s" : "0s" }}
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
