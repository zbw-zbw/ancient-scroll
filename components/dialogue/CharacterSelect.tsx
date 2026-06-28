"use client";

import { characters, HistoricalCharacter } from "../../data/characters";
import CharacterCard from "./CharacterCard";

interface CharacterSelectProps {
 onSelect: (character: HistoricalCharacter) => void;
}

export default function CharacterSelect({ onSelect }: CharacterSelectProps) {
 return (
 <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-16 md:py-24">
 {/* Header */}
 <div className="mb-12 text-center md:mb-16">
 <h1 className="font-calligraphy text-5xl text-ink md:text-6xl mb-4">
 古今对话
 </h1>
 <p className="font-serif text-base md:text-lg text-muted">
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
