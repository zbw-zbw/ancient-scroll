# 全站页面风格统一实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用首页风格统一 `/bestiary`、`/poetry`、`/dialogue`、`/reading` 四个子页面的顶部与背景视觉。

**Architecture:** 新增可复用 `PageHeader` 组件，在各子页面替换原有标题区；通过 `globals.css` 给 body 加一层纸纹背景；阅读页使用 `compact` 版 PageHeader 避免破坏全屏阅读布局。

**Tech Stack:** Next.js 16 + React + TypeScript + Tailwind CSS v4

---

### Task 1: 创建 PageHeader 组件

**Files:**
- Create: `components/PageHeader.tsx`

- [ ] **Step 1: 创建组件**

```tsx
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export default function PageHeader({ title, subtitle, compact }: PageHeaderProps) {
  return (
    <section
      className={`relative flex w-full items-center justify-center overflow-hidden bg-xuan ${
        compact
          ? "min-h-[160px] pt-16 md:min-h-[200px]"
          : "min-h-[220px] pt-16 md:min-h-[280px]"
      }`}
    >
      {/* 复用首页山水背景，低透明度 */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image
          src="/images/hero-ink.jpg"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-xuan/60 via-xuan/80 to-xuan" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
        <h1
          className="font-calligraphy text-ink"
          style={{ fontSize: "clamp(2.25rem, 8vw, 3.5rem)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 font-handwrite text-lg text-light-ink md:text-xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* 小印章 */}
      <div className="absolute bottom-4 right-4 z-10 flex h-14 w-14 rotate-[-3deg] items-center justify-center rounded-sm bg-seal-bg shadow-sm md:bottom-6 md:right-8 md:h-16 md:w-16">
        <span className="text-center font-calligraphy text-[10px] leading-tight text-seal-red md:text-xs">
          古籍
          <br />
          焕新
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/PageHeader.tsx
git commit -m "feat: add reusable PageHeader component"
```

---

### Task 2: 添加全站纸纹背景

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: 在 body 加纸张噪点纹理**

在 `app/globals.css` 中找到 `body` 规则，改为：

```css
body {
  color: var(--ink);
  background-color: var(--xuan);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
}
```

如果原有 `body` 规则不同，则覆盖背景色与新增纹理。

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add subtle paper texture to body background"
```

---

### Task 3: 统一异兽图鉴页

**Files:**
- Modify: `components/bestiary/BestiaryClient.tsx`

- [ ] **Step 1: 导入 PageHeader 并替换原有 header**

在文件顶部新增导入：

```tsx
import PageHeader from "@/components/PageHeader";
```

找到并删除以下原有 header：

```tsx
<header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
  <div>
     <h1 className="font-calligraphy text-4xl text-ink md:text-5xl">
       异兽图鉴
     </h1>
     <p className="mt-2 font-serif text-base text-muted md:text-lg">
       《山海经》神兽大全 · 收集你的专属图鉴
     </p>
   </div>
   <CollectionProgress />
 </header>
```

替换为：

```tsx
<PageHeader
  title="异兽图鉴"
  subtitle="收藏山海奇兽，解锁文化成就"
/>
<div className="mx-auto max-w-[1100px] px-4 pb-12 pt-8 md:px-6 md:pb-16 md:pt-12">
  <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
    <CollectionProgress />
  </div>
```

同时将外层 `<main>` 的 `pt-20 md:pt-24` 改为 `pt-0`：

```tsx
<main className="min-h-screen bg-xuan px-4 pb-12 md:px-6 md:pb-16">
```

并确保在 `</main>` 前闭合新增的 `</div>`。

- [ ] **Step 2: Commit**

```bash
git add components/bestiary/BestiaryClient.tsx
git commit -m "style: unify bestiary page with PageHeader"
```

---

### Task 4: 统一诗境漫游选择页

**Files:**
- Modify: `components/poetry/PoemSelector.tsx`

- [ ] **Step 1: 导入 PageHeader 并替换原有 header**

在文件顶部新增导入：

```tsx
import PageHeader from "@/components/PageHeader";
```

找到并删除：

```tsx
<header className="mb-10 text-center md:mb-12">
  <h1 className="font-calligraphy text-4xl text-ink md:text-5xl">
    诗境漫游
  </h1>
  <p className="mx-auto mt-3 max-w-md font-serif text-base text-muted md:text-lg">
    选一首诗，开启一段沉浸式视觉旅程
  </p>
</header>
```

替换为：

```tsx
<PageHeader
  title="诗境漫游"
  subtitle="一字一句，走进古诗的意境"
/>
<header className="mb-10 text-center md:mb-12">
  <p className="mx-auto mt-3 max-w-md font-serif text-base text-muted md:text-lg">
    选一首诗，开启一段沉浸式视觉旅程
  </p>
