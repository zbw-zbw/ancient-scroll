"use client";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  characterColor?: string;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
  characterColor,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-10 md:px-14">
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          className="rounded-full border border-rule bg-surface px-3 py-1.5 font-serif text-xs text-light-ink transition-all hover:border-cinnabar/40 hover:bg-seal-bg md:px-4 md:py-2"
          style={{
            borderColor: `${characterColor}30`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = characterColor || "#c84032";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = `${characterColor}30`;
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
