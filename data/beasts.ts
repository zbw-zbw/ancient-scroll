export type BeastCategory = "beast" | "bird" | "fish" | "serpent";

export interface Beast {
  id: string;
  name: string;
  chapter: string;
  category: BeastCategory;
  originalText: string;
  translation: string;
  traits: string[];
  gradient: [string, string];
  imagePath: string;
  description: string;
}

export const beasts: Beast[] = [
  {
    id: "nine-tailed-fox",
    name: "九尾狐",
    chapter: "南山经",
    category: "beast",
    originalText: "有兽焉，其状如狐而九尾，其音如婴儿，能食人，食者不蛊。",
    translation:
      "山中有一种兽，形状像狐狸却有九条尾巴，叫声像婴儿啼哭，能吃人，但吃了它的肉可以不受妖邪蛊毒之害。",
    traits: ["九尾", "声如婴儿", "辟邪"],
    gradient: ["#f43f5e", "#fb923c"],
    imagePath: "/images/beasts/jiuhuweiu.png",
    description:
      "九尾狐是山海经中最著名的异兽之一。它拥有九条蓬松的大尾巴，叫声凄婉如婴儿啼哭。在上古时代，九尾狐并非妖邪的象征，而是祥瑞之兆——据说大禹的妻子涂山女就是九尾狐所化。",
  },
  {
    id: "xingsheng",
    name: "狌狌",
    chapter: "南山经",
    category: "beast",
    originalText: "有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。",
    translation:
      "山中有一种兽，形状像猿猴，长着白色耳朵，既能匍匐爬行又能直立行走，名叫狌狌，吃了它的肉就能健步如飞。",
    traits: ["白耳", "人走", "食之善走"],
    gradient: ["#a8a29e", "#d6d3d1"],
    imagePath: "/images/beasts/xingxing.png",
    description:
      "狌狌是一种介于猿猴和人之间的神秘生物。它最奇特的地方在于能够像人一样直立行走，这在远古先民眼中无疑是极为不可思议的景象。",
  },
  {
    id: "lusu",
    name: "鹿蜀",
    chapter: "西山经",
    category: "beast",
    originalText:
      "有兽焉，其状如马而白首，其文如虎而赤尾，其音如谣，名曰鹿蜀，佩之宜子孙。",
    translation:
      "山中有一种兽，形状像马，白色的头，身上花纹像老虎，红色的尾巴，叫声像人唱歌，名叫鹿蜀，佩戴它的皮毛有利于子孙繁衍。",
    traits: ["马形虎纹", "白首赤尾", "声如歌谣"],
    gradient: ["#f59e0b", "#ea580c"],
    imagePath: "/images/beasts/lushu.png",
    description:
      "鹿蜀集合了马的雄健、虎的威猛和歌者的灵性于一身。它白色的头颅和赤红的尾巴在山林间格外醒目，宛如一道流动的彩虹。",
  },
  {
    id: "qianyang",
    name: "羬羊",
    chapter: "西山经",
    category: "beast",
    originalText: "有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。",
    translation:
      "山中有一种兽，形状像羊却长着马尾巴，名叫羬羊，它的油脂可以治疗皮肤干裂。",
    traits: ["羊形马尾", "脂可治病"],
    gradient: ["#e7e5e4", "#a8a29e"],
    imagePath: "/images/beasts/qianyang.png",
    description:
      "羬羊外表平凡——不过是一只长着马尾巴的羊，却蕴含着治愈的力量。它的油脂能滋润干裂的皮肤，在缺医少药的远古时代，这无疑是一味珍贵的天然良药。",
  },
  {
    id: "boyi",
    name: "猼訑",
    chapter: "南山经",
    category: "beast",
    originalText:
      "有兽焉，其状如羊，九尾四耳，其目在背，其名曰猼訑，佩之不畏。",
    translation:
      "山中有一种兽，形状像羊，九条尾巴四只耳朵，眼睛长在背上，名叫猼訑，佩戴它的皮毛就不会恐惧。",
    traits: ["九尾四耳", "目在背", "辟邪"],
    gradient: ["#7c3aed", "#a78bfa"],
    imagePath: "/images/beasts/boyi.png",
    description:
      "猼訑是山海经中最怪异的异兽之一。想象一只羊，却有九条尾巴、四只耳朵，最骇人的是——它的眼睛长在背上，仿佛永远在注视身后的世界。",
  },
  {
    id: "qiuyu",
    name: "犰狳",
    chapter: "东山经",
    category: "beast",
    originalText:
      "有兽焉，其状如兔而鸟喙，鸱目蛇尾，见人则眠，名曰犰狳。",
    translation:
      "山中有一种兽，形状像兔子却有鸟嘴，猫头鹰般的眼睛和蛇一样的尾巴，见到人就装死，名叫犰狳。",
    traits: ["兔形鸟喙", "见人则眠"],
    gradient: ["#0ea5e9", "#67e8f9"],
    imagePath: "/images/beasts/qiuyu.png",
    description:
      "犰狳集合了四种动物的特征：兔子的身体、鸟的嘴巴、猫头鹰的眼睛和蛇的尾巴。最有趣的是它遇到危险就装死的本能——现代的犰狳（穿山甲类）也有类似的蜷缩防御行为。",
  },
  {
    id: "zhujian",
    name: "诸犍",
    chapter: "北山经",
    category: "beast",
    originalText:
      "有兽焉，其状如豹而长尾，人首而牛耳，一目，名曰诸犍，善吒。",
    translation:
      "山中有一种兽，形状像豹子，尾巴很长，人的面孔牛的耳朵，只有一只眼睛，名叫诸犍，善于长啸。",
    traits: ["豹形人首", "一目", "善啸"],
    gradient: ["#1e293b", "#475569"],
    imagePath: "/images/beasts/zhujian.png",
    description:
      "诸犍拥有令人不寒而栗的外貌：豹子般矫健的身躯之上，却顶着一张人脸，额头正中只有一只硕大的眼睛。它的长啸声在北方群山间回荡，令百兽惊惧。",
  },
  {
    id: "congcong",
    name: "从从",
    chapter: "东山经",
    category: "beast",
    originalText: "有兽焉，其状如犬，六足，其名曰从从，其鸣自詨。",
    translation:
      "山中有一种兽，形状像狗却长着六只脚，名叫从从，叫声就像在呼唤自己的名字。",
    traits: ["犬形六足", "鸣声自呼"],
    gradient: ["#854d0e", "#ca8a04"],
    imagePath: "/images/beasts/congcong.png",
    description:
      "从从是一种六足犬形异兽，比普通的狗多了一对腿。它最特别的地方是叫声——'从从、从从'，就像在不停地报出自己的名字，因此古人以其叫声为它命名。",
  },
  {
    id: "jingwei",
    name: "精卫",
    chapter: "北山经",
    category: "bird",
    originalText:
      "有鸟焉，其状如乌，文首，白喙，赤足，名曰精卫，其鸣自詨。",
    translation:
      "山中有一种鸟，形状像乌鸦，头上有花纹，白色的嘴，红色的脚，名叫精卫，叫声如同在呼唤自己的名字。",
    traits: ["花纹头", "白喙赤足", "炎帝之女"],
    gradient: ["#dc2626", "#f97316"],
    imagePath: "/images/beasts/jingwei.png",
    description:
      "精卫原是炎帝的小女儿女娃，在东海溺亡后化为此鸟。她日复一日地衔着西山的树枝和石子去填塞东海，这份不屈不挠的执着，成为中华民族抗争精神的永恒象征。",
  },
  {
    id: "luanbird",
    name: "鸾鸟",
    chapter: "西山经",
    category: "bird",
    originalText: "有鸟焉，其状如翟而五采文，名曰鸾鸟，见则天下安宁。",
    translation:
      "山中有一种鸟，形状像野鸡，长着五彩斑斓的羽毛，名叫鸾鸟，它出现就预示天下太平。",
    traits: ["五彩羽毛", "祥瑞之兆"],
    gradient: ["#2563eb", "#8b5cf6"],
    imagePath: "/images/beasts/luanniao.png",
    description:
      "鸾鸟是与凤凰齐名的神鸟，浑身覆盖着五彩华丽的羽毛。它的出现被视为天下太平的吉兆，是上古时代最受尊崇的祥瑞之一。",
  },
  {
    id: "tiangou",
    name: "天狗",
    chapter: "西山经",
    category: "bird",
    originalText: "有兽焉，其状如狸而白首，名曰天狗，其音如榴榴，可以御凶。",
    translation:
      "山中有一种兽，形状像野猫，白色的头，名叫天狗，叫声像'榴榴'，可以抵御凶邪。",
    traits: ["狸形白首", "御凶辟邪"],
    gradient: ["#f1f5f9", "#94a3b8"],
    imagePath: "/images/beasts/tiangou.png",
    description:
      "天狗虽名为'狗'，实际上更像一只白头的野猫。它的叫声奇特，古人相信饲养天狗可以驱邪避凶，保佑家宅平安。",
  },
  {
    id: "shushu-bird",
    name: "𪃟鼠鸟",
    chapter: "东山经",
    category: "bird",
    originalText:
      "有鸟焉，其状如鸡而鼠毛，其名曰𪃟鼠，见则其邑大旱。",
    translation:
      "山中有一种鸟，形状像鸡却长着老鼠一样的毛，名叫㶟鼠鸟，它出现当地就会大旱。",
    traits: ["鸡形鼠毛", "旱灾预兆"],
    gradient: ["#d97706", "#fbbf24"],
    imagePath: "/images/beasts/tushu.png",
    description:
      "㶟鼠鸟是一种不祥之鸟，长着鸡的身体却覆盖着鼠毛般粗糙的羽毛。古人将旱灾与它的出现联系在一起，视其为天灾的预警信号。",
  },
  {
    id: "qinggeng",
    name: "青耕",
    chapter: "南山经",
    category: "bird",
    originalText: "有鸟焉，其状如鸠，其音若呵，名曰青耕，佩之不惑。",
    translation:
      "山中有一种鸟，形状像斑鸠，叫声像人在呵斥，名叫青耕，佩戴它的羽毛可以使人不受迷惑。",
    traits: ["鸠形", "声如呵斥", "辟惑"],
    gradient: ["#059669", "#34d399"],
    imagePath: "/images/beasts/guanguan.png",
    description:
      "青耕看似普通，形似家常的斑鸠，但它的叫声严厉如同长者的呵斥。古人相信佩戴它的羽毛能让人保持头脑清醒，不被妖邪迷惑。",
  },
  {
    id: "feiyi-bird",
    name: "肥遗鸟",
    chapter: "西山经",
    category: "bird",
    originalText: "有鸟焉，其状如鹑，黄身而赤喙，名曰肥遗，食之已疠。",
    translation:
      "山中有一种鸟，形状像鹌鹑，黄色身体红色嘴巴，名叫肥遗，吃了它的肉可以治愈麻风病。",
    traits: ["鹑形", "黄身赤喙", "治疗疾病"],
    gradient: ["#eab308", "#fde047"],
    imagePath: "/images/beasts/feiyiniao.png",
    description:
      "肥遗鸟小巧可爱，鹌鹑般的体型，一身鲜亮的黄色羽毛配上红色的小嘴。别看它不起眼，在缺医少药的上古时代，它被视为能治愈可怕疫病的神鸟。",
  },
  {
    id: "yongyong-fish",
    name: "鳙鳙鱼",
    chapter: "东山经",
    category: "fish",
    originalText: "其中多鳙鳙之鱼，其状如犁牛，其音如彘鸣。",
    translation: "水中有许多鳙鳙鱼，形状像水牛，叫声像猪叫。",
    traits: ["牛形", "声如猪鸣"],
    gradient: ["#0284c7", "#38bdf8"],
    imagePath: "/images/beasts/yongyong.png",
    description:
      "鳙鳙鱼是一种体型如水牛般巨大的鱼类，发出的声音却像猪叫。在山海经的世界里，水下同样藏着无数超乎想象的庞然大物。",
  },
  {
    id: "chirun",
    name: "赤鱬",
    chapter: "南山经",
    category: "fish",
    originalText: "有鱼焉，其状如鱼而人面，其音如鸳鸯，食之不疥。",
    translation:
      "水中有一种鱼，形状像普通的鱼却长着人脸，叫声像鸳鸯，吃了可以治愈疥疮。",
    traits: ["鱼身人面", "声如鸳鸯"],
    gradient: ["#e11d48", "#f472b6"],
    imagePath: "/images/beasts/chiru.png",
    description:
      "赤鱬是山海经中最令人不安的水族之一——鱼的身体上顶着一张人脸。它发出的声音婉转如鸳鸯对鸣，在幽暗的水下回荡，亦真亦幻。",
  },
  {
    id: "xuangui",
    name: "旋龟",
    chapter: "南山经",
    category: "fish",
    originalText:
      "有龟焉，其状如龟而鸟首虺尾，其名曰旋龟，其音如判木，佩之不聋。",
    translation:
      "水中有一种龟，形状像普通的龟却长着鸟头蛇尾，名叫旋龟，叫声如同劈木头，佩戴它可以治愈耳聋。",
    traits: ["龟身鸟首蛇尾", "声如劈木", "治聋"],
    gradient: ["#16a34a", "#4ade80"],
    imagePath: "/images/beasts/xuangui.png",
    description:
      "旋龟融合了龟、鸟、蛇三种动物的特征，堪称水中的奇幻混搭。它的叫声震耳欲聋如同劈柴，但佩戴它反而能治愈耳疾——山海经中处处可见这种以毒攻毒的朴素辩证思维。",
  },
  {
    id: "feiyi-snake",
    name: "肥遗蛇",
    chapter: "西山经",
    category: "serpent",
    originalText: "有蛇焉，六足四翼，其名曰肥遗，见则天下大旱。",
    translation:
      "山中有一种蛇，长着六只脚四只翅膀，名叫肥遗，它出现就预示天下大旱。",
    traits: ["六足四翼", "旱灾预兆"],
    gradient: ["#b91c1c", "#ef4444"],
    imagePath: "/images/beasts/feiyishe.png",
    description:
      "肥遗蛇是山海经中最奇异的蛇类——一条蛇居然长着六只脚和四只翅膀。它的出现被视为大旱的凶兆，古人对它既畏惧又敬畏。",
  },
  {
    id: "xiangliu",
    name: "相柳",
    chapter: "海内经",
    category: "serpent",
    originalText: "共工之臣曰相柳氏，九首，以食于九山。",
    translation: "共工的臣子叫相柳，长着九个脑袋，同时在九座山上进食。",
    traits: ["九首", "共工之臣", "贪婪"],
    gradient: ["#166534", "#15803d"],
    imagePath: "/images/beasts/xiangliu.png",
    description:
      "相柳是水神共工的臣子，拥有九个蛇头，身躯庞大到能同时趴在九座山上进食。它所经之处土地变为沼泽，水源变为苦涩，是上古神话中贪婪与破坏的化身。",
  },
  {
    id: "zhulong",
    name: "烛龙",
    chapter: "海内经",
    category: "serpent",
    originalText:
      "有神，人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明，不食不寝不息。",
    translation:
      "有一位神灵，人面蛇身，通体赤红，眼睛竖着长。他闭眼就是黑夜，睁眼就是白天，不吃不睡不呼吸。",
    traits: ["人面蛇身", "掌控昼夜", "创世神"],
    gradient: ["#dc2626", "#7f1d1d"],
    imagePath: "/images/beasts/zhulong.png",
    description:
      "烛龙是山海经中最强大的存在之一，人面蛇身，通体赤红如烈焰。他的眼睛掌控着昼夜更替——睁眼为昼，闭眼为夜。他不食不眠，永恒地守望在世界的尽头，是中国最古老的创世神话之一。",
  },
];

export const categoryLabels: Record<BeastCategory, string> = {
  beast: "兽类",
  bird: "禽类",
  fish: "鱼类",
  serpent: "蛇类",
};

export const categoryCounts: Record<BeastCategory | "all", number> = {
  all: beasts.length,
  beast: beasts.filter((b) => b.category === "beast").length,
  bird: beasts.filter((b) => b.category === "bird").length,
  fish: beasts.filter((b) => b.category === "fish").length,
  serpent: beasts.filter((b) => b.category === "serpent").length,
};
