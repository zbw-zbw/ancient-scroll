"use client";

import { useState } from "react";
import { HistoricalCharacter } from "@/data/characters";
import CharacterSelect from "@/components/dialogue/CharacterSelect";
import ChatInterface from "@/components/dialogue/ChatInterface";

export default function DialoguePage() {
  const [selectedCharacter, setSelectedCharacter] =
    useState<HistoricalCharacter | null>(null);

  return (
    <main className="relative h-screen overflow-hidden bg-xuan">
      <div
        className={`h-full overflow-y-auto transition-opacity duration-500 ${
          selectedCharacter ? "opacity-0 pointer-events-none hidden" : "opacity-100"
        }`}
      >
        <CharacterSelect onSelect={setSelectedCharacter} />
      </div>

      {selectedCharacter && (
        <ChatInterface
          character={selectedCharacter}
          onBack={() => setSelectedCharacter(null)}
        />
      )}
    </main>
  );
}
