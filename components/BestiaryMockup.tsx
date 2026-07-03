"use client";

import Image from "next/image";
import { useState } from "react";

export default function BestiaryMockupClient() {
  const cards = [
    { name: "九尾狐", text: "有兽焉，其状如狐而九尾", image: "/images/beasts/jiuhuweiu.webp", bg: "#f43f5e" },
    { name: "鹿蜀", text: "其状如马而白首，其文如虎而赤尾", image: "/images/beasts/lushu.webp", bg: "#f59e0b" },
    { name: "狌狌", text: "其状如禺而白耳，伏行人走", image: "/images/beasts/xingxing.webp", bg: "#a8a29e" },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative h-80 w-full">
      {cards.map((card, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={index}
            onClick={() => setActiveIndex(isActive ? null : index)}
            className={`absolute w-44 rounded-xl bg-surface p-3 shadow-lg transition-all duration-300 hover:scale-105 hover:z-50 active:scale-105 cursor-pointer ${
              index === 0 ? "left-0 top-0 rotate-[-6deg] z-30" :
              index === 1 ? "left-16 top-16 rotate-[3deg] z-20" :
              "left-32 top-32 rotate-[-2deg] z-10"
            } ${isActive ? "z-50 scale-110" : ""}`}
          >
            <div className="mb-3 h-24 overflow-hidden rounded-lg" style={{ backgroundColor: card.bg }}>
              <Image
                src={card.image}
                alt={card.name}
                width={176}
                height={96}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <h4 className="font-calligraphy text-lg text-ink">{card.name}</h4>
            <p className="font-serif text-xs leading-relaxed text-light-ink mt-1">{card.text}</p>
          </div>
        );
      })}
    </div>
  );
}
