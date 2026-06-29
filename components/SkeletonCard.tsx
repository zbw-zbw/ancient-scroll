interface SkeletonCardProps {
  imageHeight?: string;
  lines?: number;
}

export default function SkeletonCard({
  imageHeight = "h-[260px]",
  lines = 2,
}: SkeletonCardProps) {
  return (
    <div className="card animate-pulse">
      <div className={`${imageHeight} rounded-t-2xl bg-rule/40`} />
      <div className="space-y-3 p-5">
        <div className="h-6 w-1/3 rounded bg-rule/50" />
        <div className="h-4 w-1/4 rounded bg-rule/40" />
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-full rounded bg-rule/30"
            style={{ width: i === lines - 1 ? "75%" : "100%" }}
          />
        ))}
      </div>
    </div>
  );
}
