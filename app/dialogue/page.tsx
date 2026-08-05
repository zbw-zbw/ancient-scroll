import type { Metadata } from "next";
import { Suspense } from "react";
import DialogueClient from "@/components/dialogue/DialogueClient";

export const metadata: Metadata = {
  title: "穿越对话",
  description: "与历史人物AI对话，穿越时空的思想碰撞",
  openGraph: {
    title: "穿越对话",
    description: "与历史人物AI对话，穿越时空的思想碰撞",
  },
};

export default function DialoguePage() {
  return (
    <Suspense fallback={null}>
      <DialogueClient />
    </Suspense>
  );
}
