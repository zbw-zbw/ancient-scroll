export interface DifficultChar {
  char: string;
  pinyin: string;
  meaning: string;
}

export interface Sentence {
  id: string;
  original: string;
  translation: string;
  difficultChars: DifficultChar[];
}

export interface Chapter {
  id: string;
  name: string;
  subtitle: string;
  sentences: Sentence[];
}

export const chapters: Chapter[] = [
  {
    id: "nanshan",
    name: "南山经",
    subtitle: "南方群山的奇异世界",
    sentences: [
      {
        id: "nanshan-1",
        original: "南山之首曰䧿山。其首曰招摇之山，临于西海之上，多桂，多金玉。",
        translation:
          "南方第一列山系叫做鹊山。鹊山的第一座山叫招摇山，屹立在西海之滨，山上长满了桂树，蕴藏着丰富的金属矿物和美玉。",
        difficultChars: [
          { char: "䧿", pinyin: "què", meaning: "古\"鹊\"字，此处为山名" },
          { char: "临", pinyin: "lín", meaning: "靠近、面对" },
        ],
      },
      {
        id: "nanshan-2",
        original: "有草焉，其状如韭而青华，其名曰祝余，食之不饥。",
        translation:
          "山上有一种草，形状像韭菜，开着青色的花，名叫祝余草，吃了可以使人不觉得饥饿。",
        difficultChars: [
          { char: "华", pinyin: "huā", meaning: "同\"花\"" },
          { char: "焉", pinyin: "yān", meaning: "语气词，于此" },
        ],
      },
      {
        id: "nanshan-3",
        original: "有木焉，其状如穀而黑理，其华四照，其名曰迷穀，佩之不迷。",
        translation:
          "山上有一种树，形状像构树，木纹是黑色的，开的花能光耀四方，名叫迷谷树，佩戴在身上就不会迷路。",
        difficultChars: [
          { char: "穀", pinyin: "gǔ", meaning: "同\"构\"，构树" },
          { char: "理", pinyin: "lǐ", meaning: "纹理" },
          { char: "佩", pinyin: "pèi", meaning: "佩戴" },
        ],
      },
      {
        id: "nanshan-4",
        original: "有兽焉，其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。",
        translation:
          "山中有一种野兽，形状像猿猴却长着白色的耳朵，既能匍匐爬行又能像人一样直立行走，名叫狌狌，吃了它的肉就能健步如飞。",
        difficultChars: [
          { char: "禺", pinyin: "yú", meaning: "猿猴的一种" },
          { char: "伏", pinyin: "fú", meaning: "匍匐" },
          { char: "善", pinyin: "shàn", meaning: "擅长" },
        ],
      },
      {
        id: "nanshan-5",
        original: "丽𪊨之水出焉，而西流注于海，其中多育沛，佩之无瘕疾。",
        translation:
          "丽麂水从这座山发源，向西流入大海，水中有许多育沛，佩戴它可以免生腹中寄生虫之病。",
        difficultChars: [
          { char: "𪊨", pinyin: "jǐ", meaning: "同\"麂\"" },
          { char: "瘕", pinyin: "jiǎ", meaning: "腹中结块的疾病" },
        ],
      },
    ],
  },
  {
    id: "xishan",
    name: "西山经",
    subtitle: "西方山岳的神异传说",
    sentences: [
      {
        id: "xishan-1",
        original: "西山之首曰钱来之山。其上多松，其下多洗石。有兽焉，其状如羊而马尾，名曰羬羊，其脂可以已腊。",
        translation:
          "西方第一列山系的第一座山叫钱来山。山上长满松树，山下到处是洗石。山中有一种野兽，形状像羊却长着马尾巴，名叫羬羊，它的油脂可以润泽干裂的皮肤。",
        difficultChars: [
          { char: "羬", pinyin: "qián", meaning: "一种像羊的异兽" },
          { char: "腊", pinyin: "xī", meaning: "皮肤干裂" },
        ],
      },
      {
        id: "xishan-2",
        original: "又西二百里，曰泰冒之山，其阳多玉，其阴多铁。浴水出焉，而东流注于河。",
        translation:
          "再往西走两百里，有座泰冒山，山的南面盛产美玉，北面富含铁矿。浴水从这座山发源，向东流入黄河。",
        difficultChars: [
          { char: "阳", pinyin: "yáng", meaning: "山的南面" },
          { char: "阴", pinyin: "yīn", meaning: "山的北面" },
        ],
      },
      {
        id: "xishan-3",
        original: "又西一百七十里，曰数历之山。其上多黄金，其下多银。其木多杻橿，其鸟多鹦鹉。",
        translation:
          "再往西一百七十里，有座数历山。山上盛产黄金，山下富含白银。山上的树木以杻树和橿树居多，飞鸟中鹦鹉最多。",
        difficultChars: [
          { char: "杻", pinyin: "niǔ", meaning: "一种落叶乔木" },
          { char: "橿", pinyin: "jiāng", meaning: "一种常绿乔木" },
        ],
      },
      {
        id: "xishan-4",
        original: "楚水出焉，而南流注于渭。其中多白珠，是有鹿蜀，其状如马而白首，其文如虎而赤尾，其音如谣，佩之宜子孙。",
        translation:
          "楚水从这座山发源，向南流入渭水。水中有许多白色珍珠。山中有一种名叫鹿蜀的异兽，形状像马却长着白色的头，身上的花纹像老虎，尾巴是红色的，叫声像人唱歌，佩戴它的皮毛有利于子孙繁衍。",
        difficultChars: [
          { char: "文", pinyin: "wén", meaning: "花纹" },
          { char: "谣", pinyin: "yáo", meaning: "歌谣" },
          { char: "宜", pinyin: "yí", meaning: "有利于" },
        ],
      },
    ],
  },
  {
    id: "beishan",
    name: "北山经",
    subtitle: "精卫填海的悲壮传说",
    sentences: [
      {
        id: "beishan-1",
        original: "又北二百里，曰发鸠之山，其上多柘木。有鸟焉，其状如乌，文首，白喙，赤足，名曰精卫，其鸣自詨。",
        translation:
          "再往北两百里，有座发鸠山，山上长满了柘树。山中有一种鸟，形状像乌鸦，头上有花纹，白色的嘴，红色的脚，名叫精卫，它的叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "柘", pinyin: "zhè", meaning: "一种落叶灌木" },
          { char: "文", pinyin: "wén", meaning: "花纹" },
          { char: "喙", pinyin: "huì", meaning: "鸟嘴" },
          { char: "詨", pinyin: "xiào", meaning: "呼叫" },
        ],
      },
      {
        id: "beishan-2",
        original: "是炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫。",
        translation:
          "她原本是炎帝的小女儿，名叫女娃。女娃到东海游玩，不幸溺水而亡，再也没有回来，于是化身为精卫鸟。",
        difficultChars: [
          { char: "少女", pinyin: "shào nǚ", meaning: "小女儿" },
          { char: "溺", pinyin: "nì", meaning: "溺水" },
        ],
      },
      {
        id: "beishan-3",
        original: "常衔西山之木石，以堙于东海。漳水出焉，东流注于河。",
        translation:
          "精卫常常衔着西山上的树枝和石子，用来填塞东海。漳水从发鸠山发源，向东流入黄河。",
        difficultChars: [
          { char: "衔", pinyin: "xián", meaning: "用嘴叼着" },
          { char: "堙", pinyin: "yīn", meaning: "填塞、堵塞" },
        ],
      },
    ],
  },
  {
    id: "dongshan",
    name: "东山经",
    subtitle: "东方群山的奇兽异禽",
    sentences: [
      {
        id: "dongshan-1",
        original: "东山之首曰樕𫚉之山。北临乾昧。食水出焉，而东北流注于海。其中多鳙鳙之鱼，其状如犁牛，其音如彘鸣。",
        translation:
          "东方第一列山系的第一座山叫樕朱山。山北面临乾昧水。食水从这座山发源，向东北流入大海。水中有许多鳙鳙鱼，形状像犁牛（水牛），叫声像猪叫。",
        difficultChars: [
          { char: "樕", pinyin: "sù", meaning: "一种矮小的树" },
          { char: "彘", pinyin: "zhì", meaning: "猪" },
        ],
      },
      {
        id: "dongshan-2",
        original: "又南三百里，曰栒状之山。其上多金玉，其下多青碧石。有兽焉，其状如犬，六足，其名曰从从，其鸣自詨。",
        translation:
          "再往南三百里，有座栒状山。山上盛产金属矿物和美玉，山下有很多青碧色的石头。山中有一种野兽，形状像狗却长着六只脚，名叫从从，叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "栒", pinyin: "xún", meaning: "一种灌木" },
          { char: "青碧", pinyin: "qīng bì", meaning: "青绿色的美石" },
        ],
      },
      {
        id: "dongshan-3",
        original: "有鸟焉，其状如鸡而鼠毛，其名曰𪃟鼠，见则其邑大旱。",
        translation:
          "山中有一种鸟，形状像鸡却长着老鼠一样的毛，名叫㶟鼠鸟，它一出现当地就会发生大旱灾。",
        difficultChars: [
          { char: "邑", pinyin: "yì", meaning: "城邑、地方" },
          { char: "旱", pinyin: "hàn", meaning: "干旱" },
        ],
      },
    ],
  },
  {
    id: "hainei",
    name: "海内经",
    subtitle: "天地之间的创世传说",
    sentences: [
      {
        id: "hainei-1",
        original: "西北海之外，赤水之北，有章尾山。有神，人面蛇身而赤，直目正乘。其瞑乃晦，其视乃明。",
        translation:
          "在西北海以外、赤水的北岸，有座章尾山。山中有位神灵，长着人的脸、蛇的身子，通体赤红，眼睛竖着长。他闭上眼睛天地就变成黑夜，睁开眼睛天地就变得光明。",
        difficultChars: [
          { char: "直目", pinyin: "zhí mù", meaning: "竖着的眼睛" },
          { char: "瞑", pinyin: "míng", meaning: "闭眼" },
          { char: "晦", pinyin: "huì", meaning: "昏暗" },
        ],
      },
      {
        id: "hainei-2",
        original: "不食，不寝，不息，风雨是谒。是烛九阴，是谓烛龙。",
        translation:
          "他不吃东西，不睡觉，不呼吸，能呼唤风雨。他能照亮九重幽暗之地，他就是烛龙。",
        difficultChars: [
          { char: "谒", pinyin: "yè", meaning: "请求、呼唤" },
          { char: "九阴", pinyin: "jiǔ yīn", meaning: "极深极暗之处" },
        ],
      },
      {
        id: "hainei-3",
        original: "南海之内，黑水、青水之间，有木名曰若木，若水出焉。",
        translation:
          "在南海之中，黑水和青水之间，有一种树叫若木，若水就从这里发源。",
        difficultChars: [
          { char: "若木", pinyin: "ruò mù", meaning: "神话中生长在日落处的神树" },
        ],
      },
    ],
  },
];
