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
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex -translate-x-1/2 items-center gap-2"
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`跳转到第 ${i + 1} 屏`}
          onClick={() => onDotClick(i)}
          className={`flex items-center justify-center rounded-full p-3 transition-all duration-300 ${
            i === current
              ? "bg-cinnabar [&>span]:h-2 [&>span]:w-6"
              : "bg-white/0 hover:bg-white/10 [&>span]:h-2 [&>span]:w-2 [&>span]:bg-white/30 hover:[&>span]:bg-white/50"
          }`}
        >
          <span className="block rounded-full transition-all duration-300" />
        </button>
      ))}
    </div>
  );
}
