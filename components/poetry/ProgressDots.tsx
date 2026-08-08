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
      aria-orientation="vertical"
      className="fixed right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-1 rounded-full bg-black/20 px-1.5 py-2 backdrop-blur-md md:gap-1.5 md:px-2 md:py-2.5"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`跳转到第 ${i + 1} 屏`}
          onClick={() => onDotClick(i)}
          className="flex h-2 w-2 items-center justify-center rounded-full transition-all duration-300 md:h-3 md:w-3"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === current
                ? "h-2.5 w-1 bg-white md:h-4 md:w-1.5"
                : "h-1 w-1 bg-white/40 hover:bg-white/70 md:h-1.5 md:w-1.5"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
