import type { Metadata } from "next";
import { Suspense } from "react";
import ReadingClient from "@/components/reading/ReadingClient";

export const metadata: Metadata = {
  title: "双语阅读 - 古籍焕新",
  description:
    "逐句对照阅读《山海经》原文，即时翻译白话文，点击难字获得深度解读。",
};

export default function ReadingPage() {
  return (
    <main className="min-h-screen bg-xuan">
      <Suspense fallback={null}>
        <ReadingClient />
      </Suspense>
    </main>
  );
}
