"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 300);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="回到顶部"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-40 flex h-11 w-11 items-center justify-center rounded-full bg-surface/80 backdrop-blur-sm shadow-md border border-ink/10 text-light-ink hover:text-cinnabar hover:border-cinnabar/30 transition-all duration-300 active:scale-95 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
