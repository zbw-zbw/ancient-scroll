# 全站页面风格统一设计

## 背景
首页已升级为水墨卷轴首屏，但 `/reading`、`/bestiary`、`/poetry`、`/dialogue` 等子页面仍保留各自原有头部与视觉节奏，导致全站风格断裂。本次优化目标是用首页的纸色、水墨、印章、字体系统统一所有子页面。

## 目标
- 用户在首页与子页面之间切换时，感觉仍在同一本书里。
- 统一颜色、字体、卡片、按钮、间距，减少视觉噪音。
- 为每个子页面提供一致的顶部封面感，但不喧宾夺主。

## 视觉系统

### 页面背景
- 所有页面顶层使用 `--xuan`（`#f5f0e8`）纸色。
- body 叠加一层 3% 透明度的纸张噪点纹理（通过 CSS `background-image: url(...)` 或 SVG data URI），避免纯色扁平。

### 卡片
- 统一：`bg-surface/60 rounded-2xl shadow-sm`
- hover：`shadow-md -translate-y-0.5 transition-all duration-300`
- 禁止使用 border。

### 按钮
- 主按钮：`rounded-full bg-cinnabar px-6 py-2.5 font-serif text-sm text-white shadow-md hover:bg-cinnabar/90`
- 次按钮：`rounded-full bg-surface px-6 py-2.5 font-serif text-sm text-ink hover:bg-seal-bg`

### 字体层级
- 大标题：`font-calligraphy`
- 正文/标签：`font-serif`
- 副标题/引用：`font-handwrite`

### 间距
- 区块：`py-16 md:py-24`
- 容器：`mx-auto max-w-[1100px] px-6`

## PageHeader 组件

新增 `components/PageHeader.tsx`：

```tsx
<section className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-xuan md:min-h-[280px]">
  {/* 复用首页山水背景，低透明度 */}
  <div className="absolute inset-0 -z-10 opacity-20">
    <Image src="/images/hero-ink.jpg" alt="" fill className="object-cover object-top" />
  </div>
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-xuan/60 via-xuan/80 to-xuan" />

  <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center">
    <h1 className="font-calligraphy text-4xl text-ink md:text-5xl" style={{ fontSize: "clamp(2.25rem, 8vw, 3.5rem)" }}>
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
```

## 各页面应用

| 页面 | 标题 | 副标题 |
|------|------|--------|
| /reading | 双语阅读 | 原文与译文对照，逐句品读山海经 |
| /bestiary | 异兽图鉴 | 收藏山海奇兽，解锁文化成就 |
| /poetry | 诗境漫游 | 一字一句，走进古诗的意境 |
| /dialogue | 古今对话 | 与古人促膝长谈，问你所想 |

各页面原有顶部标题/引言区域替换为 `PageHeader`，下方内容容器统一为 `max-w-[1100px] mx-auto px-6`。

## 移动端适配
- 页面标题使用 `clamp(2.25rem, 8vw, 3.5rem)`，避免折行与溢出。
- 小印章在超窄屏幕可隐藏或缩小，不与标题重叠。
- 子页面内部卡片保持 `w-full`，grid 列数在移动端自动降为 1 列。

## 验收标准
- [ ] `PageHeader` 组件创建并通过 TypeScript 检查。
- [ ] 四个子页面均使用 `PageHeader`。
- [ ] 全站卡片、按钮、间距风格一致，无新增 border。
- [ ] 移动端各页面顶部不重叠、不溢出。
- [ ] `npm run build` 通过并推送到 GitHub。
