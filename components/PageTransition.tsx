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

    // Fade in after a brief delay
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisplayed(true);
      });
    });

    return () => cancelAnimationFrame(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        displayed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}
    >
      {children}
    </div>
  );
}
