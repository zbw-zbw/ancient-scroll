/**
 * Data backup/restore utilities for all user data stored in localStorage.
 */

const BACKUP_KEYS = [
  "ancient-scroll-progress",
  "ancient-scroll-read-history",
  "ancient-scroll-favorites",
  "ancient-scroll-collected-beasts",
  "ancient-scroll-checkin",
  "ancient-scroll-notes",
  "ancient-scroll-achievements-notified",
  "ancient-scroll-achievement-shown",
  "theme",
];

// Chat history keys are dynamic (per character)
const CHAT_KEY_PREFIX = "ancient-scroll-chat-history-";

interface BackupData {
  version: string;
  exportedAt: string;
  data: Record<string, string>;
}

export function exportAllData(): BackupData {
  const data: Record<string, string> = {};

  // Collect known keys
  for (const key of BACKUP_KEYS) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      data[key] = value;
    }
  }

  // Collect chat history keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CHAT_KEY_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        data[key] = value;
      }
    }
  }

  return {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadBackup() {
  const backup = exportAllData();
  const json = JSON.stringify(backup, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().split("T")[0];
  link.download = `古籍焕新-数据备份-${date}.json`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function importData(jsonString: string): { success: boolean; message: string } {
  try {
    const backup = JSON.parse(jsonString) as BackupData;

    if (!backup.data || typeof backup.data !== "object") {
      return { success: false, message: "备份文件格式不正确" };
    }

    // Restore all data
    let restoredCount = 0;
    for (const [key, value] of Object.entries(backup.data)) {
      // Only restore keys that match our prefix or are known keys
      if (
        BACKUP_KEYS.includes(key) ||
        key.startsWith(CHAT_KEY_PREFIX)
      ) {
        localStorage.setItem(key, value);
        restoredCount++;
      }
    }

    if (restoredCount === 0) {
      return { success: false, message: "未找到可恢复的数据" };
    }

    return { success: true, message: `成功恢复 ${restoredCount} 项数据` };
  } catch (err) {
    return { success: false, message: "文件解析失败，请检查文件格式" };
  }
}

export function clearAllData(): void {
  // Clear known keys
  for (const key of BACKUP_KEYS) {
    localStorage.removeItem(key);
  }
  // Clear chat history
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CHAT_KEY_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

export function getDataStats(): { totalKeys: number; estimatedSize: number } {
  let totalKeys = 0;
  let estimatedSize = 0;

  for (const key of BACKUP_KEYS) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      totalKeys++;
      estimatedSize += value.length;
    }
  }

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CHAT_KEY_PREFIX)) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        totalKeys++;
        estimatedSize += value.length;
      }
    }
  }

  return { totalKeys, estimatedSize };
}
