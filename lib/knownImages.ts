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
  // 新生成的水墨风格异兽插画
  "bifang", "chenghuang", "kuiniu", "yinglong", "jiufeng", "qiangliang",
  "feilian", "zhuhuai", "minniao", "feiwei", "kuafu", "xingtian",
  "yingzhao", "tianwu", "dijiang", "mingshe", "dangkang", "luyu",
  "shuhu", "baize", "zhuyan",
  // .jpg 格式的异兽图片（磁盘上存在但之前未注册）
  "fenghuang", "luwu", "nuba", "qiongqi", "xiwangmu",
  // 新增异兽图片
  "huashe", "gudiao",
  // 第三批：补全所有缺失异兽插图（水墨风格 .jpg）
  "zhuanyu", "yu", "hujiao", "quru", "tulou", "jiao", "manman", "mafu",
  "huanshu", "yayu", "feishu", "linghu", "xiangshe", "suanyu", "paoxiao",
  "zishu", "zhenyu", "hanyu", "heyu", "fei", "xiegou", "jianmu", "bingyi",
  "yan", "xuncao", "wuluo", "haoyu", "wenlin",
  "diren", "si", "bashe", "maoma", "kaimingshou", "wei", "fuchangniao",
  "shuniao", "shewu", "daxie", "lingyu", "jubishi", "penglai", "leishen",
  "wangziyeshi", "juyan",
]);

const existingCharacters = new Set([
  "caocao", "kongzi", "libai", "liqingzhao", "quyuan", "sushi",
  "wangyangming", "zhuangzi", "zhugeliang",
  // 新生成的水墨风格人物头像
  "dufu", "xinqiji", "taoyuanming", "wuzetian", "simaqian", "baijuyi",
]);

const existingPoetry = new Set([
  "chunxiao", "chusai", "dengguan", "fengqiao", "jiangjinjiu",
  "jiangxue", "jingyesi", "lushan", "minnong", "shuidiaogetou",
  "songyanji", "xiangsi",
  // 新生成的水墨风格诗词封面
  "guanju", "duangexing", "yumeiren", "tianjingzha", "shengshengman",
  "denggao", "jueju", "liangzhouci", "huixiang", "jiuyue",
  "huanghelou", "baidi", "zhuliguang", "chunri", "shier",
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
