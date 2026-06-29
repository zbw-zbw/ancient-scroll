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
  shanhaijing: { label: "山海经", icon: "\u{1F4D6}" },
  beasts: { label: "异兽", icon: "\u{1F43E}" },
  poetry: { label: "诗词", icon: "\u{1F38B}" },
  characters: { label: "人物", icon: "\u{1F4AC}" },
};

const MAX_PER_MODULE = 5;
const MAX_TOTAL = 20;

function truncate(str: string, maxLen: number) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}

function searchShanhaijing(query: string): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const chapter of chapters) {
    // Match chapter name
    if (chapter.name.toLowerCase().includes(q)) {
      results.push({
        module: "shanhaijing",
        title: chapter.name,
        description: truncate(chapter.subtitle, 60),
        href: `/reading?chapter=${chapter.id}`,
      });
    }

    // Match sentences
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

      if (results.length >= MAX_PER_MODULE) break;
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
        title: `${poem.title} - ${poem.author}`,
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
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setQuery("");
      // Use a small timeout to ensure DOM is ready
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [open]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const groupedResults = useMemo((): ModuleGroup[] => {
    if (!query.trim()) return [];

    const allResults: ModuleGroup[] = [
      {
        key: "shanhaijing",
        ...moduleMeta.shanhaijing,
        results: searchShanhaijing(query),
      },
      {
        key: "beasts",
        ...moduleMeta.beasts,
        results: searchBeasts(query),
      },
      {
        key: "poetry",
        ...moduleMeta.poetry,
        results: searchPoetry(query),
      },
      {
        key: "characters",
        ...moduleMeta.characters,
        results: searchCharacters(query),
      },
    ];

    // Filter out empty modules
    const nonEmpty = allResults.filter((g) => g.results.length > 0);

    // Apply total limit
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

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/50 backdrop-blur-sm pt-[10vh]"
      role="dialog"
      aria-modal="true"
      aria-label="搜索"
    >
      <div className="bg-surface rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-ink/10">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 flex-shrink-0 text-light-ink"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索山海经、异兽、诗词、人物..."
            className="flex-1 bg-xuan rounded-xl px-4 py-3 font-serif text-ink placeholder:text-light-ink/50 outline-none text-base"
            aria-label="搜索内容"
          />
          <button
            onClick={onClose}
            className="flex-shrink-0 text-light-ink hover:text-ink transition-colors p-1"
            aria-label="关闭搜索"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Results area */}
        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-4 py-8 text-center text-light-ink/60 font-serif text-sm">
              输入关键词开始搜索
            </div>
          ) : totalResults === 0 ? (
            <div className="px-4 py-8 text-center text-light-ink/60 font-serif text-sm">
              未找到结果
            </div>
          ) : (
            groupedResults.map((group) => (
              <div key={group.key} className="border-b border-ink/5 last:border-b-0">
                {/* Module header */}
                <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                  <span className="text-sm">{group.icon}</span>
                  <span className="text-xs font-serif text-light-ink/70 font-medium">
                    {group.label}
                  </span>
                  <span className="text-xs text-light-ink/40 bg-ink/5 rounded-full px-1.5 py-0.5">
                    {group.results.length}
                  </span>
                </div>

                {/* Results */}
                {group.results.map((result, idx) => (
                  <Link
                    key={`${group.key}-${idx}`}
                    href={result.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-2.5 hover:bg-xuan-dark/50 transition-colors"
                  >
                    <div className="font-serif text-sm text-ink">
                      {result.title}
                    </div>
                    <div className="text-xs text-light-ink/60 mt-0.5 line-clamp-1">
                      {result.description}
                    </div>
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        {query.trim() !== "" && totalResults > 0 && (
          <div className="px-4 py-2 border-t border-ink/5 text-center text-xs text-light-ink/40 font-serif">
            <kbd className="bg-ink/5 rounded px-1.5 py-0.5 text-xs font-mono">
              ESC
            </kbd>{" "}
            关闭
          </div>
        )}
      </div>
    </div>
  );
}
