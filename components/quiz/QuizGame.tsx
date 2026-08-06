"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { QuizQuestion } from "@/data/quiz";
import { beastImageExists } from "@/lib/knownImages";

export interface AnswerRecord {
  question: QuizQuestion;
  selectedIndex: number;
  correct: boolean;
}

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (score: number, answers: AnswerRecord[]) => void;
  onQuit: () => void;
}

const typeLabels: Record<string, string> = {
  "poem-fill": "诗词填空",
  "beast-identify": "异兽辨识",
  "character-quote": "名人名句",
  "beast-image": "看图识兽",
};

const difficultyLabels: Record<string, string> = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
};

const difficultyColors: Record<string, string> = {
  easy: "text-green-700 bg-green-600/10 dark:text-green-400 dark:bg-green-500/15",
  medium: "text-amber-700 bg-amber-600/10 dark:text-amber-400 dark:bg-amber-500/15",
  hard: "text-red-600 bg-red-600/10 dark:text-red-400 dark:bg-red-500/15",
};

/** Fisher-Yates 洗牌 */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 将原始选项打乱，返回新选项数组 + 正确答案的新索引 */
function shuffleOptions(question: QuizQuestion): { options: string[]; correctIndex: number } {
  const correctAnswer = question.options[question.correctIndex];
  const shuffled = shuffleArray(question.options);
  return {
    options: shuffled,
    correctIndex: shuffled.indexOf(correctAnswer),
  };
}

