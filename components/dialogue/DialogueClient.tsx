"use client";

import { useState } from "react";
import type { HistoricalCharacter } from "@/data/characters";
import CharacterSelect from "@/components/dialogue/CharacterSelect";
import ChatInterface from "@/components/dialogue/ChatInterface";

export default function DialogueClient() {
  const [selectedCharacter, setSelectedCharacter] =
    useState<HistoricalCharacter | null>(null);

  return (
    <main className="relative h-screen overflow-hidden bg-xuan">
      <div className="relative mx-auto h-full max-w-[1100px]">
        <div
          className={`absolute inset-x-0 top-16 bottom-0 overflow-y-auto transition-opacity duration-500 md:top-20 ${
            selectedCharacter ? "pointer-events-none opacity-0" : "opacity-100"
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
      </div>
    </main>
  );
}
