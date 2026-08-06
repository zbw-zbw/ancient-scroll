"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import {
  getRandomQuestions,
  totalQuizQuestions,
  type QuizQuestion,
  type QuizType,
} from "@/data/quiz";
import { getQuizStats, saveQuizResult, saveQuizHistory, type QuizStats, type QuizHistoryRecord } from "@/lib/progress";
import QuizGame, { type AnswerRecord } from "./QuizGame";
import QuizResult from "./QuizResult";
import QuizHistory from "./QuizHistory";

type GameState = "entry" | "playing" | "result";

interface ModeConfig {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
  filter?: QuizType;
  count: number;
}

const modes: ModeConfig[] = [
  {
    id: "quick",
    title: "快速挑战",
    subtitle: "Random",
    desc: "随机抽取10道题，涵盖诗词、异兽、名人、看图四大题型",
    count: 10,
    accent: "from-cinnabar/10 to-gold/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "poetry",
    title: "诗词专项",
    subtitle: "Poetry",
    desc: "精选10道诗词填空题，从唐诗到宋词，测测你的诗学功底",
    count: 10,
    filter: "poem-fill",
    accent: "from-indigo/10 to-indigo/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" />
        <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(72 12 12)" />
        <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(144 12 12)" />
        <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(216 12 12)" />
        <path d="M12 12C10 8 10 4 12 2C14 4 14 8 12 12Z" transform="rotate(288 12 12)" />
        <circle cx="12" cy="12" r="1.5" />
      </svg>
    ),
  },
  {
    id: "beast",
    title: "山海经专项",
    subtitle: "Bestiary",
    desc: "聚焦山海经异兽，辨识文本描述与水墨画作，探索上古神兽",
    count: 10,
    filter: "beast-identify",
    accent: "from-seal-red/10 to-cinnabar/5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 2C8 6 6 8 6 12c0 4 2 6 6 6s6-2 6-6c0-4-2-6-6-10z" />
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M8 5l-2-2" />
        <path d="M16 5l2-2" />
      </svg>
    ),
  },
];

