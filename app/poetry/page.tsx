import type { Metadata } from "next";
import { Suspense } from "react";
import PoetryClient from "@/components/poetry/PoetryClient";

export const metadata: Metadata = {
  title: "诗境漫游",
  description:
    "春晓、静夜思、水调歌头……一首诗，一段沉浸式视觉旅程。感受千年诗词之美。",
};

export default function PoetryPage() {
  return (
    <Suspense fallback={null}>
      <PoetryClient />
    </Suspense>
  );
}
