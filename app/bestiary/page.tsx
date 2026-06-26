import type { Metadata } from "next";
import { Suspense } from "react";
import BestiaryClient from "@/components/bestiary/BestiaryClient";

export const metadata: Metadata = {
  title: "异兽图鉴 - 古籍焕新",
  description:
    "探索《山海经》中的20只神话异兽，国风水墨插画，收集你的专属图鉴。",
};

export default function BestiaryPage() {
  return (
    <Suspense fallback={null}>
      <BestiaryClient />
    </Suspense>
  );
}
