const PROGRESS_KEY = "ancient-scroll-progress";
const READ_HISTORY_KEY = "ancient-scroll-read-history";
const FAVORITES_KEY = "ancient-scroll-favorites";

export interface Progress {
  readChapters: string[];
  completedPoems: string[];
  dialogueCharacters: string[];
}

export interface ReadHistory {
  lastReadChapter: string | null;
  lastReadTimestamp: number;
}

export interface Favorites {
  favoritePoems: string[];
  favoriteBeasts: string[];
}

function safeParse<T>(parser: () => T, fallback: T): T {
  try {
    return parser();
  } catch {
    return fallback;
  }
}

/** Emit a custom event so the achievement watcher can check without polling */
function notifyProgressChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
}

// --- Progress ---

export function getProgress(): Progress {
  if (typeof window === "undefined") {
    return { readChapters: [], completedPoems: [], dialogueCharacters: [] };
  }
  return safeParse(() => {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { readChapters: [], completedPoems: [], dialogueCharacters: [] };
    const parsed = JSON.parse(raw);
    return {
      readChapters: Array.isArray(parsed.readChapters) ? parsed.readChapters : [],
      completedPoems: Array.isArray(parsed.completedPoems) ? parsed.completedPoems : [],
      dialogueCharacters: Array.isArray(parsed.dialogueCharacters) ? parsed.dialogueCharacters : [],
    };
  }, { readChapters: [], completedPoems: [], dialogueCharacters: [] });
}

function setProgress(progress: Progress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {}
}

function uniquePush(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr : [...arr, value];
}

export function markChapterRead(chapterId: string) {
  const progress = getProgress();
  setProgress({
    ...progress,
    readChapters: uniquePush(progress.readChapters, chapterId),
  });
  notifyProgressChange();
}

export function markPoemComplete(poemId: string) {
  const progress = getProgress();
  setProgress({
    ...progress,
    completedPoems: uniquePush(progress.completedPoems, poemId),
  });
  notifyProgressChange();
}

export function markDialogue(characterId: string) {
  const progress = getProgress();
  setProgress({
    ...progress,
    dialogueCharacters: uniquePush(progress.dialogueCharacters, characterId),
  });
  notifyProgressChange();
}

export function getCompletionRate(): number {
  const progress = getProgress();
  const readChapters = new Set(progress.readChapters).size;
  const completedPoems = new Set(progress.completedPoems).size;
  const dialogueCharacters = new Set(progress.dialogueCharacters).size;

  const totalBeasts = 30;
  const totalChapters = 10;
  const totalPoems = 18;
  const totalDialogues = 9;

  const collectedBeasts =
    typeof window !== "undefined"
      ? safeParse(() => {
          const raw = localStorage.getItem("ancient-scroll-collected-beasts");
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed.length : 0;
        }, 0)
      : 0;

  const completed = collectedBeasts + readChapters + completedPoems + dialogueCharacters;
  const total = totalBeasts + totalChapters + totalPoems + totalDialogues;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

// --- Read History ---

const defaultReadHistory: ReadHistory = {
  lastReadChapter: null,
  lastReadTimestamp: 0,
};

export function getReadHistory(): ReadHistory {
  if (typeof window === "undefined") return defaultReadHistory;
  return safeParse(() => {
    const raw = localStorage.getItem(READ_HISTORY_KEY);
    if (!raw) return defaultReadHistory;
    const parsed = JSON.parse(raw);
    return {
      lastReadChapter: typeof parsed.lastReadChapter === "string" ? parsed.lastReadChapter : null,
      lastReadTimestamp: typeof parsed.lastReadTimestamp === "number" ? parsed.lastReadTimestamp : 0,
    };
  }, defaultReadHistory);
}

function saveReadHistory(history: ReadHistory) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(READ_HISTORY_KEY, JSON.stringify(history));
  } catch {}
}

export function setLastReadChapter(id: string) {
  const history = getReadHistory();
  saveReadHistory({
    lastReadChapter: id,
    lastReadTimestamp: Date.now(),
  });
}

export function getLastReadChapter(): string | null {
  return getReadHistory().lastReadChapter;
}

// --- Favorites ---

const defaultFavorites: Favorites = {
  favoritePoems: [],
  favoriteBeasts: [],
};

export function getFavorites(): Favorites {
  if (typeof window === "undefined") return defaultFavorites;
  return safeParse(() => {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return defaultFavorites;
    const parsed = JSON.parse(raw);
    return {
      favoritePoems: Array.isArray(parsed.favoritePoems) ? parsed.favoritePoems : [],
      favoriteBeasts: Array.isArray(parsed.favoriteBeasts) ? parsed.favoriteBeasts : [],
    };
  }, defaultFavorites);
}

function saveFavorites(favorites: Favorites) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {}
}

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function toggleFavoritePoem(id: string) {
  const favorites = getFavorites();
  saveFavorites({
    ...favorites,
    favoritePoems: toggleInArray(favorites.favoritePoems, id),
  });
  notifyProgressChange();
}

export function toggleFavoriteBeast(id: string) {
  const favorites = getFavorites();
  saveFavorites({
    ...favorites,
    favoriteBeasts: toggleInArray(favorites.favoriteBeasts, id),
  });
  notifyProgressChange();
}

export function isFavoritePoem(id: string): boolean {
  return getFavorites().favoritePoems.includes(id);
}

export function isFavoriteBeast(id: string): boolean {
  return getFavorites().favoriteBeasts.includes(id);
}

// --- Reading Preferences ---

const READING_PREFS_KEY = "ancient-scroll-reading-prefs";

export interface ReadingPrefs {
  fontSize: string;
  showTranslation: boolean;
}

const defaultPrefs: ReadingPrefs = {
  fontSize: "md",
  showTranslation: true,
};

export function getReadingPrefs(): ReadingPrefs {
  if (typeof window === "undefined") return defaultPrefs;
  return safeParse(() => {
    const raw = localStorage.getItem(READING_PREFS_KEY);
    if (!raw) return defaultPrefs;
    const parsed = JSON.parse(raw);
    return {
      fontSize: typeof parsed.fontSize === "string" ? parsed.fontSize : defaultPrefs.fontSize,
      showTranslation: typeof parsed.showTranslation === "boolean" ? parsed.showTranslation : defaultPrefs.showTranslation,
    };
  }, defaultPrefs);
}

export function saveReadingPrefs(prefs: ReadingPrefs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(READING_PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

// Helper to get font size as typed value
export function getReadingFontSize(): string {
  return getReadingPrefs().fontSize;
}
