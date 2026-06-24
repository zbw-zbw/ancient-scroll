"use client";

import { useState } from "react";
import type { Poem } from "@/data/poems";
import PoemSelector from "./PoemSelector";
import ImmersiveReader from "./ImmersiveReader";

export default function PoetryClient() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

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