export default function QuizGame({ questions, onComplete, onQuit }: QuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const currentQuestion = questions[currentIndex];
  // 随机打乱选项：每次题目切换时重新洗牌
  const [shuffled, setShuffled] = useState(() => shuffleOptions(currentQuestion));
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 题目切换时重新打乱选项
  useEffect(() => {
    setShuffled(shuffleOptions(currentQuestion));
  }, [currentIndex]);

  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = useCallback(() => {
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    if (isLastQuestion) {
      onComplete(score, answers);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
    }
  }, [isLastQuestion, onComplete, score, answers]);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    const correct = index === shuffled.correctIndex;
    if (correct) {
      setScore((prev) => prev + 1);
    }
    const record: AnswerRecord = {
      question: currentQuestion,
      selectedIndex: index,
      correct,
    };
    setAnswers((prev) => [...prev, record]);
  };

  const handleSkip = () => {
    if (showFeedback) return;
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
    }
    const record: AnswerRecord = {
      question: currentQuestion,
      selectedIndex: -1,
      correct: false,
    };
    setAnswers((prev) => [...prev, record]);
    if (isLastQuestion) {
      onComplete(score, [...answers, record]);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) {
        clearTimeout(autoAdvanceTimer.current);
      }
    };
  }, []);

  // Keyboard shortcuts: 1-4 for options, Enter for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "4" && !showFeedback) {
        e.preventDefault();
        handleSelect(parseInt(e.key) - 1);
      } else if (e.key === "Enter" && showFeedback) {
        e.preventDefault();
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFeedback, currentQuestion]);

  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const imgAvailable =
    currentQuestion.type === "beast-image" &&
    currentQuestion.imagePath &&
    beastImageExists(currentQuestion.imagePath);

  return (
    <div className="mx-auto max-w-2xl px-6 pt-24 pb-8 md:pt-28">
      {/* Header: Progress + Score */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-serif text-sm text-muted">
            第 <span className="text-cinnabar font-medium">{currentIndex + 1}</span> / {questions.length} 题
          </span>
          <span className="font-serif text-sm text-muted">
            得分 <span className="text-cinnabar font-medium">{score}</span>
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cinnabar to-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div
        key={currentQuestion.id}
        className="animate-fade-in rounded-2xl border border-ink/8 bg-surface p-5 shadow-sm md:p-8"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E\")",
        }}
      >
        {/* Tags */}
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-ink/5 px-2.5 py-1 font-serif text-xs text-muted">
            {typeLabels[currentQuestion.type] || currentQuestion.type}
          </span>
          <span className={`rounded-full px-2.5 py-1 font-serif text-xs ${difficultyColors[currentQuestion.difficulty]}`}>
            {difficultyLabels[currentQuestion.difficulty]}
          </span>
        </div>

        {/* Image for beast-image type */}
        {currentQuestion.type === "beast-image" && imgAvailable && (
          <div className="mb-6 flex justify-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-xl bg-xuan-dark sm:h-48 sm:w-48 md:h-56 md:w-56">
              <Image
                src={currentQuestion.imagePath!}
                alt="异兽图片"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
              />
            </div>
          </div>
        )}
        {currentQuestion.type === "beast-image" && !imgAvailable && (
          <div className="mb-6 flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-xuan-dark text-muted sm:h-48 sm:w-48 md:h-56 md:w-56">
              <span className="font-serif text-sm">图片加载中</span>
            </div>
          </div>
        )}

        {/* Question Text */}
        <p className="mb-6 font-serif text-lg leading-relaxed text-ink md:text-xl">
          {currentQuestion.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {shuffled.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrect = index === shuffled.correctIndex;
            let buttonClass =
              "flex w-full items-center gap-3 rounded-xl border border-ink/10 bg-xuan/50 px-3 py-3 text-left transition-all duration-200 hover:border-cinnabar/30 hover:bg-xuan sm:px-4 sm:py-3.5";

            if (showFeedback) {
              if (isCorrect) {
                buttonClass =
                  "flex w-full items-center gap-3 rounded-xl border-2 border-green-600 bg-green-600/10 px-3 py-3 text-left transition-all duration-200 dark:border-green-400 dark:bg-green-500/15 sm:px-4 sm:py-3.5";
              } else if (isSelected) {
                buttonClass =
                  "flex w-full items-center gap-3 rounded-xl border-2 border-red-500 bg-red-600/10 px-3 py-3 text-left transition-all duration-200 dark:border-red-400 dark:bg-red-500/15 sm:px-4 sm:py-3.5";
              } else {
                buttonClass =
                  "flex w-full items-center gap-3 rounded-xl border border-ink/5 bg-xuan/30 px-3 py-3 text-left transition-all duration-200 opacity-50 sm:px-4 sm:py-3.5";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showFeedback}
                className={buttonClass}
              >
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-serif text-sm ${
                    showFeedback && isCorrect
                      ? "bg-green-500 text-white"
                      : showFeedback && isSelected
                      ? "bg-red-400 text-white"
                      : "bg-ink/8 text-ink"
                  }`}
                >
                  {showFeedback && isCorrect ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : showFeedback && isSelected ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className="flex-1 font-serif text-sm text-ink md:text-base">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {showFeedback && (
          <div
            className={`mt-4 animate-fade-in rounded-xl p-4 ${
              selectedIndex === shuffled.correctIndex
                ? "bg-green-600/10 dark:bg-green-500/15"
                : "bg-amber-600/10 dark:bg-amber-500/15"
            }`}
          >
            <p className={`mb-1 font-calligraphy text-lg ${
              selectedIndex === shuffled.correctIndex ? "text-green-700 dark:text-green-400" : "text-amber-700 dark:text-amber-400"
            }`}>
              {selectedIndex === shuffled.correctIndex ? "正确！" : "答错了"}
            </p>
            <p className="font-serif text-sm leading-relaxed text-light-ink">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={onQuit}
          className="inline-flex items-center gap-1 rounded-full px-4 py-2 font-serif text-sm text-muted transition-colors hover:bg-ink/5 hover:text-cinnabar"
        >
          退出答题
        </button>
        {/* 单一按钮：根据 showFeedback 切换样式和行为，避免双按钮 key 切换导致的闪烁 */}
        <button
          onClick={showFeedback ? handleNext : handleSkip}
          className={`inline-flex items-center gap-1 rounded-full px-5 py-2 font-serif text-sm transition-colors active:scale-[0.98] ${
            showFeedback
              ? "bg-cinnabar text-surface hover:bg-cinnabar/90"
              : "border border-ink/15 bg-surface/60 text-muted hover:border-ink/30 hover:text-cinnabar"
          }`}
        >
          {showFeedback ? (isLastQuestion ? "查看结果" : "下一题") : "跳过此题"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="mt-4 text-center font-serif text-xs text-muted/60">
        键盘 1-4 选择答案，Enter 下一题
      </p>
    </div>
  );
}
