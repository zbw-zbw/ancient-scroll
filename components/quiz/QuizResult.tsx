"use client";

import { useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/data/quiz";
import { IconArrowRight, IconRefresh } from "@/components/icons";

interface AnswerRecord {
  question: QuizQuestion;
  selectedIndex: number;
  correct: boolean;
}

interface QuizResultProps {
  score: number;
  total: number;
  answers: AnswerRecord[];
  onRetry: () => void;
  onBackHome: () => void;
}

function getRating(score: number, total: number) {
  const ratio = score / total;
  if (score === total) return { title: "国学大师", emoji: "🎓", color: "text-gold" };
  if (ratio >= 0.8) return { title: "博学多才", emoji: "📚", color: "text-cinnabar" };
  if (ratio >= 0.6) return { title: "学有所成", emoji: "✍️", color: "text-indigo" };
  if (ratio >= 0.4) return { title: "初窥门径", emoji: "🌱", color: "text-muted" };
  return { title: "再接再厉", emoji: "💪", color: "text-muted" };
}

const typeLabels: Record<string, string> = {
  "poem-fill": "诗词填空",
  "beast-identify": "异兽辨识",
  "character-quote": "名人名句",
  "beast-image": "看图识兽",
};

export default function QuizResult({
  score,
  total,
  answers,
  onRetry,
  onBackHome,
}: QuizResultProps) {
  const rating = getRating(score, total);
  const wrongAnswers = answers.filter((a) => !a.correct);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleShare = async () => {
    const text = `我在「国学问答」中答对了 ${score}/${total} 题，获得「${rating.title}」称号！来挑战吧！`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "国学问答成绩", text });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert("成绩已复制到剪贴板！");
      } catch {}
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 pt-24 pb-12 md:pt-28 md:pb-16">
      {/* Score Card */}
      <div className="animate-fade-in text-center">
        <div className="mb-4 text-5xl sm:text-6xl">{rating.emoji}</div>
        <h2 className={`font-calligraphy text-3xl sm:text-4xl md:text-5xl ${rating.color}`}>
          {rating.title}
        </h2>
        <div className="mt-6 flex items-baseline justify-center gap-2">
          <span className="font-calligraphy text-5xl text-cinnabar sm:text-6xl">{score}</span>
          <span className="font-serif text-2xl text-muted">/ {total}</span>
        </div>
        <p className="mt-2 font-serif text-sm text-muted">
          答对 {score} 题，答错 {total - score} 题
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-cinnabar px-6 py-3 font-serif text-sm text-surface hover:bg-cinnabar/90 transition-colors active:scale-[0.98]"
        >
          <IconRefresh className="h-4 w-4" />
          再来一局
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-3 font-serif text-sm text-gold hover:bg-gold/20 transition-colors active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          分享成绩
        </button>
      </div>

      {/* Wrong Answers Review */}
      {wrongAnswers.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 font-calligraphy text-2xl text-ink">
            错题回顾
            <span className="ml-2 font-serif text-sm text-muted">（{wrongAnswers.length} 题）</span>
          </h3>
          <div className="space-y-3">
            {wrongAnswers.map((record, index) => {
              const q = record.question;
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className="overflow-hidden rounded-xl border border-ink/8 bg-surface"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="flex w-full items-start gap-3 p-4 text-left hover:bg-xuan-dark/50 transition-colors"
                  >
                    <span className="mt-0.5 flex-shrink-0 rounded-full bg-cinnabar/10 px-2 py-0.5 font-serif text-xs text-cinnabar">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded bg-ink/5 px-1.5 py-0.5 font-serif text-[10px] text-muted">
                          {typeLabels[q.type] || q.type}
                        </span>
                      </div>
                      <p className="font-serif text-sm leading-relaxed text-ink">
                        {q.question}
                      </p>
                      {!isExpanded && (
                        <p className="mt-1 font-serif text-xs text-muted">
                          你的答案：{q.options[record.selectedIndex]}
                        </p>
                      )}
                    </div>
                    <svg
                      className={`mt-1 h-4 w-4 flex-shrink-0 text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <div className="border-t border-ink/5 px-4 py-3">
                      <div className="space-y-2">
                        <p className="font-serif text-xs">
                          <span className="text-red-500">你的答案：</span>
                          <span className="text-ink line-through">{q.options[record.selectedIndex]}</span>
                        </p>
                        <p className="font-serif text-xs">
                          <span className="text-green-600">正确答案：</span>
                          <span className="text-ink font-medium">{q.options[q.correctIndex]}</span>
                        </p>
                        <div className="mt-2 rounded-lg bg-seal-bg/50 p-3">
                          <p className="font-serif text-xs leading-relaxed text-light-ink">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {wrongAnswers.length === 0 && (
        <div className="mt-12 text-center">
          <p className="font-calligraphy text-2xl text-gold">全部答对，完美通关！</p>
          <p className="mt-2 font-serif text-sm text-muted">
            你已掌握这些古籍知识，继续探索更多内容吧
          </p>
          <Link
            href="/reading"
            className="mt-4 inline-flex items-center gap-1 font-serif text-sm text-cinnabar hover:underline"
          >
            去阅读山海经 <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