</header>
```

并将外层 `<div>` 的 `pt-20 md:pt-24` 改为 `pt-0`：

```tsx
<div className="min-h-screen bg-xuan px-4 pb-16 md:px-6">
```

- [ ] **Step 2: Commit**

```bash
git add components/poetry/PoemSelector.tsx
git commit -m "style: unify poetry selector with PageHeader"
```

---

### Task 5: 统一古今对话选择页

**Files:**
- Modify: `components/dialogue/CharacterSelect.tsx`

- [ ] **Step 1: 导入 PageHeader 并替换原有 header**

在文件顶部新增导入：

```tsx
import PageHeader from "@/components/PageHeader";
```

找到并删除：

```tsx
{/* Header */}
<div className="mb-12 text-center md:mb-16">
  <h1 className="font-calligraphy text-5xl text-ink md:text-6xl mb-4">
    古今对话
  </h1>
  <p className="font-serif text-base md:text-lg text-muted">
    选择一位古人，开启穿越时空的对话
  </p>
</div>
```

替换为：

```tsx
<PageHeader
  title="古今对话"
  subtitle="与古人促膝长谈，问你所想"
/>
<div className="mb-12 text-center md:mb-16">
  <p className="font-serif text-base text-muted md:text-lg">
    选择一位古人，开启穿越时空的对话
  </p>
</div>
```

并将外层 `<div>` 的 `py-16 md:py-24` 改为 `pb-16 pt-8 md:pb-24 md:pt-12`：

```tsx
<div className="relative z-10 mx-auto max-w-[1100px] px-6 pb-16 pt-8 md:pb-24 md:pt-12">
```

- [ ] **Step 2: Commit**

```bash
git add components/dialogue/CharacterSelect.tsx
git commit -m "style: unify character select with PageHeader"
```

---

### Task 6: 统一双语阅读页

**Files:**
- Modify: `components/reading/ReadingClient.tsx`

- [ ] **Step 1: 导入 PageHeader 并重构布局**

在文件顶部新增导入：

```tsx
import PageHeader from "@/components/PageHeader";
```

将外层 return 从：

```tsx
return (
  <div className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-xuan pt-16 md:flex-row">
    <ChapterSidebar ... />
    <ReadingPanel ... />
    {activeTooltip && ...}
  </div>
);
```

改为：

```tsx
return (
  <div className="relative flex min-h-[calc(100vh-4rem)] flex-col bg-xuan">
    <PageHeader
      title="双语阅读"
      subtitle="原文与译文对照，逐句品读山海经"
      compact
    />
    <div className="relative flex flex-1 min-h-0 flex-col md:flex-row">
      <ChapterSidebar
        chapters={chapters}
        selectedId={selectedChapterId}
        onSelect={(id) => {
          setSelectedChapterId(id);
          markChapterRead(id);
        }}
      />
      <ReadingPanel
        chapter={chapter}
        fontSize={fontSize}
        showTranslation={showTranslation}
        translations={translations}
        onFontSizeChange={setFontSize}
        onShowTranslationChange={setShowTranslation}
        onCharClick={handleCharClick}
        onTranslation={handleTranslation}
      />
    </div>
    {activeTooltip && (
      <CharacterTooltip
        charData={activeTooltip.charData}
        context={tooltipContext}
        triggerRect={activeTooltip.rect}
        onClose={() => setActiveTooltip(null)}
      />
    )}
  </div>
);
```

- [ ] **Step 2: Commit**

```bash
git add components/reading/ReadingClient.tsx
git commit -m "style: unify reading page with compact PageHeader"
```

---

### Task 7: 构建与验证

**Files:**
- Verify: `.next/server/app/**/*.html`

- [ ] **Step 1: 安装依赖并构建**

```bash
npm install && npm run build
```

Expected: exit code 0.

- [ ] **Step 2: 验证四个子页面输出包含 PageHeader 标题**

```bash
for page in bestiary dialogue poetry reading; do
  echo -n "$page: "
  grep -o "PageHeader" .next/server/app/$page.html 2>/dev/null | wc -l
done
```

Expected: each page has at least 1 occurrence (rendered component marker may differ, but title text should be present).

Alternative verification:

```bash
grep -o "异兽图鉴\|古今对话\|诗境漫游\|双语阅读" .next/server/app/*/index.html | sort | uniq -c
```

Expected: each title appears once.

- [ ] **Step 3: 检查 body 背景纹理**

```bash
grep -o "noiseFilter" .next/static/css/*.css | head -1
```

Expected: `noiseFilter` present.

---

### Task 8: 推送代码

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

Expected: pushes successfully.

---

## Self-Review

- **Spec coverage:**
  - PageHeader 组件 → Task 1
  - 纸纹背景 → Task 2
  - 异兽图鉴 / 诗境漫游 / 古今对话 / 双语阅读统一 → Tasks 3-6
  - 移动端标题适配 → PageHeader 使用 clamp
  - 构建与推送 → Tasks 7-8

- **Placeholder scan:** 所有步骤含具体代码与命令，无 TBD/TODO。
- **Type consistency:** `PageHeaderProps` 在 Task 1 定义，后续均使用 `title/subtitle/compact`。
