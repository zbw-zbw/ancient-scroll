const PROGRESS_KEY = "ancient-scroll-progress";

export interface Progress {
  readChapters: string[];
  completedPoems: string[];
  dialogueCharacters: string[];
}

function safeParse<T>(parser: () => T, fallback: T): T {
  try {
    return parser();
  } catch {
    return fallback;
  }
}

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
}

export function markPoemComplete(poemId: string) {
  const progress = getProgress();
  setProgress({
    ...progress,
    completedPoems: uniquePush(progress.completedPoems, poemId),
  });
}

export function markDialogue(characterId: string) {
  const progress = getProgress();
  setProgress({
    ...progress,
    dialogueCharacters: uniquePush(progress.dialogueCharacters, characterId),
  });
}

export function getCompletionRate(): number {
  const progress = getProgress();
  const readChapters = new Set(progress.readChapters).size;
  const completedPoems = new Set(progress.completedPoems).size;
  const dialogueCharacters = new Set(progress.dialogueCharacters).size;

  const totalBeasts = 20;
  const totalChapters = 5;
  const totalPoems = 12;
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
