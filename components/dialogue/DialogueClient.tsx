"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { characters, type HistoricalCharacter } from "@/data/characters";
import CharacterSelect from "@/components/dialogue/CharacterSelect";
import ChatInterface from "@/components/dialogue/ChatInterface";

export default function DialogueClient() {
  const searchParams = useSearchParams();
  const [selectedCharacter, setSelectedCharacter] =
    useState<HistoricalCharacter | null>(null);
  const [prefilledAsk, setPrefilledAsk] = useState<string>("");

  useEffect(() => {
    const charId = searchParams.get("character");
    const ask = searchParams.get("ask");
    if (charId && !selectedCharacter) {
      const character = characters.find((c) => c.id === charId);
      if (character) {
        setSelectedCharacter(character);
      }
    }
    if (ask) {
      setPrefilledAsk(ask);
    }
  }, [searchParams]);

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
