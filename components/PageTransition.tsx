"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Lock scroll restoration globally to prevent browser from restoring scroll position on back/forward
  useEffect(() => {
    if ('scrollRestoration' in history) {
      const original = history.scrollRestoration;
      history.scrollRestoration = 'manual';
      return () => {
        history.scrollRestoration = original;
      };
    }
  }, []);

  // Immediately reset scroll to top on every route change, before paint
  useEffect(() => {
    // Cancel any ongoing smooth scroll first
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return <>{children}</>;
}
