"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook to detect if a horizontally-scrollable container actually has overflow.
 * Returns a ref to attach and a boolean `isScrollable` that is true when scrollWidth > clientWidth.
 * Re-checks on resize.
 */
export function useHorizontalOverflow<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth + 1);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  return { ref, isScrollable };
}