export default function QuizClient() {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>("entry");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finalAnswers, setFinalAnswers] = useState<AnswerRecord[]>([]);
  const [stats, setStats] = useState<QuizStats | null>(null);

  useEffect(() => {
    setStats(getQuizStats());
  }, []);

  const startQuiz = (mode: ModeConfig) => {
    // For beast mode, mix beast-identify and beast-image questions
    let selectedQuestions: QuizQuestion[];
    if (mode.filter === "beast-identify") {
      const beastIdQuestions = getRandomQuestions(10, "beast-identify");
      const beastImgQuestions = getRandomQuestions(5, "beast-image");
      const combined = [...beastIdQuestions, ...beastImgQuestions];
      combined.sort(() => Math.random() - 0.5);
      selectedQuestions = combined.slice(0, mode.count);
    } else {
      selectedQuestions = getRandomQuestions(mode.count, mode.filter);
    }
    setQuestions(selectedQuestions);
    setGameState("playing");
  };

  const handleComplete = (score: number, answers: AnswerRecord[]) => {
    setFinalScore(score);
    setFinalAnswers(answers);
    setGameState("result");

    // 保存汇总统计
    saveQuizResult(score, questions.length);

    // 保存本次答题详细记录
    const historyRecord: QuizHistoryRecord = {
      id: `quiz-${Date.now()}`,
      date: new Date().toISOString(),
      mode: questions[0]?.type === "poem-fill" ? "诗词专项"
          : questions[0]?.type === "beast-identify" || questions[0]?.type === "beast-image" ? "山海经专项"
          : "快速挑战",
      score,
      total: questions.length,
      answers: answers.map(a => ({
        questionId: a.question.id,
        questionText: a.question.question,
        questionType: a.question.type,
        selectedIndex: a.selectedIndex,
        correctIndex: a.question.correctIndex,
        correct: a.correct,
        options: a.question.options,
        explanation: a.question.explanation,
      })),
    };
    saveQuizHistory(historyRecord);

    // Refresh displayed stats
    setStats(getQuizStats());
    // Scroll to top for results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setGameState("entry");
    setQuestions([]);
    setFinalScore(0);
    setFinalAnswers([]);
    setStats(getQuizStats());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackHome = () => {
    router.push("/");
  };

  // ===== Playing State =====
  if (gameState === "playing") {
    return (
      <QuizGame
        questions={questions}
        onComplete={handleComplete}
        onQuit={handleRetry}
      />
    );
  }

  // ===== Result State =====
  if (gameState === "result") {
    return (
      <QuizResult
        score={finalScore}
        total={questions.length}
        answers={finalAnswers}
        onRetry={handleRetry}
        onBackHome={handleBackHome}
      />
    );
  }

  // ===== Entry State =====
  return (
    <main className="min-h-dvh bg-xuan">
      <PageHeader
        title="知识问答"
        subtitle="测试你的古籍知识"
        compact
      />
      <div className="mx-auto max-w-[1100px] px-4 pb-12 md:px-6 md:pb-16">
        {/* Stats Cards - compact horizontal row */}
        {stats && stats.totalAttempts > 0 && (
          <div className="animate-fade-in mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-ink/8 bg-surface/60 p-3 text-center md:p-4">
              <p className="font-calligraphy text-2xl text-cinnabar md:text-3xl">{stats.bestScore}</p>
              <p className="mt-0.5 font-serif text-[10px] text-muted md:text-xs">最高分</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-surface/60 p-3 text-center md:p-4">
              <p className="font-calligraphy text-2xl text-indigo md:text-3xl">{stats.totalAttempts}</p>
              <p className="mt-0.5 font-serif text-[10px] text-muted md:text-xs">答题次数</p>
            </div>
            <div className="rounded-xl border border-ink/8 bg-surface/60 p-3 text-center md:p-4">
              <p className="font-calligraphy text-2xl text-gold md:text-3xl">{stats.totalCorrect}</p>
              <p className="mt-0.5 font-serif text-[10px] text-muted md:text-xs">累计答对</p>
            </div>
          </div>
        )}

        {/* Mode Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3">
          {modes.map((mode, index) => (
            <button
              key={mode.id}
              onClick={() => startQuiz(mode)}
              className={`animate-fade-in group relative overflow-hidden rounded-2xl border border-ink/8 bg-gradient-to-br ${mode.accent} p-5 text-left transition-all duration-300 hover:border-cinnabar/20 hover:shadow-lg active:scale-[0.98] sm:p-6`}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
            >
              {/* Decorative watermark */}
              <span className="pointer-events-none absolute -bottom-4 -right-2 font-calligraphy text-6xl leading-none opacity-5 select-none text-ink">
                {mode.subtitle === "Random" ? "挑" : mode.subtitle === "Poetry" ? "诗" : "兽"}
              </span>

              <div className="mb-3 text-cinnabar transition-transform group-hover:scale-110">
                {mode.icon}
              </div>
              <h3 className="font-calligraphy text-2xl text-ink">{mode.title}</h3>
              <p className="mt-1 font-serif text-xs text-muted">{mode.subtitle}</p>
              <p className="mt-3 font-serif text-sm leading-relaxed text-light-ink">
                {mode.desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-1 font-serif text-xs text-cinnabar opacity-0 transition-opacity group-hover:opacity-100">
                开始答题
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Question bank tags - compact inline */}
        <div className="animate-fade-in mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-serif text-xs text-muted">题库 {totalQuizQuestions} 题：</span>
          <span className="rounded-full bg-indigo/8 px-2.5 py-0.5 font-serif text-[11px] text-indigo">诗词 35</span>
          <span className="rounded-full bg-cinnabar/8 px-2.5 py-0.5 font-serif text-[11px] text-cinnabar">异兽 30</span>
          <span className="rounded-full bg-gold/8 px-2.5 py-0.5 font-serif text-[11px] text-gold">名人 30</span>
          <span className="rounded-full bg-seal-red/8 px-2.5 py-0.5 font-serif text-[11px] text-seal-red">看图 5</span>
        </div>

        {/* Quiz History */}
        <QuizHistory />

        {/* Rules footnote - compact */}
        <details className="mt-8 rounded-xl border border-ink/8 bg-surface/30">
          <summary className="cursor-pointer list-none px-4 py-3 font-serif text-xs text-muted transition-colors hover:text-light-ink">
            <span className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              答题规则与称号体系
            </span>
          </summary>
          <div className="border-t border-ink/5 px-4 py-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h5 className="mb-2 font-calligraphy text-sm text-ink">答题规则</h5>
                <ul className="space-y-1 font-serif text-[11px] leading-relaxed text-light-ink">
                  <li>每题四个选项，点击即作答</li>
                  <li>答题后显示正确答案与解析</li>
                  <li>答对得一分，答错不扣分</li>
                  <li>快捷键：1-4 选答案，Enter 下一题</li>
                </ul>
              </div>
              <div>
                <h5 className="mb-2 font-calligraphy text-sm text-ink">称号体系</h5>
                <ul className="space-y-1 font-serif text-[11px] leading-relaxed text-light-ink">
                  <li>全对 — 国学大师</li>
                  <li>80%+ — 博学多才</li>
                  <li>60%+ — 学有所成</li>
                  <li>40%+ — 初窥门径</li>
                  <li>40%- — 再接再厉</li>
                </ul>
              </div>
            </div>
          </div>
        </details>
      </div>
    </main>
  );
}
