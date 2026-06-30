const NOTES_KEY = "ancient-scroll-reading-notes";

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

export function getAllNotes(): ReadingNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNote(note: ReadingNote) {
  const notes = getAllNotes();
  const idx = notes.findIndex((n) => n.id === note.id);
  if (idx >= 0) {
    notes[idx] = note;
  } else {
    notes.push(note);
  }
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function deleteNote(id: string) {
  const notes = getAllNotes().filter((n) => n.id !== id);
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function getNotesForChapter(chapterId: string): ReadingNote[] {
  return getAllNotes().filter((n) => n.chapterId === chapterId);
}

export function getNotesForSentence(sentenceId: string): ReadingNote[] {
  return getAllNotes().filter((n) => n.sentenceId === sentenceId);
}

export function exportNotesAsMarkdown(): string {
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
    lines.push(`## ${chapterId}`);
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
