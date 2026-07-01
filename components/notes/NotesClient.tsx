"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import CopyButton from "@/components/CopyButton";
import {
  getAllNotes,
  deleteNote,
  exportNotesAsMarkdown,
  downloadMarkdown,
  type ReadingNote,
} from "@/lib/notes";
import { chapters } from "@/data/shanhaijing";
import { useToast } from "@/components/Toast";

const chapterNameMap = new Map<string, string>();
for (const c of chapters) chapterNameMap.set(c.id, c.name);

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const hour = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min} 分钟前`;
  if (hour < 24) return `${hour} 小时前`;
  if (day < 30) return `${day} 天前`;
  return new Date(ts).toLocaleDateString("zh-CN");
}

export default function NotesClient() {
  const [notes, setNotes] = useState<ReadingNote[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const loadNotes = useCallback(() => {
    setNotes(getAllNotes().sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleDelete = useCallback(
    (id: string) => {
      deleteNote(id);
      loadNotes();
      toast("笔记已删除", "success");
    },
    [loadNotes, toast]
  );

  const handleExport = useCallback(() => {
    const md = exportNotesAsMarkdown();
    if (!md) {
      toast("暂无笔记可导出", "info");
      return;
    }
    downloadMarkdown(md);
    toast("笔记已导出为 Markdown", "success");
  }, [toast]);

  const chaptersWithNotes = useMemo(() => {
    const set = new Set(notes.map((n) => n.chapterId));
    return chapters.filter((c) => set.has(c.id));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    let result = notes;
    if (filter !== "all") {
      result = result.filter((n) => n.chapterId === filter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (n) =>
          n.char.includes(q) ||
          n.original.includes(q) ||
          n.annotation.meaning.includes(q) ||
          n.annotation.detail.toLowerCase().includes(q)
      );
    }
    return result;
  }, [notes, filter, searchQuery]);

  const groupedNotes = useMemo(() => {
    const groups = new Map<string, ReadingNote[]>();
    for (const note of filteredNotes) {
      const arr = groups.get(note.chapterId) || [];
      arr.push(note);
      groups.set(note.chapterId, arr);
    }
    return Array.from(groups.entries());
  }, [filteredNotes]);

  return (
    <div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
      <PageHeader title="我的笔记" subtitle="山海经字词笔记，温故而知新" />

      <div className="mx-auto max-w-[1000px] pt-8 md:pt-12">
        {/* Toolbar */}
        {notes.length > 0 && (
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-full px-4 py-1.5 font-serif text-xs transition-colors ${
                  filter === "all"
                    ? "bg-cinnabar/10 text-cinnabar"
                    : "text-muted hover:bg-ink/5 hover:text-light-ink"
                }`}
              >
                全部 ({notes.length})
              </button>
              {chaptersWithNotes.map((c) => {
                const count = notes.filter((n) => n.chapterId === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`rounded-full px-4 py-1.5 font-serif text-xs transition-colors ${
                      filter === c.id
                        ? "bg-cinnabar/10 text-cinnabar"
                        : "text-muted hover:bg-ink/5 hover:text-light-ink"
                    }`}
                  >
                    {c.name} ({count})
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索笔记..."
                  className="w-40 rounded-full border border-ink/10 bg-surface/40 py-1.5 pl-9 pr-3 font-serif text-xs text-light-ink placeholder:text-muted focus:border-cinnabar/30 focus:outline-none focus:ring-1 focus:ring-cinnabar/20"
                />
              </div>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1 rounded-full bg-gold/5 px-4 py-1.5 font-serif text-xs text-gold transition-colors hover:bg-gold/10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                导出 MD
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {notes.length === 0 ? (
          <EmptyState
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-ink/20">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="13" y2="17" />
              </svg>
            }
            title="还没有笔记"
            description="在双语阅读中点击生僻字，系统会自动为你保存字词笔记"
            action={
              <Link
                href="/reading"
                className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-5 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10"
              >
                去阅读山海经
              </Link>
            }
          />
        ) : filteredNotes.length === 0 ? (
          <EmptyState
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-ink/20">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            title="未找到匹配的笔记"
            description="试试更换关键词或筛选条件"
          />
        ) : (
          /* Notes list grouped by chapter */
          <div className="space-y-10">
            {groupedNotes.map(([chapterId, chapterNotes]) => {
              const chapterName = chapterNameMap.get(chapterId) || chapterId;
              return (
                <section key={chapterId}>
                  <div className="mb-4 flex items-center gap-3">
                    <h2 className="font-calligraphy text-2xl text-ink">{chapterName}</h2>
                    <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-serif text-xs text-muted">
                      {chapterNotes.length} 条
                    </span>
                    <Link
                      href={`/reading?chapter=${chapterId}`}
                      className="ml-auto font-serif text-xs text-cinnabar transition-colors hover:underline"
                    >
                      继续阅读 →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {chapterNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        chapterName={chapterName}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCard({
  note,
  chapterName,
  onDelete,
}: {
  note: ReadingNote;
  chapterName: string;
  onDelete: (id: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <article className="card group relative flex flex-col p-5">
      {/* Header: character + pinyin */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-calligraphy text-3xl text-cinnabar">{note.char}</span>
          <span className="font-serif text-sm text-muted">{note.annotation.pinyin}</span>
        </div>
        <div className="flex items-center gap-1">
          <CopyButton
            text={`${note.char} (${note.annotation.pinyin})\n释义：${note.annotation.meaning}\n详解：${note.annotation.detail}\n出处：${note.original}`}
            label=""
            successMessage="已复制"
            className="!px-2 !py-1 text-muted"
          />
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(note.id)}
                className="rounded-full bg-cinnabar/10 px-2 py-1 font-serif text-[10px] text-cinnabar transition-colors hover:bg-cinnabar/20"
              >
                确认
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-full px-2 py-1 font-serif text-[10px] text-muted transition-colors hover:bg-ink/5"
              >
                取消
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted opacity-0 transition-all hover:bg-cinnabar/5 hover:text-cinnabar group-hover:opacity-100"
              aria-label="删除笔记"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Meaning */}
      <p className="font-serif text-sm text-light-ink">{note.annotation.meaning}</p>

      {/* Detail */}
      {note.annotation.detail && (
        <p className="mt-2 line-clamp-3 font-serif text-xs leading-relaxed text-muted">
          {note.annotation.detail}
        </p>
      )}

      {/* Source */}
      <div className="mt-3 border-t border-ink/5 pt-3">
        <p className="line-clamp-2 font-serif text-xs italic text-muted">
          「{note.original}」
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-serif text-[10px] text-muted/70">
            {chapterName} · {formatTime(note.createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
