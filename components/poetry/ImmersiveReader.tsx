"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Poem } from "@/data/poems";
import CoverSlide from "./CoverSlide";
import PoemLineSlide from "./PoemLineSlide";
import EndingSlide from "./EndingSlide";
import ProgressDots from "./ProgressDots";
import { IconArrowLeft } from "@/components/icons";
import { useNavbarVisibility } from "@/components/NavbarVisibilityContext";

interface ImmersiveReaderProps {
 poem: Poem;
 onBack: () => void;
}

export default function ImmersiveReader({ poem, onBack }: ImmersiveReaderProps) {
 const containerRef = useRef<HTMLDivElement>(null);
 const touchStartRef = useRef<{ x: number; y: number } | null>(null);
 const [currentSlide, setCurrentSlide] = useState(0);
 const totalSlides = poem.lines.length + 2;
 const { setNavbarVisible } = useNavbarVisibility();

 // Intersection Observer to detect active slide
 useEffect(() => {
 const container = containerRef.current;
 if (!container) return;

 const slides = container.querySelectorAll(".slide");
 const observer = new IntersectionObserver(
    (entries) => {
      // Pick the slide with the highest intersection ratio to avoid
      // rapid-slide jank where a leaving slide briefly wins.
      let bestEntry: IntersectionObserverEntry | null = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      }
      if (bestEntry) {
        const index = Array.from(slides).indexOf(bestEntry.target);
        if (index !== -1) setCurrentSlide(index);
      }
    },
    { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
  );

 slides.forEach((slide) => observer.observe(slide));
 return () => observer.disconnect();
 }, [poem.id]);

 // Fallback: when scrolled to the very bottom, force last slide active.
 // This fixes the case where the ending slide content stays opacity-0
 // because the observer didn't fire for the final snap position.
 useEffect(() => {
   const container = containerRef.current;
   if (!container) return;

   const handleScroll = () => {
     const nearBottom =
       container.scrollHeight - container.scrollTop - container.clientHeight < 24;
     if (nearBottom) {
       setCurrentSlide((prev) => {
         const last = totalSlides - 1;
         return prev === last ? prev : last;
       });
     }
   };

   container.addEventListener("scroll", handleScroll, { passive: true });
   return () => container.removeEventListener("scroll", handleScroll);
 }, [totalSlides]);

 // Hide global navbar while in immersive mode
 useEffect(() => {
  setNavbarVisible(false);
  return () => setNavbarVisible(true);
 }, [setNavbarVisible]);

 const handleTouchStart = useCallback((e: React.TouchEvent) => {
   const touch = e.touches[0];
   if (touch) {
     touchStartRef.current = { x: touch.clientX, y: touch.clientY };
   }
 }, []);

 const handleTouchEnd = useCallback(
   (e: React.TouchEvent) => {
     if (!touchStartRef.current) return;
     const touch = e.changedTouches[0];
     if (!touch) return;

     const dx = touch.clientX - touchStartRef.current.x;
     const dy = touch.clientY - touchStartRef.current.y;
     touchStartRef.current = null;

     if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
       // Swipe: also scroll to target slide (fixes view-dot desync)
       const next = dx < 0
         ? Math.min(currentSlide + 1, totalSlides - 1)
         : Math.max(currentSlide - 1, 0);
       handleDotClick(next);
     }
   },
   [totalSlides, currentSlide]
 );

 // Keyboard arrow navigation
 useEffect(() => {
   const handleKeyDown = (e: KeyboardEvent) => {
     const tag = (e.target as HTMLElement).tagName;
     if (tag === "INPUT" || tag === "TEXTAREA") return;

     if (e.key === "ArrowDown" || e.key === "ArrowRight") {
       e.preventDefault();
       const next = Math.min(currentSlide + 1, totalSlides - 1);
       if (next !== currentSlide) handleDotClick(next);
     } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
       e.preventDefault();
       const prev = Math.max(currentSlide - 1, 0);
       if (prev !== currentSlide) handleDotClick(prev);
     }
   };
   window.addEventListener("keydown", handleKeyDown);
   return () => window.removeEventListener("keydown", handleKeyDown);
 }, [currentSlide, totalSlides]);

 const handleDotClick = useCallback((index: number) => {
 const container = containerRef.current;
 if (!container) return;
 const slides = container.querySelectorAll(".slide");
 const target = slides[index];
 if (target) {
 target.scrollIntoView({ behavior: "smooth" });
 }
 }, []);

 const handleRestart = () => {
 const container = containerRef.current;
 if (!container) return;
 container.scrollTo({ top: 0, behavior: "auto" });
 };

 const handleBack = () => {
  setNavbarVisible(true);
  onBack();
 };

 return (
    <div
      ref={containerRef}
      className="immersive-container fixed inset-0 z-[60] h-screen w-screen overflow-y-auto bg-immersive-bg"
      style={{ scrollSnapType: "y mandatory" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Back button with safe area support */}
      <button
        onClick={handleBack}
        className="fixed left-[max(1rem,env(safe-area-inset-left))] top-[max(1rem,env(safe-area-inset-top))] z-50 flex cursor-pointer items-center gap-1 rounded-full bg-black/30 px-4 py-2 font-serif text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/50 active:scale-95"
      >
 <IconArrowLeft className="h-4 w-4" />
 返回
 </button>

 {/* Slides */}
 <CoverSlide poem={poem} active={currentSlide === 0} />
 {poem.lines.map((line, index) => (
 <PoemLineSlide
 key={index}
 line={line}
 active={currentSlide === index + 1}
 coverImage={poem.coverImage}
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
