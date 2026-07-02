"use client";

import { useEffect, useRef, useCallback } from "react";
import { useToast } from "@/components/Toast";
import { getAchievements, type Achievement } from "@/lib/achievements";

const NOTIFIED_KEY = "ancient-scroll-achievements-notified";

/**
 * Watches for newly unlocked achievements and shows toast notifications.
 * Call this hook once at the app root level (inside ToastProvider).
 */
export function useAchievementWatcher() {
  const { toast } = useToast();
  const notifiedRef = useRef<Set<string>>(new Set());

  // Load previously notified achievement IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTIFIED_KEY);
      if (stored) {
        const ids = JSON.parse(stored) as string[];
        notifiedRef.current = new Set(ids);
      }
    } catch {}
  }, []);

  const checkAchievements = useCallback(() => {
    const achievements = getAchievements();
    const newlyUnlocked = achievements.filter(
      (a) => a.unlocked && !notifiedRef.current.has(a.id)
    );

    if (newlyUnlocked.length > 0) {
      // Mark as notified
      newlyUnlocked.forEach((a) => notifiedRef.current.add(a.id));

      // Save to localStorage
      try {
        localStorage.setItem(
          NOTIFIED_KEY,
          JSON.stringify(Array.from(notifiedRef.current))
        );
      } catch {}

      // Show toast for each newly unlocked achievement (show the first one, then others with delay)
      newlyUnlocked.forEach((ach, index) => {
        setTimeout(() => {
          toast(`🎉 成就解锁：${ach.title}`, "success");
        }, index * 1500);
      });
    }
  }, [toast]);

  // Check on mount and periodically (every 5 seconds)
  useEffect(() => {
    // Delay initial check to let localStorage settle
    const initialTimer = setTimeout(checkAchievements, 2000);
    const interval = setInterval(checkAchievements, 5000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [checkAchievements]);

  // Also check when window regains focus
  useEffect(() => {
    const handleFocus = () => checkAchievements();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [checkAchievements]);
}
