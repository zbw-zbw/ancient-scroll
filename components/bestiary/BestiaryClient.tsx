"use client";

import { useEffect, useMemo, useState } from "react";
import { beasts, type Beast, type BeastCategory } from "@/data/beasts";
import BeastFilter from "@/components/bestiary/BeastFilter";
import CollectionProgress from "@/components/bestiary/CollectionProgress";
import BeastGrid from "@/components/bestiary/BeastGrid";
import BeastDetail from "@/components/bestiary/BeastDetail";

const STORAGE_KEY = "ancient-scroll-collected-beasts";

export default function BestiaryClient() {
  const [activeCategory, setActiveCategory] = useState<BeastCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [collectedIds, setCollectedIds] = useState<string[]>([]);
  const [selectedBeast, setSelectedBeast] = useState<Beast | null>(null);
  const [customDescriptions, setCustomDescriptions] = useState<Record<string, string>>({});
  const [gridVisible, setGridVisible] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCollectedIds(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load collected beasts:", err);
    }
  }, []);

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
    <main className="min-h-screen bg-xuan px-4 pb-12 pt-20 md:px-6 md:pb-16 md:pt-24">
      <div className="mx-auto max-w-[1100px]">
        <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-calligraphy text-4xl text-ink md:text-5xl">
              AI 异兽图鉴
            </h1>
            <p className="mt-2 font-serif text-base text-muted md:text-lg">
              《山海经》神兽大全 · 收集你的专属图鉴
            </p>
          </div>
          <CollectionProgress collected={collectedIds.length} total={beasts.length} />
        </header>

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
        currentDescription={currentDescription}
        onClose={handleCloseDetail}
        onToggleCollect={handleToggleCollect}
        onDescription={handleDescription}
      />
    </main>
  );
}
