import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGE_DIRS = [
  'public/images/beasts',
  'public/images/characters',
  'public/images/poetry',       // 诗词封面图直接在此目录下
  'public/images/poetry/lines',
];

const RESIZE_CONFIG = {
  'public/images/beasts': { width: 512 },         // 原始 1024x1024，卡片最多显示 400px
  'public/images/characters': { width: 512 },      // 原始 1024x1024，头像最多显示 300px
  'public/images/poetry': { width: 640 },          // 诗词封面
  'public/images/poetry/lines': { width: 1280 },   // 原始 1920x1440，全屏沉浸阅读够用
};

let totalBefore = 0;
let totalAfter = 0;
let processedCount = 0;

for (const dir of IMAGE_DIRS) {
  const fullDir = path.resolve(dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
  const config = RESIZE_CONFIG[dir] || { width: 800 };

  for (const file of files) {
    const filePath = path.join(fullDir, file);
    const stat = fs.statSync(filePath);
    const sizeBefore = stat.size;
    totalBefore += sizeBefore;

    const buffer = await sharp(filePath)
      .resize({ width: config.width, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    totalAfter += buffer.length;

    // 只有变小了才覆盖
    if (buffer.length < sizeBefore) {
      fs.writeFileSync(filePath, buffer);
      const pct = ((1 - buffer.length / sizeBefore) * 100).toFixed(0);
      console.log(`✅ ${dir}/${file}: ${(sizeBefore/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB (-${pct}%)`);
    } else {
      totalAfter = totalAfter - buffer.length + sizeBefore;
      console.log(`⏭️ ${dir}/${file}: 已经够小，跳过`);
    }
    processedCount++;
  }
}

console.log(`\n📊 处理 ${processedCount} 张图片`);
console.log(`   压缩前: ${(totalBefore/1024/1024).toFixed(1)}MB`);
console.log(`   压缩后: ${(totalAfter/1024/1024).toFixed(1)}MB`);
console.log(`   节省:   ${((1 - totalAfter/totalBefore) * 100).toFixed(0)}%`);
