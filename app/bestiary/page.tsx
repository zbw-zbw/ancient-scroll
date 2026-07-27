import type { Metadata } from "next";
import { Suspense } from "react";
import BestiaryClient from "@/components/bestiary/BestiaryClient";

export const metadata: Metadata = {
  title: "异兽图鉴",
  description:
    "探索《山海经》中的神话异兽，5大分类（兽/禽/鱼/蛇/神），水墨风格AI插画，收集你的专属图鉴。",
};

export default function BestiaryPage() {
  return (
    <Suspense fallback={null}>
      <BestiaryClient />
    </Suspense>
  );
}
