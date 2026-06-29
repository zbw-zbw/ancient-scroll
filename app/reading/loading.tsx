import PageHeader from "@/components/PageHeader";

export default function ReadingLoading() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-xuan">
      <PageHeader
        title="双语阅读"
        subtitle="原文与译文对照，逐句品读山海经"
        compact
      />
      <div className="mx-auto w-full max-w-[780px] flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="mb-6 h-8 w-1/3 animate-pulse rounded bg-rule/50" />
        <div className="mb-4 h-4 w-1/4 animate-pulse rounded bg-rule/40" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-lg bg-surface/60"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
