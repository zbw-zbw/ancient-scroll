import type { Metadata } from "next";
import ReadingClient from "@/components/reading/ReadingClient";

export const metadata: Metadata = {
  title: "智能双语阅读 - 古籍焕新",
  description:
    "逐句对照阅读《山海经》原文，AI 即时翻译，点击难字获得深度解读。",
};

export default function ReadingPage() {
  return <ReadingClient />;
}
