"use client";

import { useEffect, useState } from "react";

/**
 * Shared theme hook — reads the `.dark` class on <html> and reacts to changes.
 *
 * The inline script in layout.tsx sets the correct theme before hydration,
 * so this hook simply syncs from the DOM on mount and observes future toggles
 * via MutationObserver. This avoids SSR hydration mismatches (SSR is always
 * light; the real theme is applied client-side).
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return { isDark };
}
