"use client";

import Link from "next/link";
import { IconChat, IconPaw, IconFlower } from "@/components/icons";

/**
 * 首页"精选体验"区域 —— 3 个直达入口
 * PC 端横向排列，移动端横向可滚动
 */
const items = [
  {
    title: "和李白聊诗",
    desc: "穿越时空，与诗仙畅饮对谈",
    href: "/dialogue?character=libai",
    icon: IconChat,
    gradient: "from-cinnabar/15 to-gold/10",
    accent: "text-cinnabar",
    ring: "ring-cinnabar/20",
  },
  {
    title: "探索上古异兽",
    desc: "AI 水墨插画，97 只神兽图鉴",
    href: "/bestiary",
    icon: IconPaw,
    gradient: "from-indigo/15 to-seal-red/8",
    accent: "text-indigo",
    ring: "ring-indigo/20",
  },
  {
    title: "沉浸读古诗",
    desc: "24 首经典诗词，沉浸式朗诵",
    href: "/poetry",
    icon: IconFlower,
    gradient: "from-gold/15 to-cinnabar/8",
    accent: "text-gold",
    ring: "ring-gold/20",
  },
];

export default function QuickExperience() {
  return (
    <section className="relative w-full py-6 md:py-8">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        {/* 区域标题 */}
        <div className="mb-4 flex items-center gap-3">
          <span className="font-calligraphy text-lg text-cinnabar md:text-xl">
            精选体验
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cinnabar/30 to-transparent" />
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-ink/8 bg-gradient-to-br ${item.gradient} px-4 py-3 ring-1 ${item.ring} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] md:px-5 md:py-4`}
              >
                {/* 图标 */}
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-surface/80 ${item.accent} transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12`}
                >
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>

                {/* 文案 */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-calligraphy text-base text-ink md:text-lg">
                    {item.title}
                  </h3>
                  <p className="truncate font-serif text-xs text-muted md:text-sm">
                    {item.desc}
                  </p>
                </div>

                {/* 箭头 */}
                <svg
                  className={`h-4 w-4 flex-shrink-0 ${item.accent} opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
