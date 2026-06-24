"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Poem } from "@/data/poems";
import CoverSlide from "./CoverSlide";
import PoemLineSlide from "./PoemLineSlide";
import EndingSlide from "./EndingSlide";
import ProgressDots from "./ProgressDots";

interface ImmersiveReaderProps {
  poem: Poem;
  onBack: () => void;
}

export default function ImmersiveReader({ poem, onBack }: ImmersiveReaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = poem.lines.length + 2;

  // Intersection Observer to detect active slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll(".slide");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(slides).indexOf(entry.target);
            if (index !== -1) setCurrentSlide(index);
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px" }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [poem.id]);

  // Hide global navbar while in immersive mode
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      header.style.display = "none";
    }
    return () => {
      if (header) {
        header.style.display = "";
      }
    };
  }, []);

  const handleDotClick = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll(".slide");
    const target = slides[index];
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRestart = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleBack = () => {
    const header = document.querySelector("header");
    if (header) {
      header.style.display = "";
    }
    onBack();
  };

  return (
    <div
      ref={containerRef}
      className="immersive-container fixed inset-0 z-40 h-screen w-screen overflow-y-auto bg-ink"
      style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        className="fixed left-4 top-4 z-50 flex cursor-pointer items-center gap-1 rounded-full bg-ink/30 px-4 py-2 font-serif text-sm text-white backdrop-blur-sm transition-colors hover:bg-ink/40"
      >
        <span>←</span>
        返回
      </button>

      {/* Slides */}
      <CoverSlide poem={poem} active={currentSlide === 0} />
      {poem.lines.map((line, index) => (
        <PoemLineSlide
          key={index}
          line={line}
          active={currentSlide === index + 1}
        />
      ))}
      <EndingSlide
        poem={poem}
        active={currentSlide === totalSlides - 1}
        onRestart={handleRestart}
        onBack={handleBack}
      />

      <ProgressDots
        total={totalSlides}
        current={currentSlide}
        onDotClick={handleDotClick}
      />
    </div>
  );
}
