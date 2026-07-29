/**
 * 批量生成水墨风格占位图片
 * 使用 sharp + SVG 生成人物头像、异兽插画、诗词封面
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { join } from "path";

const OUTPUT_BASE = "/workspace/ancient-scroll/public/images";

// ============================================================
// 辅助函数
// ============================================================

/** 生成随机数（带种子，确保可复现） */
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** 将十六进制颜色转为 rgba 字符串 */
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/** 混合两个颜色 */
function mixColors(hex1, hex2, ratio) {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  return `rgb(${r},${g},${b})`;
}

/** 调亮颜色 */
function lightenColor(hex, amount) {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `rgb(${r},${g},${b})`;
}

/** 调暗颜色 */
function darkenColor(hex, amount) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `rgb(${r},${g},${b})`;
}

/** 生成宣纸纹理 SVG filter */
function paperTextureFilter() {
  return `
    <filter id="paperNoise" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" seed="1"/>
      <feColorMatrix values="0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0 0.75  0 0 0 0.04 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
  `;
}

/** 生成水墨晕染 SVG filter */
function inkBlurFilter() {
  return `
    <filter id="inkBlur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="8"/>
    </filter>
    <filter id="inkBlur2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
    </filter>
    <filter id="inkBlur3" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
    </filter>
  `;
}

