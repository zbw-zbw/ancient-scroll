"use client";

import { useState } from "react";
import type { Poem } from "@/data/poems";
import PoemSelector from "@/components/poetry/PoemSelector";
import ImmersiveReader from "@/components/poetry/ImmersiveReader";

export default function PoetryPage() {
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  return (
    <>
      <PoemSelector onSelect={setSelectedPoem} />
      {selectedPoem && (
        <ImmersiveReader
          poem={selectedPoem}
          onBack={() => setSelectedPoem(null)}
        />
      )}
    </>
  );
}
