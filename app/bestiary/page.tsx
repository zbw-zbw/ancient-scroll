import type { Metadata } from "next";
import { Suspense } from "react";
import BestiaryClient from "@/components/bestiary/BestiaryClient";
import PageSkeleton from "@/components/PageSkeleton";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "异兽图鉴",
  description: "山海经异兽AI图鉴，水墨插画配原文注释",
  openGraph: {
    title: "异兽图鉴",
    description: "山海经异兽AI图鉴，水墨插画配原文注释",
  },
};

export default function BestiaryPage() {
  return (
    <>
      <Suspense fallback={<PageSkeleton title="异兽图鉴" compact />}>
        <BestiaryClient />
      </Suspense>
      <Footer />
    </>
  );
}
