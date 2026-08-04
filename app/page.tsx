import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DataStats from "@/components/DataStats";
import CheckInPanel from "@/components/CheckInPanel";
import ContinueReading from "@/components/ContinueReading";
import DailyRecommendation from "@/components/DailyRecommendation";
import AchievementSummary from "@/components/AchievementSummary";
import QuizEntryCard from "@/components/QuizEntryCard";
import Footer from "@/components/Footer";
import QuickNav from "@/components/QuickNav";

export default function Home() {
  return (
    <>
      <main className="relative w-full bg-xuan">
        <Hero />
        <QuickNav />
        {/* 功能介绍 — 新用户首要关注，展示平台核心能力 */}
        <div id="features">
          <Features />
        </div>
        {/* 每日推荐 — 每日一首古诗，快速吸引用户参与 */}
        <div id="daily">
          <DailyRecommendation />
        </div>
        {/* 继续阅读 — 个性化推荐，为回访用户提供快速入口 */}
        <div id="continue">
          <ContinueReading />
        </div>
        {/* 知识问答 — 互动学习入口 */}
        <div id="quiz">
          <QuizEntryCard />
        </div>
        {/* 数据统计 — 平台规模与社会价值 */}
        <div id="stats">
          <DataStats />
        </div>
        {/* 每日签到 — 培养习惯，但非首次用户首要关注 */}
        <div id="checkin">
          <CheckInPanel />
        </div>
        {/* 成就系统 — 长期激励 */}
        <div id="achievements">
          <AchievementSummary />
        </div>
        <Footer />
      </main>
    </>
  );
}
