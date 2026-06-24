"use client";

import { useEffect, useState } from "react";
import type { HistoricalCharacter } from "@/data/characters";
import CharacterSelect from "@/components/dialogue/CharacterSelect";
import ChatInterface from "@/components/dialogue/ChatInterface";

export default function DialogueClient() {
  const [selectedCharacter, setSelectedCharacter] =
    useState<HistoricalCharacter | null>(null);

  // Lock body scroll on this page so mobile keyboard doesn't shift the outer container
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  return (
    <main className="relative h-[100dvh] overflow-hidden overscroll-none bg-xuan">
      <div className="relative mx-auto h-full max-w-[1100px]">
        <div
          className={`absolute inset-x-0 top-16 bottom-0 overflow-y-auto transition-opacity duration-500 ${
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
