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
  achievementNotified: "ancient-scroll-achievements-notified",
  readHistory: "ancient-scroll-read-history",
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
  STORAGE_KEYS.readHistory,
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

/** 单个备份键允许的最大字节数（正常全部数据合计远低于此值） */
const MAX_BACKUP_VALUE_BYTES = 256 * 1024;

/**
 * 校验备份值的结构合法性（安全报告 L-2）：
 * 所有正常存储值都是 JSON.stringify 的产物，因此必须能被 JSON.parse；
 * 拒绝无法解析的内容，防止损坏数据写入 localStorage 导致 UI 异常。
 */
function isValidBackupValue(value: string): boolean {
  if (value.length > MAX_BACKUP_VALUE_BYTES) return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

export function importData(jsonString: string): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: false, message: "不可用" };
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== "object") return { success: false, message: "文件格式错误" };
    let restored = 0;
    let skipped = 0;
    for (const key of BACKUP_KEYS) {
      const value = data[key];
      if (typeof value === "string") {
        if (!isValidBackupValue(value)) {
          skipped++;
          continue;
        }
        try {
          localStorage.setItem(key, value);
          restored++;
        } catch {}
      }
    }
    window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
    const suffix = skipped > 0 ? `，跳过 ${skipped} 项格式异常数据` : "";
    return { success: true, message: `成功恢复 ${restored} 项数据${suffix}` };
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
