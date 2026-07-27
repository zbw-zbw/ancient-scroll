"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HistoricalCharacter } from "@/data/characters";
import { IconArrowRight, IconBookOpen } from "@/components/icons";

interface CharacterCardProps {
  character: HistoricalCharacter;
  onSelect: (character: HistoricalCharacter) => void;
}

// 人物代表作映射表（数据结构中无代表作字段，在此维护）
const representativeWorks: Record<string, string> = {
  kongzi: "《论语》",
  libai: "《将进酒》",
  sushi: "《赤壁赋》",
  quyuan: "《离骚》",
  zhuangzi: "《逍遥游》",
  wangyangming: "《传习录》",
  caocao: "《短歌行》",
  liqingzhao: "《漱玉词》",
  zhugeliang: "《出师表》",
};

export default function CharacterCard({
  character,
  onSelect,
}: CharacterCardProps) {
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    setHasHistory(!!localStorage.getItem(`ancient-scroll-chat-history-${character.id}`));
  }, [character.id]);

  // 代表作标签
  const work = representativeWorks[character.id];

  return (
    <button
      onClick={() => onSelect(character)}
      className="card group relative overflow-hidden p-6 text-left"
    >
      {/* 右下角中国传统纹样装饰（回纹/云纹，用 repeating-linear-gradient 模拟） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 7px, " +
            character.color +
            " 7px, " +
            character.color +
            " 8px), repeating-linear-gradient(90deg, transparent 0, transparent 7px, " +
            character.color +
            " 7px, " +
            character.color +
            " 8px)",
          maskImage:
            "radial-gradient(circle at bottom right, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at bottom right, black 0%, transparent 75%)",
        }}
      />

      {/* Decorative color block */}
      <div
        className="absolute left-0 top-0 h-16 w-2 transition-all duration-300 group-hover:h-full group-hover:w-3"
        style={{ backgroundColor: character.color }}
      />

      <div className="relative pl-4">
        {/* Avatar */}
        <div
          className="mb-4 h-20 w-20 overflow-hidden rounded-full shadow-inner img-placeholder"
          style={{
            backgroundColor: `${character.color}15`,
          }}
        >
          <Image
            src={character.avatarPath}
            alt={character.name}
            width={80}
            height={80}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            placeholder="empty"
          />
        </div>

        {/* Name */}
        <h3 className="font-calligraphy text-2xl text-ink mb-1">
          {character.name}
        </h3>

        {/* Title + Era */}
        <p className="font-serif text-xs text-muted mb-3">
          {character.title} · {character.era}
        </p>

        {/* Description */}
        <p className="font-serif text-sm text-light-ink leading-relaxed line-clamp-2 mb-3">
          {character.description}
        </p>

        {/* 代表作标签 */}
        {work && (
          <div className="mb-4 flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-serif text-xs"
              style={{
                backgroundColor: `${character.color}12`,
                color: character.color,
              }}
            >
              <IconBookOpen className="h-3 w-3" />
              代表作 · {work}
            </span>
          </div>
        )}

        {/* CTA */}
        <span className="inline-flex items-center gap-1 font-serif text-sm text-cinnabar transition-all group-hover:gap-2">
          {hasHistory ? '继续对话' : '开始对话'} <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}
