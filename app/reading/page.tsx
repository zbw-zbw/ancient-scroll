import type { Metadata } from "next";
import { Suspense } from "react";
import ReadingClient from "@/components/reading/ReadingClient";

export const metadata: Metadata = {
  title: "双语阅读",
  description:
    "逐句品读山海经，原文与白话文对照，点击生僻字获取深度解读。",
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
