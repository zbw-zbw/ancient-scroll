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
          className={`cursor-pointer rounded-full px-3 py-1.5 font-serif text-xs text-light-ink transition-all md:px-4 md:py-2 ${
            characterColor
              ? "bg-surface"
              : "bg-surface hover:bg-seal-bg hover:ring-1 hover:ring-cinnabar/30"
          }`}
          style={characterColor ? { border: `1px solid ${characterColor}33` } : undefined}
          onMouseEnter={(e) => {
            if (characterColor) {
              e.currentTarget.style.backgroundColor = `${characterColor}0d`;
            }
          }}
          onMouseLeave={(e) => {
            if (characterColor) {
              e.currentTarget.style.backgroundColor = "";
            }
          }}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
