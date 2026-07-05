"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { chapters } from "@/data/shanhaijing";
import { beasts } from "@/data/beasts";
import { poems } from "@/data/poems";
import { characters } from "@/data/characters";

interface SearchResult {
  module: string;
  title: string;
  description: string;
  href: string;
}

interface ModuleGroup {
  key: string;
  label: string;
  icon: string;
  results: SearchResult[];
}

const moduleMeta: Record<string, { label: string; icon: string }> = {
  shanhaijing: { label: "山海经", icon: "📖" },
  beasts: { label: "异兽", icon: "🐾" },
  poetry: { label: "诗词", icon: "🎋" },
  characters: { label: "人物", icon: "💬" },
};

const MAX_PER_MODULE = 5;
const MAX_TOTAL = 20;

function truncate(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "…";
}

/** Highlight matching text with <mark> tags */
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const q = query.trim();
  const parts: { text: string; match: boolean }[] = [];
  let remaining = text;
  let lastIndex = 0;

  while (true) {
    const idx = remaining.indexOf(q, lastIndex);
    if (idx === -1) {
      parts.push({ text: remaining.slice(lastIndex), match: false });
      break;
    }
    if (idx > lastIndex) {
      parts.push({ text: remaining.slice(lastIndex, idx), match: false });
    }
    parts.push({ text: remaining.slice(idx, idx + q.length), match: true });
    lastIndex = idx + q.length;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.match ? (
          <mark
            key={i}
            className="bg-cinnabar/20 text-cinnabar rounded-sm px-0.5"
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

function searchShanhaijing(query: string): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const chapter of chapters) {
    if (chapter.name.toLowerCase().includes(q)) {
      results.push({
        module: "shanhaijing",
        title: chapter.name,
        description: truncate(chapter.subtitle, 60),
        href: `/reading?chapter=${chapter.id}`,
      });
    }

    for (const sentence of chapter.sentences) {
      if (
        sentence.original.toLowerCase().includes(q) ||
        sentence.translation.toLowerCase().includes(q)
      ) {
        results.push({
          module: "shanhaijing",
          title: chapter.name,
          description: truncate(sentence.original, 60),
          href: `/reading?chapter=${chapter.id}`,
        });
      }
    }

    if (results.length >= MAX_PER_MODULE) break;
  }

  return results.slice(0, MAX_PER_MODULE);
}

function searchBeasts(query: string): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const beast of beasts) {
    if (
      beast.name.toLowerCase().includes(q) ||
      beast.originalText.toLowerCase().includes(q) ||
      beast.translation.toLowerCase().includes(q) ||
      beast.description.toLowerCase().includes(q) ||
      beast.traits.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        module: "beasts",
        title: beast.name,
        description: truncate(beast.description, 60),
        href: `/bestiary?beast=${beast.id}`,
      });
    }

    if (results.length >= MAX_PER_MODULE) break;
  }

  return results.slice(0, MAX_PER_MODULE);
}

function searchPoetry(query: string): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const poem of poems) {
    if (
      poem.title.toLowerCase().includes(q) ||
      poem.author.toLowerCase().includes(q) ||
      poem.dynasty.toLowerCase().includes(q) ||
      poem.description.toLowerCase().includes(q) ||
      poem.lines.some((line) => line.text.toLowerCase().includes(q))
    ) {
      results.push({
        module: "poetry",
        title: `${poem.title} — ${poem.author}`,
        description: truncate(poem.description, 60),
        href: `/poetry`,
      });
    }

    if (results.length >= MAX_PER_MODULE) break;
  }

  return results.slice(0, MAX_PER_MODULE);
}

