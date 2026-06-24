import type { Metadata } from "next";
import BestiaryClient from "@/components/bestiary/BestiaryClient";

export const metadata: Metadata = {
  title: "AI 异兽图鉴 - 古籍焕新",
  description:
    "探索《山海经》中的20只神话异兽，AI 生成插画，收集你的专属图鉴。",
};

export default function BestiaryPage() {
  return <BestiaryClient />;
}
