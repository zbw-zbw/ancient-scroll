"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Poem } from "@/data/poems";
import { poems } from "@/data/poems";
import PoemSelector from "./PoemSelector";
import ImmersiveReader from "./ImmersiveReader";

export default function PoetryClient() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // Prevents the URL ?id= effect from re-selecting a poem after the user
  // manually clicks "返回" — otherwise the effect fires immediately when
  // selectedPoem becomes null and re-opens the same poem.
  const manualBackRef = useRef(false);

  // Consume ?id= from URL (e.g., from DailyRecommendation or SearchModal links)
  useEffect(() => {
    const id = searchParams.get("id");
    if (id && !selectedPoem && !manualBackRef.current) {
      const poem = poems.find((p) => p.id === id);
      if (poem) setSelectedPoem(poem);
    }
  }, [searchParams, selectedPoem]);

  const handleSelectPoem = useCallback((poem: Poem) => {
    manualBackRef.current = false;
    setSelectedPoem(poem);
  }, []);

  const handleBack = useCallback(() => {
    manualBackRef.current = true;
    setSelectedPoem(null);
    // Clear the URL ?id= param so a refresh or re-mount won't re-open
    if (searchParams.get("id")) {
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  return (
    <>
      {!selectedPoem && <PoemSelector onSelect={handleSelectPoem} />}
      {selectedPoem && (
        <ImmersiveReader
          poem={selectedPoem}
          onBack={handleBack}
        />
      )}
    </>
  );
}
