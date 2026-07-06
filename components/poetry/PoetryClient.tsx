"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Poem } from "@/data/poems";
import { poems } from "@/data/poems";
import PoemSelector from "./PoemSelector";
import ImmersiveReader from "./ImmersiveReader";

export default function PoetryClient() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const searchParams = useSearchParams();

  // Consume ?id= from URL (e.g., from DailyRecommendation or SearchModal links)
  useEffect(() => {
    const id = searchParams.get("id");
    if (id && !selectedPoem) {
      const poem = poems.find((p) => p.id === id);
      if (poem) setSelectedPoem(poem);
    }
  }, [searchParams, selectedPoem]);

  return (
    <>
      {!selectedPoem && <PoemSelector onSelect={setSelectedPoem} />}
      {selectedPoem && (
        <ImmersiveReader
          poem={selectedPoem}
          onBack={() => setSelectedPoem(null)}
        />
      )}
    </>
  );
}
