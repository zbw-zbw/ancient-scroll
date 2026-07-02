"use client";

import { useAchievementWatcher } from "@/hooks/useAchievementWatcher";

/**
 * Invisible component that watches for achievement unlocks.
 * Place inside ToastProvider in the layout.
 */
export default function AchievementWatcher() {
  useAchievementWatcher();
  return null;
}
