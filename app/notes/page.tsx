import type { Metadata } from "next";
import NotesClient from "@/components/notes/NotesClient";

export const metadata: Metadata = {
  title: "我的笔记",
  description: "浏览和管理你在阅读山海经时记录的字词笔记",
};

export default function NotesPage() {
  return <NotesClient />;
}
