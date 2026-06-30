import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import UserPersonas from "@/components/UserPersonas";
import SolutionOverview from "@/components/SolutionOverview";
import Features from "@/components/Features";
import DataStats from "@/components/DataStats";
import CheckInPanel from "@/components/CheckInPanel";
import ContinueReading from "@/components/ContinueReading";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <main className="relative w-full bg-xuan">
        <Hero />
        <ContinueReading />
        <PainPoints />
        <UserPersonas />
        <SolutionOverview />
        <Features />
        <DataStats />
        <CheckInPanel />
        <Footer />
      </main>
    </>
  );
}
