import type { Metadata } from "next";
import FavoritesClient from "@/components/favorites/FavoritesClient";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "我的收藏",
  description: "收藏的古籍段落与异兽",
  openGraph: {
    title: "我的收藏",
    description: "收藏的古籍段落与异兽",
  },
};

export default function FavoritesPage() {
  return (
    <>
      <FavoritesClient />
      <Footer />
    </>
  );
}
