/**
 * 已知存在的图片文件清单。
 * 用于在客户端预先判断图片是否存在，避免 next/image 对不存在的文件发起请求导致 400 错误。
 * 当 public/images/ 下新增文件时，需同步更新此清单。
 */

const existingBeasts = new Set([
  "boyi", "chiru", "congcong", "feiyiniao", "feiyishe", "guanguan",
  "jingwei", "jiuhuweiu", "luanniao", "lushu", "qianyang", "qiuyu",
  "tiangou", "tushu", "xiangliu", "xingxing", "xuangui", "yongyong",
  "zhujian", "zhulong",
]);

const existingCharacters = new Set([
  "caocao", "kongzi", "libai", "liqingzhao", "quyuan", "sushi",
  "wangyangming", "zhuangzi", "zhugeliang",
]);

const existingPoetry = new Set([
  "chunxiao", "chusai", "dengguan", "fengqiao", "jiangjinjiu",
  "jiangxue", "jingyesi", "lushan", "minnong", "shuidiaogetou",
  "songyanji", "xiangsi",
]);

function extractFilename(path: string): string | null {
  const filename = path.split("/").pop()?.replace(/\.\w+$/, "");
  return filename || null;
}

export function beastImageExists(imagePath: string): boolean {
  const name = extractFilename(imagePath);
  return name ? existingBeasts.has(name) : false;
}

export function characterImageExists(avatarPath: string): boolean {
  const name = extractFilename(avatarPath);
  return name ? existingCharacters.has(name) : false;
}

export function poemImageExists(coverImage: string): boolean {
  const name = extractFilename(coverImage);
  return name ? existingPoetry.has(name) : false;
}