/** 生成随机墨点 */
function generateInkSplashes(rng, count, cx, cy, spread, opacityRange = [0.05, 0.2]) {
  const splashes = [];
  for (let i = 0; i < count; i++) {
    const angle = rng() * Math.PI * 2;
    const dist = rng() * spread;
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    const r = 3 + rng() * 15;
    const opacity = opacityRange[0] + rng() * (opacityRange[1] - opacityRange[0]);
    splashes.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="black" opacity="${opacity.toFixed(3)}" filter="url(#inkBlur2)"/>`
    );
  }
  return splashes.join("\n");
}

// ============================================================
// 人物头像生成 (400x400)
// ============================================================

const characters = [
  { id: "dufu", surname: "杜", title: "诗圣", color: "#6B4423", subtitle: "忧国忧民" },
  { id: "xinqiji", surname: "辛", title: "词中之龙", color: "#8B0000", subtitle: "豪放词宗" },
  { id: "taoyuanming", surname: "陶", title: "田园诗祖", color: "#6B8E23", subtitle: "隐逸高士" },
  { id: "wuzetian", surname: "武", title: "一代女皇", color: "#800080", subtitle: "日月当空" },
  { id: "simaqian", surname: "司马", title: "史圣", color: "#4A4A4A", subtitle: "究天人之际" },
  { id: "baijuyi", surname: "白", title: "诗魔", color: "#CD853F", subtitle: "老妪能解" },
];

function generateCharacterSVG(char, index) {
  const rng = seededRandom(index * 1000 + 42);
  const cx = 200, cy = 200;
  const mainColor = char.color;
  const lightColor = lightenColor(mainColor, 60);
  const darkColor = darkenColor(mainColor, 40);

  // 背景径向渐变
  const bgGradient = `
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
        <stop offset="0%" stop-color="${lightColor}"/>
        <stop offset="60%" stop-color="${mainColor}"/>
        <stop offset="100%" stop-color="${darkColor}"/>
      </radialGradient>
      <radialGradient id="inkCircle" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${lightenColor(mainColor, 80)}" stop-opacity="0.9"/>
        <stop offset="50%" stop-color="${mainColor}" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="${darkColor}" stop-opacity="0.9"/>
      </radialGradient>
      <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c84032"/>
        <stop offset="100%" stop-color="#8a1f2a"/>
      </linearGradient>
      ${paperTextureFilter()}
      ${inkBlurFilter()}
    </defs>
  `;

  // 外层水墨晕染圆（大模糊）
  const inkHalo = `
    <circle cx="${cx}" cy="${cy}" r="150" fill="${darkColor}" opacity="0.3" filter="url(#inkBlur3)"/>
    <circle cx="${cx}" cy="${cy}" r="130" fill="${darkColor}" opacity="0.2" filter="url(#inkBlur)"/>
  `;

  // 中心圆
  const centerCircle = `
    <circle cx="${cx}" cy="${cy}" r="110" fill="url(#inkCircle)" opacity="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="110" fill="none" stroke="${lightenColor(mainColor, 100)}" stroke-width="1" opacity="0.4"/>
  `;

  // 姓氏文字
  const fontSize = char.surname.length > 1 ? 80 : 120;
  const surnameText = `
    <text x="${cx}" y="${cy + fontSize * 0.35}" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, Songti SC, serif" 
          font-size="${fontSize}" 
          font-weight="bold"
          fill="rgba(255,255,255,0.85)"
          letter-spacing="${char.surname.length > 1 ? "4" : "0"}">${char.surname}</text>
  `;

  // 底部 title
  const titleText = `
    <text x="${cx}" y="345" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="24" 
          fill="rgba(255,255,255,0.7)"
          letter-spacing="8">${char.title}</text>
    <text x="${cx}" y="370" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="14" 
          fill="rgba(255,255,255,0.4)"
          letter-spacing="3">${char.subtitle}</text>
  `;

  // 装饰墨点
  const splashes = generateInkSplashes(rng, 12, cx, cy, 180, [0.03, 0.15]);

  // 左上角印章
  const seal = `
    <rect x="32" y="32" width="40" height="40" rx="4" 
          fill="url(#sealGrad)" opacity="0.8" transform="rotate(-3 52 52)"/>
    <text x="52" y="60" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="14" 
          fill="rgba(255,255,255,0.9)"
          transform="rotate(-3 52 52)">印</text>
  `;

  // 装饰线条 — 四角简约纹样
  const cornerOrnaments = `
    <path d="M 20,80 L 20,60 L 40,60" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    <path d="M 380,80 L 380,60 L 360,60" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    <path d="M 20,320 L 20,340 L 40,340" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
    <path d="M 380,320 L 380,340 L 360,340" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
  `;

  return `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    ${bgGradient}
    <rect width="400" height="400" fill="url(#bgGrad)"/>
    <rect width="400" height="400" filter="url(#paperNoise)" opacity="0.5"/>
    ${inkHalo}
    ${splashes}
    ${centerCircle}
    ${surnameText}
    ${titleText}
    ${seal}
    ${cornerOrnaments}
  </svg>`;
}

// ============================================================
// 异兽插画生成 (600x400)
// ============================================================

const beasts = [
  { id: "bifang", name: "毕方", grad: ["#e85d04", "#dc2f02"], category: "禽", chapter: "西山经", decor: "fire" },
  { id: "chenghuang", name: "乘黄", grad: ["#ffba08", "#faa307"], category: "兽", chapter: "海外西经", decor: "cloud" },
  { id: "kuiniu", name: "夔牛", grad: ["#023e8a", "#0077b6"], category: "兽", chapter: "大荒东经", decor: "lightning" },
  { id: "yinglong", name: "应龙", grad: ["#7209b7", "#3a0ca3"], category: "神", chapter: "大荒东经", decor: "water" },
  { id: "jiufeng", name: "九凤", grad: ["#d00000", "#6a040f"], category: "禽", chapter: "大荒北经", decor: "fire" },
  { id: "qiangliang", name: "强良", grad: ["#9d0208", "#370617"], category: "神", chapter: "大荒北经", decor: "snake" },
  { id: "feilian", name: "飞廉", grad: ["#2d6a4f", "#1b4332"], category: "禽", chapter: "大荒东经", decor: "wind" },
  { id: "zhuhuai", name: "朱獳", grad: ["#d62828", "#9d0208"], category: "兽", chapter: "南次三经", decor: "snake" },
  { id: "minniao", name: "鸣鸟", grad: ["#52b788", "#2d6a4f"], category: "禽", chapter: "大荒西经", decor: "cloud" },
  { id: "feiwei", name: "肥遗", grad: ["#52796f", "#354f52"], category: "蛇", chapter: "北山经", decor: "snake" },
  { id: "kuafu", name: "夸父", grad: ["#dda15e", "#bc6c25"], category: "神", chapter: "大荒北经", decor: "mountain" },
  { id: "xingtian", name: "刑天", grad: ["#9d0208", "#370617"], category: "神", chapter: "海外西经", decor: "mountain" },
  { id: "yingzhao", name: "英招", grad: ["#7b2cbf", "#3c096c"], category: "神", chapter: "西山经", decor: "cloud" },
  { id: "tianwu", name: "天吴", grad: ["#03045e", "#023e8a"], category: "神", chapter: "海外东经", decor: "water" },
  { id: "dijiang", name: "帝江", grad: ["#d62828", "#9d0208"], category: "神", chapter: "西山经", decor: "cloud" },
  { id: "mingshe", name: "鸣蛇", grad: ["#52796f", "#354f52"], category: "蛇", chapter: "中次二经", decor: "snake" },
  { id: "dangkang", name: "当康", grad: ["#52b788", "#1b4332"], category: "兽", chapter: "东次四经", decor: "mountain" },
  { id: "luyu", name: "鯥鱼", grad: ["#0096c7", "#023e8a"], category: "鱼", chapter: "南山经", decor: "water" },
  { id: "shuhu", name: "孰湖", grad: ["#dda15e", "#9c6644"], category: "兽", chapter: "西次四经", decor: "cloud" },
  { id: "baize", name: "白泽", grad: ["#adb5bd", "#6c757d"], category: "神", chapter: "东次三经", decor: "cloud" },
  { id: "zhuyan", name: "朱厌", grad: ["#d62828", "#9d0208"], category: "兽", chapter: "西次二经", decor: "mountain" },
];

function generateDecorElements(decorType, rng) {
  const elements = [];
  switch (decorType) {
    case "fire":
      // 火焰元素
      for (let i = 0; i < 5; i++) {
        const x = 80 + rng() * 440;
        const y = 60 + rng() * 120;
        const h = 30 + rng() * 40;
        elements.push(`<path d="M ${x},${y+h} Q ${x-10},${y+h/2} ${x},${y} Q ${x+10},${y+h/2} ${x},${y+h} Z" fill="rgba(255,200,100,0.15)" filter="url(#inkBlur2)"/>`);
      }
      break;
    case "cloud":
      // 祥云元素
      for (let i = 0; i < 4; i++) {
        const x = 80 + rng() * 440;
        const y = 50 + rng() * 100;
        const r = 20 + rng() * 25;
        elements.push(`<ellipse cx="${x}" cy="${y}" rx="${r*1.5}" ry="${r*0.6}" fill="rgba(255,255,255,0.08)" filter="url(#inkBlur2)"/>`);
        elements.push(`<ellipse cx="${x+r}" cy="${y-5}" rx="${r}" ry="${r*0.5}" fill="rgba(255,255,255,0.06)" filter="url(#inkBlur2)"/>`);
      }
      break;
    case "lightning":
      // 雷电元素
      for (let i = 0; i < 3; i++) {
        const x = 100 + rng() * 400;
        const y = 50 + rng() * 80;
        elements.push(`<path d="M ${x},${y} L ${x-8},${y+20} L ${x+4},${y+25} L ${x-6},${y+50}" fill="none" stroke="rgba(255,255,200,0.2)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      }
      break;
    case "water":
      // 水纹元素
      for (let i = 0; i < 5; i++) {
        const x = 60 + rng() * 480;
        const y = 60 + rng() * 100;
        const w = 40 + rng() * 30;
        elements.push(`<path d="M ${x},${y} Q ${x+w/4},${y-8} ${x+w/2},${y} T ${x+w},${y}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      }
      break;
    case "mountain":
      // 山形元素
      for (let i = 0; i < 3; i++) {
        const x = 80 + i * 180 + rng() * 40;
        const y = 80 + rng() * 40;
        const w = 80 + rng() * 40;
        const h = 50 + rng() * 30;
        elements.push(`<path d="M ${x},${y+h} L ${x+w/2},${y} L ${x+w},${y+h} Z" fill="rgba(255,255,255,0.06)" filter="url(#inkBlur)"/>`);
      }
      break;
    case "snake":
      // 蛇形曲线
      for (let i = 0; i < 3; i++) {
        const x = 80 + rng() * 440;
        const y = 60 + rng() * 100;
        elements.push(`<path d="M ${x},${y} Q ${x+20},${y-15} ${x+40},${y} T ${x+80},${y}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2.5" filter="url(#inkBlur2)"/>`);
      }
      break;
    case "wind":
      // 风纹
      for (let i = 0; i < 4; i++) {
        const x = 80 + rng() * 440;
        const y = 50 + rng() * 100;
        const r = 15 + rng() * 20;
        elements.push(`<path d="M ${x},${y} A ${r},${r} 0 0,1 ${x+r*1.5},${y+r*0.3}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      }
      break;
  }
  return elements.join("\n");
}

function generateBeastSVG(beast, index) {
  const rng = seededRandom(index * 137 + 99);
  const [colorA, colorB] = beast.grad;

  const defs = `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colorA}"/>
        <stop offset="100%" stop-color="${colorB}"/>
      </linearGradient>
      <radialGradient id="centerGlow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="${lightenColor(colorA, 60)}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${colorB}" stop-opacity="0"/>
      </radialGradient>
      ${paperTextureFilter()}
      ${inkBlurFilter()}
    </defs>
  `;

  // 背景水印大字
  const watermarkText = `
    <text x="300" y="230" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="140" 
          font-weight="bold"
          fill="rgba(255,255,255,0.12)"
          letter-spacing="8">${beast.name}</text>
  `;

  // 装饰性水墨圈
  const inkCircle = `
    <circle cx="300" cy="180" r="100" fill="rgba(255,255,255,0.05)" filter="url(#inkBlur)"/>
    <circle cx="300" cy="180" r="80" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
    <circle cx="300" cy="180" r="65" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  `;

  // 装饰元素
  const decorElements = generateDecorElements(beast.decor, rng);

  // 墨点
  const splashes = generateInkSplashes(rng, 10, 300, 200, 250, [0.03, 0.12]);

  // 底部标签条
  const labelBar = `
    <rect x="0" y="360" width="600" height="40" fill="rgba(0,0,0,0.25)"/>
    <text x="30" y="385" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="14" 
          fill="rgba(255,255,255,0.7)"
          letter-spacing="2">${beast.category} · ${beast.chapter}</text>
    <text x="570" y="385" 
          text-anchor="end"
          font-family="Noto Serif CJK SC, serif" 
          font-size="14" 
          fill="rgba(255,255,255,0.5)"
          letter-spacing="2">${beast.name}</text>
  `;

  // 对角线装饰（卷轴折痕）
  const diagonal = `
    <line x1="0" y1="0" x2="600" y2="400" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
  `;

  // 左上角装饰
  const cornerDecor = `
    <path d="M 20,50 L 20,30 L 40,30" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
    <path d="M 580,50 L 580,30 L 560,30" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
  `;

  return `<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
    ${defs}
    <rect width="600" height="400" fill="url(#bgGrad)"/>
    <rect width="600" height="400" fill="url(#centerGlow)"/>
    <rect width="600" height="400" filter="url(#paperNoise)" opacity="0.3"/>
    ${diagonal}
    ${decorElements}
    ${inkCircle}
    ${splashes}
    ${watermarkText}
    ${cornerDecor}
    ${labelBar}
  </svg>`;
}

// ============================================================
// 诗词封面生成 (800x450)
// ============================================================

const poems = [
  { id: "guanju", title: "关雎", author: "《诗经》", theme: "#5b8c5a", motif: "river", verse: "关关雎鸠，在河之洲" },
  { id: "duangexing", title: "短歌行", author: "曹操", theme: "#1a5276", motif: "moon", verse: "月明星稀，乌鹊南飞" },
  { id: "yumeiren", title: "虞美人", author: "李煜", theme: "#8e44ad", motif: "flower", verse: "春花秋月何时了" },
  { id: "tianjingzha", title: "天净沙·秋思", author: "马致远", theme: "#7d6608", motif: "tree", verse: "枯藤老树昏鸦" },
  { id: "shengshengman", title: "声声慢", author: "李清照", theme: "#5d6d7e", motif: "rain", verse: "梧桐更兼细雨" },
  { id: "denggao", title: "登高", author: "杜甫", theme: "#6e2c00", motif: "mountain", verse: "无边落木萧萧下" },
  { id: "jueju", title: "绝句", author: "杜甫", theme: "#16a34a", motif: "bird", verse: "两个黄鹂鸣翠柳" },
  { id: "liangzhouci", title: "凉州词", author: "王翰", theme: "#b45309", motif: "wine", verse: "葡萄美酒夜光杯" },
  { id: "huixiang", title: "回乡偶书", author: "贺知章", theme: "#0d9488", motif: "road", verse: "少小离家老大回" },
  { id: "jiuyue", title: "九月九日忆山东兄弟", author: "王维", theme: "#7c3aed", motif: "mountain", verse: "独在异乡为异客" },
  { id: "huanghelou", title: "黄鹤楼送孟浩然之广陵", author: "李白", theme: "#ec4899", motif: "river", verse: "孤帆远影碧空尽" },
  { id: "baidi", title: "早发白帝城", author: "李白", theme: "#0ea5e9", motif: "mountain", verse: "轻舟已过万重山" },
  { id: "zhuliguang", title: "竹里馆", author: "王维", theme: "#059669", motif: "bamboo", verse: "独坐幽篁里" },
  { id: "chunri", title: "春日", author: "朱熹", theme: "#e11d48", motif: "flower", verse: "万紫千红总是春" },
  { id: "shier", title: "示儿", author: "陆游", theme: "#b91c1c", motif: "mountain", verse: "王师北定中原日" },
];

function generatePoetryMotif(motif, rng) {
  const elements = [];
  switch (motif) {
    case "river":
      // 河流：水波线
      for (let i = 0; i < 4; i++) {
        const y = 80 + i * 30;
        elements.push(`<path d="M 100,${y} Q 200,${y-12} 300,${y} T 500,${y} T 700,${y}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      }
      // 小鸟轮廓
      elements.push(`<path d="M 180,60 Q 190,50 200,60 Q 210,50 220,60" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`);
      break;
    case "moon":
      // 月亮
      elements.push(`<circle cx="600" cy="100" r="50" fill="rgba(255,255,255,0.15)" filter="url(#inkBlur)"/>`);
      elements.push(`<circle cx="600" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>`);
      // 云纹
      for (let i = 0; i < 3; i++) {
        const x = 100 + i * 200;
        const y = 120 + rng() * 30;
        elements.push(`<ellipse cx="${x}" cy="${y}" rx="40" ry="8" fill="rgba(255,255,255,0.06)" filter="url(#inkBlur2)"/>`);
      }
      break;
    case "flower":
      // 花瓣
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60) * Math.PI / 180;
        const x = 400 + Math.cos(angle) * 30;
        const y = 100 + Math.sin(angle) * 30;
        elements.push(`<ellipse cx="${x}" cy="${y}" rx="15" ry="25" fill="rgba(255,255,255,0.1)" transform="rotate(${i*60} ${x} ${y})" filter="url(#inkBlur2)"/>`);
      }
      elements.push(`<circle cx="400" cy="100" r="12" fill="rgba(255,255,255,0.2)" filter="url(#inkBlur2)"/>`);
      break;
    case "tree":
      // 老树
      elements.push(`<path d="M 200,200 L 200,80 M 200,120 L 170,90 M 200,100 L 230,70 M 200,140 L 175,120 M 200,130 L 225,110" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      elements.push(`<path d="M 600,200 L 600,100 M 600,130 L 575,105 M 600,110 L 625,85" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      break;
    case "rain":
      // 细雨
      for (let i = 0; i < 15; i++) {
        const x = 80 + rng() * 640;
        const y = 50 + rng() * 100;
        const h = 15 + rng() * 20;
        elements.push(`<line x1="${x}" y1="${y}" x2="${x-3}" y2="${y+h}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`);
      }
      break;
    case "mountain":
      // 山形
      for (let i = 0; i < 3; i++) {
        const x = 120 + i * 250;
        const w = 100 + rng() * 40;
        const h = 60 + rng() * 30;
        elements.push(`<path d="M ${x},${180} L ${x+w/2},${180-h} L ${x+w},${180} Z" fill="rgba(255,255,255,0.08)" filter="url(#inkBlur)"/>`);
      }
      break;
    case "bird":
      // 飞鸟
      for (let i = 0; i < 3; i++) {
        const x = 150 + i * 200;
        const y = 80 + rng() * 40;
        elements.push(`<path d="M ${x},${y} Q ${x+10},${y-8} ${x+20},${y} Q ${x+30},${y-8} ${x+40},${y}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`);
      }
      break;
    case "wine":
      // 酒杯
      elements.push(`<path d="M 380,80 L 420,80 L 415,110 L 385,110 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      elements.push(`<line x1="400" y1="110" x2="400" y2="130" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>`);
      elements.push(`<ellipse cx="400" cy="135" rx="20" ry="5" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>`);
      break;
    case "road":
      // 古道
      elements.push(`<path d="M 100,200 Q 300,160 500,180 T 700,170" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3" filter="url(#inkBlur2)"/>`);
      elements.push(`<path d="M 150,230 Q 350,190 550,210 T 700,200" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="2" filter="url(#inkBlur2)"/>`);
      break;
    case "bamboo":
      // 竹子
      for (let i = 0; i < 4; i++) {
        const x = 150 + i * 150;
        elements.push(`<line x1="${x}" y1="200" x2="${x}" y2="50" stroke="rgba(255,255,255,0.12)" stroke-width="3" filter="url(#inkBlur2)"/>`);
        // 竹叶
        const leafY = 70 + rng() * 80;
        elements.push(`<path d="M ${x},${leafY} L ${x-15},${leafY-5}" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>`);
        elements.push(`<path d="M ${x},${leafY+10} L ${x+15},${leafY+5}" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>`);
      }
      break;
  }
  return elements.join("\n");
}

function generatePoetrySVG(poem, index) {
  const rng = seededRandom(index * 211 + 77);
  const theme = poem.theme;
  const lightTheme = lightenColor(theme, 80);
  const darkTheme = darkenColor(theme, 20);

  const defs = `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${lightTheme}"/>
        <stop offset="100%" stop-color="${darkTheme}"/>
      </linearGradient>
      <radialGradient id="centerGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${lightenColor(theme, 100)}" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="${darkTheme}" stop-opacity="0"/>
      </radialGradient>
      ${paperTextureFilter()}
      ${inkBlurFilter()}
    </defs>
  `;

  // 意境线条画
  const motifElements = generatePoetryMotif(poem.motif, rng);

  // 墨点
  const splashes = generateInkSplashes(rng, 8, 400, 225, 350, [0.02, 0.08]);

  // 诗名
  const titleFontSize = poem.title.length > 6 ? 42 : 56;
  const titleText = `
    <text x="400" y="280" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="${titleFontSize}" 
          font-weight="bold"
          fill="rgba(255,255,255,0.9)"
          letter-spacing="4">${poem.title}</text>
  `;

  // 作者
  const authorText = `
    <text x="400" y="320" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="18" 
          fill="rgba(255,255,255,0.6)"
          letter-spacing="3">${poem.author}</text>
  `;

  // 诗句
  const verseText = `
    <text x="400" y="400" 
          text-anchor="middle" 
          font-family="Noto Serif CJK SC, serif" 
          font-size="16" 
          fill="rgba(255,255,255,0.4)"
          letter-spacing="2">${poem.verse}</text>
  `;

  // 底部装饰线
  const decorLine = `
    <line x1="300" y1="340" x2="500" y2="340" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    <circle cx="400" cy="340" r="3" fill="rgba(255,255,255,0.2)"/>
  `;

  return `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
    ${defs}
    <rect width="800" height="450" fill="url(#bgGrad)"/>
    <rect width="800" height="450" fill="url(#centerGlow)"/>
    <rect width="800" height="450" filter="url(#paperNoise)" opacity="0.3"/>
    ${motifElements}
    ${splashes}
    ${titleText}
    ${authorText}
    ${decorLine}
    ${verseText}
  </svg>`;
}

// ============================================================
// 主函数
// ============================================================

async function generateAll() {
  console.log("开始生成水墨风格图片...\n");

  // 确保目录存在
  await mkdir(join(OUTPUT_BASE, "characters"), { recursive: true });
  await mkdir(join(OUTPUT_BASE, "beasts"), { recursive: true });
  await mkdir(join(OUTPUT_BASE, "poetry"), { recursive: true });

  // 生成人物头像
  console.log("生成 6 张人物头像...");
  for (let i = 0; i < characters.length; i++) {
    const char = characters[i];
    const svg = generateCharacterSVG(char, i);
    const outputPath = join(OUTPUT_BASE, "characters", `${char.id}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log(`  [OK] ${char.id}.webp (${char.surname} - ${char.title})`);
  }

  // 生成异兽插画
  console.log("\n生成 21 张异兽插画...");
  for (let i = 0; i < beasts.length; i++) {
    const beast = beasts[i];
    const svg = generateBeastSVG(beast, i);
    const outputPath = join(OUTPUT_BASE, "beasts", `${beast.id}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log(`  [OK] ${beast.id}.webp (${beast.name} - ${beast.category})`);
  }

  // 生成诗词封面
  console.log("\n生成 15 张诗词封面...");
  for (let i = 0; i < poems.length; i++) {
    const poem = poems[i];
    const svg = generatePoetrySVG(poem, i);
    const outputPath = join(OUTPUT_BASE, "poetry", `${poem.id}.webp`);
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log(`  [OK] ${poem.id}.webp (${poem.title} - ${poem.author})`);
  }

  console.log("\n全部完成！共生成 42 张图片。");
}

generateAll().catch((err) => {
  console.error("生成失败:", err);
  process.exit(1);
});
