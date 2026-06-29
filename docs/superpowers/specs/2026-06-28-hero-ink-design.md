# 首页首屏水墨卷轴重设计

## 背景
当前首页首屏为居中标题页，信息层级清晰但视觉冲击力不足，缺少“古籍焕新”文化产品的首屏定调。本次打磨目标是把首屏升级为一幅可呼吸、可滚动的水墨卷轴，提升作品的封面感。

## 目标
- 让首屏在 1 秒内传达“古籍 + 现代交互”的气质。
- 强化标题“古籍焕新”的品牌存在感。
- 通过动效与视差建立沉浸感，但不影响性能与可访问性。

## 视觉概念
全屏水墨卷轴首屏。背景为一张低饱和、有呼吸感的国风山水长卷，全屏 cover，缓慢缩放。前景标题毛笔字加大、居左（桌面）/ 居中（移动），副标题与 CTA 依次浮现。整体像展开一幅画卷。

色调保持现有纸色 `#f5f0e8` 与朱砂 `#c84032`，背景图偏冷灰水墨，让红色印章/CTA 更突出。

## 结构

```
<section className="relative h-svh w-full overflow-hidden">
  {/* 背景图 + 呼吸动画 + 渐变遮罩 */}
  <Image src="/images/hero-ink.jpg" fill className="animate-hero-breathe" />
  <div className="absolute inset-0 bg-gradient-to-r from-xuan/70 via-xuan/40 to-transparent" />

  {/* 前景内容 */}
  <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:px-20">
    <h1 className="font-calligraphy ...">古籍焕新</h1>
    <p className="font-handwrite ...">让千年文字“活”起来</p>
    <Link href="#features" className="...">开启旅程 →</Link>
  </div>

  {/* 右下角印章 */}
  <div className="absolute bottom-8 right-8 ...">古籍<br/>焕新</div>
</section>
```

### 桌面端
- 标题左对齐，最大 `clamp(4rem, 12vw, 8rem)`。
- 副标题与 CTA 位于标题下方左侧，保持 1.5rem ~ 2rem 间距。
- 右下角小印章作为品牌锚点。

### 移动端
- 标题居中，字号用 `clamp(3rem, 14vw, 5rem)`，避免溢出。
- 副标题与 CTA 居中，CTA 宽度自适应。
- 背景图中心裁剪，保证文字区域干净。

## 动效

| 元素 | 动画 | 时长/参数 |
|------|------|----------|
| 背景图 | 持续呼吸缩放 `scale(1) → scale(1.08)` | 20s，ease-in-out，infinite，alternate |
| 标题文字 | 逐字 fade-in-up | stagger 0.08s，单字 0.6s ease-out |
| 副标题 | fade-in-up | delay 0.6s，0.8s ease-out |
| CTA | fade-in-up + hover 右移 | delay 0.9s，hover `translateX(4px)` |
| 滚动 | 背景 opacity 降至 0.3，translateY -15% | scroll-linked via CSS `animation-timeline` 或 JS IntersectionObserver |
| 减少动效 | 全部禁用 | `prefers-reduced-motion` |

> 注：为兼容性与简单性，scroll 视差优先用 JS `useScrollProgress` hook（监听滚动位置映射 opacity/translate），而不是复杂的 CSS scroll-timeline。

## 资源
- 生成一张 1920×1080 国风山水背景图，保存为 `public/images/hero-ink.jpg`。
- 不需要新增 npm 依赖。

## 影响范围
- 主要修改 `components/Hero.tsx`。
- `app/page.tsx` 中 Hero 后的第一个 section 建议添加 `id="features"`，供 CTA 锚点跳转。
- 现有 `globals.css` 需新增 `@keyframes hero-breathe`、`@keyframes hero-reveal`。

## 验收标准
- [ ] 首屏占满视口，背景图清晰且无拉伸。
- [ ] 标题、副标题、CTA 依次动画出现。
- [ ] 桌面标题居左，移动标题居中，均无截断。
- [ ] 向下滚动时背景产生视差淡出。
- [ ] 在 `prefers-reduced-motion: reduce` 下动画全部禁用。
- [ ] `npm run build` 无错误并成功推送。
