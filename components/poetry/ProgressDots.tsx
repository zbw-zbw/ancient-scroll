"use client";

interface ProgressDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

export default function ProgressDots({
  total,
  current,
  onDotClick,
}: ProgressDotsProps) {
  if (total <= 1) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`跳转到第 ${i + 1} 屏`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? "h-2 w-6 bg-cinnabar"
              : "h-2 w-2 bg-ink/30 hover:bg-ink/50"
          }`}
        />
      ))}
    </div>
  );
}