function searchCharacters(query: string): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const char of characters) {
    if (
      char.name.toLowerCase().includes(q) ||
      char.title.toLowerCase().includes(q) ||
      char.era.toLowerCase().includes(q) ||
      char.description.toLowerCase().includes(q)
    ) {
      results.push({
        module: "characters",
        title: `${char.name}（${char.title}）`,
        description: truncate(char.description, 60),
        href: `/dialogue?character=${char.id}`,
      });
    }

    if (results.length >= MAX_PER_MODULE) break;
  }

  return results.slice(0, MAX_PER_MODULE);
}

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const groupedResults = useMemo((): ModuleGroup[] => {
    if (!query.trim()) return [];

    const allResults: ModuleGroup[] = [
      { key: "shanhaijing", ...moduleMeta.shanhaijing, results: searchShanhaijing(query) },
      { key: "beasts", ...moduleMeta.beasts, results: searchBeasts(query) },
      { key: "poetry", ...moduleMeta.poetry, results: searchPoetry(query) },
      { key: "characters", ...moduleMeta.characters, results: searchCharacters(query) },
    ];

    const nonEmpty = allResults.filter((g) => g.results.length > 0);

    let total = 0;
    for (const group of nonEmpty) {
      const remaining = MAX_TOTAL - total;
      if (remaining <= 0) {
        group.results = [];
      } else if (group.results.length > remaining) {
        group.results = group.results.slice(0, remaining);
      }
      total += group.results.length;
    }

    return nonEmpty;
  }, [query]);

  const totalResults = useMemo(
    () => groupedResults.reduce((sum, g) => sum + g.results.length, 0),
    [groupedResults]
  );

  const flatResults = useMemo(
    () => groupedResults.flatMap((g) => g.results),
    [groupedResults]
  );

  // Animate in/out
  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = undefined;
      }
      setVisible(true);
      setQuery("");
      setActiveIndex(-1);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } else {
      closeTimerRef.current = setTimeout(() => setVisible(false), 200);
      return () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      };
    }
  }, [open]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(-1);
    resultRefs.current = [];
  }, [query]);

  // Escape + lock body scroll (keyboard navigation handled by handleResultKeyDown on input)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Scroll active result into view
  useEffect(() => {
    if (activeIndex >= 0 && resultRefs.current[activeIndex]) {
      resultRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleResultKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIndex <= 0) {
          inputRef.current?.focus();
          setActiveIndex(-1);
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        resultRefs.current[activeIndex]?.click();
      }
    },
    [flatResults.length, activeIndex]
  );

  if (!visible) return null;

  let resultIdx = -1;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[60] flex items-start justify-center bg-ink/50 backdrop-blur-sm pt-[8vh] md:pt-[10vh] transition-all duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="搜索"
    >
      <div
        className={`w-full max-w-lg mx-4 overflow-hidden bg-surface rounded-2xl shadow-2xl border border-ink/10 transition-all duration-200 ${
          open ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-shrink-0 text-light-ink">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索山海经、异兽、诗词、人物…"
            className="flex-1 bg-transparent px-2 py-2 font-serif text-ink placeholder:text-light-ink/50 outline-none text-base"
            aria-label="搜索内容"
            onKeyDown={handleResultKeyDown}
          />
          <button
            onClick={onClose}
            className="flex-shrink-0 text-light-ink hover:text-ink transition-colors p-1 rounded-full hover:bg-ink/5"
            aria-label="关闭搜索"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[60vh] md:max-h-[50vh] overflow-y-auto" aria-live="polite">
          {query.trim() === "" ? (
            <div className="px-4 py-6">
              {/* Module counts */}
              <div className="mb-4 grid grid-cols-4 gap-2">
                <Link
                  href="/reading"
                  onClick={handleLinkClick}
                  className="flex flex-col items-center gap-1 rounded-lg p-3 transition-colors hover:bg-ink/5"
                >
                  <span className="text-lg">📖</span>
                  <span className="text-xs font-serif text-light-ink/70">{chapters.length} 篇章</span>
                </Link>
                <Link
                  href="/bestiary"
                  onClick={handleLinkClick}
                  className="flex flex-col items-center gap-1 rounded-lg p-3 transition-colors hover:bg-ink/5"
                >
                  <span className="text-lg">🐾</span>
                  <span className="text-xs font-serif text-light-ink/70">{beasts.length} 异兽</span>
                </Link>
                <Link
                  href="/poetry"
                  onClick={handleLinkClick}
                  className="flex flex-col items-center gap-1 rounded-lg p-3 transition-colors hover:bg-ink/5"
                >
                  <span className="text-lg">🎋</span>
                  <span className="text-xs font-serif text-light-ink/70">{poems.length} 首诗</span>
                </Link>
                <Link
                  href="/dialogue"
                  onClick={handleLinkClick}
                  className="flex flex-col items-center gap-1 rounded-lg p-3 transition-colors hover:bg-ink/5"
                >
                  <span className="text-lg">💬</span>
                  <span className="text-xs font-serif text-light-ink/70">{characters.length} 人物</span>
                </Link>
              </div>

              {/* Hot searches */}
              <div className="border-t border-ink/5 pt-4">
                <p className="text-xs font-serif text-light-ink/40 mb-2">热门搜索</p>
                <div className="flex flex-wrap gap-1.5">
                  {["九尾狐", "南山经", "静夜思", "李白", "精卫"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="rounded-full bg-ink/5 px-3 py-2.5 min-h-[44px] font-serif text-xs text-light-ink/70 transition-colors hover:bg-cinnabar/10 hover:text-cinnabar"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyboard hints */}
              <div className="mt-4 flex items-center justify-center gap-3 text-xs text-light-ink/40">
                <span><kbd className="bg-ink/5 rounded px-1.5 py-0.5 font-mono">↑↓</kbd> 选择</span>
                <span><kbd className="bg-ink/5 rounded px-1.5 py-0.5 font-mono">↵</kbd> 跳转</span>
                <span><kbd className="bg-ink/5 rounded px-1.5 py-0.5 font-mono">Esc</kbd> 关闭</span>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="px-4 py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 h-10 w-10 text-ink/15">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="font-serif text-sm text-light-ink/60">未找到相关结果</p>
              <p className="mt-1 font-serif text-xs text-muted">试试其他关键词，如「九尾狐」「静夜思」</p>
            </div>
          ) : (
            groupedResults.map((group) => (
              <div key={group.key} className="border-b border-ink/5 last:border-b-0">
                <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                  <span className="text-sm">{group.icon}</span>
                  <span className="text-xs font-serif text-light-ink/70 font-medium">{group.label}</span>
                  <span className="text-xs text-light-ink/40 bg-ink/5 rounded-full px-1.5 py-0.5">{group.results.length}</span>
                </div>
                <ul role="listbox">
                  {group.results.map((result) => {
                    resultIdx++;
                    const isActive = resultIdx === activeIndex;
                    return (
                      <li key={`${group.key}-${resultIdx}`}>
                        <Link
                          ref={(el) => { resultRefs.current[resultIdx] = el; }}
                          href={result.href}
                          onClick={handleLinkClick}
                          onKeyDown={handleResultKeyDown}
                          className={`block px-4 py-2.5 transition-colors ${
                            isActive ? "bg-cinnabar/10" : "hover:bg-ink/5"
                          }`}
                          role="option"
                          aria-selected={isActive}
                        >
                          <div className="font-serif text-sm text-ink">
                            <HighlightText text={result.title} query={query} />
                          </div>
                          <div className="text-xs text-light-ink/60 mt-0.5 line-clamp-1">
                            <HighlightText text={result.description} query={query} />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        {query.trim() !== "" && totalResults > 0 && (
          <div className="px-4 py-2 border-t border-ink/5 text-center text-xs text-light-ink/40 font-serif">
            <kbd className="bg-ink/5 rounded px-1.5 py-0.5 font-mono">↑↓</kbd> 选择
            <span className="mx-2">·</span>
            <kbd className="bg-ink/5 rounded px-1.5 py-0.5 font-mono">↵</kbd> 跳转
            <span className="mx-2">·</span>
            <kbd className="bg-ink/5 rounded px-1.5 py-0.5 font-mono">Esc</kbd> 关闭
          </div>
        )}
      </div>
    </div>
  );
}
