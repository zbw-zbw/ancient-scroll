"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayed, setDisplayed] = useState(true);
  const isFirstRender = useRef(true);

  // Lock scroll restoration globally
  useEffect(() => {
    if ("scrollRestoration" in history) {
      const original = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        history.scrollRestoration = original;
      };
    }
  }, []);

  // Page transition: fade out → scroll to top → fade in
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Fade out
    setDisplayed(false);

    // Scroll to top during fade-out
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;

    // Fade in after fade-out completes (300ms fade-out → fade-in)
    const timer = setTimeout(() => {
      setDisplayed(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ease-out ${
        displayed ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
