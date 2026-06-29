# 全站微交互与状态打磨设计

## 背景
页面结构和视觉风格已统一，但各元素在 hover、focus、加载、滚动进入时的反馈还不够一致，缺少“精致感”。本次打磨目标是用最小代价提升全站交互质感。

## 目标
- 全站 hover/focus/active 反馈统一、自然。
- 页面进入和滚动进入有适度的 reveal 动效，但不过度。
- 减少用户等待焦虑：为列表页提供骨架屏，为空结果提供友好提示。
- 全程尊重 `prefers-reduced-motion`。

## 方案

### 1. 全局过渡与焦点
在 `app/globals.css` 中统一：
- `a`、`button`、`.card`、`.section-reveal` 统一 `transition-all duration-300 ease-out`。
- 按钮点击 `active:scale-95`。
- 焦点状态 `focus:outline-none focus:ring-2 focus:ring-cinnabar/30`。
- 链接 hover 颜色从 `text-light-ink` 到 `text-cinnabar`。

### 2. 页面进入淡入
新增 `components/PageTransition.tsx`：
- 包装 `<main>` 内容，初始 `opacity-0 translate-y-3`。
- 挂载后 0.4s 过渡到 `opacity-100 translate-y-0`。
- 首页 Hero 已有独立动画，不包裹。

### 3. 滚动渐显 ScrollReveal
新增 `components/ScrollReveal.tsx`：
- 使用 `IntersectionObserver`，阈值 0.15。
- 进入视口前：`opacity-0 translate-y-6`。
- 进入后：`opacity-100 translate-y-0 transition-all duration-700 ease-out`。
- 应用到首页 Features / DataStats / UserPersonas / SolutionOverview。

### 4. 卡片统一 hover
- 所有卡片统一加 `group overflow-hidden rounded-2xl bg-surface/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`。
- 卡片内图片 `transition-transform duration-500 group-hover:scale-105`。
- 箭头/图标 `transition-transform duration-300 group-hover:translate-x-1`。

### 5. 加载与空状态
- 新增 `components/SkeletonCard.tsx`：脉冲渐变占位，用于 bestiary/poetry/dialogue 客户端 hydrate 前。
- 新增 `components/EmptyState.tsx`：搜索/筛选无结果时展示。

### 6. 导航高亮
- Navbar 当前项加 `bg-cinnabar/10 rounded-full px-3 py-1`。
- 移动端菜单项同步。

### 7. 移动端适配
- 触摸设备 hover translate 效果用 `@media (hover: hover)` 限定，避免误触。
- 动画时长在移动端保持默认，不额外缩短。

## 验收标准
- [ ] `globals.css` 全局过渡、焦点、active 样式生效。
- [ ] `PageTransition` 与 `ScrollReveal` 组件创建并在首页使用。
- [ ] 所有卡片 hover 效果一致。
- [ ] 列表页有骨架屏/空状态。
- [ ] `prefers-reduced-motion` 下所有动画禁用。
- [ ] `npm run build` 通过并推送到 `main` 与 `master`。
