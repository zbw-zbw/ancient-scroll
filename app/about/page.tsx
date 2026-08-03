import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { chapters } from "@/data/shanhaijing";
import { beasts } from "@/data/beasts";
import { poems } from "@/data/poems";
import { characters } from "@/data/characters";
import {
  IconUnlock,
  IconEye,
  IconSparkles,
  IconBookOpen,
  IconDragon,
  IconFlower,
  IconChat,
  IconCheck,
  IconClock,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "关于",
  description:
    "了解古籍焕新的使命、社会价值、技术架构和未来规划。用 AI 让每个人都能感受古文之美。",
};

// 从数据文件派生真实统计，避免文案与实际数据不一致（安全报告 L-1）
const TOTAL_SENTENCES = chapters.reduce((n, c) => n + c.sentences.length, 0);

const socialValues = [
  {
    icon: <IconUnlock className="h-8 w-8 text-cinnabar" />,
    title: "降低阅读门槛",
    subtitle: "古文阅读从'查字典'到'点一下'",
    description:
      `AI 逐句翻译 + 难字即时解读，${chapters.length}篇山海经${TOTAL_SENTENCES}句古文全部配有白话翻译和注释，让零基础用户也能读懂`,
    scenarios: "中小学文言文教学辅助、自学古文入门",
  },
  {
    icon: <IconEye className="h-8 w-8 text-cinnabar" />,
    title: "让古籍\"看得见\"",
    subtitle: "山海经异兽从文字走进画面",
    description:
      `${beasts.length}只神话生物图鉴化呈现，水墨风格AI插画，让古文描述不再抽象`,
    scenarios: "传统文化科普、博物馆数字化展览素材",
  },
  {
    icon: <IconSparkles className="h-8 w-8 text-cinnabar" />,
    title: "激发文化兴趣",
    subtitle: "沉浸式体验让年轻人主动走进古诗",
    description:
      `${poems.length}首古诗沉浸式视觉旅程 + ${characters.length}位历史人物AI对话，不是强迫阅读，而是创造'想读下去'的体验`,
    scenarios: "课堂互动教学、文化推广活动",
  },
];

const methods = [
  {
    icon: <IconBookOpen className="h-7 w-7 text-cinnabar" />,
    title: "AI 翻译",
    stat: `${chapters.length}篇`,
    detail: `山海经，${TOTAL_SENTENCES}句逐句翻译，难字即点即解`,
  },
  {
    icon: <IconDragon className="h-7 w-7 text-cinnabar" />,
    title: "可视化",
    stat: `${beasts.length}只`,
    detail: "山海经异兽图鉴，5大分类（兽/禽/鱼/蛇/神）",
  },
  {
    icon: <IconFlower className="h-7 w-7 text-cinnabar" />,
    title: "沉浸式",
    stat: `${poems.length}首`,
    detail: "经典古诗，7大主题分类，6种粒子特效",
  },
  {
    icon: <IconChat className="h-7 w-7 text-cinnabar" />,
    title: "对话式",
    stat: `${characters.length}位`,
    detail: "历史人物，横跨春秋到明代，AI模拟真实人格",
  },
  {
    icon: <IconSparkles className="h-7 w-7 text-cinnabar" />,
    title: "互动式",
    stat: "知识问答",
    detail: "多难度分级，古今知识竞答，成就系统激励",
  },
];

const techStack = [
  { label: "AI 对话", value: "DeepSeek API 驱动 15 位历史人物个性化对话，支持流式输出" },
  { label: "AI 插画", value: "AI 生成 80+ 张水墨风格插画（异兽、人物、诗词配图）" },
  { label: "语音朗读", value: "Web Speech API 多音色朗读，支持诗词朗诵与山海经听书" },
  { label: "技术框架", value: "Next.js + TypeScript + Tailwind CSS，Vercel 全球部署" },
];

