# 山海经全18篇扩充规划

## 当前状态

### 已有章节（14篇）
| 编号 | 章节ID | 章节名 | 异兽数量 |
|------|--------|--------|----------|
| 1 | nanshan | 南山经 | ~15 |
| 2 | xishan | 西山经 | ~20 |
| 3 | beishan | 北山经 | ~10 |
| 4 | dongshan | 东山经 | ~8 |
| 5 | zhongshan | 中山经 | ~12 |
| 6 | hainei | 海内经（合集） | ~5 |
| 7 | haiwainan | 海外南经 | ~3 |
| 8 | haiwaixi | 海外西经 | ~3 |
| 9 | haiwaidong | 海外东经 | ~2 |
| 10 | haiwaibei | 海外北经 | ~2 |
| 11 | dahuangdong | 大荒东经 | ~5 |
| 12 | dahuangbei | 大荒北经 | ~4 |
| 13 | dahuangnan | 大荒南经 | ~3 |
| 14 | dahuangxi | 大荒西经 | ~3 |

### 缺失章节（4篇）
山海经全书共18篇，当前缺失海内经的4个分篇：

| 编号 | 章节ID（建议） | 章节名 | 主要异兽 |
|------|----------------|--------|----------|
| 15 | haineinan | 海内南经 | 兕、氐人国、巴蛇、旄马 |
| 16 | haineixi | 海内西经 | 开明兽、危、服常鸟 |
| 17 | haineibei | 海内北经 | 冰夷（河伯）、据比尸、蓬莱仙山 |
| 18 | haineidong | 海内东经 | 雷神、王子夜尸 |

> 注：当前 `hainei` 章节为海内经的合集摘录，扩充后可保留为概述或拆分为4个分篇。

### 异兽数据现状
- 当前异兽数量：76只（含新增化蛇、蛊雕）
- 山海经全书有名异兽约 200+ 种
- 已覆盖约 38%，未来需逐步补全

## 扩充计划

### 第一阶段：补全海内经4篇（短期）
1. 新增 `haineinan`、`haineixi`、`haineibei`、`haineidong` 4个章节
2. 每篇包含 8-15 句原文与译文
3. 补充对应的异兽条目（约 15-20 只新异兽）
4. 更新 `chapterOrder` 数组
5. 为新异兽生成水墨画图片

### 第二阶段：补全各篇遗漏异兽（中期）
1. 逐篇审查现有章节文本，找出未收录的异兽
2. 重点补充：南山经（鸾鸟已有，缺旋龟、赤鱬等）、西山经（缺西王母侍兽等）
3. 目标：异兽总数达到 120+ 只

### 第三阶段：深度内容扩充（长期）
1. 为每只异兽增加「相关典故」字段
2. 增加异兽之间的关联关系（如应龙-女魃-蚩尤的战争线）
3. 增加地理信息系统：山川河流的可视化地图
4. 增加「异兽图鉴」的收集成就体系扩展

## 技术注意事项

### 数据结构
- 新章节需遵循 `Chapter` 接口：`id`, `name`, `subtitle`, `introduction`, `sentences[]`
- 新异兽需遵循 `Beast` 接口：`id`, `name`, `chapter`, `category`, `originalText`, `translation`, `traits`, `gradient`, `imagePath`, `description`
- `relatedBeastId` 需与 `beasts.ts` 中的 `id` 严格一致

### 图片资源
- 新异兽图片路径：`/images/beasts/{pinyin}.webp`
- 图片规格：512x512，水墨画风格，透明背景
- 需在 `knownImages.ts` 中注册图片存在性

### 章节排序
更新 `ReadingClient.tsx` 中的 `chapterOrder` 数组：
```ts
const chapterOrder = [
  "nanshan", "xishan", "beishan", "dongshan", "zhongshan",
  "haineinan", "haineixi", "haineibei", "haineidong",  // 新增
  "haiwainan", "haiwaixi", "haiwaidong", "haiwaibei",
  "dahuangdong", "dahuangbei", "dahuangnan", "dahuangxi",
];
```

### 元数据更新
- 更新 `layout.tsx` 中的 description 异兽数量
- 更新 `DataStats` 组件中的统计数据
