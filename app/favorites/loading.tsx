import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
      <div className="mx-auto max-w-[1100px] pt-24">
        <div className="h-8 w-40 animate-pulse rounded bg-ink/10" />
        <div className="mt-3 h-5 w-64 animate-pulse rounded bg-ink/5" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
