import type { Metadata } from "next";
import { Suspense } from "react";
import DialogueClient from "@/components/dialogue/DialogueClient";

export const metadata: Metadata = {
  title: "古今对话",
  description:
    "穿越时空，与孔子、李白、苏轼、屈原、庄子展开跨越千年的对话。",
};

export default function DialoguePage() {
  return (
    <Suspense fallback={null}>
      <DialogueClient />
    </Suspense>
  );
}
