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
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`跳转到第 ${i + 1} 屏`}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? "h-3 w-3 scale-125 bg-cinnabar"
              : "h-2 w-2 bg-ink/20 hover:bg-ink/40"
          }`}
        />
      ))}
    </div>
  );
}
