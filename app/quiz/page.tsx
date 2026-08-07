import type { Metadata } from "next";
import { Suspense } from "react";
import QuizClient from "@/components/quiz/QuizClient";
import PageSkeleton from "@/components/PageSkeleton";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "知识问答",
  description: "古籍知识趣味问答，测测古文功底",
  openGraph: {
    title: "知识问答",
    description: "古籍知识趣味问答，测测古文功底",
  },
};

export default function QuizPage() {
  return (
    <>
      <Suspense fallback={<PageSkeleton title="知识问答" variant="quiz" compact />}>
        <QuizClient />
      </Suspense>
      <Footer />
    </>
  );
}
