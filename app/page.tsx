import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DataStats from "@/components/DataStats";
import CheckInPanel from "@/components/CheckInPanel";
import ContinueReading from "@/components/ContinueReading";
import DailyRecommendation from "@/components/DailyRecommendation";
import AchievementSummary from "@/components/AchievementSummary";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <main className="relative w-full bg-xuan">
        <Hero />
        <ContinueReading />
        <DailyRecommendation />
        <Features />
        <DataStats />
        <AchievementSummary />
        <CheckInPanel />
        <Footer />
      </main>
    </>
  );
}
