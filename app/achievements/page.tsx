import type { Metadata } from "next";
import AchievementPanel from "@/components/AchievementPanel";

export const metadata: Metadata = {
  title: "成就徽章",
  description: "解锁古籍探索成就",
  openGraph: {
    title: "成就徽章",
    description: "解锁古籍探索成就",
  },
};

export default function AchievementsPage() {
  return (
    <>
      <AchievementPanel />
    </>
  );
}
