"use client";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  characterColor?: string;
  disabled?: boolean;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
  characterColor,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 md:px-14">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => !disabled && onSelect(question)}
          disabled={disabled}
          style={characterColor ? {
            borderColor: `${characterColor}33`,
            ['--char-color' as string]: characterColor,
          } : undefined}
          className={`cursor-pointer rounded-full border px-3 py-1.5 font-serif text-xs text-light-ink transition-all md:px-4 md:py-2 disabled:opacity-40 disabled:cursor-not-allowed ${
            characterColor
              ? "border-[var(--char-color)]/20 bg-surface hover:bg-[var(--char-color)]/10 active:scale-95"
              : "bg-surface hover:bg-seal-bg hover:ring-1 hover:ring-cinnabar/30 active:scale-95"
          }`}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
