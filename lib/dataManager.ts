/**
 * Centralized data backup/restore/clear utilities.
 * All localStorage operations are wrapped with try-catch for privacy mode safety.
 */

// Single source of truth for all localStorage keys
export const STORAGE_KEYS = {
  progress: "ancient-scroll-progress",
  favorites: "ancient-scroll-favorites",
  collectedBeasts: "ancient-scroll-collected-beasts",
  checkin: "ancient-scroll-checkin",
  readingNotes: "ancient-scroll-reading-notes",
  readingPrefs: "ancient-scroll-reading-prefs",
  speechRate: "ancient-scroll-speech-rate",
  achievementNotified: "ancient-scroll-achievement-notified",
} as const;

// Keys included in backup/restore
const BACKUP_KEYS: string[] = [
  STORAGE_KEYS.progress,
  STORAGE_KEYS.favorites,
  STORAGE_KEYS.collectedBeasts,
  STORAGE_KEYS.checkin,
  STORAGE_KEYS.readingNotes,
  STORAGE_KEYS.readingPrefs,
  STORAGE_KEYS.speechRate,
  STORAGE_KEYS.achievementNotified,
];

export function exportAllData(): string {
  if (typeof window === "undefined") return "{}";
  try {
    const data: Record<string, string> = {};
    for (const key of BACKUP_KEYS) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        data[key] = value;
      }
    }
    return JSON.stringify(data);
  } catch {
    return "{}";
  }
}

export function importData(jsonString: string): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: false, message: "不可用" };
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== "object") return { success: false, message: "文件格式错误" };
    let restored = 0;
    for (const key of BACKUP_KEYS) {
      const value = data[key];
      if (typeof value === "string") {
        try {
          localStorage.setItem(key, value);
          restored++;
        } catch {}
      }
    }
    window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
    return { success: true, message: `成功恢复 ${restored} 项数据` };
  } catch {
    return { success: false, message: "文件解析失败" };
  }
}

export function clearAllData(): boolean {
  if (typeof window === "undefined") return false;
  try {
    for (const key of BACKUP_KEYS) {
      localStorage.removeItem(key);
    }
    window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
    return true;
  } catch {
    return false;
  }
}

export function getDataStats() {
  const defaults = { totalKeys: 0, estimatedSize: 0 };
  if (typeof window === "undefined") return defaults;
  try {
    let totalKeys = 0;
    let estimatedSize = 0;
    for (const key of BACKUP_KEYS) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        totalKeys++;
        estimatedSize += key.length + value.length;
      }
    }
    return { totalKeys, estimatedSize };
  } catch {
    return defaults;
  }
}

/** Trigger a browser download of all data as JSON */
export function downloadBackup(): void {
  if (typeof window === "undefined") return;
  try {
    const data = exportAllData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ancient-scroll-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {}
}
