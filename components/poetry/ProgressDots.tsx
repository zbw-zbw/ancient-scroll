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
    <div
      role="tablist"
      className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full bg-black/20 px-1 py-0.5 backdrop-blur-md md:gap-1 md:px-2.5 md:py-1.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`跳转到第 ${i + 1} 屏`}
          onClick={() => onDotClick(i)}
          className="flex h-2 w-2 items-center justify-center rounded-full transition-all duration-300 md:h-3.5 md:w-3.5"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === current
                ? "h-1 w-2.5 bg-white md:h-1.5 md:w-4"
                : "h-0.5 w-0.5 bg-white/40 hover:bg-white/70 md:h-1.5 md:w-1.5"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
