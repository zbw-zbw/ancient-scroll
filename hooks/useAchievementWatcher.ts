"use client";

import { useEffect, useRef, useCallback } from "react";
import { useToast } from "@/components/Toast";
import { getAchievements } from "@/lib/achievements";

const NOTIFIED_KEY = "ancient-scroll-achievements-notified";

/**
 * Watches for newly unlocked achievements and shows toast notifications.
 * Event-driven: checks on mount, on route change, on window focus,
 * and on custom "ancient-scroll:progress-changed" events.
 * No polling — avoids continuous localStorage reads.
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

      // Show toast for each newly unlocked achievement
      newlyUnlocked.forEach((ach, index) => {
        setTimeout(() => {
          toast(`🎉 成就解锁：${ach.title}`, "success");
        }, index * 1500);
      });
    }
  }, [toast]);

  // Check on mount (delayed to let localStorage settle)
  useEffect(() => {
    const timer = setTimeout(checkAchievements, 1500);
    return () => clearTimeout(timer);
  }, [checkAchievements]);

  // Check when window regains focus
  useEffect(() => {
    const handleFocus = () => checkAchievements();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [checkAchievements]);

  // Listen for custom progress-changed events (emitted by lib functions)
  useEffect(() => {
    const handleProgressChange = () => checkAchievements();
    window.addEventListener("ancient-scroll:progress-changed", handleProgressChange);
    return () => window.removeEventListener("ancient-scroll:progress-changed", handleProgressChange);
  }, [checkAchievements]);
}
