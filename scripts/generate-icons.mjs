import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SOURCE = path.resolve('public/icon.png');
const OUT_DIR = path.resolve('public/icons');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-maskable-512.png', size: 512 },  // maskable 需要安全区域内的图标
];

for (const { name, size } of sizes) {
  await sharp(SOURCE)
    .resize(size, size)
    .png({ quality: 90 })
    .toFile(path.join(OUT_DIR, name));
  console.log(`✅ 生成 ${name} (${size}x${size})`);
}

// 同时压缩 user-avatar.jpg（当前 1920x1920, 403KB，实际显示仅 40px）
const avatarPath = path.resolve('public/images/user-avatar.jpg');
if (fs.existsSync(avatarPath)) {
  await sharp(avatarPath)
    .resize(128, 128)
    .jpeg({ quality: 80 })
    .toFile(avatarPath + '.tmp');
  fs.renameSync(avatarPath + '.tmp', avatarPath);
  const stat = fs.statSync(avatarPath);
  console.log(`✅ 压缩 user-avatar.jpg → ${(stat.size/1024).toFixed(0)}KB`);
}

console.log('\n图标生成完成！');
