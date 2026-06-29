"use client";

import { characters, HistoricalCharacter } from "../../data/characters";
import PageHeader from "@/components/PageHeader";
import CharacterCard from "./CharacterCard";

interface CharacterSelectProps {
 onSelect: (character: HistoricalCharacter) => void;
}

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
 return (
 <div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-16 pt-8 md:pb-24 md:pt-12">
      <PageHeader
        title="古今对话"
        subtitle="与古人促膝长谈，问你所想"
      />
      <div className="mb-12 text-center md:mb-16">
        <p className="font-serif text-base text-muted md:text-lg">
          选择一位古人，开启穿越时空的对话
        </p>
      </div>

 {/* Character grid */}
 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {characters.slice(0, 3).map((character) => (
 <CharacterCard
 key={character.id}
 character={character}
 onSelect={onSelect}
 />
 ))}
 </div>
 <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:px-[16.666%]">
 {characters.slice(3, 5).map((character) => (
 <CharacterCard
 key={character.id}
 character={character}
 onSelect={onSelect}
 />
 ))}
 </div>
 </div>
 );
}
