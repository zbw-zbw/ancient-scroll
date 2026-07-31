import type { Metadata } from "next";
import { Suspense } from "react";
import QuizClient from "@/components/quiz/QuizClient";

export const metadata: Metadata = {
  title: "知识问答",
  description:
    "国学问答闯关模式，4种题型40道题，涵盖诗词填空、异兽辨识、名人名句、看图识兽，测试你的古籍知识。",
};

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizClient />
    </Suspense>
  );
}
