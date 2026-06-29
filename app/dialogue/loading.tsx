import PageHeader from "@/components/PageHeader";
import SkeletonCard from "@/components/SkeletonCard";

export default function DialogueLoading() {
  return (
    <div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-16 pt-8 md:pb-24 md:pt-12">
      <PageHeader title="古今对话" subtitle="与古人促膝长谈，问你所想" />
      <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3 md:pt-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
