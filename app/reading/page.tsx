import type { Metadata } from "next";
import { Suspense } from "react";
import ReadingClient from "@/components/reading/ReadingClient";
import PageSkeleton from "@/components/PageSkeleton";

export const metadata: Metadata = {
  title: "山海经阅读",
  description: "山海经全文AI逐句翻译，双语对照",
  openGraph: {
    title: "山海经阅读",
    description: "山海经全文AI逐句翻译，双语对照",
  },
};

export default function ReadingPage() {
  return (
    <Suspense fallback={<PageSkeleton title="双语阅读" variant="reading" compact />}>
      <ReadingClient />
    </Suspense>
  );
}
