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
    imagePath: "/images/beasts/jiuhuweiu.webp",
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
    imagePath: "/images/beasts/xingxing.webp",
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
    imagePath: "/images/beasts/lushu.webp",
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
    imagePath: "/images/beasts/qianyang.webp",
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
    imagePath: "/images/beasts/boyi.webp",
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
    imagePath: "/images/beasts/qiuyu.webp",
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
    imagePath: "/images/beasts/zhujian.webp",
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
    imagePath: "/images/beasts/congcong.webp",
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
    imagePath: "/images/beasts/jingwei.webp",
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
    imagePath: "/images/beasts/luanniao.webp",
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
    imagePath: "/images/beasts/tiangou.webp",
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
    imagePath: "/images/beasts/tushu.webp",
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
    imagePath: "/images/beasts/guanguan.webp",
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
    imagePath: "/images/beasts/feiyiniao.webp",
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
    imagePath: "/images/beasts/yongyong.webp",
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
    imagePath: "/images/beasts/chiru.webp",
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
    imagePath: "/images/beasts/xuangui.webp",
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
    imagePath: "/images/beasts/feiyishe.webp",
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
    imagePath: "/images/beasts/xiangliu.webp",
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
    imagePath: "/images/beasts/zhulong.webp",
    description:
      "烛龙是山海经中最强大的存在之一，人面蛇身，通体赤红如烈焰。他的眼睛掌控着昼夜更替——睁眼为昼，闭眼为夜。他不食不眠，永恒地守望在世界的尽头，是中国最古老的创世神话之一。",
  },
  {
    id: "bifang",
    name: "毕方",
    chapter: "海外南经",
    category: "bird",
    originalText: "毕方鸟在其东，青水西，其为鸟人面一脚。",
    translation:
      "毕方鸟在它的东面、青水的西面，这种鸟长着人的面孔，只有一只脚。",
    traits: ["人面", "一足", "火兆"],
    gradient: ["#f97316", "#dc2626"],
    imagePath: "/images/beasts/bifang.webp",
    description:
      "毕方是山海经中著名的火兆之鸟，形似仙鹤却仅有一足，面孔如人。传说它出现的地方必有大火，其名或源于竹木燃烧时\"哔剥\"的声响。在《西山经》中它被描绘为赤文青质、白喙一足，见则其邑有讹火，是先民对火灾最古老的预警符号。",
  },
  {
    id: "chenghuang",
    name: "乘黄",
    chapter: "海外西经",
    category: "beast",
    originalText: "有乘黄，其状如狐，其背有角，乘之寿二千岁。",
    translation:
      "有一种叫乘黄的异兽，形状像狐狸，背上长着角，骑上它的人可以活两千岁。",
    traits: ["狐形", "背有角", "延寿二千"],
    gradient: ["#eab308", "#d97706"],
    imagePath: "/images/beasts/chenghuang.webp",
    description:
      "乘黄是海外西经中最令人心驰神往的神兽。它外形似狐，背上生角，传说骑乘它便可获得两千年的高寿。在先民对长生不老的永恒渴望中，乘黄成为超越凡人寿命极限的象征，其名\"乘黄\"也暗含骑乘得福之意。",
  },
  {
    id: "kuiniu",
    name: "夔牛",
    chapter: "大荒东经",
    category: "beast",
    originalText:
      "东海中有流波山，入海七千里。其上有兽，状如牛，苍身而无角，一足，出入水则必风雨，其光如日月，其声如雷，其名曰夔。黄帝得之，以其皮为鼓，橛以雷兽之骨，声闻五百里，以威天下。",
    translation:
      "东海中有一座流波山，深入海中七千里。山上有一种兽，形状像牛，青色的身体没有角，只有一只脚，它出入水中必定伴随风雨，发出的光像日月，叫声如雷鸣，名叫夔。黄帝得到它后，用它的皮做成鼓，用雷兽的骨头做鼓槌，鼓声传到五百里之外，以此威震天下。",
    traits: ["牛形无角", "独足", "声如雷霆", "皮可为鼓"],
    gradient: ["#1e40af", "#0ea5e9"],
    imagePath: "/images/beasts/kuiniu.webp",
    description:
      "夔牛是盘踞东海流波山的独足雷兽，苍身无角，出入水则风雨大作，目光如日月，咆哮如雷霆。黄帝将其皮制成神鼓，以雷兽之骨为槌，鼓声震响五百里，威慑天下，助黄帝一统华夏。这面夔牛皮鼓，也成为上古传说中最具威力的神器之一。",
  },
  {
    id: "yinglong",
    name: "应龙",
    chapter: "大荒东经",
    category: "serpent",
    originalText:
      "大荒东北隅中，有山名曰凶犁土丘。应龙处南极，杀蚩尤与夸父，不得复上，故下数旱。旱而为应龙之状，乃得大雨。",
    translation:
      "大荒东北角中有一座山叫凶犁土丘。应龙居住在南极，它杀死了蚩尤和夸父，再也无法回到天上，所以人间屡遭旱灾。干旱时人们模仿应龙的形状来求雨，就能降下大雨。",
    traits: ["生翼神龙", "控水降雨", "黄帝神将"],
    gradient: ["#0891b2", "#22d3ee"],
    imagePath: "/images/beasts/yinglong.webp",
    description:
      "应龙是山海经中罕见的生有双翼的神龙，更是黄帝麾下最强大的战将。它能蓄水兴雨，曾助黄帝击杀蚩尤，又斩夸父于大荒。因神力耗尽无法重返天界，从此驻留人间——旱灾时人们塑其形以祈雨，应龙由此成为呼风唤雨、泽被苍生的象征。",
  },
  {
    id: "jiufeng",
    name: "九凤",
    chapter: "大荒北经",
    category: "bird",
    originalText:
      "大荒之中，有山名曰北极天柜，海水北注焉。有神，九首人面鸟身，名曰九凤。",
    translation:
      "大荒之中有一座山叫北极天柜山，海水向北流入这里。有位神灵，长着九个头、人的面孔、鸟的身子，名叫九凤。",
    traits: ["九首", "人面鸟身", "北方神灵"],
    gradient: ["#be123c", "#f43f5e"],
    imagePath: "/images/beasts/jiufeng.webp",
    description:
      "九凤盘踞在北极天柜山，九颗头颅皆作人面，身披华羽，是镇守极北之地的神鸟。与象征祥瑞的凤凰不同，九凤更多承载着北方荒寒之地的神秘与威严。九首人面的形象既诡异又庄严，折射出先民对极北幽冥之境的敬畏想象。",
  },
  {
    id: "qiangliang",
    name: "强良",
    chapter: "大荒北经",
    category: "beast",
    originalText:
      "又有神，衔蛇操蛇，其状虎首人身，四蹄长肘，名曰强良。",
    translation:
      "又有一位神灵，嘴里衔着蛇，手中操着蛇，形状是虎的脑袋人的身子，长着四只蹄子和长长的胳膊，名叫强良。",
    traits: ["虎首人身", "衔蛇操蛇", "四蹄长肘"],
    gradient: ["#7c2d12", "#ea580c"],
    imagePath: "/images/beasts/qiangliang.webp",
    description:
      "强良是北方大荒中的猛神，虎首人身、四蹄长肘，口中衔蛇、手中操蛇，形象凶悍至极。它盘踞在北极天柜山一带，衔蛇的姿态象征着对毒物与灾祸的镇压。在先民眼中，强良是镇守北方幽冥之地的无畏守护者。",
  },
  {
    id: "feilian",
    name: "飞廉",
    chapter: "海内经",
    category: "beast",
    originalText:
      "蚩尤请风伯雨师，纵大风雨。风伯者，名曰飞廉，鹿身，头如雀，有角，而蛇尾豹文。",
    translation:
      "蚩尤请来风伯和雨师，掀起狂风暴雨。风伯名叫飞廉，长着鹿的身体、麻雀一样的头，头上有角，还有蛇一样的尾巴和豹子一样的花纹。",
    traits: ["鹿身雀首", "有角", "蛇尾豹文", "风神"],
    gradient: ["#0d9488", "#5eead4"],
    imagePath: "/images/beasts/feilian.webp",
    description:
      "飞廉是上古传说中的风神（风伯），鹿身雀首、头生双角、蛇尾豹文，形象奇诡。在黄帝与蚩尤的旷世之战中，蚩尤请来飞廉与雨师兴风作浪，最终被天女魃所止。飞廉作为掌管风的神灵，至今仍是民间信仰中风神的代名词。",
  },
  {
    id: "zhuhuai",
    name: "诸怀",
    chapter: "北山经",
    category: "beast",
    originalText:
      "又北二百里，曰少咸之山。无草木，多青碧。有兽焉，其状如牛，而四角、人目、彘耳，其名曰诸怀，其音如鸣雁，见则天下大水。",
    translation:
      "再往北二百里，有座少咸山。山上不长草木，盛产青碧美石。山中有一种兽，形状像牛，长着四只角、人的眼睛和猪的耳朵，名叫诸怀，叫声像大雁鸣叫，它一出现天下就会发生大水灾。",
    traits: ["牛形四角", "人目彘耳", "声如鸣雁", "水灾预兆"],
    gradient: ["#4338ca", "#818cf8"],
    imagePath: "/images/beasts/zhuhuai.webp",
    description:
      "诸怀栖息于少咸山中，牛身而四角，生着人的眼睛和猪的耳朵，叫声如雁鸣。它最骇人之处在于——一旦现身，天下便会洪涝成灾。在先民眼中，诸怀是水患的凶兆，其怪异的形貌与灾难的预兆紧密相连。",
  },
  {
    id: "minniao",
    name: "鴖鸟",
    chapter: "西山经",
    category: "bird",
    originalText: "其鸟多鴖，其状如翠而赤喙，可以御火。",
    translation:
      "山中的飞鸟多为鴖鸟，形状像翠鸟却长着红色的嘴，可以用来防御火灾。",
    traits: ["翠形", "赤喙", "御火"],
    gradient: ["#15803d", "#34d399"],
    imagePath: "/images/beasts/minniao.webp",
    description:
      "鴖鸟形似翠鸟，喙赤如朱，栖息于符禺山中。与引发火灾的毕方截然相反，鴖鸟被视为能抵御火灾的祥鸟。古人相信饲养或佩戴鴖鸟可免火患，这种以鸟御火的想象，体现了先民对自然力量的朴素驯服之愿。",
  },
  {
    id: "feiwei",
    name: "肥遗",
    chapter: "北山经",
    category: "serpent",
    originalText: "有蛇一首两身，名曰肥遗，见则其国大旱。",
    translation:
      "有一种蛇，长着一个头两个身子，名叫肥遗，它一出现那个国家就会发生大旱灾。",
    traits: ["一首两身", "旱灾预兆"],
    gradient: ["#a16207", "#facc15"],
    imagePath: "/images/beasts/feiwei.webp",
    description:
      "肥遗是北山经中最为诡异的蛇类——一个脑袋却拖着两条身子。它出现在哪里，哪里便赤地千里、大旱成灾。山海经中以\"肥遗\"为名的异兽共有数种，分属鸟、蛇，皆是旱灾的凶兆，足见先民对旱魃之苦的深刻记忆。",
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
