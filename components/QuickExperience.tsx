"use client";

import Link from "next/link";
import { IconChat, IconPaw, IconFlower } from "@/components/icons";

/**
 * 首页"精选体验"区域 —— 3 个直达入口
 * 移动端和 PC 端均使用三列网格，确保完整展示
 */
const items = [
  {
    title: "和李白聊诗",
    subtitle: "穿越千年的对话",
    desc: "穿越时空，与诗仙畅饮对谈",
    href: "/dialogue?character=libai",
    icon: IconChat,
    gradient: "from-cinnabar/15 to-gold/10",
    accent: "text-cinnabar",
    ring: "ring-cinnabar/20",
  },
  {
    title: "探索上古异兽",
    subtitle: "97只神话生物",
    desc: "AI 水墨插画，97 只神兽图鉴",
    href: "/bestiary",
    icon: IconPaw,
    gradient: "from-indigo/15 to-seal-red/8",
    accent: "text-indigo",
    ring: "ring-indigo/20",
  },
  {
    title: "沉浸读古诗",
    subtitle: "24首经典古诗词",
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
    <section id="featured" className="relative w-full py-6 md:py-8">
      <div className="mx-auto max-w-[1100px] px-4 md:px-6">
        {/* 区域标题 */}
        <div className="mb-4 flex items-center gap-3">
          <span className="font-calligraphy text-lg text-cinnabar md:text-xl">
            精选体验
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cinnabar/30 to-transparent" />
        </div>

        {/* 卡片：移动端和 PC 端均三列网格，完整展示无需滑动 */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-ink/8 bg-gradient-to-br ${item.gradient} px-3 py-4 ring-1 ${item.ring} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] sm:px-4 sm:py-5 md:px-5 md:py-6`}
              >
                {/* 图标 */}
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-surface/80 ${item.accent} transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14`}
                >
                  <Icon className="h-6 w-6 md:h-7 md:w-7" />
                </div>

                {/* 文案 */}
                <div className="min-w-0 flex-1 text-center">
                  <h3 className="font-calligraphy text-sm text-ink sm:text-base md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 font-serif text-[10px] text-muted line-clamp-1 sm:text-xs md:text-sm">
                    {item.subtitle}
                  </p>
                </div>

                {/* 箭头 — 仅 hover 时显示 */}
                <svg
                  className={`h-3.5 w-3.5 flex-shrink-0 ${item.accent} opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 sm:h-4 sm:w-4`}
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
