import PageHeader from "@/components/PageHeader";
import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <main className="min-h-screen bg-xuan px-4 pb-12 md:px-6 md:pb-16">
      <PageHeader title="异兽图鉴" subtitle="正在为你准备内容" />
      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
