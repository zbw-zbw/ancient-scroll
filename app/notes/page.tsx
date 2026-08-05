import type { Metadata } from "next";
import NotesClient from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title: "我的笔记",
  description: "阅读笔记与心得",
  openGraph: {
    title: "我的笔记",
    description: "阅读笔记与心得",
  },
};

export default function NotesPage() {
  return <NotesClient />;
}
