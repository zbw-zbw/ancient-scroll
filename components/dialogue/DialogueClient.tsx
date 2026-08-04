"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { characters, type HistoricalCharacter } from "@/data/characters";
import CharacterSelect from "@/components/dialogue/CharacterSelect";
import ChatInterface from "@/components/dialogue/ChatInterface";

export default function DialogueClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] =
    useState<HistoricalCharacter | null>(null);
  const [prefilledAsk, setPrefilledAsk] = useState<string>("");
  const hasProcessedParams = useRef(false);

  useEffect(() => {
    // Only process the URL params once on initial mount to prevent
    // re-triggering the auto-send on page refresh or re-entry.
    if (hasProcessedParams.current) {
      return;
    }

    const charId = searchParams.get("character");
    const ask = searchParams.get("ask");

    if (charId) {
      const character = characters.find((c) => c.id === charId);
      if (character) {
        setSelectedCharacter(character);
      }
    }
    if (ask) {
      setPrefilledAsk(ask);
    }

    // Mark as processed so subsequent effect runs (e.g. on searchParams change
    // caused by router.replace) won't re-apply the params.
    hasProcessedParams.current = true;

    // Clear the URL parameters so that refreshing the page won't re-trigger
    // the auto-send of the same prompt.
    if (charId || ask) {
      router.replace("/dialogue");
    }
  }, [searchParams, router]);

  return (
    <main className="relative min-h-[100dvh] bg-xuan">
      <div className="relative mx-auto max-w-[1100px]">
        <div
          className={`transition-all duration-500 ease-out ${
            selectedCharacter ? "pointer-events-none -translate-x-8 opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <CharacterSelect onSelect={setSelectedCharacter} />
        </div>

        {selectedCharacter && (
          <ChatInterface
            character={selectedCharacter}
            onBack={() => setSelectedCharacter(null)}
            prefilledAsk={prefilledAsk}
          />
        )}
      </div>
    </main>
  );
}
