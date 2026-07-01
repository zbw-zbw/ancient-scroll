import type { Metadata } from "next";
import FavoritesClient from "@/components/favorites/FavoritesClient";

export const metadata: Metadata = {
  title: "我的收藏",
  description: "你收藏的诗词与异兽",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
