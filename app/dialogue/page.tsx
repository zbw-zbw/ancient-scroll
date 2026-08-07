import type { Metadata } from "next";
import { Suspense } from "react";
import DialogueClient from "@/components/dialogue/DialogueClient";
import PageSkeleton from "@/components/PageSkeleton";

export const metadata: Metadata = {
  title: "古今对话",
  description: "与历史人物AI对话，穿越时空的思想碰撞",
  openGraph: {
    title: "古今对话",
    description: "与历史人物AI对话，穿越时空的思想碰撞",
  },
};

export default function DialoguePage() {
  return (
    <Suspense fallback={<PageSkeleton title="古今对话" compact />}>
      <DialogueClient />
    </Suspense>
  );
}
