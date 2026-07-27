import type { Metadata } from "next";
import { Suspense } from "react";
import PoetryClient from "@/components/poetry/PoetryClient";

export const metadata: Metadata = {
  title: "诗境漫游",
  description:
    "经典古诗沉浸式滚动体验，逐行揭示意境，配以视觉渐变与粒子效果。",
};

export default function PoetryPage() {
  return (
    <Suspense fallback={null}>
      <PoetryClient />
    </Suspense>
  );
}
