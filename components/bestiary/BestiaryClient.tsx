"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { beasts, type Beast, type BeastCategory } from "@/data/beasts";
import BeastFilter from "@/components/bestiary/BeastFilter";
import CollectionProgress from "@/components/bestiary/CollectionProgress";
import PageHeader from "@/components/PageHeader";
import BeastGrid from "@/components/bestiary/BeastGrid";
import BeastDetail from "@/components/bestiary/BeastDetail";
import AchievementModal from "@/components/bestiary/AchievementModal";

const STORAGE_KEY = "ancient-scroll-collected-beasts";
const ACHIEVEMENT_SHOWN_KEY = "ancient-scroll-achievement-shown";

export default function BestiaryClient() {
 const searchParams = useSearchParams();
 const [activeCategory, setActiveCategory] = useState<BeastCategory | "all">("all");
 const [search, setSearch] = useState("");
 const [collectedIds, setCollectedIds] = useState<string[]>([]);
 const [selectedBeast, setSelectedBeast] = useState<Beast | null>(null);
 const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>({});
 const [gridVisible, setGridVisible] = useState(true);
 const [showAchievement, setShowAchievement] = useState(false);
 const prevCountRef = useRef(0);

 useEffect(() => {
 try {
 const raw = localStorage.getItem(STORAGE_KEY);
 if (raw) {
 const parsed = JSON.parse(raw);
 if (Array.isArray(parsed)) {
 setCollectedIds(parsed);
 prevCountRef.current = parsed.length;
 }
 }
 } catch (err) {
 console.error("Failed to load collected beasts:", err);
 }
 }, []);

 useEffect(() => {
 const beastId = searchParams.get("beast");
 if (beastId) {
 const beast = beasts.find((b) => b.id === beastId);
 if (beast) setSelectedBeast(beast);
 }
 }, [searchParams]);

 useEffect(() => {
    const alreadyShown = localStorage.getItem(ACHIEVEMENT_SHOWN_KEY) === "true";
    if (
      !alreadyShown &&
      collectedIds.length === beasts.length &&
      prevCountRef.current < beasts.length &&
      !selectedBeast
    ) {
      setShowAchievement(true);
      localStorage.setItem(ACHIEVEMENT_SHOWN_KEY, "true");
    }
    prevCountRef.current = collectedIds.length;
  }, [collectedIds, selectedBeast]);

 useEffect(() => {
 try {
 localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedIds));
 } catch (err) {
 console.error("Failed to save collected beasts:", err);
 }
 }, [collectedIds]);

 const filteredBeasts = useMemo(() => {
 return beasts.filter((beast) => {
 const matchesCategory =
 activeCategory === "all" || beast.category === activeCategory;
 const matchesSearch =
 search.trim() === "" || beast.name.includes(search.trim());
 return matchesCategory && matchesSearch;
 });
 }, [activeCategory, search]);

 const handleCategoryChange = (category: BeastCategory | "all") => {
 if (category === activeCategory) return;
 setGridVisible(false);
 setTimeout(() => {
 setActiveCategory(category);
 setGridVisible(true);
 }, 200);
 };

 const handleSearch = (value: string) => {
 setSearch(value);
 };

 const handleToggleCollect = (id: string) => {
 setCollectedIds((prev) =>
 prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
 );
 };

 const handleViewDetail = (beast: Beast) => {
 setSelectedBeast(beast);
 };

 const handleCloseDetail = () => {
 setSelectedBeast(null);
 };

 const handleDescription = (description: string) => {
 if (selectedBeast) {
 setCustomDescriptions((prev) => ({
 ...prev,
 [selectedBeast.id]: description,
 }));
 }
 };

 const currentDescription = selectedBeast
 ? customDescriptions[selectedBeast.id] ?? selectedBeast.description
 : "";

 return (
 <main className="min-h-screen bg-xuan px-4 pb-12 md:px-6 md:pb-16">
      <PageHeader
        title="异兽图鉴"
        subtitle="收藏山海奇兽，解锁文化成就"
      />
      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <CollectionProgress />
        </div>

        <div className="mb-8 md:mb-10">
 <BeastFilter
 active={activeCategory}
 onChange={handleCategoryChange}
 search={search}
 onSearch={handleSearch}
 />
 </div>

 <div
 className={`transition-opacity duration-200 ${
 gridVisible ? "opacity-100" : "opacity-0"
 }`}
 >
 <BeastGrid
 beasts={filteredBeasts}
 collectedIds={collectedIds}
 onToggleCollect={handleToggleCollect}
 onViewDetail={handleViewDetail}
 />
 </div>
 </div>

 <BeastDetail
 beast={selectedBeast}
 collected={selectedBeast ? collectedIds.includes(selectedBeast.id) : false}
 collectedCount={collectedIds.length}
 currentDescription={currentDescription}
 onClose={handleCloseDetail}
 onToggleCollect={handleToggleCollect}
 onDescription={handleDescription}
 />

 <AchievementModal
 open={showAchievement}
 onClose={() => setShowAchievement(false)}
 />
 </main>
 );
}
