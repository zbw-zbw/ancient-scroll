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
 className="cursor-pointer rounded-full bg-surface px-3 py-1.5 font-serif text-xs text-light-ink transition-all hover:bg-seal-bg hover:ring-1 hover:ring-cinnabar/30 md:px-4 md:py-2"
 >
 {question}
 </button>
 ))}
 </div>
 );
}
