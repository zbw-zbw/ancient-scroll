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
  relatedBeastId?: string;
}

export interface Chapter {
  id: string;
  name: string;
  subtitle: string;
  introduction: string;
  sentences: Sentence[];
}

export const chapters: Chapter[] = [
  {
    id: "nanshan",
    name: "南山经",
    subtitle: "南方群山的奇异世界",
    introduction:
      "《南山经》记录了南方群山的地理面貌与奇珍异兽。从鹊山到箕尾山，共四十座山，绵延一万六千三百八十里。山中草木皆有神效，异兽出没其间，是山海经中最具生物多样性的篇章。",
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
        relatedBeastId: "xingsheng",
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
      {
        id: "nanshan-6",
        original:
          "有鱼焉，其状如牛，陵居，蛇尾有翼，其羽在魼下，其音如留牛，其名曰鯥，冬死而夏生，食之无肿疾。",
        translation:
          "水中有一种鱼，形状像牛，栖息在岸边，蛇一样的尾巴上长着翅膀，翅膀长在腋下，叫声像犁牛，名叫鯥鱼，冬天蛰伏夏天复苏，吃了它的肉不会生肿毒之病。",
        difficultChars: [
          { char: "魼", pinyin: "qū", meaning: "腋下" },
          { char: "鯥", pinyin: "lù", meaning: "一种神异的鱼" },
        ],
      },
      {
        id: "nanshan-7",
        original: "又东三百里，曰堂庭之山，多棪木，多白猿，多水玉，多黄金。",
        translation:
          "再往东三百里，有座堂庭山，山上长满了棪树，有许多白色的猿猴，还盛产水晶和黄金。",
        difficultChars: [
          { char: "棪", pinyin: "yǎn", meaning: "一种高大的树" },
          { char: "水玉", pinyin: "shuǐ yù", meaning: "水晶" },
        ],
      },
      {
        id: "nanshan-8",
        original:
          "又东三百八十里，曰猨翼之山，其中多怪兽，水多怪鱼，多白玉，多蝮虫，多怪蛇，多怪木，不可以上。",
        translation:
          "再往东三百八十里，有座猨翼山，山中有很多怪兽，水中多怪鱼，盛产白玉，到处是蝮蛇和奇怪的蛇类，还有奇特的树木，人无法攀登。",
        difficultChars: [
          { char: "猨", pinyin: "yuán", meaning: "同\"猿\"" },
          { char: "蝮", pinyin: "fù", meaning: "蝮蛇，一种毒蛇" },
        ],
      },
      {
        id: "nanshan-9",
        original: "又东三百里，曰青丘之山，其阳多玉，其阴多青雘。有兽焉，其状如狐而九尾，其音如婴儿，能食人，食者不蛊。",
        translation: "再往东三百里，有座青丘山，山南面盛产美玉，山北面有很多青色的矿石。山中有一种兽，形状像狐狸但长着九条尾巴，叫声像婴儿啼哭，能吃人，但吃了它的肉可以不受蛊毒之害。",
        difficultChars: [
          { char: "雘", pinyin: "huò", meaning: "一种青色的矿石" },
          { char: "蛊", pinyin: "gǔ", meaning: "蛊毒，妖邪之害" },
        ],
        relatedBeastId: "nine-tailed-fox",
      },
      {
        id: "nanshan-10",
        original: "东南四百五十里，曰长右之山，无草木，多水。有兽焉，其状如禺而四耳，其名长右，其音如吟，见则郡县大水。",
        translation: "往东南四百五十里，有座长右山，山上没有草木，有很多水。山中有一种兽，形状像猿猴却长着四只耳朵，名叫长右，叫声像人在呻吟，它一出现郡县就会发生大水灾。",
        difficultChars: [
          { char: "禺", pinyin: "yú", meaning: "猿猴的一种" },
          { char: "吟", pinyin: "yín", meaning: "呻吟、叹息" },
        ],
      },
      {
        id: "nanshan-11",
        original: "又东三百四十里，曰尧光之山，其阳多玉，其阴多金。有兽焉，其状如人而彘鬣，穴居而冬蛰，其名曰猾褢，其音如斫木，见则县有大繇。",
        translation: "再往东三百四十里，有座尧光山，山南面盛产美玉，山北面盛产金属。山中有一种兽，形状像人却长着猪一样的鬃毛，住在洞穴里冬天蛰伏，名叫猾褢，叫声像砍木头，它一出现县里就会有大的徭役。",
        difficultChars: [
          { char: "彘", pinyin: "zhì", meaning: "猪" },
          { char: "鬣", pinyin: "liè", meaning: "鬃毛" },
          { char: "蛰", pinyin: "zhé", meaning: "动物冬眠、蛰伏" },
          { char: "斫", pinyin: "zhuó", meaning: "砍、削" },
          { char: "繇", pinyin: "yáo", meaning: "徭役" },
        ],
      },
      {
        id: "nanshan-12",
        original: "又东三百五十里，曰羽山，其下多水，其上多雨，无草木，多蝮虫。",
        translation: "再往东三百五十里，有座羽山，山下多水，山上多雨，不长草木，有很多蝮蛇。",
        difficultChars: [
          { char: "蝮", pinyin: "fù", meaning: "蝮蛇，一种毒蛇" },
        ],
      },
      {
        id: "nanshan-13",
        original: "又东五百里，曰浮玉之山，北望具区，东望诸毗。有兽焉，其状如虎而牛尾，其音如吠犬，其名曰彘，是食人。苕水出于其阴，北流注于具区，其中多𫚖鱼。",
        translation: "再往东五百里，有座浮玉山，北面可以看见具区泽，东面可以看见诸毗山。山中有一种兽，形状像老虎却长着牛尾巴，叫声像狗吠，名叫彘，会吃人。苕水从山的北麓发源，向北流入具区泽，水中多𫚖鱼。",
        difficultChars: [
          { char: "毗", pinyin: "pí", meaning: "毗邻、连接" },
          { char: "彘", pinyin: "zhì", meaning: "此处指异兽名" },
          { char: "苕", pinyin: "tiáo", meaning: "水名" },
        ],
      },
      {
        id: "nanshan-14",
        original: "又东四百里，曰洵山。其阳多金，其阴多玉。有兽焉，其状如羊而无口，不可杀也，其名曰䍺。洵水出焉，而南流注于阏之泽，其中多茈蠃。",
        translation: "再往东四百里，有座洵山，山南面盛产金属，山北面盛产美玉。山中有一种兽，形状像羊却没有嘴，无法被杀死，名叫䍺。洵水从这座山发源，向南流入阏泽，水中有很多茈蠃。",
        difficultChars: [
          { char: "䍺", pinyin: "huàn", meaning: "一种无口的异兽" },
          { char: "阏", pinyin: "è", meaning: "阏泽，水泽名" },
          { char: "茈", pinyin: "zǐ", meaning: "紫色" },
          { char: "蠃", pinyin: "luǒ", meaning: "通'螺'" },
        ],
      },
      {
        id: "nanshan-15",
        original: "又东五百里，曰鸡山，其上多金，其下多丹雘。黑水出焉，而南流注于海。其中有鱄鱼，其状如鲋而彘毛，其音如豚，见则天下大旱。",
        translation: "再往东五百里，有座鸡山，山上盛产金属，山下有很多红色矿石。黑水从这座山发源，向南流入大海。水中有一种鱄鱼，形状像鲫鱼却长着猪毛，叫声像猪叫，它一出现天下就会发生大旱灾。",
        difficultChars: [
          { char: "雘", pinyin: "huò", meaning: "一种矿石" },
          { char: "鱄", pinyin: "tuán", meaning: "鱼名" },
          { char: "鲋", pinyin: "fù", meaning: "鲫鱼" },
          { char: "豚", pinyin: "tún", meaning: "猪" },
        ],
      },
      {
        id: "nanshan-16",
        original: "又东五百里，曰灌湘之山，上多木，无草。多怪鸟，无兽。",
        translation: "再往东五百里，有座灌湘山，山上有很多树木，没有草。有很多怪鸟，没有野兽。",
        difficultChars: [
          { char: "灌", pinyin: "guàn", meaning: "灌湘，山名" },
        ],
      },
      {
        id: "nanshan-17",
        original: "又东四百里，至于旄山之尾，其南有谷，曰育遗，多怪鸟，凯风自是出。",
        translation: "再往东四百里，到了旄山的尾端，它的南面有个山谷，名叫育遗，有很多怪鸟，南风从这里吹出。",
        difficultChars: [
          { char: "旄", pinyin: "máo", meaning: "旄山，山名" },
          { char: "凯", pinyin: "kǎi", meaning: "凯风，指南风" },
        ],
      },
      {
        id: "nanshan-18",
        original: "又东五百八十里，曰南禺之山，其上多金玉，其下多水。有穴焉，水出辄入，夏乃出，冬则闭。佐水出焉，而东南流注于海，有凤皇、鹓雏。",
        translation: "再往东五百八十里，有座南禺山，山上盛产金属矿物和美玉，山下多水。山中有个洞穴，春天水流入洞穴，夏天水又流出，冬天则封闭。佐水从这座山发源，向东南流入大海，山中有凤凰和鹓雏。",
        difficultChars: [
          { char: "辄", pinyin: "zhé", meaning: "就、即" },
          { char: "鹓", pinyin: "yuān", meaning: "鹓雏，传说中的凤鸟" },
        ],
      },
    ],
  },
  {
    id: "xishan",
    name: "西山经",
    subtitle: "西方山岳的神异传说",
    introduction:
      "《西山经》描绘了西方山岳的壮丽景观。这里有能润泽皮肤的羬羊，有声如歌谣的鹿蜀，有五彩祥瑞的鸾鸟。西山多金玉矿藏，河流纵横，是上古先民眼中的富饶之地。",
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
        relatedBeastId: "qianyang",
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
        relatedBeastId: "lusu",
      },
      {
        id: "xishan-5",
        original: "又西百八十里，曰黄山，无草木，多竹箭。盼水出焉，西流注于赤水，其中多玉。",
        translation:
          "再往西一百八十里，有座黄山，山上不长草木，遍布箭竹。盼水从这里发源，向西流入赤水，水中盛产美玉。",
        difficultChars: [
          { char: "竹箭", pinyin: "zhú jiàn", meaning: "一种细竹，可制箭杆" },
        ],
      },
      {
        id: "xishan-6",
        original: "又西三百二十里，曰嶓冢之山，汉水出焉，而东南流注于沔。",
        translation:
          "再往西三百二十里，有座嶓冢山，汉水从这座山发源，向东南方流入沔水。",
        difficultChars: [
          { char: "嶓", pinyin: "bō", meaning: "山名" },
          { char: "沔", pinyin: "miǎn", meaning: "古水名" },
        ],
      },
      {
        id: "xishan-7",
        original: "西四十五里，曰松果之山。濩水出焉，北流注于渭，其中多铜。有鸟焉，其名曰䳋渠，其状如山鸡，黑身赤足，可以已𦢊。",
        translation: "向西四十五里，有座松果山。濩水从这座山发源，向北流入渭水，水中多铜。山中有一种鸟，名叫䳋渠，形状像山鸡，黑色的身体红色的脚，可以用来治疗皮肤皱裂。",
        difficultChars: [
          { char: "濩", pinyin: "huò", meaning: "水名" },
          { char: "䳋", pinyin: "tóng", meaning: "鸟名" },
          { char: "𦢊", pinyin: "bì", meaning: "皮肤皴皱之病" },
        ],
      },
      {
        id: "xishan-8",
        original: "又西六十里，曰太华之山，削成而四方，其高五千仞，其广十里，鸟兽莫居。有蛇焉，名曰肥𧒭，六足四翼，见则天下大旱。",
        translation: "再往西六十里，有座太华山，山壁陡峭如刀削而成，呈四方形，高达五千仞，方圆十里，飞鸟走兽无法在其上居住。山中有一种蛇，名叫肥𧒭，长着六只脚四只翅膀，它一出现天下就会发生大旱灾。",
        difficultChars: [
          { char: "仞", pinyin: "rèn", meaning: "古代长度单位" },
          { char: "𧒭", pinyin: "wèi", meaning: "肥𧒭，蛇名" },
        ],
      },
      {
        id: "xishan-9",
        original: "又西八十里，曰小华之山，其木多荆杞，其兽多㸲牛，其阴多磬石，其阳多㻬琈之玉。鸟多赤鷩，可以御火。其草有萆荔，状如乌韭，而生于石上，亦缘木而生，食之已心痛。",
        translation: "再往西八十里，有座小华山，山上的树木以荆棘和枸杞居多，野兽多为㸲牛，山北面多磬石，山南面多㻬琈玉。山中飞鸟以赤鷩居多，可以用来防御火灾。山中有一种草叫萆荔，形状像乌韭，生长在石头上，也能攀缘树木而生，吃了它可以治疗心痛。",
        difficultChars: [
          { char: "㸲", pinyin: "zuó", meaning: "㸲牛，野牛" },
          { char: "磬", pinyin: "qìng", meaning: "磬石，可制乐器" },
          { char: "㻬琈", pinyin: "tū fú", meaning: "玉名" },
          { char: "鷩", pinyin: "bì", meaning: "赤鷩，鸟名" },
        ],
      },
      {
        id: "xishan-10",
        original: "又西八十里，曰符禺之山，其阳多铜，其阴多铁。其上有木焉，名曰文茎，其实如枣，可以已聋。其草多条，其状如葵，而赤华黄实，如婴儿舌，食之使人不惑。符禺之水出焉，而北流注于渭。其兽多葱聋，其状如羊而赤鬣。其鸟多鴖，其状如翠而赤喙，可以御火。",
        translation: "再往西八十里，有座符禺山，山南面多铜，山北面多铁。山上有一种树，名叫文茎，果实像枣，可以治疗耳聋。山中有一种草叫条草，形状像葵菜，开红花结黄果，像婴儿的舌头，吃了可以使人不迷惑。符禺水从这座山发源，向北流入渭水。山中的野兽多为葱聋，形状像羊却长着红色的鬃毛。山中的飞鸟多为鴖鸟，形状像翠鸟却有红色的嘴，可以用来防御火灾。",
        difficultChars: [
          { char: "禺", pinyin: "yú", meaning: "符禺，山名" },
          { char: "葱聋", pinyin: "cōng lóng", meaning: "兽名" },
          { char: "鬣", pinyin: "liè", meaning: "鬃毛" },
          { char: "鴖", pinyin: "mín", meaning: "鸟名" },
          { char: "喙", pinyin: "huì", meaning: "鸟嘴" },
        ],
      },
      {
        id: "xishan-11",
        original: "又西六十里，曰石脆之山，其木多棕枏，其草多条，其状如韭，而白华黑实，食之已疥。其阳多㻬琈之玉，其阴多铜。灌水出焉，而北流注于禺水。其中有流赭，以涂牛马无病。",
        translation: "再往西六十里，有座石脆山，山上的树木多为棕树和楠树，草多为条草，形状像韭菜，开白花结黑果，吃了可以治疗疥疮。山南面多㻬琈玉，山北面多铜。灌水从这座山发源，向北流入禺水。水中有流赭，用它涂抹牛马可以使之不生疾病。",
        difficultChars: [
          { char: "枏", pinyin: "nán", meaning: "同'楠'，楠树" },
          { char: "㻬琈", pinyin: "tū fú", meaning: "玉名" },
          { char: "赭", pinyin: "zhě", meaning: "红色矿石" },
          { char: "疥", pinyin: "jiè", meaning: "疥疮" },
        ],
      },
      {
        id: "xishan-12",
        original: "又西七十里，曰英山，其上多杻橿，其阴多铁，其阳多赤金。禺水出焉，北流注于招水，其中多𬶆鱼，其状如鳖，其音如羊。其阳多箭䉋，兽多㸲牛、羬羊。有鸟焉，其状如鹑，黄身而赤喙，其名曰肥遗，食之已疠，可以杀虫。",
        translation: "再往西七十里，有座英山，山上多杻树和橿树，山北面多铁，山南面多赤金。禺水从这座山发源，向北流入招水，水中多𬶆鱼，形状像鳖，叫声像羊。山南面多箭竹和䉋竹，野兽多为㸲牛和羬羊。山中有一种鸟，形状像鹌鹑，黄色的身体红色的嘴，名叫肥遗，吃了它可以治疗瘟疫，还可以杀死体内的寄生虫。",
        difficultChars: [
          { char: "𬶆", pinyin: "bì", meaning: "鱼名" },
          { char: "鹑", pinyin: "chún", meaning: "鹌鹑" },
          { char: "疠", pinyin: "lì", meaning: "瘟疫、恶疾" },
        ],
        relatedBeastId: "feiyi-bird",
      },
      {
        id: "xishan-13",
        original: "又西五十二里，曰竹山，其上多乔木，其阴多铁。有草焉，其名曰黄雚，其状如樗，其叶如麻，白华而赤实，其状如赭，浴之已疥，又可以已胕。竹水出焉，北流注于渭，其阳多竹箭，多苍玉。丹水出焉，东南流注于洛水，其中多水玉，多人鱼。有兽焉，其状如豚而白毛，大如筓而黑端，名曰豪彘。",
        translation: "再往西五十二里，有座竹山，山上多高大树木，山北面多铁。山中有一种草叫黄雚，形状像臭椿树，叶子像麻叶，开白花结红果，形状像赭石，用它洗浴可以治疗疥疮，还可以治疗浮肿。竹水从这座山发源，向北流入渭水，山南面多箭竹，多苍玉。丹水从这座山发源，向东南流入洛水，水中多水晶，多娃娃鱼。山中有一种兽，形状像猪却长着白毛，毛粗如簪子而尖端黑色，名叫豪彘。",
        difficultChars: [
          { char: "雚", pinyin: "guàn", meaning: "草名" },
          { char: "樗", pinyin: "chū", meaning: "臭椿树" },
          { char: "胕", pinyin: "fū", meaning: "浮肿" },
          { char: "筓", pinyin: "jī", meaning: "簪子" },
          { char: "彘", pinyin: "zhì", meaning: "猪" },
        ],
      },
      {
        id: "xishan-14",
        original: "又西百二十里，曰浮山，多盼木，枳叶而无伤，木虫居之。有草焉，名曰薰草，麻叶而方茎，赤华而黑实，臭如蘼芜，佩之可以已疠。",
        translation: "再往西一百二十里，有座浮山，山上多盼木，叶子像枳树叶却没有刺，树中有虫居住。山中有一种草，名叫薰草，叶子像麻叶而茎是方形的，开红花结黑果，气味像蘼芜，佩戴它可以治疗瘟疫。",
        difficultChars: [
          { char: "薰", pinyin: "xūn", meaning: "一种香草" },
          { char: "蘼芜", pinyin: "mí wú", meaning: "香草名" },
          { char: "疠", pinyin: "lì", meaning: "瘟疫" },
        ],
      },
      {
        id: "xishan-15",
        original: "又西七十里，曰羭次之山，漆水出焉，北流注于渭。其上多棫橿，其下多竹箭，其阴多赤铜，其阳多婴垣之玉。有兽焉，其状如禺而长臂，善投，其名曰嚣。有鸟焉，其状如枭，人面而一足，曰橐𩇯，冬见夏蛰，服之不畏雷。",
        translation: "再往西七十里，有座羭次山，漆水从这座山发源，向北流入渭水。山上多棫树和橿树，山下多箭竹，山北面多赤铜，山南面多婴垣玉。山中有一种兽，形状像猿猴而长着长长的手臂，善于投掷，名叫嚣。山中有一种鸟，形状像枭鸟，长着人的脸而只有一只脚，名叫橐𩇯，冬天出现夏天蛰伏，佩戴它的羽毛可以不畏惧雷声。",
        difficultChars: [
          { char: "羭", pinyin: "yú", meaning: "羭次，山名" },
          { char: "棫", pinyin: "yù", meaning: "棫树" },
          { char: "嚣", pinyin: "xiāo", meaning: "兽名" },
          { char: "枭", pinyin: "xiāo", meaning: "枭鸟，猫头鹰一类" },
          { char: "橐𩇯", pinyin: "tuó féi", meaning: "鸟名" },
          { char: "蛰", pinyin: "zhé", meaning: "蛰伏" },
        ],
      },
    ],
  },
  {
    id: "beishan",
    name: "北山经",
    subtitle: "精卫填海的悲壮传说",
    introduction:
      "《北山经》最著名的篇章是精卫填海的故事。炎帝之女女娃溺于东海，化为精卫鸟，日夜衔木石以填沧海。这份不屈的执着，成为中华民族精神的永恒象征。",
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
        relatedBeastId: "jingwei",
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
      {
        id: "beishan-4",
        original:
          "又北二百里，曰少咸之山。无草木，多青碧。有兽焉，其状如牛，而四角、人目、彘耳，其名曰诸怀。",
        translation:
          "再往北两百里，有座少咸山。山上不长草木，盛产青碧色的美石。山中有一种兽，形状像牛，长着四只角、人一样的眼睛和猪一样的耳朵，名叫诸怀。",
        difficultChars: [
          { char: "彘", pinyin: "zhì", meaning: "猪" },
        ],
      },
      {
        id: "beishan-5",
        original: "又北三百里，曰太行之山。有草焉，其状如莽草而赤华，名曰鬼草。",
        translation:
          "再往北三百里，是太行山。山上有一种草，形状像莽草但开着红色的花，名叫鬼草。",
        difficultChars: [
          { char: "莽", pinyin: "mǎng", meaning: "一种有毒的草" },
        ],
      },
      {
        id: "beishan-6",
        original: "北山之首曰单狐之山，多机木，其上多华草。漨水出焉，而西流注于泑水，其中多茈石、文石。",
        translation:
          "北方第一列山系的首座山叫单狐山，山上生长着很多机木，山顶有很多华草。漨水从这座山发源，向西流入泑水，水中有很多紫色的石头和带花纹的石头。",
        difficultChars: [
          { char: "机", pinyin: "jī", meaning: "机木，一种落叶乔木" },
          { char: "茈", pinyin: "zǐ", meaning: "紫色的石头" },
        ],
      },
      {
        id: "beishan-7",
        original: "又北三百里，曰求如之山。其上多铜，其下多玉，无草木。滑水出焉，而西流注于诸毗之水。其中多滑鱼，其状如鳝，赤背，其音如梧，食之已疣。",
        translation:
          "再往北三百里，有座求如山。山上盛产铜，山下盛产玉石，没有草木。滑水从这座山发源，向西流入诸毗水。水中有很多滑鱼，形状像鳝鱼，红色的脊背，叫声像梧树之声，吃了可以治愈疣病。",
        difficultChars: [
          { char: "鳝", pinyin: "shàn", meaning: "鳝鱼，黄鳝" },
          { char: "疣", pinyin: "yóu", meaning: "皮肤上长的肉瘤" },
        ],
      },
      {
        id: "beishan-8",
        original: "又北三百里，曰带山。其上多玉，其下多碧。有兽焉，其状如马，一角有错，其名曰䑏疏，可以辟火。",
        translation:
          "再往北三百里，有座带山，山上盛产玉石，山下多青碧。山中有一种兽，形状像马，长有一只角，角上有纹理，名叫䑏疏，可以辟除火灾。",
        difficultChars: [
          { char: "䑏", pinyin: "huān", meaning: "古代传说中的一种神兽" },
          { char: "疏", pinyin: "shū", meaning: "此处为兽名用字" },
        ],
      },
      {
        id: "beishan-9",
        original: "又北三百五十里，曰谯明之山。谯水出焉，西流注于河。其中多何罗之鱼，一首而十身，其音如吠犬，食之已痈。",
        translation:
          "再往北三百五十里，有座谯明山。谯水从这座山发源，向西流入黄河。水中有很多何罗鱼，一个头十个身子，叫声像狗吠，吃了可以治愈痈肿。",
        difficultChars: [
          { char: "谯", pinyin: "qiáo", meaning: "山名" },
          { char: "痈", pinyin: "yōng", meaning: "毒疮、痈肿" },
        ],
      },
      {
        id: "beishan-10",
        original: "又北三百五十里，曰涿光之山。嚣水出焉，而西流注于河。其中多鳛鳛之鱼，其状如鹊而十翼，鳞皆在羽端，其音如鹊，可以御火，食之不瘅。",
        translation:
          "再往北三百五十里，有座涿光山。嚣水从这座山发源，向西流入黄河。水中有很多鳛鳛鱼，形状像喜鹊却长着十只翅膀，鱼鳞都长在羽翅的尖端，叫声像喜鹊，可以防御火灾，吃了不会生黄疸病。",
        difficultChars: [
          { char: "鳛", pinyin: "xí", meaning: "鳛鳛鱼，一种神异之鱼" },
          { char: "瘅", pinyin: "dàn", meaning: "黄疸病" },
        ],
      },
      {
        id: "beishan-11",
        original: "又北三百里，曰虢山。其上多漆，其下多桐椐。其阳多玉，其阴多铁。伊水出焉，西流注于河。其兽多橐驼，其鸟多寓，状如鼠而鸟翼，其音如羊，可以御兵。",
        translation:
          "再往北三百里，有座虢山。山上盛产漆树，山下多桐树和椐树。山的南面盛产玉石，北面富含铁矿。伊水从这座山发源，向西流入黄河。山中的野兽以橐驼居多，山中的鸟以寓鸟居多，形状像老鼠却长着鸟翅膀，叫声像羊，可以防御兵灾。",
        difficultChars: [
          { char: "虢", pinyin: "guó", meaning: "古国名，此处为山名" },
          { char: "椐", pinyin: "jū", meaning: "灵寿木，一种树" },
          { char: "橐", pinyin: "tuó", meaning: "橐驼，即骆驼" },
        ],
      },
      {
        id: "beishan-12",
        original: "又北三百里，曰单张之山。其上无草木。有兽焉，其状如豹而长尾，人首而牛耳，一目，名曰诸犍，善咤，行则衔其尾，居则蟠其尾。",
        translation:
          "再往北三百里，有座单张山。山上不长草木。山中有一种兽，形状像豹子却拖着长长的尾巴，长着人的脑袋和牛的耳朵，只有一只眼睛，名叫诸犍，善于怒叱，行走时衔着自己的尾巴，停歇时就把尾巴盘起来。",
        difficultChars: [
          { char: "犍", pinyin: "jiān", meaning: "诸犍，兽名" },
          { char: "咤", pinyin: "zhà", meaning: "怒叱、怒吼" },
        ],
        relatedBeastId: "zhujian",
      },
      {
        id: "beishan-13",
        original: "又北二百里，曰隄山，其上多马。有兽焉，其状如豹而文首，名曰狕。",
        translation:
          "再往北二百里，有座隄山，山上有很多马。山中有一种兽，形状像豹子，头上有花纹，名叫狕。",
        difficultChars: [
          { char: "隄", pinyin: "dī", meaning: "隄山，山名" },
          { char: "狕", pinyin: "yǎo", meaning: "一种似豹的兽" },
        ],
      },
      {
        id: "beishan-14",
        original: "又北二百里，曰石者之山。其上无草木，多瑶碧。泚水出焉，而西流注于河。有兽焉，其状如豹，而文题，白身，名曰孟极，是善伏，其鸣自呼。",
        translation:
          "再往北二百里，有座石者山。山上不长草木，遍布瑶碧美石。泚水从这座山发源，向西流入黄河。山中有一种兽，形状像豹子，额头有花纹，身子白色，名叫孟极，善于潜伏，叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "泚", pinyin: "cǐ", meaning: "水名" },
          { char: "孟极", pinyin: "mèng jí", meaning: "兽名" },
        ],
      },
      {
        id: "beishan-15",
        original: "又北三百二十里，曰大咸之山。无草木，其下多玉。是山也，四方，不可以上。有蛇名曰长蛇，其毛如彘豪，其音如鼓柝。",
        translation:
          "再往北三百二十里，有座大咸山。山上不长草木，山下盛产玉石。这座山四四方方，无法攀登。山中有一种蛇名叫长蛇，身上长着像猪鬃一样的毛，叫声像敲梆子。",
        difficultChars: [
          { char: "彘", pinyin: "zhì", meaning: "猪" },
          { char: "柝", pinyin: "tuò", meaning: "打更用的梆子" },
        ],
      },
    ],
  },
  {
    id: "dongshan",
    name: "东山经",
    subtitle: "东方群山的奇兽异禽",
    introduction:
      "《东山经》记录了东方群山中的奇兽异禽。六足的从从、鼠毛的𪃟鼠鸟、能预示旱涝的异兽——东方的山川在先民笔下充满了神秘的自然密码。",
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
        relatedBeastId: "yongyong-fish",
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
        relatedBeastId: "congcong",
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
        relatedBeastId: "shushu-bird",
      },
      {
        id: "dongshan-4",
        original:
          "又南三百里，曰勃垒之山。有鸟焉，其状如鹊，白身、赤尾、六足，其名曰𪈛，善惊，其鸣自詨。",
        translation:
          "再往南三百里，有座勃垒山。山中有一种鸟，形状像喜鹊，白色身体、红色尾巴、六只脚，名叫𪈛鸟，很容易受惊，叫声如同呼唤自己的名字。",
        difficultChars: [
          { char: "𪈛", pinyin: "bì", meaning: "一种六足鸟" },
        ],
      },
      {
        id: "dongshan-5",
        original: "又南三百里，曰藟山。其上有玉，其下有金。湖水出焉，东流注于食水，其中多活师。",
        translation:
          "再往南三百里，有座藟山。山上盛产玉石，山下富含金矿。湖水从这座山发源，向东流入食水，水中有很多活师（蝌蚪）。",
        difficultChars: [
          { char: "藟", pinyin: "lěi", meaning: "山名" },
          { char: "活师", pinyin: "huó shī", meaning: "蝌蚪的古称" },
        ],
      },
      {
        id: "dongshan-6",
        original: "又南三百里，曰番条之山，无草木，多沙。减水出焉，北流注于海，其中多鳡鱼。",
        translation:
          "再往南三百里，有座番条山。山上不长草木，遍布沙子。减水从这座山发源，向北流入大海，水中有很多鳡鱼。",
        difficultChars: [
          { char: "鳡", pinyin: "gǎn", meaning: "鳡鱼，一种凶猛的淡水鱼" },
        ],
      },
      {
        id: "dongshan-7",
        original: "又南三百里，曰独山。其上多金玉，其下多美石。末涂之水出焉，而东南流注于沔，其中多𧌇，其状如黄蛇，鱼翼，出入有光，见则天下大旱。",
        translation:
          "再往南三百里，有座独山。山上盛产金属矿物和美玉，山下有很多美丽的石头。末涂水从这座山发源，向东南流入沔水，水中有很多𧌇，形状像黄色的蛇，长着鱼一样的鳍翼，出入水面时发光，它一出现天下就会发生大旱灾。",
        difficultChars: [
          { char: "𧌇", pinyin: "tiáo", meaning: "一种蛇状神异生物" },
          { char: "沔", pinyin: "miǎn", meaning: "古水名" },
        ],
      },
      {
        id: "dongshan-8",
        original: "又南三百里，曰泰山。其上多玉，其下多金。有兽焉，其状如豚而有珠，名曰狪狪，其鸣自詨。环水出焉，东流注于江，其中多水玉。",
        translation:
          "再往南三百里，有座泰山。山上盛产玉石，山下富含黄金。山中有一种兽，形状像猪，体内有珠子，名叫狪狪，叫声像在呼唤自己的名字。环水从这座山发源，向东流入长江，水中有很多水晶。",
        difficultChars: [
          { char: "狪狪", pinyin: "tóng tóng", meaning: "兽名" },
          { char: "豚", pinyin: "tún", meaning: "猪" },
        ],
      },
      {
        id: "dongshan-9",
        original: "又南三百里，曰竹山，錞于江，无草木，多瑶碧。激水出焉，而东南流注于娶檀之水，其中多茈羸。",
        translation:
          "再往南三百里，有座竹山，依傍长江，山上不长草木，遍布瑶碧美石。激水从这座山发源，向东南流入娶檀水，水中有很多茈羸。",
        difficultChars: [
          { char: "茈羸", pinyin: "zǐ léi", meaning: "一种水生贝类" },
          { char: "錞", pinyin: "chún", meaning: "依附、靠近" },
        ],
      },
      {
        id: "dongshan-10",
        original: "又南三百里，曰尸胡之山。有兽焉，其状如麋而鱼目，名曰妴胡，其鸣自訆。",
        translation:
          "再往南三百里，有座尸胡山。山中有一种兽，形状像麋鹿却长着鱼一样的眼睛，名叫妴胡，叫声像在呼唤自己的名字。",
        difficultChars: [
          { char: "妴胡", pinyin: "yuàn hú", meaning: "兽名" },
          { char: "麋", pinyin: "mí", meaning: "麋鹿" },
        ],
      },
      {
        id: "dongshan-11",
        original: "又南三百八十里，曰余峨之山。有兽焉，其状如菟而鸟喙，鸱目蛇尾，见人则眠，名曰犰狳，其鸣自訆，见则螽蝗为败。",
        translation:
          "再往南三百八十里，有余峨山。山中有一种兽，形状像兔子却长着鸟嘴，猫头鹰一样的眼睛和蛇一样的尾巴，看见人就装死，名叫犰狳，叫声像在呼唤自己的名字，它一出现就会有蝗虫成灾。",
        difficultChars: [
          { char: "犰狳", pinyin: "qiú yú", meaning: "一种见人就装死的异兽" },
          { char: "鸱", pinyin: "chī", meaning: "鸱鸮，猫头鹰一类的鸟" },
        ],
        relatedBeastId: "qiuyu",
      },
      {
        id: "dongshan-12",
        original: "又南三百八十里，曰葛山之首，无草木，多砥砺。澧水出焉，东流注于余泽，其中多珠蟞鱼，其状如胏而有目，六足有珠，其味酸甘，食之无疠。",
        translation:
          "再往南三百八十里，是葛山之首，山上不长草木，遍布磨刀石。澧水从这里发源，向东流入余泽，水中有很多珠蟞鱼，形状像肺却有眼睛，长着六只脚，体内有珍珠，味道酸甜，吃了可以预防瘟疫。",
        difficultChars: [
          { char: "珠蟞", pinyin: "zhū biē", meaning: "珠蟞鱼，一种体内生珠的异鱼" },
          { char: "胏", pinyin: "fèi", meaning: "肺的古字" },
          { char: "疠", pinyin: "lì", meaning: "瘟疫" },
        ],
      },
    ],
  },
  {
    id: "hainei",
    name: "海内经",
    subtitle: "天地之间的创世传说",
    introduction:
      "《海内经》讲述的是天地间最宏大的创世神话。烛龙人面蛇身，睁眼为昼、闭眼为夜；九头相柳所经之处化为沼泽。这些神话构成了中国最古老的宇宙观。",
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
        relatedBeastId: "zhulong",
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
      {
        id: "hainei-4",
        original:
          "有人曰苗民，有神焉，人面蛇身，长如辕，左右有首，衣紫衣，冠旃冠，名曰延维。",
        translation:
          "有一种人叫苗民。他们那里有位神灵，人面蛇身，身长如车辕，左右两端各有一个头，穿着紫色的衣服，戴着旃帽，名叫延维。",
        difficultChars: [
          { char: "辕", pinyin: "yuán", meaning: "车前的横木" },
          { char: "旃", pinyin: "zhān", meaning: "一种赤色旗帜，此处指帽子" },
        ],
      },
      {
        id: "hainei-5",
        original: "洪水滔天。鲧窃帝之息壤以堙洪水，不待帝命。帝令祝融杀鲧于羽郊。鲧复生禹。帝乃命禹卒布土以定九州。",
        translation: "洪水泛滥漫天。鲧偷窃了天帝的息壤来堵塞洪水，没有等待天帝的命令。天帝命令祝融在羽山之郊杀死鲧。鲧（死后尸身）又生下禹。天帝于是命令禹最终铺填土壤来平定九州。",
        difficultChars: [
          { char: "鲧", pinyin: "gǔn", meaning: "大禹的父亲" },
          { char: "堙", pinyin: "yīn", meaning: "堵塞、填塞" },
          { char: "息壤", pinyin: "xī rǎng", meaning: "传说中能自己生长的神土" },
          { char: "卒", pinyin: "zú", meaning: "最终、终于" },
        ],
      },
      {
        id: "hainei-6",
        original: "蚩尤作兵伐黄帝，黄帝乃令应龙攻之冀州之野。应龙畜水，蚩尤请风伯雨师，纵大风雨。黄帝乃下天女曰魃，雨止，遂杀蚩尤。",
        translation: "蚩尤制造兵器攻打黄帝，黄帝于是命令应龙在冀州的旷野上攻打蚩尤。应龙蓄积大水，蚩尤请来风伯和雨师，掀起狂风暴雨。黄帝于是派遣天女名叫魃，雨便停止了，于是杀死了蚩尤。",
        difficultChars: [
          { char: "蚩尤", pinyin: "chī yóu", meaning: "上古时代九黎部落的首领" },
          { char: "应龙", pinyin: "yìng lóng", meaning: "生有翅膀的神龙，黄帝的神将" },
          { char: "魃", pinyin: "bá", meaning: "旱神，黄帝所降的天女" },
          { char: "畜", pinyin: "xù", meaning: "蓄积（水）" },
        ],
      },
      {
        id: "hainei-7",
        original: "夸父与日逐走，入日。渴欲得饮，饮于河渭，河渭不足，北饮大泽。未至，道渴而死。弃其杖，化为邓林。",
        translation: "夸父和太阳赛跑，追赶到太阳落下的地方。口渴了想要喝水，在黄河和渭河饮水，黄河渭河的水不够喝，又向北去喝大泽的水。还没到达，就在路上渴死了。他丢弃的手杖，化作了邓林（桃林）。",
        difficultChars: [
          { char: "夸父", pinyin: "kuā fù", meaning: "上古神话中追逐太阳的神人" },
          { char: "河渭", pinyin: "hé wèi", meaning: "黄河与渭河" },
          { char: "邓林", pinyin: "dèng lín", meaning: "传说中的桃林" },
        ],
      },
      {
        id: "hainei-8",
        original: "帝俊赐羿彤弓素矰，以扶下国，羿是始去恤下地之百艰。",
        translation: "帝俊赏赐给羿红色的弓和白色的箭，用来扶助下界的国家，羿于是开始去解除下界的各种艰难灾祸。",
        difficultChars: [
          { char: "彤弓", pinyin: "tóng gōng", meaning: "红色的弓" },
          { char: "素矰", pinyin: "sù zēng", meaning: "白色的短箭" },
          { char: "恤", pinyin: "xù", meaning: "救济、解除（苦难）" },
        ],
      },
      {
        id: "hainei-9",
        original: "有神十人，名曰女娲之肠，化为神，处栗广之野，横道而处。",
        translation: "有十位神灵，名叫女娲之肠，（由女娲肠所化）成为神灵，居住在栗广的原野上，横卧在道路中间。",
        difficultChars: [
          { char: "女娲", pinyin: "nǚ wā", meaning: "上古创世女神，传说用黄土造人" },
          { char: "栗广", pinyin: "lì guǎng", meaning: "原野名" },
          { char: "处", pinyin: "chǔ", meaning: "居住" },
        ],
      },
      {
        id: "hainei-10",
        original: "有女子方浴月。帝俊妻常羲，生月十有二，此始浴之。",
        translation: "有位女子正在给月亮沐浴。帝俊的妻子常羲，生了十二个月亮，这才开始给它们沐浴。",
        difficultChars: [
          { char: "常羲", pinyin: "cháng xī", meaning: "帝俊之妻，生十二个月亮的神女" },
          { char: "方", pinyin: "fāng", meaning: "正在" },
          { char: "浴", pinyin: "yù", meaning: "沐浴、清洗" },
        ],
      },
      {
        id: "hainei-11",
        original: "有木，青叶紫茎，玄华黄实，名曰建木，百仞无枝，有九欘，下有九枸，其实如麻，其叶如芒。",
        translation: "有一种树，青色的叶子，紫色的茎干，黑色的花，黄色的果实，名叫建木，高达百仞却没有旁枝，树顶有九根分枝，树根有九条盘曲，它的果实像麻子，叶子像芒草叶。",
        difficultChars: [
          { char: "建木", pinyin: "jiàn mù", meaning: "传说中沟通天地的神树" },
          { char: "玄华", pinyin: "xuán huá", meaning: "黑色的花" },
          { char: "仞", pinyin: "rèn", meaning: "古代长度单位，一仞约合八尺" },
          { char: "欘", pinyin: "zhú", meaning: "树木的分枝" },
        ],
      },
      {
        id: "hainei-12",
        original: "巴蛇食象，三岁而出其骨，君子服之，无心腹之疾。",
        translation: "巴蛇能吞下大象，三年后才吐出骨头，君子吃了巴蛇肉，不会患上心腹的疾病。",
        difficultChars: [
          { char: "巴蛇", pinyin: "bā shé", meaning: "古代巴蜀地区的巨蛇" },
          { char: "服", pinyin: "fú", meaning: "吃、服用" },
          { char: "心腹", pinyin: "xīn fù", meaning: "心脏和腹部，泛指内脏" },
        ],
      },
    ],
  },
  {
    id: "zhongshan",
    name: "中山经",
    subtitle: "天地之中，万灵汇聚",
    introduction:
      "《中山经》是《山海经》中篇帙最浩繁的篇章，涵盖五大山系，共记录了数百座山川与无数奇珍异兽。中山地处华夏腹地，万物生灵在此汇聚，是山海经中生物多样性最为丰富的区域。",
    sentences: [
      {
        id: "zhongshan-1",
        original:
          "中山经薄山之首，曰甘枣之山。共水出焉，而西流注于河。",
        translation:
          "中央山系薄山山系的第一座山，叫甘枣山。共水从这座山发源，向西流入黄河。",
        difficultChars: [
          { char: "薄", pinyin: "bó", meaning: "薄山，山系名" },
          { char: "共", pinyin: "gòng", meaning: "共水，水名" },
        ],
      },
      {
        id: "zhongshan-2",
        original:
          "其上多杻文。有兽焉，其状如麢而赤豪，其音如交，食之已瘅。",
        translation:
          "山上多杻树和橿树。山中有一种野兽，形状像羚羊却长着红色的鬃毛，叫声像人在交谈，吃了它的肉可以治疗黄疸病。",
        difficultChars: [
          { char: "麢", pinyin: "líng", meaning: "羚羊" },
          { char: "豪", pinyin: "háo", meaning: "鬃毛" },
          { char: "瘅", pinyin: "dàn", meaning: "黄疸病" },
        ],
      },
      {
        id: "zhongshan-3",
        original: "又东二十里，曰历儿之山。其上多橿，多杻木。",
        translation:
          "再往东二十里，有座历儿山。山上多橿树，也多杻树。",
        difficultChars: [
          { char: "橿", pinyin: "jiāng", meaning: "一种常绿乔木，木质坚硬" },
          { char: "杻", pinyin: "niǔ", meaning: "一种落叶乔木" },
        ],
      },
      {
        id: "zhongshan-4",
        original:
          "有兽焉，其状如彘而白首虎爪，名曰渠猪，见则其邑大兵。",
        translation:
          "山中有一种野兽，形状像猪却长着白色的头和老虎一样的爪子，名叫渠猪，它一出现当地就会发生大规模的战争。",
        difficultChars: [
          { char: "彘", pinyin: "zhì", meaning: "猪" },
          { char: "邑", pinyin: "yì", meaning: "城邑、地方" },
          { char: "兵", pinyin: "bīng", meaning: "战争、兵灾" },
        ],
      },
      {
        id: "zhongshan-5",
        original:
          "又有草焉，名曰牛伤，其状如藾而赤华，叶如堇根，服之者不鸣不厉。",
        translation:
          "山中有一种草，名叫牛伤，形状像藾草而开着红色的花，叶子像堇菜的根部，吃了它的人不会失声，也不会得手脚僵直之病。",
        difficultChars: [
          { char: "藾", pinyin: "lài", meaning: "藾草，一种植物" },
          { char: "堇", pinyin: "jǐn", meaning: "堇菜" },
          { char: "厉", pinyin: "lì", meaning: "手脚僵直的疾病" },
        ],
      },
      {
        id: "zhongshan-6",
        original:
          "又东三十里，曰蔓渠之山。其上多金玉，其下多竹。伊水出焉，而东流注于洛。",
        translation:
          "再往东三十里，有座蔓渠山。山上盛产金属矿物和美玉，山下多竹子。伊水从这座山发源，向东流入洛水。",
        difficultChars: [
          { char: "蔓", pinyin: "màn", meaning: "蔓渠，山名" },
          { char: "洛", pinyin: "luò", meaning: "洛水，古水名" },
        ],
      },
      {
        id: "zhongshan-7",
        original:
          "有鸟焉，其状如山鸡而三首六目六足三翼，名曰鵸鵌，食之无卧。",
        translation:
          "山中有一种鸟，形状像山鸡却长着三个头、六只眼睛、六条腿、三只翅膀，名叫鵸鵌，吃了它的肉就不会嗜睡。",
        difficultChars: [
          { char: "鵸鵌", pinyin: "qí tú", meaning: "一种多首多翼的神异鸟" },
          { char: "卧", pinyin: "wò", meaning: "嗜睡" },
        ],
        relatedBeastId: "tiangou",
      },
      {
        id: "zhongshan-8",
        original:
          "又西三十里，曰蔓渠之山。其上多金玉，其下多竹。有兽焉，其状如鹿而白尾，马足人手而四角，名曰𪊨𪊨，其鸣自呼。",
        translation:
          "再往西三十里，有座蔓渠山。山上盛产金属矿物和美玉，山下多竹子。山中有一种野兽，形状像鹿却长着白色的尾巴、马一样的蹄子和人一样的手，还长着四只角，名叫𪊨𪊨，叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "𪊨", pinyin: "jī", meaning: "𪊨𪊨，一种鹿形异兽" },
          { char: "角", pinyin: "jiǎo", meaning: "兽角" },
        ],
        relatedBeastId: "lusu",
      },
      {
        id: "zhongshan-9",
        original:
          "又东四十里，曰苦山。有兽焉，其状如夸父而彘毛，其音如呼，见则天下大水。",
        translation:
          "再往东四十里，有座苦山。山中有一种野兽，形状像猿猴（夸父）却长着猪一样的鬃毛，叫声像人在呼喊，它一出现天下就会发生大水灾。",
        difficultChars: [
          { char: "夸父", pinyin: "kuā fù", meaning: "此处指猿猴类动物" },
          { char: "彘", pinyin: "zhì", meaning: "猪，此处指猪毛" },
        ],
        relatedBeastId: "xingsheng",
      },
      {
        id: "zhongshan-10",
        original:
          "又东二十里，曰放皋之山。明水出焉，而南流注于河。其中多玉，多鲋鱼。",
        translation:
          "再往东二十里，有座放皋山。明水从这座山发源，向南流入黄河。水中盛产美玉，有很多鲋鱼。",
        difficultChars: [
          { char: "皋", pinyin: "gāo", meaning: "放皋，山名" },
          { char: "鲋", pinyin: "fù", meaning: "鲫鱼" },
        ],
      },
      {
        id: "zhongshan-11",
        original:
          "有兽焉，其状如蜂，枝尾而反舌，善呼，其名曰文文。",
        translation:
          "山中有一种野兽，形状像蜜蜂，尾巴分叉，舌头反长，善于呼叫，名叫文文。",
        difficultChars: [
          { char: "枝", pinyin: "zhī", meaning: "分叉" },
          { char: "反舌", pinyin: "fǎn shé", meaning: "舌头反着长" },
        ],
        relatedBeastId: "congcong",
      },
      {
        id: "zhongshan-12",
        original:
          "又东五十二里，曰少室之山。百草木成囷。其上有木焉，名曰帝休，叶状如杨，其枝五衢，黄华黑实，服者不怒。",
        translation:
          "再往东五十二里，有座少室山。山上草木丛生，密密匝匝如粮仓一般。山上有一种树，名叫帝休，叶子像杨树叶，枝条向五个方向伸展，开黄花结黑果，吃了它的果实就不会发怒。",
        difficultChars: [
          { char: "囷", pinyin: "qūn", meaning: "圆形的粮仓" },
          { char: "衢", pinyin: "qú", meaning: "四通八达的道路，此处指枝条向四方伸展" },
          { char: "怒", pinyin: "nù", meaning: "发怒" },
        ],
      },
    ],
  },
  {
    id: "haiwainan",
    name: "海外南经",
    subtitle: "海外南方的奇邦异国",
    introduction:
      "《海外南经》记述了海外西南至东南的奇异国度。这里有身生羽翼的羽民国、胸有孔窍的贯匈国、口吐烈焰的厌火国，以及独足人面的毕方鸟。这些光怪陆离的邦国与神兽，构成了先民对海外世界最瑰丽的想象。",
    sentences: [
      {
        id: "haiwainan-1",
        original: "海外自西南陬至东南陬者。结匈国在其西南，其为人结匈。",
        translation:
          "海外从西南角到东南角的地方。结匈国在它的西南面，那里的人胸部向前突出（鸡胸）。",
        difficultChars: [
          { char: "陬", pinyin: "zōu", meaning: "角落、隅" },
          { char: "结匈", pinyin: "jié xiōng", meaning: "胸骨向前突出，即鸡胸" },
        ],
      },
      {
        id: "haiwainan-2",
        original: "羽民国在其东南，其为人长颊，身生羽。",
        translation:
          "羽民国在它的东南面，那里的人脸颊狭长，身上长着羽毛。",
        difficultChars: [
          { char: "颊", pinyin: "jiá", meaning: "脸颊" },
          { char: "羽", pinyin: "yǔ", meaning: "鸟的毛，此处指羽毛" },
        ],
      },
      {
        id: "haiwainan-3",
        original:
          "有神人二八，连臂，为帝司夜于此野。在羽民东。其为人小颊赤肩。尽十六人。",
        translation:
          "有十六位神人，手臂相连，为天帝在这片原野上守夜。他们在羽民国的东面。这些人脸颊较小，肩膀赤红，一共十六人。",
        difficultChars: [
          { char: "司", pinyin: "sī", meaning: "主管、掌管" },
          { char: "连臂", pinyin: "lián bì", meaning: "手臂相连" },
        ],
      },
      {
        id: "haiwainan-4",
        original: "毕方鸟在其东，青水西，其为鸟人面一脚。",
        translation:
          "毕方鸟在它的东面、青水的西面，这种鸟长着人的面孔，只有一只脚。",
        difficultChars: [
          { char: "毕方", pinyin: "bì fāng", meaning: "传说中的火兆之鸟" },
          { char: "一脚", pinyin: "yī jiǎo", meaning: "一只脚" },
        ],
        relatedBeastId: "bifang",
      },
      {
        id: "haiwainan-5",
        original: "讙头国在其南，其为人人面有翼，鸟喙，方捕鱼。",
        translation:
          "讙头国在它的南面，那里的人长着人的面孔却带有翅膀，鸟一样的嘴，正在捕鱼。",
        difficultChars: [
          { char: "讙", pinyin: "huān", meaning: "同\"欢\"" },
          { char: "喙", pinyin: "huì", meaning: "鸟兽的嘴" },
          { char: "方", pinyin: "fāng", meaning: "正在" },
        ],
      },
      {
        id: "haiwainan-6",
        original: "厌火国在其国南，兽身黑色。火出其口中。",
        translation:
          "厌火国在它的南面，那里的人长着野兽一样的身子，皮肤是黑色的。火从他们口中吐出。",
        difficultChars: [
          { char: "厌", pinyin: "yàn", meaning: "厌恶、不畏" },
          { char: "兽身", pinyin: "shòu shēn", meaning: "野兽般的身体" },
        ],
      },
      {
        id: "haiwainan-7",
        original: "三株树在厌火北，生赤水之上，其为树如柏，叶皆为珠。",
        translation:
          "三株树在厌火国的北面，生长在赤水之上，这种树像柏树，叶子都是珍珠。",
        difficultChars: [
          { char: "株", pinyin: "zhū", meaning: "树的量词，此处为树名" },
          { char: "柏", pinyin: "bǎi", meaning: "柏树" },
        ],
      },
      {
        id: "haiwainan-8",
        original: "贯匈国在其东，其为人匈有窍。",
        translation:
          "贯匈国在它的东面，那里的人胸口有一个洞（孔窍）。",
        difficultChars: [
          { char: "贯", pinyin: "guàn", meaning: "穿通" },
          { char: "匈", pinyin: "xiōng", meaning: "同\"胸\"" },
          { char: "窍", pinyin: "qiào", meaning: "孔洞" },
        ],
      },
      {
        id: "haiwainan-9",
        original: "交胫国在其东，其为人交胫。",
        translation:
          "交胫国在它的东面，那里的人两条小腿互相交叉。",
        difficultChars: [
          { char: "交", pinyin: "jiāo", meaning: "交叉" },
          { char: "胫", pinyin: "jìng", meaning: "小腿" },
        ],
      },
      {
        id: "haiwainan-10",
        original: "不死民在其东，其为人黑色，寿，不死。",
        translation:
          "不死民在它的东面，那里的人皮肤黑色，长寿，永远不会死。",
        difficultChars: [
          { char: "寿", pinyin: "shòu", meaning: "长寿" },
          { char: "不死", pinyin: "bù sǐ", meaning: "不会死亡" },
        ],
      },
    ],
  },
  {
    id: "haiwaixi",
    name: "海外西经",
    subtitle: "海外西方的神异传说",
    introduction:
      "《海外西经》描绘了海外西方的奇异邦国与神兽。奇肱国之人巧于机巧，能驾飞车纵横天际；乘黄似狐而有角，乘之可寿二千岁；刑天断首犹舞干戚，不屈之志震慑天地；更有三面之人，乃颛顼之子，长生不死。",
    sentences: [
      {
        id: "haiwaixi-1",
        original: "三身国在夏后启北，一首而三身。",
        translation:
          "三身国在夏后启的北面，那里的人长着一个脑袋、三个身子。",
        difficultChars: [
          { char: "夏后启", pinyin: "xià hòu qǐ", meaning: "夏朝君主启" },
          { char: "首", pinyin: "shǒu", meaning: "头" },
        ],
      },
      {
        id: "haiwaixi-2",
        original: "一臂国在其北，一臂、一目、鼻孔。",
        translation:
          "一臂国在它的北面，那里的人只有一条手臂、一只眼睛、一个鼻孔。",
        difficultChars: [
          { char: "臂", pinyin: "bì", meaning: "手臂" },
        ],
      },
      {
        id: "haiwaixi-3",
        original: "奇肱之国在其北。其人一臂三目，有阴有阳，乘文马。",
        translation:
          "奇肱国在它的北面。那里的人一条手臂三只眼睛，眼睛能闭能开（分阴阳），乘坐带有花纹的马。",
        difficultChars: [
          { char: "奇肱", pinyin: "jī gōng", meaning: "国名，奇为奇特，肱为手臂" },
          { char: "文马", pinyin: "wén mǎ", meaning: "带有花纹的马" },
        ],
      },
      {
        id: "haiwaixi-4",
        original: "有鸟焉，两头，赤黄色，在其旁。",
        translation:
          "（奇肱国旁）有一种鸟，长着两个头，赤黄色，常在人身旁。",
        difficultChars: [
          { char: "两头", pinyin: "liǎng tóu", meaning: "两个头" },
        ],
      },
      {
        id: "haiwaixi-5",
        original:
          "刑天与帝至此争神，帝断其首，葬之常羊之山，乃以乳为目，以脐为口，操干戚以舞。",
        translation:
          "刑天与天帝在此争夺神位，天帝砍下了他的头，把他埋葬在常羊山，刑天便用两乳当作眼睛，用肚脐当作嘴巴，手持盾牌和斧头继续挥舞战斗。",
        difficultChars: [
          { char: "争神", pinyin: "zhēng shén", meaning: "争夺神位" },
          { char: "首", pinyin: "shǒu", meaning: "头" },
          { char: "脐", pinyin: "qí", meaning: "肚脐" },
          { char: "干戚", pinyin: "gān qī", meaning: "盾牌与斧头" },
        ],
      },
      {
        id: "haiwaixi-6",
        original: "有乘黄，其状如狐，其背有角，乘之寿二千岁。",
        translation:
          "有一种叫乘黄的异兽，形状像狐狸，背上长着角，骑上它的人可以活两千岁。",
        difficultChars: [
          { char: "乘黄", pinyin: "chéng huáng", meaning: "异兽名，骑之可延寿" },
          { char: "乘", pinyin: "chéng", meaning: "骑乘" },
        ],
        relatedBeastId: "chenghuang",
      },
      {
        id: "haiwaixi-7",
        original:
          "女丑之尸，生而十日炙杀之。以右手鄣其面。十日居上，女丑居山之上。",
        translation:
          "女丑的尸体，是她活着的时候被十个太阳活活晒死的。她用右手遮住自己的脸。十个太阳高高在上，女丑的尸体停放在山顶之上。",
        difficultChars: [
          { char: "尸", pinyin: "shī", meaning: "尸体，此处指曝尸的神巫" },
          { char: "炙", pinyin: "zhì", meaning: "烤、晒" },
          { char: "鄣", pinyin: "zhàng", meaning: "同\"障\"，遮挡" },
        ],
      },
      {
        id: "haiwaixi-8",
        original:
          "巫咸国在女丑北，右手操青蛇，左手操赤蛇。在登葆山，群巫所从上下也。",
        translation:
          "巫咸国在女丑的北面，那里的人右手握着青蛇，左手握着赤蛇。登葆山是群巫上下天庭的地方。",
        difficultChars: [
          { char: "巫咸", pinyin: "wū xián", meaning: "传说中的神巫之国" },
          { char: "操", pinyin: "cāo", meaning: "握、持" },
          { char: "上下", pinyin: "shàng xià", meaning: "上下天庭" },
        ],
      },
      {
        id: "haiwaixi-9",
        original: "并封在巫咸东，其状如彘，前后皆有首，黑。",
        translation:
          "并封在巫咸国的东面，形状像猪，前后各有一个头，浑身黑色。",
        difficultChars: [
          { char: "并封", pinyin: "bìng fēng", meaning: "前后双头的异兽" },
          { char: "彘", pinyin: "zhì", meaning: "猪" },
        ],
      },
      {
        id: "haiwaixi-10",
        original:
          "大荒之中，有山名曰大荒之山，日月所入。有人焉三面，是颛顼之子，三面一臂，三面之人不死。",
        translation:
          "大荒之中，有一座山叫大荒山，是日月落下的地方。那里有个人长着三张脸，是颛顼的后代，三面一臂，这三面之人长生不死。",
        difficultChars: [
          { char: "日月所入", pinyin: "rì yuè suǒ rù", meaning: "日月落下之处" },
          { char: "颛顼", pinyin: "zhuān xū", meaning: "上古五帝之一" },
          { char: "三面", pinyin: "sān miàn", meaning: "长着三张脸" },
        ],
      },
    ],
  },
  {
    id: "dahuangdong",
    name: "大荒东经",
    subtitle: "东方大荒的恢弘神话",
    introduction:
      "《大荒东经》记载了东方荒远之地的恢弘神话。东海之外有归墟大壑，少昊建国于此；流波山上有夔牛，苍身独足、出入则风雨；应龙蓄水以助黄帝战蚩尤，杀蚩尤与夸父；王亥仆牛，殷商先祖的故事在此徐徐展开。",
    sentences: [
      {
        id: "dahuangdong-1",
        original: "东海之外大壑，少昊之国。少昊孺帝颛顼于此，弃其琴瑟。",
        translation:
          "东海之外有一个大壑（归墟），是少昊建立的国家。少昊在这里养育帝颛顼，把颛顼幼时的琴瑟丢弃在此。",
        difficultChars: [
          { char: "壑", pinyin: "hè", meaning: "深沟、深谷" },
          { char: "孺", pinyin: "rú", meaning: "养育、哺育" },
          { char: "琴瑟", pinyin: "qín sè", meaning: "两种弦乐器" },
        ],
      },
      {
        id: "dahuangdong-2",
        original: "有甘山者，甘水出焉，生甘渊。",
        translation:
          "有一座甘山，甘水从这里发源，流淌汇聚成甘渊。",
        difficultChars: [
          { char: "渊", pinyin: "yuān", meaning: "深水、深潭" },
        ],
      },
      {
        id: "dahuangdong-3",
        original: "东海之外大荒之中，有山名曰大言，日月所出。",
        translation:
          "东海之外的大荒之中，有一座山叫大言山，是日月升起的地方。",
        difficultChars: [
          { char: "大荒", pinyin: "dà huāng", meaning: "极荒远之地" },
          { char: "所出", pinyin: "suǒ chū", meaning: "升起之处" },
        ],
      },
      {
        id: "dahuangdong-4",
        original:
          "东海中有流波山，入海七千里。其上有兽，状如牛，苍身而无角，一足，出入水则必风雨，其光如日月，其声如雷，其名曰夔。",
        translation:
          "东海中有一座流波山，深入海中七千里。山上有一种兽，形状像牛，青色的身体没有角，只有一只脚，它出入水中必定伴随风雨，发出的光像日月，叫声如雷鸣，名叫夔。",
        difficultChars: [
          { char: "流波", pinyin: "liú bō", meaning: "山名" },
          { char: "苍", pinyin: "cāng", meaning: "青色" },
          { char: "夔", pinyin: "kuí", meaning: "传说中的独足雷兽" },
        ],
        relatedBeastId: "kuiniu",
      },
      {
        id: "dahuangdong-5",
        original:
          "黄帝得之，以其皮为鼓，橛以雷兽之骨，声闻五百里，以威天下。",
        translation:
          "黄帝得到夔牛，用它的皮做成鼓，再用雷兽的骨头做鼓槌敲击，鼓声可以传到五百里之外，以此威震天下。",
        difficultChars: [
          { char: "橛", pinyin: "jué", meaning: "敲击，此处指以骨为槌击鼓" },
          { char: "闻", pinyin: "wén", meaning: "传到、听到" },
          { char: "威", pinyin: "wēi", meaning: "威慑、震慑" },
        ],
      },
      {
        id: "dahuangdong-6",
        original:
          "大荒东北隅中，有山名曰凶犁土丘。应龙处南极，杀蚩尤与夸父，不得复上，故下数旱。",
        translation:
          "大荒东北角中，有一座山叫凶犁土丘。应龙居住在南极，它杀死了蚩尤和夸父，再也不能回到天上，所以人间屡屡发生旱灾。",
        difficultChars: [
          { char: "隅", pinyin: "yú", meaning: "角落" },
          { char: "应龙", pinyin: "yìng lóng", meaning: "生有双翼的神龙" },
          { char: "数", pinyin: "shuò", meaning: "屡次、频繁" },
        ],
        relatedBeastId: "yinglong",
      },
      {
        id: "dahuangdong-7",
        original: "旱而为应龙之状，乃得大雨。",
        translation:
          "干旱时人们模仿应龙的形状（来祈雨），就能降下大雨。",
        difficultChars: [
          { char: "为……之状", pinyin: "wéi……zhī zhuàng", meaning: "模仿……的形状" },
        ],
      },
      {
        id: "dahuangdong-8",
        original:
          "有困民国，勾姓而食。有人曰王亥，两手操鸟，方食其头。",
        translation:
          "有一个困民国，那里的人姓勾。有个人叫王亥，两手抓着一只鸟，正在吃鸟的头。",
        difficultChars: [
          { char: "操", pinyin: "cāo", meaning: "拿、抓" },
          { char: "王亥", pinyin: "wáng hài", meaning: "殷商先祖" },
        ],
      },
      {
        id: "dahuangdong-9",
        original: "王亥托于有易、河伯仆牛。有易杀王亥，取仆牛。",
        translation:
          "王亥寄居在有易国和河伯那里，从事驯养仆牛的事。有易人杀死了王亥，夺走了他的仆牛。",
        difficultChars: [
          { char: "托", pinyin: "tuō", meaning: "寄托、寄居" },
          { char: "仆牛", pinyin: "pú niú", meaning: "即服牛，驯养来驾车的牛" },
        ],
      },
      {
        id: "dahuangdong-10",
        original: "有黑齿之国。帝俊生黑齿，姜姓，黍食，使四鸟。",
        translation:
          "有一个黑齿国。帝俊生了黑齿国的祖先，他们姓姜，以黍为食，能驱使四种鸟兽。",
        difficultChars: [
          { char: "帝俊", pinyin: "dì jùn", meaning: "山海经中的天帝" },
          { char: "黍", pinyin: "shǔ", meaning: "黄米" },
          { char: "使", pinyin: "shǐ", meaning: "驱使" },
        ],
      },
    ],
  },
  {
    id: "dahuangbei",
    name: "大荒北经",
    subtitle: "北方大荒的至大神话",
    introduction:
      "《大荒北经》记述了北方荒远之地的至大神话。烛龙睁目为昼、闭目为夜，呼吸成风雨；九凤九首人面，盘踞北极天柜之山；强良虎首人身，衔蛇操蛇，威震幽冥；夸父逐日，道渴而死，其杖化为邓林。这些神话构筑了华夏最古老的宇宙图景。",
    sentences: [
      {
        id: "dahuangbei-1",
        original:
          "西北海之外，大荒之隅，有山而不合，名曰不周负子。",
        translation:
          "在西北海以外、大荒的角落，有一座山断裂而不合拢，名叫不周负子（即不周山）。",
        difficultChars: [
          { char: "隅", pinyin: "yú", meaning: "角落" },
          { char: "不周", pinyin: "bù zhōu", meaning: "山名，传说被共工撞断" },
        ],
      },
      {
        id: "dahuangbei-2",
        original:
          "西北海之外，赤水之北，有章尾山。有神，人面蛇身而赤，直目正乘，其瞑乃晦，其视乃明，不食不寝不息，风雨是谒。是烛九阴，是谓烛龙。",
        translation:
          "在西北海以外、赤水的北面，有座章尾山。山中有位神灵，长着人的脸、蛇的身子，通体赤红，眼睛竖着长。他闭眼就是黑夜，睁眼就是白天，不吃不睡不呼吸，能呼唤风雨。他能照亮九重幽暗之地，这就是烛龙。",
        difficultChars: [
          { char: "直目", pinyin: "zhí mù", meaning: "竖着长的眼睛" },
          { char: "瞑", pinyin: "míng", meaning: "闭眼" },
          { char: "晦", pinyin: "huì", meaning: "昏暗" },
          { char: "谒", pinyin: "yè", meaning: "呼唤、请求" },
        ],
        relatedBeastId: "zhulong",
      },
      {
        id: "dahuangbei-3",
        original: "大荒之中，有山名曰北极天柜，海水北注焉。",
        translation:
          "大荒之中，有一座山叫北极天柜山，海水向北流入这里。",
        difficultChars: [
          { char: "柜", pinyin: "jǔ", meaning: "山名用字" },
          { char: "注", pinyin: "zhù", meaning: "流入" },
        ],
      },
      {
        id: "dahuangbei-4",
        original: "有神，九首人面鸟身，名曰九凤。",
        translation:
          "有一位神灵，长着九个脑袋、人的面孔、鸟的身子，名叫九凤。",
        difficultChars: [
          { char: "九首", pinyin: "jiǔ shǒu", meaning: "九个头" },
          { char: "凤", pinyin: "fèng", meaning: "凤凰一类的神鸟" },
        ],
        relatedBeastId: "jiufeng",
      },
      {
        id: "dahuangbei-5",
        original:
          "又有神，衔蛇操蛇，其状虎首人身，四蹄长肘，名曰强良。",
        translation:
          "又有一位神灵，嘴里衔着蛇，手中操着蛇，形状是虎的脑袋、人的身子，长着四只蹄子和长长的胳膊，名叫强良。",
        difficultChars: [
          { char: "衔", pinyin: "xián", meaning: "用嘴叼着" },
          { char: "操", pinyin: "cāo", meaning: "拿、持" },
          { char: "肘", pinyin: "zhǒu", meaning: "胳膊" },
        ],
        relatedBeastId: "qiangliang",
      },
      {
        id: "dahuangbei-6",
        original:
          "大荒之中，有山名曰成都载天。有人珥两黄蛇，把两黄蛇，名曰夸父。",
        translation:
          "大荒之中，有一座山叫成都载天山。有个人耳上挂着两条黄蛇，手里也握着两条黄蛇，名叫夸父。",
        difficultChars: [
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上为饰" },
          { char: "把", pinyin: "bǎ", meaning: "握、拿" },
        ],
      },
      {
        id: "dahuangbei-7",
        original:
          "夸父不量力，欲追日景，逮之于禺谷。将饮河而不足也，将走大泽，未至，死于此。",
        translation:
          "夸父不自量力，想要追赶太阳的影子，在禺谷追上了太阳。他口渴想喝黄河水却不够，又想去喝大泽的水，还没走到，就死在了这里。",
        difficultChars: [
          { char: "景", pinyin: "yǐng", meaning: "同\"影\"，影子" },
          { char: "逮", pinyin: "dǎi", meaning: "追上、赶上" },
          { char: "禺谷", pinyin: "yú gǔ", meaning: "日落之处" },
        ],
      },
      {
        id: "dahuangbei-8",
        original: "应龙已杀蚩尤，又杀夸父，乃去南方处之，故南方多雨。",
        translation:
          "应龙杀死了蚩尤，又杀死了夸父，于是到南方居住，所以南方多雨。",
        difficultChars: [
          { char: "处", pinyin: "chǔ", meaning: "居住" },
        ],
      },
      {
        id: "dahuangbei-9",
        original: "有钟山者。有女子衣青衣，名曰赤水女子魃。",
        translation:
          "有一座钟山。山中有位女子穿着青色衣服，名叫赤水女子魃（即旱神女魃）。",
        difficultChars: [
          { char: "衣", pinyin: "yì", meaning: "穿（动词）" },
          { char: "魃", pinyin: "bá", meaning: "旱神" },
        ],
      },
      {
        id: "dahuangbei-10",
        original:
          "大荒之中，有山名曰融父山，顺水入焉。有人曰犬戎。黄帝生苗龙，苗龙生融吾，融吾生弄明，弄明生白犬，白犬有牝牡，是为犬戎，肉食。",
        translation:
          "大荒之中，有一座山叫融父山，顺水流入此山。有一种人叫犬戎。黄帝生了苗龙，苗龙生了融吾，融吾生了弄明，弄明生了白犬，白犬有雌有雄，繁衍出了犬戎族，以肉为食。",
        difficultChars: [
          { char: "牝牡", pinyin: "pìn mǔ", meaning: "雌性和雄性" },
          { char: "融父", pinyin: "róng fù", meaning: "山名" },
        ],
      },
    ],
  },
];
