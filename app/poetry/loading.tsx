import PageHeader from "@/components/PageHeader";
import SkeletonCard from "@/components/SkeletonCard";

export default function PoetryLoading() {
  return (
    <div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
      <PageHeader title="诗境漫游" subtitle="一字一句，走进古诗的意境" />
      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} imageHeight="h-[140px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
