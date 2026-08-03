import type { Metadata } from "next";
import { Suspense } from "react";
import ReadingClient from "@/components/reading/ReadingClient";

export const metadata: Metadata = {
  title: "智能双语阅读",
  description:
    "逐句对照阅读《山海经》18篇章原文，AI即时翻译，点击难字获得深度解读。",
};

export default function ReadingPage() {
  return (
    <main className="min-h-dvh bg-xuan">
      <Suspense fallback={null}>
        <ReadingClient />
      </Suspense>
    </main>
  );
}
