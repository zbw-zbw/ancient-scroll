"use client";

import type { PoemLine } from "@/data/poems";
import Particles from "./Particles";

interface PoemLineSlideProps {
  line: PoemLine;
  active: boolean;
}

export default function PoemLineSlide({ line, active }: PoemLineSlideProps) {
  const textLight = line.textColor === "light";

  return (
    <section
      className="slide relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${line.gradientFrom}, ${line.gradientTo})`,
      }}
    >
      <Particles type={line.particleType} />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        {/* Emoji */}
        <div
          className={`mb-6 transition-all duration-700 ${
            active ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <span
            className="emoji inline-block animate-float text-6xl md:text-7xl lg:text-8xl"
            style={{ filter: textLight ? "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" : "none" }}
          >
            {line.emoji}
          </span>
        </div>

        {/* Poem line */}
        <h3
          className={`font-calligraphy transition-all duration-1000 ${
            textLight ? "text-white" : "text-ink"
          } ${active ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
          style={{
            fontSize: "clamp(2.25rem, 8vw, 4.5rem)",
            textShadow: textLight ? "0 2px 24px rgba(0,0,0,0.35)" : "none",
            transitionDelay: "0.1s",
          }}
        >
          {line.text}
        </h3>

        {/* Annotation */}
        <p
          className={`mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed transition-all duration-1000 md:text-lg ${
            textLight ? "text-white/80" : "text-ink/80"
          } ${active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          style={{ transitionDelay: "0.4s" }}
        >
          {line.annotation}
        </p>

        {/* Mood tag */}
        <div
          className={`mt-8 transition-all duration-1000 ${
            active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "0.6s" }}
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
