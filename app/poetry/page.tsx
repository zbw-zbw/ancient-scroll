import type { Metadata } from "next";
import { Suspense } from "react";
import PoetryClient from "@/components/poetry/PoetryClient";

export const metadata: Metadata = {
  title: "诗境漫游",
  description: "经典古诗沉浸式阅读，AI逐句翻译",
  openGraph: {
    title: "诗境漫游",
    description: "经典古诗沉浸式阅读，AI逐句翻译",
  },
};

export default function PoetryPage() {
  return (
    <Suspense fallback={null}>
      <PoetryClient />
    </Suspense>
  );
}
