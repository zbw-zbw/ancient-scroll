import type { Metadata } from "next";
import PoetryClient from "@/components/poetry/PoetryClient";

export const metadata: Metadata = {
  title: "诗境漫游 - 古籍焕新",
  description:
    "沉浸式滚动体验经典古诗，逐行揭示意境，配以视觉渐变与粒子效果。",
};

export default function PoetryPage() {
  return <PoetryClient />;
}
