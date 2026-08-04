export type BeastCategory = "beast" | "bird" | "fish" | "serpent" | "god";

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
    category: "beast",
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
    category: "god",
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
  {
    id: "kuafu",
    name: "夸父",
    chapter: "海外北经",
    category: "god",
    originalText:
      "夸父与日逐走，入日，渴欲得饮，饮于河渭，河渭不足，北饮大泽。未至，道渴而死。弃其杖，化为邓林。",
    translation:
      "夸父与太阳赛跑，追赶到了太阳落下的地方。他口渴想喝水，就喝黄河和渭河的水，黄河渭河的水不够喝，他又向北去喝大泽的水。还没走到，就在半路上渴死了。他丢弃的手杖，化作了一片桃林。",
    traits: ["逐日", "化为邓林", "巨人"],
    gradient: ["#ea580c", "#fbbf24"],
    imagePath: "/images/beasts/kuafu.webp",
    description:
      "夸父是中国神话中最具悲剧色彩的英雄。他身为巨人，竟敢与太阳赛跑，追赶至日落之处。虽因口渴而死，手杖却化为绵延千里的桃林，为后人留下甘甜的果实与荫凉。他的故事象征着先民对光明的无畏追求和至死不渝的执着精神。",
  },
  {
    id: "xingtian",
    name: "刑天",
    chapter: "海外西经",
    category: "god",
    originalText:
      "刑天与帝至此争神，帝断其首，葬之常羊之山，乃以乳为目，以脐为口，操干戚以舞。",
    translation:
      "刑天与天帝争夺神位，天帝砍下了他的头颅，埋葬在常羊山中。刑天便以双乳为眼睛，以肚脐为嘴巴，手持盾牌和斧头继续挥舞战斗。",
    traits: ["无首", "以乳为目", "操干戚而舞"],
    gradient: ["#1e293b", "#64748b"],
    imagePath: "/images/beasts/xingtian.webp",
    description:
      "刑天是中国神话中最具反抗精神的战神。被天帝斩首后，他以双乳为目、肚脐为口，依然手持干戚挥舞不止。陶渊明赞他\"刑天舞干戚，猛志固常在\"，他的形象成为永不屈服、战斗到底的精神图腾，激励了无数后世志士。",
  },
  {
    id: "yingzhao",
    name: "英招",
    chapter: "西山经",
    category: "god",
    originalText:
      "实惟帝之平圃，神英招司之，其状马身而人面，虎文鸟翼，徇于四海，其音如榴。",
    translation:
      "这里是天帝的平圃花园，由神灵英招掌管。他长着马的身体和人的面孔，身上有老虎般的斑纹，还长着鸟的翅膀。他巡行四海，声音如同水流冲击石头。",
    traits: ["马身人面", "虎文鸟翼", "巡行四海"],
    gradient: ["#eab308", "#7c3aed"],
    imagePath: "/images/beasts/yingzhao.webp",
    description:
      "英招是天帝平圃的守护神，半人半马的身形融合了多种神圣特质——马的力量、人的智慧、虎的威严与鸟的自由。他巡行四海，守护着天帝的花园，是山海经中最具威仪的神灵之一，其形象与西方半人马遥相呼应。",
  },
  {
    id: "tianwu",
    name: "天吴",
    chapter: "海外东经",
    category: "god",
    originalText:
      "朝阳之谷，神曰天吴，是为水伯。其为兽也，八首人面，八足八尾，皆青黄。",
    translation:
      "朝阳之谷的神灵名叫天吴，是水神之长。他的形貌如兽，长着八个脑袋都是人的面孔，八只脚八条尾巴，通体青黄色。",
    traits: ["八首人面", "八足八尾", "水伯"],
    gradient: ["#0ea5e9", "#0284c7"],
    imagePath: "/images/beasts/tianwu.webp",
    description:
      "天吴是山海经中的水神之长，又称水伯。他拥有八个脑袋、八只脚和八条尾巴，每个脑袋都是人的面孔，通体青黄之色。他掌管朝阳之谷的水域，是上古先民对水之伟力的拟人化想象，其多头多足的形象象征着水的无处不在与不可阻挡。",
  },
  {
    id: "dijiang",
    name: "帝江",
    chapter: "西山经",
    category: "beast",
    originalText:
      "有神焉，其状如黄囊，赤如丹火，六足四翼，浑敦无面目，是识歌舞，实惟帝江也。",
    translation:
      "山中有一种神灵，形状像黄色的皮囊，红得像丹火，长着六只脚四只翅膀，浑浑沌沌没有面目五官，却懂得唱歌跳舞，它的名字叫帝江。",
    traits: ["如黄囊", "六足四翼", "无面目", "识歌舞"],
    gradient: ["#f59e0b", "#dc2626"],
    imagePath: "/images/beasts/dijiang.webp",
    description:
      "帝江是山海经中最奇异的混沌之神。它形如黄色的皮囊，赤红似火，六足四翼，却没有面目五官，却偏偏能歌善舞。后世学者认为帝江即混沌的化身——无面目象征天地未分、浑然一体，能歌舞则暗示混沌中蕴含着创造万物的基础。",
  },
  {
    id: "mingshe",
    name: "鸣蛇",
    chapter: "中山经",
    category: "serpent",
    originalText:
      "其中多鸣蛇，其状如蛇而四翼，其音如磬，见则其邑大旱。",
    translation:
      "水中多有鸣蛇，形状像蛇却长着四只翅膀，发出的声音像敲击磬石，它一出现那个地方就会发生大旱灾。",
    traits: ["蛇身四翼", "音如磬", "旱灾预兆"],
    gradient: ["#dc2626", "#f97316"],
    imagePath: "/images/beasts/mingshe.webp",
    description:
      "鸣蛇是中山经中的旱兆之蛇。它长着四只翅膀，叫声清越如磬石敲击，看似优美却是灾祸的使者——它出现在哪里，哪里便赤地千里。四翼蛇身的形象在古人的想象中既瑰丽又可怖，是先民将自然灾害拟物化的典型表达。",
  },
  {
    id: "dangkang",
    name: "当康",
    chapter: "东山经",
    category: "beast",
    originalText:
      "有兽焉，其状如豚而有牙，其名曰当康，其鸣自叫，见则天下大穰。",
    translation:
      "山中有一种兽，形状像猪却长着锯齿般的利牙，名叫当康，它的叫声就像在呼唤自己的名字，它一出现天下就会五谷丰登。",
    traits: ["猪形有牙", "鸣自叫", "丰收之兆"],
    gradient: ["#16a34a", "#ca8a04"],
    imagePath: "/images/beasts/dangkang.webp",
    description:
      "当康是山海经中罕见的瑞兽。它形如野猪却生利牙，叫声如同自呼其名\"当康\"。与众多预兆灾祸的异兽不同，当康出现意味着天下大丰收——它是先民对丰衣足食的美好期盼的化身，其猪的形象也暗合了中国农耕文化中\"豕\"与\"家\"的深厚关联。",
  },
  {
    id: "luyu",
    name: "鯥鱼",
    chapter: "南山经",
    category: "fish",
    originalText:
      "有鱼焉，其状如牛，陵居，蛇尾有翼，其羽在魼下，其音如留牛，其名曰鯥，冬死而春生，食之无肿疾。",
    translation:
      "山中有一种鱼，形状像牛，生活在山陵上，长着蛇一样的尾巴和翅膀，羽毛长在肋下，叫声像留牛，名叫鯥。它在冬天死去，到春天又复活，吃了它的肉就不会患痈肿之疾。",
    traits: ["状如牛", "陵居", "冬死春生", "蛇尾有翼"],
    gradient: ["#0ea5e9", "#67e8f9"],
    imagePath: "/images/beasts/luyu.webp",
    description:
      "鯥鱼是南山经中最不可思议的生物之一。它虽为鱼类，却形如牛、居山陵、长蛇尾、生羽翼，更奇特的是\"冬死而春生\"——冬季如枯木般死去，春季又焕然复活。这种死而复生的特性使鯥鱼成为生命循环与万物复苏的象征，也反映了先民对季节更替的原始理解。",
  },
  {
    id: "shuhu",
    name: "孰湖",
    chapter: "西山经",
    category: "bird",
    originalText:
      "有兽焉，其状马身而鸟翼，人面蛇尾，好举人，名曰孰湖。",
    translation:
      "山中有一种兽，长着马的身体和鸟的翅膀，人的面孔和蛇的尾巴，喜欢把人举起来，名叫孰湖。",
    traits: ["马身鸟翼", "人面蛇尾", "好举人"],
    gradient: ["#6b7280", "#9ca3af"],
    imagePath: "/images/beasts/shuhu.webp",
    description:
      "孰湖是山海经中最奇特的合体异兽之一——马的身体、鸟的翅膀、人的面孔、蛇的尾巴，四种生灵的特征集于一身。它最独特的行为是\"好举人\"，喜欢将人高高举起，这种看似恶作剧的习性令它在众多凶残的异兽中显得格外有趣，也为先民的想象增添了一抹幽默的色彩。",
  },
  {
    id: "baize",
    name: "白泽",
    chapter: "海内经",
    category: "beast",
    originalText:
      "东望山海有兽，名曰白泽。能言语，达于万物之情，知鬼神之事，王者德及幽明则至。",
    translation:
      "东望山海之间有一种兽，名叫白泽。它能说人话，通晓万物的情理，了解鬼神的事迹。当君王的德政恩及天地幽明之时，它便会出现。",
    traits: ["能言语", "通万物之情", "知鬼神之事", "祥瑞"],
    gradient: ["#fbbf24", "#a855f7"],
    imagePath: "/images/beasts/baize.webp",
    description:
      "白泽是中国神话中最具智慧的神兽。它能说人话，通晓万物之情，深知鬼神之事，是天下所有精怪妖邪的克星。传说黄帝东巡至海滨时曾遇白泽，它向黄帝详述了天下一万一千五百二十种精怪的形象与驱除之法，黄帝据此作《白泽图》传世。白泽因此成为智慧与祥瑞的最高象征。",
  },
  {
    id: "zhuyan",
    name: "朱厌",
    chapter: "西山经",
    category: "beast",
    originalText:
      "有兽焉，其状如猿，而白首赤足，名曰朱厌，见则大兵。",
    translation:
      "山中有一种兽，形状像猿猴，白色的头红色的脚，名叫朱厌，它一出现就会发生大规模战争。",
    traits: ["猿形", "白首赤足", "战乱预兆"],
    gradient: ["#dc2626", "#b45309"],
    imagePath: "/images/beasts/zhuyan.webp",
    description:
      "朱厌是西山经中最为不祥的异兽之一。它形如猿猴，白首赤足，看似不起眼，却是最可怕的战争预兆——它出现在哪里，哪里便烽烟四起、兵戈遍地。古人将猿猴的躁动不安与战争的动荡联系在一起，朱厌便是这种联想的极致表达，其\"白首赤足\"的形象也成为血与火交织的隐喻。",
  },
  {
    id: "zhuanyu",
    name: "鱄鱼",
    chapter: "南山经",
    category: "fish",
    originalText:
      "又东五百里，曰鸡山，其上多金，其下多丹雘。黑水出焉，而南流注于海。其中有鱄鱼，其状如鲋而彘毛，其音如豚，见则天下大旱。",
    translation:
      "再往东五百里，有座鸡山，山上盛产黄金，山下盛产丹雘。黑水从这座山发源，向南流入大海。水中有一种鱄鱼，形状像鲫鱼却长着猪毛，叫声像猪叫，它一出现天下就会大旱。",
    traits: ["鱼身彘毛", "声如豚", "旱灾预兆"],
    gradient: ["#d97706", "#fbbf24"],
    imagePath: "/images/beasts/zhuanyu.jpg",
    description:
      "鱄鱼是一种形似鲫鱼却长着猪毛的异鱼，叫声如猪哼。它出现在哪里，哪里便赤地千里、大旱成灾，是先民将旱灾与水族异象联系在一起的典型表达。",
  },
  {
    id: "fenghuang",
    name: "凤凰",
    chapter: "南山经",
    category: "bird",
    originalText:
      "又东五百里，曰丹穴之山，其上多金玉。丹水出焉，而南流注于渤海。有鸟焉，其状如鸡，五采而文，名曰凤皇，首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。是鸟也，饮食自然，自歌自舞，见则天下安宁。",
    translation:
      "再往东五百里，有座丹穴山，山上盛产金属矿物和美玉。丹水从这座山发源，向南流入渤海。山中有一种鸟，形状像鸡，身上有五彩花纹，名叫凤凰。它头上的花纹是德字，翅膀上的花纹是义字，背上的花纹是礼字，胸部的花纹是仁字，腹部的花纹是信字。这种鸟饮食自然，自己唱歌自己跳舞，它一出现天下就会安宁。",
    traits: ["五采文", "德义礼仁信", "天下安宁"],
    gradient: ["#dc2626", "#f59e0b"],
    imagePath: "/images/beasts/fenghuang.jpg",
    description:
      "凤凰是百鸟之王，山海经中记载它形似鸡而身披五彩花纹，头上花纹为德，翅膀为义，背部为礼，胸部为仁，腹部为信，五德兼备。它饮食自然、自歌自舞，出现则天下安宁，是中华文化中最崇高的祥瑞象征。",
  },
  {
    id: "yu",
    name: "颙",
    chapter: "南山经",
    category: "bird",
    originalText:
      "又东四百里，曰令丘之山，无草木，多火。其南有谷焉，曰中谷，条风自是出。有鸟焉，其状如枭，人面四目而有耳，其名曰颙，其鸣自号也，见则天下大旱。",
    translation:
      "再往东四百里，有座令丘山，山上不长草木，到处是野火。山的南面有个山谷，名叫中谷，东北风从这里吹出。山中有一种鸟，形状像猫头鹰，长着人的脸和四只眼睛，还有耳朵，名叫颙，它的叫声就像在呼唤自己的名字，它一出现天下就会大旱。",
    traits: ["人面四目", "枭形", "旱灾预兆"],
    gradient: ["#b45309", "#fbbf24"],
    imagePath: "/images/beasts/yu.jpg",
    description:
      "颙是一种形似猫头鹰却长着人面和四只眼睛的怪鸟，栖息于令丘山的火谷之中。它一出现便预示天下大旱，四目人面的形象诡异而可怖，是先民对旱灾恐惧的具象化表达。",
  },
  {
    id: "hujiao",
    name: "虎蛟",
    chapter: "南山经",
    category: "fish",
    originalText:
      "浪水出焉，而南流注于海。其中有虎蛟，其状鱼身而蛇尾，其音如鸳鸯，食者不肿，可以已痔。",
    translation:
      "浪水从祷过山发源，向南流入大海。水中有一种虎蛟，长着鱼的身体和蛇的尾巴，叫声像鸳鸯，吃了它的肉可以不患肿病，还可以治愈痔疮。",
    traits: ["鱼身蛇尾", "声如鸳鸯", "治痔"],
    gradient: ["#0891b2", "#0e7490"],
    imagePath: "/images/beasts/hujiao.jpg",
    description:
      "虎蛟是一种生于浪水之中的奇异水族，长着鱼的身体和蛇的尾巴，叫声婉转如鸳鸯。它的肉可治肿病和痔疮，兼具凶猛外表与治愈之力，体现了山海经中以异治异的朴素智慧。",
  },
  {
    id: "quru",
    name: "瞿如",
    chapter: "南山经",
    category: "bird",
    originalText:
      "有鸟焉，其状如鵁而白首，三足、人面，其名曰瞿如，其鸣自号也。",
    translation:
      "山中有一种鸟，形状像鵁鸟却长着白色的头，有三只脚，人的脸，名叫瞿如，它的叫声就像在呼唤自己的名字。",
    traits: ["白首三足", "人面", "鸣自号"],
    gradient: ["#6366f1", "#a5b4fc"],
    imagePath: "/images/beasts/quru.jpg",
    description:
      "瞿如是一种三足人面的怪鸟，白色的头颅格外醒目。它的叫声如同在呼唤自己的名字，在南山经的奇禽中以其独特的三足形态与人面特征而令人印象深刻。",
  },
  {
    id: "tulou",
    name: "土蝼",
    chapter: "西山经",
    category: "beast",
    originalText:
      "有兽焉，其状如羊而四角，名曰土蝼，是食人。有鸟焉，其状如蜂，大如鸳鸯，名曰钦原，蠚鸟兽则死，蠚木则枯。",
    translation:
      "山中有一种兽，形状像羊却长着四只角，名叫土蝼，会吃人。山中有一种鸟，形状像蜂，大小如鸳鸯，名叫钦原，它螫鸟兽则鸟兽死，螫树木则树木枯。",
    traits: ["羊形四角", "食人"],
    gradient: ["#78350f", "#a16207"],
    imagePath: "/images/beasts/tulou.jpg",
    description:
      "土蝼外形似羊却长着四只角，看似温顺实则凶猛，会吃人。它栖息于昆仑山西麓，与同地的毒鸟钦原并列为山中两大凶物，羊的外表下藏着致命的危险。",
  },
  {
    id: "xiwangmu",
    name: "西王母",
    chapter: "西山经",
    category: "god",
    originalText:
      "又西三百五十里，曰玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜，是司天之厉及五残。",
    translation:
      "再往西三百五十里，有座玉山，是西王母居住的地方。西王母的形状像人，长着豹子的尾巴和老虎的牙齿，善于长啸，蓬松的头发上戴着玉胜，她掌管天上的瘟疫和五刑。",
    traits: ["豹尾虎齿", "蓬发戴胜", "司天之厉"],
    gradient: ["#7c3aed", "#c084fc"],
    imagePath: "/images/beasts/xiwangmu.jpg",
    description:
      "西王母是山海经中最原始的女神形象，豹尾虎齿、蓬发戴胜，掌管天上的瘟疫和五刑。这一形象与后世慈祥的王母娘娘截然不同，保留着上古女神狞厉而威猛的原初面貌。",
  },
  {
    id: "jiao",
    name: "狡",
    chapter: "西山经",
    category: "beast",
    originalText:
      "有兽焉，其状如犬而豹文，其角如牛，其名曰狡，其音如吠犬，见则其国大穰。有鸟焉，其状如翟而赤，名曰胜遇，是食鱼，其音如录，见则其国大水。",
    translation:
      "山中有一种兽，形状像狗却长着豹子的花纹，角像牛角，名叫狡，叫声像狗叫，它一出现那个国家就会大丰收。山中有一种鸟，形状像野鸡却是红色的，名叫胜遇，以鱼为食，叫声像鹿鸣，它一出现那个国家就会发大水。",
    traits: ["犬形豹文", "角如牛", "丰收之兆"],
    gradient: ["#ca8a04", "#eab308"],
    imagePath: "/images/beasts/jiao.jpg",
    description:
      "狡是一种形似狗却长着豹纹和牛角的异兽，叫声如犬吠。与多数预兆灾祸的异兽不同，它的出现预示着天下大丰收，是山海经中罕见的祥瑞之兽。",
  },
  {
    id: "qiongqi",
    name: "穷奇",
    chapter: "西山经",
    category: "beast",
    originalText:
      "又西二百六十里，曰邽山。其上有兽焉，其状如牛，猬毛，名曰穷奇，音如獆狗，是食人。濛水出焉，南流注于洋水，其中多黄贝。",
    translation:
      "再往西二百六十里，有座邽山。山上有一种兽，形状像牛，长着刺猬一样的毛，名叫穷奇，叫声像嚎叫的狗，会吃人。濛水从这座山发源，向南流入洋水，水中有很多黄色的贝。",
    traits: ["牛形猬毛", "声如獆狗", "食人"],
    gradient: ["#1e293b", "#475569"],
    imagePath: "/images/beasts/qiongqi.jpg",
    description:
      "穷奇是上古四大凶兽之一，外形似牛而浑身猬毛，叫声如嚎狗，会吃人。后世传说中它能听懂人言，专门惩善扬恶，成为背信弃义的象征，在山海经中则是纯粹的食人猛兽。",
  },
  {
    id: "manman",
    name: "蛮蛮",
    chapter: "西山经",
    category: "bird",
    originalText:
      "有鸟焉，其状如凫，而一足彘尾，其名曰蛮蛮，见则天下大水。",
    translation:
      "山中有一种鸟，形状像野鸭，却只有一只脚和猪一样的尾巴，名叫蛮蛮，它一出现天下就会发大水。",
    traits: ["凫形一足", "彘尾", "水灾预兆"],
    gradient: ["#0284c7", "#7dd3fc"],
    imagePath: "/images/beasts/manman.jpg",
    description:
      "蛮蛮形似野鸭却只有一足，还拖着猪一样的尾巴。它一出现天下便会洪水成灾，是水患的凶兆。后世有说法认为蛮蛮即比翼鸟，但在此处它分明是带来洪灾的不祥之鸟。",
  },
  {
    id: "luwu",
    name: "陆吾",
    chapter: "西山经",
    category: "god",
    originalText:
      "又西三百五十里，曰昆仑之丘，是实惟帝之下都。陆吾司之，其神状虎身而九尾，人面而虎爪。是神也，司天之九部及帝之囿时。",
    translation:
      "再往西三百五十里，有座昆仑丘，这里其实是天帝在下界的都城。陆吾掌管此地，他的神形是老虎的身体和九条尾巴，人的面孔和老虎的爪子。这位神灵掌管天上的九部以及天帝园圃的时节。",
    traits: ["虎身九尾", "人面虎爪", "司天之九部"],
    gradient: ["#d97706", "#7c3aed"],
    imagePath: "/images/beasts/luwu.jpg",
    description:
      "陆吾是天帝下都昆仑丘的守护神，虎身九尾、人面虎爪，掌管天上九部及天帝园圃的时节。它的形象威猛庄严，是昆仑神话体系中最重要的守卫者，地位堪比西方神话中的守护巨兽。",
  },
  {
    id: "mafu",
    name: "马腹",
    chapter: "北山经",
    category: "beast",
    originalText:
      "又北三百二十里，曰蔓渠之山，其上多金玉，其下多竹箭。伊水出焉，而东流注于洛。有兽焉，其名曰马腹，其状如人面虎身，其音如婴儿，是食人。",
    translation:
      "再往北三百二十里，有座蔓渠山，山上盛产金属矿物和美玉，山下多竹箭。伊水从这座山发源，向东流入洛水。山中有一种兽，名叫马腹，形状像人面虎身，叫声像婴儿啼哭，会吃人。",
    traits: ["人面虎身", "声如婴儿", "食人"],
    gradient: ["#991b1b", "#dc2626"],
    imagePath: "/images/beasts/mafu.jpg",
    description:
      "马腹是一种人面虎身的食人猛兽，叫声如婴儿啼哭，栖息于蔓渠山中。它以婴儿般的哭声迷惑旅人，再伺机捕食，是北山经中令行旅者闻风丧胆的凶兽。",
  },
  {
    id: "huanshu",
    name: "䑏疏",
    chapter: "北山经",
    category: "beast",
    originalText:
      "又北三百里，曰带山，其上多玉，其下多青碧。有兽焉，其状如马，一角有错，其名曰䑏疏，可以辟火。",
    translation:
      "再往北三百里，有座带山，山上盛产玉石，山下多青碧色的美石。山中有一种兽，形状像马，长着一只角，角上有错纹，名叫䑏疏，可以用来辟防火灾。",
    traits: ["马形一角", "角有错纹", "辟火"],
    gradient: ["#6b7280", "#9ca3af"],
    imagePath: "/images/beasts/huanshu.jpg",
    description:
      "䑏疏外形似马，额生一角且角上有错纹，最大的神通是能辟除火灾。在先民对山火的深深恐惧中，䑏疏被视为天然的防火神兽，其一角之形也成为辟火护佑的象征。",
  },
  {
    id: "yayu",
    name: "窫窳",
    chapter: "海内经",
    category: "beast",
    originalText: "有窳，龙首，是食人。",
    translation: "有一种名叫窫窳的异兽，长着龙的头，会吃人。",
    traits: ["龙首", "食人"],
    gradient: ["#166534", "#15803d"],
    imagePath: "/images/beasts/yayu.jpg",
    description:
      "窫窳是一种龙首食人的凶兽，传说曾遭天神贰负及其臣子危所杀。它在山海经中多次出现，形象各异——或如牛四角，或龙首食人，是上古神话中令人畏惧的食人异兽之一。",
  },
  {
    id: "feishu",
    name: "飞鼠",
    chapter: "北山经",
    category: "beast",
    originalText:
      "又东北二百里，曰天池之山，其上无草木，多文石。有兽焉，其状如兔而鼠首，以其背飞，其名曰飞鼠。",
    translation:
      "再向东北二百里，有座天池山，山上不长草木，遍布带花纹的石头。山中有一种兽，形状像兔子却长着老鼠的头，用背飞行，名叫飞鼠。",
    traits: ["兔形鼠首", "以背飞"],
    gradient: ["#78716c", "#a8a29e"],
    imagePath: "/images/beasts/feishu.jpg",
    description:
      "飞鼠形似兔子却长着老鼠的头，最奇特之处在于能以背部飞翔。这种用背飞行的姿态在众多异兽中独树一帜，折射出先民对自然界鼯鼠类动物滑翔能力的原始观察与想象。",
  },
  {
    id: "linghu",
    name: "领胡",
    chapter: "北山经",
    category: "beast",
    originalText:
      "又北二百里，曰泰头之山，其上多金玉，其下多竹箭。有兽焉，其状如牛而尾长，四足毫，其名曰领胡，其鸣自呼，见则其国大败。",
    translation:
      "再往北二百里，有座泰头山，山上盛产金属矿物和美玉，山下多竹箭。山中有一种兽，形状像牛却拖着长尾巴，四脚长着长毛，名叫领胡，叫声就像在呼唤自己的名字，它一出现那个国家就会大败。",
    traits: ["牛形长尾", "四足毫", "败兆"],
    gradient: ["#92400e", "#d97706"],
    imagePath: "/images/beasts/linghu.jpg",
    description:
      "领胡外形似牛却拖着长尾，四足生有长毛，叫声如同呼唤自己的名字。它是不祥之兽——一旦现身，所在之国便会兵败如山，是战败覆灭的凶兆。",
  },
  {
    id: "xiangshe",
    name: "象蛇",
    chapter: "北山经",
    category: "bird",
    originalText:
      "又北三百二十里，曰阳山，其上多玉，其下多金铜。有鸟焉，其状如雌雉，而五彩以文，是自为牝牡，名曰象蛇，其鸣自呼。",
    translation:
      "再往北三百二十里，有座阳山，山上盛产玉石，山下盛产金铜。山中有一种鸟，形状像雌野鸡，身上有五彩花纹，雌雄同体，名叫象蛇，叫声就像在呼唤自己的名字。",
    traits: ["雌雉形", "五彩文", "雌雄同体"],
    gradient: ["#c026d3", "#e879f9"],
    imagePath: "/images/beasts/xiangshe.jpg",
    description:
      "象蛇形似雌野鸡却身披五彩花纹，最奇特之处在于雌雄同体、自为牝牡。这种双性同体的特性在山海经中极为罕见，使象蛇成为先民对生命繁衍与性别奥秘的独特想象。",
  },
  {
    id: "suanyu",
    name: "酸与",
    chapter: "北山经",
    category: "bird",
    originalText:
      "又北百里，曰景山，其上多玉，其下多青碧。有鸟焉，其状如蛇而四翼、三足，名曰酸与，其鸣自呼，见则其邑有恐。",
    translation:
      "再往北一百里，有座景山，山上盛产玉石，山下多青碧色的美石。山中有一种鸟，形状像蛇却长着四只翅膀、三只脚，名叫酸与，叫声就像在呼唤自己的名字，它一出现那个城邑就会有恐慌之事。",
    traits: ["蛇形四翼三足", "恐慌预兆"],
    gradient: ["#0d9488", "#5eead4"],
    imagePath: "/images/beasts/suanyu.jpg",
    description:
      "酸与形似蛇却长着四只翅膀和三只脚，外形怪诞至极。它一出现便预示城邑中将发生恐慌之事，是先民将不可名状的恐惧寄托于怪异生灵之上的典型表达。",
  },
  {
    id: "paoxiao",
    name: "狍鸮",
    chapter: "北山经",
    category: "beast",
    originalText:
      "又北三百五十里，曰钩吾之山，其上多玉，其下多铜。有兽焉，其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿，名曰狍鸮，是食人。",
    translation:
      "再往北三百五十里，有座钩吾山，山上盛产玉石，山下盛产铜。山中有一种兽，形状是羊的身体和人的面孔，眼睛长在腋下，长着老虎的牙齿和人的爪子，叫声像婴儿啼哭，名叫狍鸮，会吃人。",
    traits: ["羊身人面", "目在腋下", "虎齿人爪", "食人"],
    gradient: ["#7c2d12", "#dc2626"],
    imagePath: "/images/beasts/paoxiao.jpg",
    description:
      "狍鸮是北山经中最骇人的食人猛兽之一，羊身人面、虎齿人爪，眼睛竟长在腋下。它以婴儿般的啼哭声诱人靠近，再以虎齿人爪撕咬吞噬，许多学者认为狍鸮即饕餮的原型之一。",
  },
  {
    id: "zishu",
    name: "䖪鼠",
    chapter: "东山经",
    category: "bird",
    originalText: "有鸟焉，其状如鸡而鼠毛，其名曰䖪鼠，见则其邑大旱。",
    translation:
      "山中有一种鸟，形状像鸡却长着老鼠一样的毛，名叫䖪鼠，它一出现那个城邑就会大旱。",
    traits: ["鸡形鼠毛", "旱灾预兆"],
    gradient: ["#b45309", "#fbbf24"],
    imagePath: "/images/beasts/zishu.jpg",
    description:
      "䖪鼠形似鸡却覆盖着老鼠般的粗毛，外表滑稽却是不祥之兆。它一出现当地便大旱成灾，鸡与鼠两种截然不同的特征集于一身，是先民将旱灾与怪异生灵联系的又一例证。",
  },
  {
    id: "zhenyu",
    name: "箴鱼",
    chapter: "东山经",
    category: "fish",
    originalText:
      "𣲵水出焉，而北流注于湖水。其中多箴鱼，其状如儵，其喙如箴，食之无疫疾。",
    translation:
      "𣲵水从这座山发源，向北流入湖水。水中有很多箴鱼，形状像儵鱼，嘴像针一样尖，吃了可以不生瘟疫。",
    traits: ["状如儵", "喙如箴", "无疫疾"],
    gradient: ["#0284c7", "#38bdf8"],
    imagePath: "/images/beasts/zhenyu.jpg",
    description:
      "箴鱼形状似儵鱼，嘴细长如针，因而得名。吃了它的肉可以不生瘟疫，在缺医少药的上古时代，这种针嘴小鱼被视为抵御疫病的天然良药。",
  },
  {
    id: "hanyu",
    name: "䱤鱼",
    chapter: "东山经",
    category: "fish",
    originalText:
      "又东二百里，曰子桐之山，子桐之水出焉，而西流注于余如之水。其中多䱤鱼，其状如鱼而鸟翼，出入有光，其音如鸳鸯，见则天下大旱。",
    translation:
      "再往东二百里，有座子桐山，子桐水从这座山发源，向西流入余如水。水中有很多䱤鱼，形状像鱼却长着鸟的翅膀，出入水中时闪闪发光，叫声像鸳鸯，它一出现天下就会大旱。",
    traits: ["鱼身鸟翼", "出入有光", "旱灾预兆"],
    gradient: ["#d97706", "#fbbf24"],
    imagePath: "/images/beasts/hanyu.jpg",
    description:
      "䱤鱼长着鱼身和鸟翼，出入水面时通体发光，叫声如鸳鸯。它一出现天下便大旱，兼具瑰丽与不祥的双重特质，是先民对旱魃之苦与水中异象交织的想象。",
  },
  {
    id: "heyu",
    name: "合窳",
    chapter: "东山经",
    category: "beast",
    originalText:
      "又东北二百里，曰剡山，多金玉。有兽焉，其状如彘而人面，黄身而赤尾，其名曰合窳，其音如婴儿，是兽也，食人，亦食虫蛇，见则天下大水。",
    translation:
      "再往东北二百里，有座剡山，盛产金属矿物和美玉。山中有一种兽，形状像猪却长着人的面孔，黄色的身子红色的尾巴，名叫合窳，叫声像婴儿啼哭，这种兽会吃人，也吃虫和蛇，它一出现天下就会发大水。",
    traits: ["彘形人面", "声如婴儿", "食人食虫蛇", "水灾预兆"],
    gradient: ["#1e3a8a", "#3b82f6"],
    imagePath: "/images/beasts/heyu.jpg",
    description:
      "合窳形似猪却长着人的面孔，黄身赤尾，叫声如婴儿啼哭。它既食人也食虫蛇，所到之处洪水成灾，是水患与食人双重威胁的化身，其人面猪身的形象诡异而骇人。",
  },
  {
    id: "fei",
    name: "蜚",
    chapter: "东山经",
    category: "beast",
    originalText:
      "又东二百里，曰太山，上多金玉、桢木。有兽焉，其状如牛而白首，一目而蛇尾，其名曰蜚，行水则竭，行草则死，见则天下大疫。",
    translation:
      "再往东二百里，有座太山，山上盛产金属矿物、美玉和桢木。山中有一种兽，形状像牛却长着白色的头，一只眼睛和蛇一样的尾巴，名叫蜚，它经过水则水干涸，经过草则草枯死，它一出现天下就会大瘟疫。",
    traits: ["牛形白首", "一目蛇尾", "行水则竭", "疫灾预兆"],
    gradient: ["#166534", "#dc2626"],
    imagePath: "/images/beasts/fei.jpg",
    description:
      "蜚是东山经中最恐怖的疫灾之兽，牛身白首、一目蛇尾。它经过的水会干涸、经过的草会枯死，所到之处瘟疫横行，是大自然毁灭力量的具象化身，后世常以蜚为瘟疫的代名词。",
  },
  {
    id: "xiegou",
    name: "絜钩",
    chapter: "东山经",
    category: "bird",
    originalText:
      "又南三百里，曰姑逢之山，无草木，多金玉。有鸟焉，其状如鸢而人目，名曰絜钩，见则其国大兵。",
    translation:
      "再往南三百里，有座姑逢山，山上不长草木，盛产金属矿物和美玉。山中有一种鸟，形状像老鹰却长着人的眼睛，名叫絜钩，它一出现那个国家就会发生大战。",
    traits: ["鸢形人目", "战乱预兆"],
    gradient: ["#7c2d12", "#b45309"],
    imagePath: "/images/beasts/xiegou.jpg",
    description:
      "絜钩形似老鹰却长着人的眼睛，目光中透着战争的肃杀。它一出现便预示国家将遭兵燹之祸，人目鸢形的组合既有鹰隼的凌厉又有人心的诡谲，是战乱将至的不祥之兆。",
  },
  {
    id: "jianmu",
    name: "建木",
    chapter: "海内经",
    category: "god",
    originalText:
      "有木，其状如牛，引之有皮，若缨、黄蛇，其叶如罗，其实如栾，其木若蓲，其名曰建木。",
    translation:
      "有一种树，形状像牛，拉它有树皮，像帽缨和黄蛇，叶子像罗网，果实像栾树果，树干像蓲树，它的名字叫建木。",
    traits: ["状如牛", "百仞无枝", "沟通天地"],
    gradient: ["#15803d", "#84cc16"],
    imagePath: "/images/beasts/jianmu.jpg",
    description:
      "建木是传说中沟通天地的神树，高达百仞却无旁枝，形状奇特如牛。它是天神往来天界与人间的天梯，在先民的宇宙观中，建木是连接天地、贯通神人的枢纽，地位至为崇高。",
  },
  {
    id: "bingyi",
    name: "冰夷",
    chapter: "海内经",
    category: "god",
    originalText:
      "从极之渊，深三百仞，维冰夷恒都焉。冰夷人面，乘两龙。",
    translation:
      "从极渊深三百仞，是冰夷常驻的地方。冰夷长着人的面孔，乘着两条龙。",
    traits: ["人面", "乘两龙", "河伯"],
    gradient: ["#0ea5e9", "#22d3ee"],
    imagePath: "/images/beasts/bingyi.jpg",
    description:
      "冰夷即河伯，是上古神话中的黄河之神，人面而乘两龙，常驻于深三百仞的从极渊中。他掌管天下水脉，是先民对黄河这一中华母亲河敬畏与崇拜的拟人化表达。",
  },
  {
    id: "yan",
    name: "𫛩",
    chapter: "中山经",
    category: "bird",
    originalText: "有鸟焉，其状如鴢而白目赤足，名曰𫛩，食之不疽。",
    translation:
      "山中有一种鸟，形状像鴢鸟却长着白色的眼睛和红色的脚，名叫𫛩，吃了它的肉可以不生疽病。",
    traits: ["鴢形", "白目赤足", "治疽"],
    gradient: ["#0891b2", "#67e8f9"],
    imagePath: "/images/beasts/yan.jpg",
    description:
      "𫛩是一种形似鴢鸟的水禽，白眼赤足，吃了它的肉可以不生疽病。在山海经众多以食治疾的异鸟中，𫛩虽不起眼，却以其独特的外貌和疗疾之能，为先民提供了一味天然的药材。",
  },
  {
    id: "xuncao",
    name: "荀草",
    chapter: "中山经",
    category: "beast",
    originalText:
      "有草焉，其状如葌，而方茎，黄华赤实，其本如藁本，名曰荀草，服之美人色。",
    translation:
      "山上有一种草，形状像葌草，茎是方形的，开黄色的花结红色的果实，根部像藁本，名叫荀草，吃了可以使人面色美丽。",
    traits: ["方茎", "黄华赤实", "美人色"],
    gradient: ["#e11d48", "#f472b6"],
    imagePath: "/images/beasts/xuncao.jpg",
    description:
      "荀草是一种神奇灵草，方茎黄华赤实，根部如藁本，吃了可以使人面色红润美丽。在先民对容颜之美的追求中，荀草被视为天然的美容灵药，体现了上古时代草木皆药的生活智慧。",
  },
  {
    id: "wuluo",
    name: "武罗",
    chapter: "中山经",
    category: "god",
    originalText:
      "武罗司之，其状人面而豹文，小要而白齿，而穿耳以鐻，其鸣如鸣玉。是山也，宜女子。",
    translation:
      "武罗神掌管此山，他的形状是人的面孔和豹子般的花纹，腰很细，牙齿洁白，耳朵上穿着鐻作为耳饰，叫声像玉石相击的声音。这座山适宜女子居住。",
    traits: ["人面豹文", "小腰白齿", "穿耳以鐻"],
    gradient: ["#7c3aed", "#a78bfa"],
    imagePath: "/images/beasts/wuluo.jpg",
    description:
      "武罗是中山经中的山神，人面豹文、细腰白齿，耳穿金玉之鐻，叫声如鸣玉般清脆。与其他狰狞可怖的山神不同，武罗的形象雍容华美，其神山宜于女子居住，是山海经中罕见的温婉神灵。",
  },
  {
    id: "haoyu",
    name: "豪鱼",
    chapter: "中山经",
    category: "fish",
    originalText:
      "渠猪之水出焉，而南流注于河。其中多豪鱼，状如鲔，赤喙尾赤羽，可以已白癣。",
    translation:
      "渠猪水从这座山发源，向南流入黄河。水中有很多豪鱼，形状像鲟鱼，红色的嘴和尾巴，还有红色的鳍，可以用来治疗白癣。",
    traits: ["状如鲔", "赤喙赤尾", "治白癣"],
    gradient: ["#0e7490", "#22d3ee"],
    imagePath: "/images/beasts/haoyu.jpg",
    description:
      "豪鱼形状似鲟鱼，红嘴红尾红鳍，游弋于渠猪水中。它的肉可以治疗白癣，在远古时代皮肤病盛行的环境中，豪鱼被视为珍贵的天然药鱼，以红艳的色彩和疗疾之能著称。",
  },
  {
    id: "wenlin",
    name: "闻獜",
    chapter: "中山经",
    category: "beast",
    originalText:
      "又东三十里，曰敏山，其上多金玉，其下有木焉，名曰蓟柏，其叶如楮而赤华。有兽焉，其状如彘，黄身白头白尾，名曰闻獜，见则天下大风。",
    translation:
      "再往东三十里，有座敏山，山上盛产金属矿物和美玉，山下有一种树，名叫蓟柏，叶子像楮树叶却开红色的花。山中有一种兽，形状像猪，黄色的身子白色的头和尾巴，名叫闻獜，它一出现天下就会刮大风。",
    traits: ["彘形", "黄身白首尾", "大风预兆"],
    gradient: ["#64748b", "#94a3b8"],
    imagePath: "/images/beasts/wenlin.jpg",
    description:
      "闻獜形似猪，黄身白首白尾，色彩分明。它一出现天下便会狂风大作，是风灾的预兆。猪形而三色分明的奇特外貌，使闻獜在众多预兆风灾的异兽中独具辨识度。",
  },
  {
    id: "nuba",
    name: "女魃",
    chapter: "大荒北经",
    category: "god",
    originalText:
      "有人衣青衣，名曰黄帝女魃。蚩尤作兵伐黄帝，黄帝乃令应龙攻之冀州之野。应龙畜水，蚩尤请风伯雨师，纵大风雨。黄帝乃下天女曰魃，雨止，遂杀蚩尤。魃不得复上，所居不雨。",
    translation:
      "有个人穿着青色衣服，名叫黄帝女魃。蚩尤兴兵讨伐黄帝，黄帝便命令应龙在冀州之野攻击他。应龙蓄水，蚩尤请来风伯雨师，降下狂风暴雨。黄帝便派天女魃下凡，雨停了，于是杀死了蚩尤。魃再也不能回到天上，她所住的地方就不会下雨。",
    traits: ["青衣", "天女", "旱神"],
    gradient: ["#b45309", "#fbbf24"],
    imagePath: "/images/beasts/nuba.jpg",
    description:
      "女魃是黄帝派下凡间的天女，身着青衣，能止风雨。她助黄帝击杀蚩尤后因神力耗尽无法重返天界，所居之地赤地千里、滴雨不下，由此成为旱灾的化身——后世祈雨时驱逐的旱魃，其源头正是这位悲剧性的天女。",
  },
  {
    id: "huashe",
    name: "化蛇",
    chapter: "中山经",
    category: "serpent",
    originalText:
      "有兽焉，其状如人面而豺身，鸟翼而蛇行，其音如叱呼，见则其邑大水。",
    translation:
      "山中有一种兽，长着人的面孔、豺狼的身子，有鸟的翅膀却能像蛇一样爬行，叫声像人的呵斥声，它一出现那个地方就会发生大水灾。",
    traits: ["人面豺身", "鸟翼蛇行", "大水预兆"],
    gradient: ["#0d9488", "#14b8a6"],
    imagePath: "/images/beasts/huashe.jpg",
    description:
      "化蛇是中山经中最奇异的混合体异兽之一。它集合了人的面孔、豺狼的躯体、鸟的翅膀和蛇的行迹于一身，四种截然不同的形态特征融为一体。它的叫声如同人的呵斥声，一旦出现便预示着大水将至，是水灾的凶兆之兽。",
  },
  {
    id: "gudiao",
    name: "蛊雕",
    chapter: "南山经",
    category: "bird",
    originalText:
      "鹿吴之山，上无草木，多金石。泽更之水出焉，而南流注于滂水。水有兽焉，名曰蛊雕，其状如雕而有角，其音如婴儿之音，是食人。",
    translation:
      "鹿吴山上没有草木，盛产金属矿物和玉石。泽更水从这座山发源，向南流入滂水。水中有一种兽，名叫蛊雕，形状像雕却长着角，叫声像婴儿的啼哭声，会吃人。",
    traits: ["雕形有角", "声如婴儿", "食人"],
    gradient: ["#7c2d12", "#c2410c"],
    imagePath: "/images/beasts/gudiao.jpg",
    description:
      "蛊雕是一种形似雕鹫却长着角的凶猛食人异兽。它栖息于鹿吴山的泽更水中，叫声如婴儿啼哭，极具迷惑性——诱人靠近后将其捕食。雕首生角的独特外形与水中潜伏的习性，使其成为南山经中最令人畏惧的水陆两栖猛禽。",
  },
  {
    id: "diren",
    name: "氐人",
    chapter: "海内南经",
    category: "god",
    originalText:
      "氐人国在建木西，其为人人面而鱼身，无足。",
    translation:
      "氐人国在建木的西边，那里的人长着人的面孔和鱼的身子，没有脚。",
    traits: ["人面鱼身", "无足", "建木之西"],
    gradient: ["#0891b2", "#06b6d4"],
    imagePath: "/images/beasts/diren.jpg",
    description:
      "氐人是居于建木之西的半人半鱼神族，人面鱼身而无足，常年栖于水中。其形象介于人神之间，与陵鱼、赤鱬等同为人鱼类异兽，却因无足的独特体态而自成一格，是海内南经中最具代表性的水居神族之一。",
  },
  {
    id: "si",
    name: "兕",
    chapter: "海内南经",
    category: "beast",
    originalText:
      "兕在舜葬东，湘水南。其状如苍牛。其耳广，其角如笠。",
    translation:
      "兕生活在舜帝葬地的东边，湘水的南岸。它的形状像青灰色的牛。它的耳朵很宽，角像斗笠一样。",
    traits: ["苍牛状", "角如斗笠", "舜葬之东"],
    gradient: ["#44403c", "#78716c"],
    imagePath: "/images/beasts/si.jpg",
    description:
      "兕是一种形似苍牛的瑞兽，耳阔角圆如斗笠，栖息于舜葬以东、湘水之南。古人视其独角为珍异之物，厚重而圆润，是山海经中最具辨识度的牛形异兽之一，后世亦常以兕角为酒器，彰显其珍。",
  },
  {
    id: "bashe",
    name: "巴蛇",
    chapter: "海内南经",
    category: "serpent",
    originalText:
      "巴蛇食象，三岁而出其骨，君子服之，无心腹之疾。其为蛇青黄赤。一曰黑蛇青首。",
    translation:
      "巴蛇能吞食大象，三年后才吐出象骨，君子吃了它的肉，就不会得心腹的疾病。巴蛇是青黄赤三色相间。另一种说法是它是黑蛇、青色的头。",
    traits: ["吞象巨蛇", "三年出骨", "青黄赤色"],
    gradient: ["#166534", "#15803d"],
    imagePath: "/images/beasts/bashe.jpg",
    description:
      "巴蛇是能吞食大象的巨型神蛇，三年方吐出象骨，其肉可使人免于心腹之疾。身披青黄赤三色花纹，一说为黑身青首，体型之巨冠绝山海经。巴蛇吞象之典由此而生，成为贪欲难餍的千古譬喻。",
  },
  {
    id: "maoma",
    name: "旄马",
    chapter: "海内南经",
    category: "beast",
    originalText:
      "旄马，其状如马，四节有毛。在巴蛇西北，高山南。",
    translation:
      "旄马，形状像马，四条腿的关节处都长着长毛。它生活在巴蛇所在地的西北方，高山的南面。",
    traits: ["状如马", "四节有毛", "巴蛇西北"],
    gradient: ["#92400e", "#b45309"],
    imagePath: "/images/beasts/maoma.jpg",
    description:
      "旄马形似常马，四足关节处披有长毛，栖息于巴蛇西北、高山之南。其毛色浓密而独特，是海内南经中少见的良驹类异兽。四节生毛的特征使其与凡马判然有别，颇有神骏之姿。",
  },
  {
    id: "kaimingshou",
    name: "开明兽",
    chapter: "海内西经",
    category: "beast",
    originalText:
      "开明兽身大类虎而九首，皆人面，东向立昆仑上。",
    translation:
      "开明兽的身子很大，像老虎，长着九个脑袋，都是人的面孔，面朝东方站立在昆仑山上。",
    traits: ["虎身九首", "皆人面", "守昆仑"],
    gradient: ["#7c2d12", "#9a3412"],
    imagePath: "/images/beasts/kaimingshou.jpg",
    description:
      "开明兽是镇守昆仑山的神兽，虎身九首皆作人面，东向而立于昆仑之巅。九首人面的奇诡外形与守护圣山的职责相得益彰，使其成为海内西经中昆仑神话体系的核心守卫，威仪赫赫不可侵犯。",
  },
  {
    id: "wei",
    name: "危",
    chapter: "海内西经",
    category: "god",
    originalText:
      "贰负之臣曰危，危与贰负杀窫窳。帝乃梏之疏属之山，桎其右足，反缚两手与发，系之山上木。",
    translation:
      "贰负的臣子名叫危，危和贰负一起杀了窫窳。天帝于是把他枷锁在疏属山上，用刑具锁住他的右脚，把他的双手和头发反绑在一起，系在山上的树上。",
    traits: ["贰负之臣", "杀窫窳", "帝之囚徒"],
    gradient: ["#581c87", "#6b21a8"],
    imagePath: "/images/beasts/wei.jpg",
    description:
      "危是贰负之臣，因与贰负合谋杀害窫窳而被天帝降罚，囚于疏属之山。右足受桎梏、双手与发反缚于山上之木，是山海经中最为惨烈的神罚场景之一，亦见天帝赏罚之严明与神律之森然。",
  },
  {
    id: "fuchangniao",
    name: "服常鸟",
    chapter: "海内西经",
    category: "bird",
    originalText:
      "服常树，其上有三头人，司琅玕树。",
    translation:
      "服常树上，有三颗脑袋的人，掌管着琅玕树。",
    traits: ["三头人", "司琅玕树", "服常树上"],
    gradient: ["#0e7490", "#0891b2"],
    imagePath: "/images/beasts/fuchangniao.jpg",
    description:
      "服常树上栖息着三头之神，专职司掌琅玕神树。琅玕乃昆仑仙境所产的美玉之树，三头人昼夜守护其侧，使其成为海内西经中昆仑园林体系里别具一格的守树神灵，与开明兽共构圣山秩序。",
  },
  {
    id: "shuniao",
    name: "树鸟",
    chapter: "海内西经",
    category: "bird",
    originalText:
      "开明南有树鸟，六首蛟龙，蜼豹狼鸟，秩秩乗黄。",
    translation:
      "开明兽的南面有树鸟，还有六首的蛟龙、蜼、豹、狼、鸟，以及秩秩、乘黄等异兽。",
    traits: ["六首", "开明南", "守护神树"],
    gradient: ["#854d0e", "#a16207"],
    imagePath: "/images/beasts/shuniao.jpg",
    description:
      "树鸟栖息于开明兽之南，与六首蛟龙、蜼豹狼鸟及乘黄等神兽并列而居。这片开明南境群兽汇聚、神物毕集，树鸟居其列首，是海内西经中昆仑南麓神兽群落的重要一员，俨然仙山守卫之禽。",
  },
  {
    id: "shewu",
    name: "蛇巫",
    chapter: "海内北经",
    category: "serpent",
    originalText:
      "蛇巫之山，上有人操柸而东向立。一曰龟山。",
    translation:
      "蛇巫山上，有人手持杯柸面朝东方站立。另一种说法认为这座山叫龟山。",
    traits: ["蛇巫山", "操柸而立", "龟山"],
    gradient: ["#134e4a", "#115e59"],
    imagePath: "/images/beasts/shewu.jpg",
    description:
      "蛇巫之山因蛇巫而得名，山巅有人操柸东向而立，一说此山即为龟山。操柸而立的神秘身影与山名之歧说交织，使其成为海内北经中最具神秘色彩的山岳神祇之一，引人无限遐思。",
  },
  {
    id: "daxie",
    name: "大蟹",
    chapter: "海内北经",
    category: "fish",
    originalText:
      "大蟹在其涂。",
    translation:
      "大蟹生活在那片泥涂之中。",
    traits: ["巨型蟹", "在海涂中", "北海奇物"],
    gradient: ["#1e3a8a", "#1d4ed8"],
    imagePath: "/images/beasts/daxie.jpg",
    description:
      "大蟹是栖于北海泥涂之中的巨型蟹类，体型远逾常蟹。其单独立条于海内北经，仅以一大字点睛，是北海奇物中最简约却又最引人遐想的海中巨兽，足见先民对北海深处的敬畏与想象。",
  },
  {
    id: "lingyu",
    name: "陵鱼",
    chapter: "海内北经",
    category: "fish",
    originalText:
      "陵鱼人面，手足，鱼身，在海中。",
    translation:
      "陵鱼长着人的面孔，有手有脚，鱼的身体，生活在海里。",
    traits: ["人面鱼身", "有手足", "海中人鱼"],
    gradient: ["#0c4a6e", "#0369a1"],
    imagePath: "/images/beasts/lingyu.jpg",
    description:
      "陵鱼是人面鱼身却长有手足的海中人鱼，兼具人之面目与鱼之躯体。与氐人、赤鱬等人鱼异兽不同，陵鱼手足俱全，能于海中自由游弋，是海内北经中最典型的人鱼类神物，亦是人鱼传说的远源之一。",
  },
  {
    id: "jubishi",
    name: "据比尸",
    chapter: "海内北经",
    category: "god",
    originalText:
      "据比之尸，其为人折颈披发，无一手。",
    translation:
      "据比的尸体，作为人来说，脖子折断了，头发披散着，没有一只手。",
    traits: ["折颈披发", "无一手", "神尸"],
    gradient: ["#3f3f46", "#52525b"],
    imagePath: "/images/beasts/jubishi.jpg",
    description:
      "据比之尸是折颈披发、缺一手的神尸，属于山海经中尸类神祇的典型代表。其残破的身躯暗示着一段惨烈的神话往事，与窫窳、王子夜尸等共同构成海内北经中独特的神尸谱系，折射出先民对死亡与神灵的幽微想象。",
  },
  {
    id: "penglai",
    name: "蓬莱",
    chapter: "海内北经",
    category: "god",
    originalText:
      "蓬莱山在海中。",
    translation:
      "蓬莱山在大海之中。",
    traits: ["海中仙山", "仙人居所", "不死之境"],
    gradient: ["#365314", "#4d7c0f"],
    imagePath: "/images/beasts/penglai.jpg",
    description:
      "蓬莱山矗立于海内北经的碧波之中，是传说中仙人所居的不死仙山。山中藏有不死之药与长生秘境，后世秦始皇、汉武帝求仙访药之所皆滥觞于此，是海内北经中最负盛名的海上仙境，亦是华夏仙话的源头。",
  },
  {
    id: "leishen",
    name: "雷神",
    chapter: "海内东经",
    category: "god",
    originalText:
      "雷泽中有雷神，龙身而人头，鼓其腹。在吴西。",
    translation:
      "雷泽里面有雷神，长着龙的身体和人的头，敲击自己的腹部发出雷声。他在吴地的西面。",
    traits: ["龙身人头", "鼓腹为雷", "雷泽之神"],
    gradient: ["#713f12", "#a16207"],
    imagePath: "/images/beasts/leishen.jpg",
    description:
      "雷神是居于雷泽的司雷之神，龙身人头，以鼓腹为雷。其居处在吴地之西的雷泽，每逢震雷便被认为是雷神击腹所致，是海内东经中最具威慑力的自然神祇，亦是后世雷神崇拜与雷公形象的远古源头。",
  },
  {
    id: "wangziyeshi",
    name: "王子夜尸",
    chapter: "海内东经",
    category: "god",
    originalText:
      "王子夜尸，两手、两股、两胸、两首，皆断，异处乃合为一身。",
    translation:
      "王子夜的尸体，两只手、两条腿、两个胸口、两个头，都断开了，分散各处后又合拢拼成了一具身体。",
    traits: ["身首异处", "断而复合", "神尸"],
    gradient: ["#831843", "#9f1239"],
    imagePath: "/images/beasts/wangziyeshi.jpg",
    description:
      "王子夜尸是身首异处、断而复合的诡异神尸，两手两股两胸两首皆断，异处分散却又合为一身。这种断体复合的奇诡形态，与据比尸、窫窳等共同构成山海经中独特的神尸谱系，折射出先民对死亡与重生的幽微想象。",
  },
  {
    id: "juyan",
    name: "鉅燕",
    chapter: "海内东经",
    category: "bird",
    originalText:
      "鉅燕在东北角。",
    translation:
      "鉅燕生活在东北角。",
    traits: ["巨型燕", "东北角", "海内东经"],
    gradient: ["#1e40af", "#2563eb"],
    imagePath: "/images/beasts/juyan.jpg",
    description:
      "鉅燕是栖于海内东北角的巨型燕子，以一大字标示其体型之庞大。虽原文仅寥寥数字，却为后世玄鸟生商、燕图腾崇拜等神话提供了远源，是海内东经中最具图腾意味的禽类神物，意蕴深远。",
  },
];

export const categoryLabels: Record<BeastCategory, string> = {
  beast: "兽类",
  bird: "禽类",
  fish: "鱼类",
  serpent: "蛇类",
  god: "神灵",
};

export const categoryIconNames: Record<BeastCategory, string> = {
  beast: "IconPaw",
  bird: "IconBird",
  fish: "IconFish",
  serpent: "IconSnake",
  god: "IconGod",
};

export const categoryCounts: Record<BeastCategory | "all", number> = {
  all: beasts.length,
  beast: beasts.filter((b) => b.category === "beast").length,
  bird: beasts.filter((b) => b.category === "bird").length,
  fish: beasts.filter((b) => b.category === "fish").length,
  serpent: beasts.filter((b) => b.category === "serpent").length,
  god: beasts.filter((b) => b.category === "god").length,
};
