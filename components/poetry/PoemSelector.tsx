"use client";

import { useState } from "react";
import { poems, type Poem } from "@/data/poems";
import PageHeader from "@/components/PageHeader";
import PoemCard from "./PoemCard";
import ShareCardModal from "./ShareCardModal";

interface PoemSelectorProps {
  onSelect: (poem: Poem) => void;
}

export default function PoemSelector({ onSelect }: PoemSelectorProps) {
  const [sharePoem, setSharePoem] = useState<Poem | null>(null);

  return (
    <div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
      <PageHeader
        title="诗境漫游"
        subtitle="一字一句，走进古诗的意境"
      />
      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        <header className="mb-10 text-center md:mb-12">
          <p className="mx-auto mt-3 max-w-md font-serif text-base text-muted md:text-lg">
            选一首诗，开启一段沉浸式视觉旅程
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {poems.map((poem) => (
            <PoemCard
              key={poem.id}
              poem={poem}
              onSelect={onSelect}
              onShare={(e) => {
                e.stopPropagation();
                setSharePoem(poem);
              }}
            />
          ))}
        </div>
      </div>

      <ShareCardModal
        open={sharePoem !== null}
        onClose={() => setSharePoem(null)}
        poem={sharePoem}
      />
    </div>
  );
}
