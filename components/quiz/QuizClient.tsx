"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getRandomQuestions,
  totalQuizQuestions,
  type QuizQuestion,
  type QuizType,
} from "@/data/quiz";
import { getQuizStats, saveQuizResult, type QuizStats } from "@/lib/progress";
import QuizGame, { type AnswerRecord } from "./QuizGame";
import QuizResult from "./QuizResult";

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
    // Save to localStorage and update stats
    saveQuizResult(score, questions.length);
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
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-12 md:pt-28 md:pb-16">
      {/* Title */}
      <div className="animate-fade-in text-center">
        <h1 className="font-calligraphy text-4xl text-ink sm:text-5xl md:text-6xl">
          国学问答
        </h1>
        <p className="mt-3 font-serif text-base text-muted">
          测试你的古籍知识
        </p>
        <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-cinnabar/40 to-transparent" />
      </div>

      {/* Stats Banner */}
      {stats && stats.totalAttempts > 0 && (
        <div className="animate-fade-in mt-8 flex items-center justify-center gap-4 sm:gap-8">
          <div className="text-center">
            <p className="font-calligraphy text-2xl text-cinnabar sm:text-3xl">{stats.bestScore}</p>
            <p className="font-serif text-xs text-muted">最高分</p>
          </div>
          <div className="h-8 w-px bg-ink/10 sm:h-10" />
          <div className="text-center">
            <p className="font-calligraphy text-2xl text-indigo sm:text-3xl">{stats.totalAttempts}</p>
            <p className="font-serif text-xs text-muted">答题次数</p>
          </div>
          <div className="h-8 w-px bg-ink/10 sm:h-10" />
          <div className="text-center">
            <p className="font-calligraphy text-2xl text-gold sm:text-3xl">{stats.totalCorrect}</p>
            <p className="font-serif text-xs text-muted">累计答对</p>
          </div>
        </div>
      )}

      {/* Mode Cards */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
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

      {/* Quiz Info */}
      <div className="animate-fade-in mt-10 rounded-xl bg-surface p-5 text-center">
        <p className="font-serif text-sm text-light-ink">
          题库共 <span className="font-calligraphy text-lg text-cinnabar">{totalQuizQuestions}</span> 道题，
          涵盖诗词填空、异兽辨识、名人名句、看图识兽四大题型
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-indigo/8 px-3 py-1 font-serif text-xs text-indigo">诗词填空 35题</span>
          <span className="rounded-full bg-cinnabar/8 px-3 py-1 font-serif text-xs text-cinnabar">异兽辨识 30题</span>
          <span className="rounded-full bg-gold/8 px-3 py-1 font-serif text-xs text-gold">名人名句 30题</span>
          <span className="rounded-full bg-seal-red/8 px-3 py-1 font-serif text-xs text-seal-red">看图识兽 5题</span>
        </div>
      </div>

      {/* How to Play */}
      <div className="animate-fade-in mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink/8 bg-surface/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/10 text-cinnabar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </span>
            <h4 className="font-calligraphy text-lg text-ink">答题规则</h4>
          </div>
          <ul className="space-y-2 font-serif text-xs leading-relaxed text-light-ink">
            <li>每题有四个选项，点击即可作答</li>
            <li>答题后显示正确答案与详细解析</li>
            <li>答对一题得一分，答错不扣分</li>
            <li>可跳过当前题目，计入未答</li>
            <li>支持键盘快捷键：1-4 选答案，Enter 下一题</li>
          </ul>
        </div>
        <div className="rounded-xl border border-ink/8 bg-surface/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </span>
            <h4 className="font-calligraphy text-lg text-ink">称号体系</h4>
          </div>
          <ul className="space-y-2 font-serif text-xs leading-relaxed text-light-ink">
            <li>全部答对 — 国学大师</li>
            <li>正确率 80% 以上 — 博学多才</li>
            <li>正确率 60% 以上 — 学有所成</li>
            <li>正确率 40% 以上 — 初窥门径</li>
            <li>正确率不足 40% — 再接再厉</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