const timeline = [
  { status: "done", text: `《山海经》${chapters.length}篇章${TOTAL_SENTENCES}句古文上线` },
  { status: "done", text: `${beasts.length}只异兽图鉴 + ${poems.length}首古诗沉浸体验` },
  { status: "done", text: `${characters.length}位历史人物 AI 对话` },
  { status: "done", text: "多音色语音朗读 + 诗词朗诵 + 山海经听书模式" },
  { status: "done", text: "知识问答闯关（诗词填空、异兽辨识、看图识兽）" },
  { status: "done", text: "扩充至《山海经》全18篇，覆盖全部异兽" },
  { status: "planned", text: "增加《诗经》《楚辞》等更多古籍" },
  { status: "planned", text: "教师端课堂互动模式（学生分组竞答、实时投屏）" },
];

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-xuan">
      <PageHeader
        title='让千年文字"活"起来'
        subtitle="用 AI 技术重新诠释古籍，让经典走进每个人的生活"
        compact
      />

      {/* 使命宣言 */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-20 md:pb-28">
        {/* Decorative background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 40%, #c84032 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #b8860b 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mx-auto max-w-2xl font-serif text-base leading-relaxed text-light-ink md:text-lg">
            中国有超过 20 万种古籍存世，但绝大多数人一辈子都不会翻开其中任何一本。不是不想读，而是读不懂、没画面、没兴趣。古籍焕新希望用 AI 技术，把古籍阅读从&lsquo;查字典式被动学习&rsquo;变成&lsquo;探索式主动体验&rsquo;，让每一个普通人都能感受到古文之美。
          </p>
        </div>
      </section>

      {/* Section 2: 社会价值 */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-3 text-center font-calligraphy text-3xl text-ink md:text-4xl">
            让传统文化触手可及
          </h2>
          <p className="mb-12 text-center font-serif text-sm text-muted">
            社会价值
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {socialValues.map((item, i) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-ink/8 bg-surface/50 p-8 transition-all hover:border-cinnabar/20 hover:shadow-lg"
              >
                <div
                  className="mb-4"
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <h3 className="mb-1 font-calligraphy text-2xl text-ink">
                  {item.title}
                </h3>
                <p className="mb-3 font-serif text-sm text-cinnabar">
                  {item.subtitle}
                </p>
                <p className="mb-4 font-serif text-sm leading-relaxed text-light-ink">
                  {item.description}
                </p>
                <div className="border-t border-ink/8 pt-3">
                  <p className="font-serif text-xs text-muted">
                    <span className="font-semibold">适用场景：</span>
                    {item.scenarios}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: 我们的方法 */}
      <section className="px-6 py-16 md:py-24 bg-xuan-dark/50">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="mb-3 text-center font-calligraphy text-3xl text-ink md:text-4xl">
            我们的方法
          </h2>
          <p className="mb-12 text-center font-serif text-sm text-muted">
            五大功能，五种体验
          </p>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {methods.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ink/8 bg-xuan p-6 text-center transition-all hover:border-cinnabar/20 hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-center" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="mb-1 font-serif text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mb-2 font-calligraphy text-2xl text-cinnabar">
                  {item.stat}
                </p>
                <p className="font-serif text-xs leading-relaxed text-muted">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: 技术架构 */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[900px]">
          <h2 className="mb-3 text-center font-calligraphy text-3xl text-ink md:text-4xl">
            技术架构
          </h2>
          <p className="mb-12 text-center font-serif text-sm text-muted">
            现代技术驱动传统文化
          </p>
          <div className="space-y-4">
            {techStack.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-xl border border-ink/8 bg-surface/40 p-5 md:flex-row md:items-center md:gap-6"
              >
                <span className="inline-flex w-24 flex-shrink-0 items-center justify-center rounded-lg bg-cinnabar/8 px-3 py-1.5 font-serif text-sm font-semibold text-cinnabar">
                  {item.label}
                </span>
                <span className="font-serif text-sm leading-relaxed text-light-ink">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: 未来规划 */}
      <section className="px-6 py-16 md:py-24 bg-xuan-dark/50">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-center font-calligraphy text-3xl text-ink md:text-4xl">
            未来规划
          </h2>
          <p className="mb-12 text-center font-serif text-sm text-muted">
            持续迭代，让古籍焕发新生
          </p>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cinnabar/30 via-ink/10 to-transparent md:left-1/2 md:-translate-x-1/2"
              aria-hidden="true"
            />
            <ul className="space-y-6">
              {timeline.map((item, i) => (
                <li
                  key={i}
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:ml-0 md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute left-3 top-2 flex h-3 w-3 items-center justify-center rounded-full md:left-auto ${
                      i % 2 === 0
                        ? "md:-right-1.5 md:translate-x-full"
                        : "md:-left-1.5"
                    } ${
                      item.status === "done"
                        ? "bg-cinnabar ring-4 ring-cinnabar/10"
                        : "bg-muted ring-4 ring-muted/10"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className={`inline-block rounded-lg border px-4 py-3 ${
                      item.status === "done"
                        ? "border-cinnabar/15 bg-cinnabar/5"
                        : "border-ink/8 bg-surface/40"
                    }`}
                  >
                    <span
                      className="mr-2 inline-flex items-center align-middle"
                      aria-hidden="true"
                    >
                      {item.status === "done"
                        ? <IconCheck className="h-4 w-4 text-cinnabar" />
                        : <IconClock className="h-4 w-4 text-muted" />}
                    </span>
                    <span className="font-serif text-sm text-light-ink">
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom: Seal + copyright */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          {/* Seal stamp */}
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-lg border-2 border-cinnabar"
            style={{ transform: "rotate(-5deg)" }}
            aria-hidden="true"
          >
            <span className="font-calligraphy text-3xl text-cinnabar">
              古
            </span>
          </div>
          <p className="font-serif text-xs text-muted">
            © {new Date().getFullYear()} 古籍焕新 · AI 驱动的古籍交互阅读平台
          </p>
          <p className="mt-1 font-serif text-xs text-muted">
            让千年文字&ldquo;活&rdquo;起来
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
