"use client";

import { useState, useEffect } from "react";
import { getQuizHistory, type QuizHistoryRecord } from "@/lib/progress";

const MAX_VISIBLE = 10;

const typeLabels: Record<string, string> = {
  "poem-fill": "诗词填空",
  "beast-identify": "异兽辨识",
  "character-quote": "名人名句",
  "beast-image": "看图识兽",
};

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
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
      <div className="space-y-2">
        {visible.map((record) => {
          const isExpanded = expandedId === record.id;
          const ratio = record.total > 0 ? record.score / record.total : 0;
          const accuracy = Math.round(ratio * 100);
          const style = getAccuracyStyle(ratio);

          return (
            <div
              key={record.id}
              className="overflow-hidden rounded-xl border border-ink/8 bg-surface"
            >
              {/* Summary row - click to expand details */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : record.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:bg-xuan-dark/20"
              >
                <div className="min-w-0 flex-1">
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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-4 w-4 flex-shrink-0 text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              {/* Expanded detail view */}
              {isExpanded && (
                <div className="space-y-2 border-t border-ink/5 px-4 py-3">
                  {record.answers.map((a, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg p-3 ${a.correct ? "bg-green-50" : "bg-red-50/50"}`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-0.5 flex-shrink-0 rounded-full px-1.5 py-0.5 text-[10px] ${
                            a.correct
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-1.5">
                            <span className="rounded bg-ink/5 px-1.5 py-0.5 font-serif text-[10px] text-muted">
                              {typeLabels[a.questionType] || a.questionType}
                            </span>
                            <span
                              className={`font-serif text-[10px] ${
                                a.correct ? "text-green-600" : "text-red-500"
                              }`}
                            >
                              {a.correct ? "正确" : "错误"}
                            </span>
                          </div>
                          <p className="font-serif text-xs leading-relaxed text-ink">
                            {a.questionText}
                          </p>
                          {!a.correct && (
                            <div className="mt-1.5 space-y-0.5">
                              <p className="font-serif text-[11px] text-red-500">
                                你的答案：<span className="line-through">{a.options[a.selectedIndex]}</span>
                              </p>
                              <p className="font-serif text-[11px] text-green-600">
                                正确答案：{a.options[a.correctIndex]}
                              </p>
                            </div>
                          )}
                          <p className="mt-1.5 font-serif text-[11px] leading-relaxed text-muted">
                            {a.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
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
