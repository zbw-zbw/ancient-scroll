"use client";

import { useState, useEffect } from "react";
import { getQuizHistory, type QuizHistoryRecord } from "@/lib/progress";

const MAX_VISIBLE = 10;

function getAccuracyStyle(ratio: number): { text: string; bg: string } {
  if (ratio >= 0.8) {
    return { text: "text-green-600", bg: "bg-green-600/10" };
  }
  if (ratio >= 0.6) {
    return { text: "text-gold", bg: "bg-gold/10" };
  }
  return { text: "text-cinnabar", bg: "bg-cinnabar/10" };
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

export default function QuizHistory() {
  const [history, setHistory] = useState<QuizHistoryRecord[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setHistory(getQuizHistory());
  }, []);

  if (history.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="font-serif text-sm text-muted">暂无答题记录，去挑战一局吧</p>
      </div>
    );
  }

  const visible = showAll ? history : history.slice(0, MAX_VISIBLE);
  const hasMore = history.length > MAX_VISIBLE;

  return (
    <div className="mt-8">
      <h3 className="mb-4 flex items-center gap-2 font-calligraphy text-lg text-ink">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-cinnabar"
        >
          <path d="M12 8v4l3 3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        答题记录
      </h3>
      <ul className="space-y-2">
        {visible.map((record) => {
          const ratio = record.total > 0 ? record.score / record.total : 0;
          const accuracy = Math.round(ratio * 100);
          const style = getAccuracyStyle(ratio);

          return (
            <li
              key={record.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-ink/8 bg-surface px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-calligraphy text-base text-ink">{record.mode}</p>
                <p className="font-serif text-xs text-muted">{formatDate(record.date)}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                <span className="flex items-baseline gap-1">
                  <span className={`font-calligraphy text-lg ${style.text}`}>{record.score}</span>
                  <span className="font-serif text-xs text-muted">/ {record.total}</span>
                </span>
                <span className={`rounded-full px-2 py-0.5 font-serif text-xs ${style.bg} ${style.text}`}>
                  {accuracy}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 font-serif text-xs text-cinnabar transition-opacity hover:opacity-70"
        >
          {showAll ? "收起记录" : `查看更多（共 ${history.length} 条）`}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-3 w-3 transition-transform ${showAll ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}
