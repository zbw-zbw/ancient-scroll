const NOTES_KEY = "ancient-scroll-reading-notes";

import { chapters } from "@/data/shanhaijing";

const chapterNameMap = new Map<string, string>();
for (const c of chapters) chapterNameMap.set(c.id, c.name);

export interface ReadingNote {
  id: string;
  sentenceId: string;
  chapterId: string;
  original: string;
  char: string;
  annotation: {
    pinyin: string;
    meaning: string;
    detail: string;
  };
  createdAt: number;
}

function safeParse<T>(parser: () => T, fallback: T): T {
  try {
    return parser();
  } catch {
    return fallback;
  }
}

/** Validate and normalize a single parsed note; returns null if malformed. */
function normalizeNote(raw: unknown): ReadingNote | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const annotation = r.annotation;
  if (!annotation || typeof annotation !== "object") return null;
  const a = annotation as Record<string, unknown>;
  if (
    typeof r.id !== "string" ||
    typeof r.sentenceId !== "string" ||
    typeof r.chapterId !== "string" ||
    typeof r.original !== "string" ||
    typeof r.char !== "string" ||
    typeof a.pinyin !== "string" ||
    typeof a.meaning !== "string" ||
    typeof a.detail !== "string" ||
    typeof r.createdAt !== "number"
  ) {
    return null;
  }
  return {
    id: r.id,
    sentenceId: r.sentenceId,
    chapterId: r.chapterId,
    original: r.original,
    char: r.char,
    annotation: {
      pinyin: a.pinyin,
      meaning: a.meaning,
      detail: a.detail,
    },
    createdAt: r.createdAt,
  };
}

export function getAllNotes(): ReadingNote[] {
  if (typeof window === "undefined") return [];
  return safeParse(() => {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeNote)
      .filter((n): n is ReadingNote => n !== null);
  }, []);
}

export function saveNote(note: ReadingNote) {
  if (typeof window === "undefined") return;
  const notes = getAllNotes();
  const idx = notes.findIndex((n) => n.id === note.id);
  if (idx >= 0) {
    notes[idx] = note;
  } else {
    notes.push(note);
  }
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    // Dispatch event so AchievementWatcher and other components can react
    window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
  } catch {}
}

export function deleteNote(id: string) {
  if (typeof window === "undefined") return;
  const notes = getAllNotes().filter((n) => n.id !== id);
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("ancient-scroll:progress-changed"));
    }
  } catch {}
}

export function getNotesForChapter(chapterId: string): ReadingNote[] {
  if (typeof window === "undefined") return [];
  return getAllNotes().filter((n) => n.chapterId === chapterId);
}

export function getNotesForSentence(sentenceId: string): ReadingNote[] {
  if (typeof window === "undefined") return [];
  return getAllNotes().filter((n) => n.sentenceId === sentenceId);
}

export function exportNotesAsMarkdown(): string {
  if (typeof window === "undefined") return "";
  const notes = getAllNotes();
  if (notes.length === 0) return "";

  const grouped = new Map<string, ReadingNote[]>();
  for (const note of notes) {
    const existing = grouped.get(note.chapterId) || [];
    existing.push(note);
    grouped.set(note.chapterId, existing);
  }

  const lines: string[] = [
    `# 古籍焕新 - 阅读笔记`,
    `> 导出时间：${new Date().toLocaleString("zh-CN")}`,
    `> 共 ${notes.length} 条笔记`,
    "",
  ];

  for (const [chapterId, chapterNotes] of grouped) {
    lines.push(`## ${chapterNameMap.get(chapterId) || chapterId}`);
    lines.push("");
    for (const note of chapterNotes) {
      lines.push(`### 「${note.char}」`);
      lines.push(`- **拼音**：${note.annotation.pinyin}`);
      lines.push(`- **释义**：${note.annotation.meaning}`);
      lines.push(`- **详解**：${note.annotation.detail}`);
      lines.push(`- **出处**：${note.original}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}

export function downloadMarkdown(content: string, filename = "古籍焕新-阅读笔记.md") {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
