"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { getFavorites, toggleFavoritePoem, toggleFavoriteBeast } from "@/lib/progress";
import { getCollectedBeasts, setCollectedBeasts } from "@/lib/collection";
import { poems } from "@/data/poems";
import { beasts } from "@/data/beasts";
import { categoryLabels } from "@/data/beasts";
import { IconHeart, IconArrowRight } from "@/components/icons";
import { useToast } from "@/components/Toast";

type Tab = "poems" | "beasts";

export default function FavoritesClient() {
  const [tab, setTab] = useState<Tab>("poems");
  const [favoritePoemIds, setFavoritePoemIds] = useState<string[]>([]);
  const [favoriteBeastIds, setFavoriteBeastIds] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const loadFavorites = useCallback(() => {
    const fav = getFavorites();
    // Also check collected beasts from the bestiary's own storage and sync
    const collected = getCollectedBeasts();
    // Merge: any collected beast that isn't in favorites should be added
    const mergedBeasts = Array.from(new Set([...fav.favoriteBeasts, ...collected]));
    setFavoritePoemIds(fav.favoritePoems);
    setFavoriteBeastIds(mergedBeasts);
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const favoritePoems = poems.filter((p) => favoritePoemIds.includes(p.id));
  const favoriteBeasts = beasts.filter((b) => favoriteBeastIds.includes(b.id));

  const handleRemovePoem = useCallback(
    (id: string, title: string) => {
      toggleFavoritePoem(id);
      loadFavorites();
      toast(`已取消收藏《${title}》`, "info");
    },
    [loadFavorites, toast]
  );

  const handleRemoveBeast = useCallback(
    (id: string, name: string) => {
      toggleFavoriteBeast(id);
      // Also remove from collected beasts so bestiary-collected beasts can be un-favorited
      const collected = getCollectedBeasts();
      setCollectedBeasts(collected.filter((x) => x !== id));
      loadFavorites();
      toast(`已取消收藏${name}`, "info");
    },
    [loadFavorites, toast]
  );

  return (
    <div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
      <PageHeader title="我的收藏" subtitle="珍藏的诗词与异兽，随时回味" />

      <div className="mx-auto max-w-[1100px] pt-8 md:pt-12">
        {/* Tabs */}
        <div className="mb-8 flex items-center gap-2" role="tablist" aria-label="收藏分类">
          <button
            onClick={() => setTab("poems")}
            role="tab"
            aria-selected={tab === "poems"}
            aria-pressed={tab === "poems"}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-serif text-sm transition-colors ${
              tab === "poems"
                ? "bg-cinnabar/10 text-cinnabar"
                : "text-muted hover:bg-ink/5 hover:text-light-ink"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
              <path d="M3 7l2-3h14l2 3" />
              <path d="M9 12h6" />
            </svg>
            诗词 ({favoritePoems.length})
          </button>
          <button
            onClick={() => setTab("beasts")}
            role="tab"
            aria-selected={tab === "beasts"}
            aria-pressed={tab === "beasts"}
            className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 font-serif text-sm transition-colors ${
              tab === "beasts"
                ? "bg-cinnabar/10 text-cinnabar"
                : "text-muted hover:bg-ink/5 hover:text-light-ink"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
            异兽 ({favoriteBeasts.length})
          </button>
        </div>

        {/* Poems tab */}
        {tab === "poems" && (
          <>
            {favoritePoems.length === 0 ? (
              <EmptyState
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-ink/20">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                }
                title="还没有收藏诗词"
                description="在诗境漫游中点击爱心，收藏你喜爱的诗词"
                action={
                  <Link
                    href="/poetry"
                    className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-5 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10"
                  >
                    去诗境漫游 <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoritePoems.map((poem) => (
                  <article
                    key={poem.id}
                    className="card group flex cursor-pointer flex-col relative"
                    style={{ borderTop: `2px solid ${poem.theme}` }}
                    onClick={() => router.push(`/poetry?id=${poem.id}`)}
                  >
                    <div className="relative h-[200px] overflow-hidden img-placeholder" style={{ background: `linear-gradient(135deg, ${poem.theme}40, ${poem.theme}15)` }}>
                      <Image
                        src={poem.coverImage}
                        alt={poem.title}
                        fill
                        className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemovePoem(poem.id, poem.title);
                        }}
                        className="favorite-btn absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/20 text-cinnabar shadow-sm backdrop-blur-sm transition-all active:scale-90"
                        aria-label={`取消收藏《${poem.title}》`}
                      >
                        <IconHeart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-calligraphy text-2xl text-ink">{poem.title}</h3>
                      <p className="mt-1 font-serif text-sm text-muted">
                        {poem.author} · {poem.dynasty}
                      </p>
                      <p className="mt-3 font-handwrite text-lg text-light-ink">
                        {poem.lines[0]?.text}
                      </p>
                      <p className="mt-3 line-clamp-2 font-serif text-sm text-muted">
                        {poem.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 self-start pt-4 font-serif text-sm text-cinnabar transition-colors group-hover:underline">
                        进入诗境
                        <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Beasts tab */}
        {tab === "beasts" && (
          <>
            {favoriteBeasts.length === 0 ? (
              <EmptyState
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-ink/20">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                }
                title="还没有收藏异兽"
                description="在异兽图鉴中点击爱心，收藏你喜爱的异兽"
                action={
                  <Link
                    href="/bestiary"
                    className="inline-flex items-center gap-1 rounded-full bg-cinnabar/5 px-5 py-2 font-serif text-sm text-cinnabar transition-colors hover:bg-cinnabar/10"
                  >
                    去异兽图鉴 <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteBeasts.map((beast) => (
                  <article
                    key={beast.id}
                    className="card group flex cursor-pointer flex-col relative"
                    onClick={() => router.push(`/bestiary?beast=${beast.id}`)}
                  >
                    <div
                      className="relative h-[260px] overflow-hidden img-placeholder"
                      style={{ background: `linear-gradient(135deg, ${beast.gradient[0]}20, ${beast.gradient[1]}10)` }}
                    >
                      <Image
                        src={beast.imagePath}
                        alt={beast.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveBeast(beast.id, beast.name);
                        }}
                        className="favorite-btn absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-cinnabar/20 text-cinnabar shadow-sm backdrop-blur-sm transition-all active:scale-90"
                        aria-label={`取消收藏${beast.name}`}
                      >
                        <IconHeart className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-calligraphy text-2xl text-ink">{beast.name}</h3>
                        <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-serif text-xs text-muted">
                          {categoryLabels[beast.category]}
                        </span>
                      </div>
                      <p className="mt-1 font-serif text-xs text-muted">出处：{beast.chapter}</p>
                      <p className="mt-3 line-clamp-3 font-serif text-sm text-light-ink">
                        {beast.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {beast.traits.slice(0, 3).map((trait) => (
                          <span
                            key={trait}
                            className="rounded-full bg-indigo/5 px-2.5 py-0.5 font-serif text-xs text-indigo"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                      <span className="mt-auto inline-flex items-center gap-1 self-start pt-4 font-serif text-sm text-cinnabar transition-colors group-hover:underline">
                        查看详情
                        <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
