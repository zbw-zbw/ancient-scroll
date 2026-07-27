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
      {
        id: "nanshan-19",
        original:
          "怪水出焉，而东流注于宪翼之水。其中多玄龟，其状如龟而鸟首虺尾，其名曰旋龟，其音如判木，佩之不聋，可以为底。",
        translation:
          "怪水从这座山发源，向东流入宪翼水。水中有很多黑色的龟，形状像龟却长着鸟的头和蛇的尾巴，名叫旋龟，它的叫声像劈木头，佩戴它可以不耳聋，还可以用来治疗脚底老茧。",
        difficultChars: [
          { char: "虺", pinyin: "huǐ", meaning: "毒蛇" },
          { char: "判", pinyin: "pàn", meaning: "劈开、分开" },
          { char: "底", pinyin: "dǐ", meaning: "脚底，此处指脚底老茧" },
        ],
        relatedBeastId: "xuangui",
      },
      {
        id: "nanshan-20",
        original:
          "又东五百里，曰鸡山，其上多金，其下多丹雘。黑水出焉，而南流注于海。其中有鱄鱼，其状如鲋而彘毛，其音如豚，见则天下大旱。",
        translation:
          "再往东五百里，有座鸡山，山上盛产黄金，山下盛产丹雘。黑水从这座山发源，向南流入大海。水中有一种鱄鱼，形状像鲫鱼却长着猪毛，叫声像猪叫，它一出现天下就会大旱。",
        difficultChars: [
          { char: "雘", pinyin: "huò", meaning: "一种红色颜料" },
          { char: "鱄", pinyin: "tuán", meaning: "鱄鱼，一种异鱼" },
          { char: "鲋", pinyin: "fù", meaning: "鲫鱼" },
          { char: "豚", pinyin: "tún", meaning: "猪" },
        ],
        relatedBeastId: "zhuanyu",
      },
      {
        id: "nanshan-21",
        original:
          "又东五百里，曰丹穴之山，其上多金玉。丹水出焉，而南流注于渤海。有鸟焉，其状如鸡，五采而文，名曰凤皇，首文曰德，翼文曰义，背文曰礼，膺文曰仁，腹文曰信。是鸟也，饮食自然，自歌自舞，见则天下安宁。",
        translation:
          "再往东五百里，有座丹穴山，山上盛产金属矿物和美玉。丹水从这座山发源，向南流入渤海。山中有一种鸟，形状像鸡，身上有五彩花纹，名叫凤凰。它头上的花纹是'德'字，翅膀上的花纹是'义'字，背上的花纹是'礼'字，胸部的花纹是'仁'字，腹部的花纹是'信'字。这种鸟饮食自然，自己唱歌自己跳舞，它一出现天下就会安宁。",
        difficultChars: [
          { char: "膺", pinyin: "yīng", meaning: "胸" },
          { char: "采", pinyin: "cǎi", meaning: "彩色" },
          { char: "文", pinyin: "wén", meaning: "花纹" },
        ],
        relatedBeastId: "fenghuang",
      },
      {
        id: "nanshan-22",
        original:
          "又东四百里，曰令丘之山，无草木，多火。其南有谷焉，曰中谷，条风自是出。有鸟焉，其状如枭，人面四目而有耳，其名曰颙，其鸣自号也，见则天下大旱。",
        translation:
          "再往东四百里，有座令丘山，山上不长草木，到处是野火。山的南面有个山谷，名叫中谷，东北风从这里吹出。山中有一种鸟，形状像猫头鹰，长着人的脸和四只眼睛，还有耳朵，名叫颙，它的叫声就像在呼唤自己的名字，它一出现天下就会大旱。",
        difficultChars: [
          { char: "颙", pinyin: "yóng", meaning: "鸟名，也指仰视貌" },
          { char: "条风", pinyin: "tiáo fēng", meaning: "东北风" },
          { char: "枭", pinyin: "xiāo", meaning: "猫头鹰一类的鸟" },
        ],
        relatedBeastId: "yu",
      },
      {
        id: "nanshan-23",
        original:
          "东五百里，曰祷过之山，其上多金玉，其下多犀、兕，多象。",
        translation:
          "向东五百里，有座祷过山，山上盛产金属矿物和美玉，山下有很多犀牛和兕（雌犀牛），还有很多大象。",
        difficultChars: [
          { char: "祷", pinyin: "dǎo", meaning: "祷过，山名" },
          { char: "犀", pinyin: "xī", meaning: "犀牛" },
          { char: "兕", pinyin: "sì", meaning: "雌犀牛，一说为独角兽" },
        ],
      },
      {
        id: "nanshan-24",
        original:
          "浪水出焉，而南流注于海。其中有虎蛟，其状鱼身而蛇尾，其音如鸳鸯，食者不肿，可以已痔。",
        translation:
          "浪水从祷过山发源，向南流入大海。水中有一种虎蛟，长着鱼的身体和蛇的尾巴，叫声像鸳鸯，吃了它的肉可以不患肿病，还可以治愈痔疮。",
        difficultChars: [
          { char: "蛟", pinyin: "jiāo", meaning: "蛟龙，传说中能发洪水的龙" },
          { char: "肿", pinyin: "zhǒng", meaning: "肿病" },
          { char: "痔", pinyin: "zhì", meaning: "痔疮" },
        ],
        relatedBeastId: "hujiao",
      },
      {
        id: "nanshan-25",
        original:
          "有鸟焉，其状如鵁而白首，三足、人面，其名曰瞿如，其鸣自号也。",
        translation:
          "山中有一种鸟，形状像鵁鸟却长着白色的头，有三只脚，人的脸，名叫瞿如，它的叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "鵁", pinyin: "jiāo", meaning: "鵁鸟，一种水鸟" },
          { char: "瞿如", pinyin: "qú rú", meaning: "鸟名" },
        ],
        relatedBeastId: "quru",
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
      {
        id: "xishan-16",
        original:
          "又西三百二十里，曰槐江山，丘时之水出焉，而北流注于泑水。其中多蠃母，其上多青雄黄，多藏琅玕、黄金、玉，其阳多丹粟，其阴多采黄金银。实惟帝之平圃，神英招司之，其状马身而人面，虎文而鸟翼，徇于四海，其音如榴。",
        translation:
          "再往西三百二十里，有座槐江山，丘时水从这座山发源，向北流入泑水。水中有很多蠃母，山上盛产青雄黄，还蕴藏着琅玕、黄金和玉石，山南面遍布丹砂，山北面出产有纹彩的金银。这里其实是天帝在人间的园圃，由神英招主管，他的形状是马的身体、人的面孔，身上有老虎的斑纹和鸟的翅膀，巡行四海，叫声像抽水声。",
        difficultChars: [
          { char: "蠃", pinyin: "luǒ", meaning: "蠃母，一种水中生物" },
          { char: "琅玕", pinyin: "láng gān", meaning: "似珠玉的美石" },
          { char: "徇", pinyin: "xùn", meaning: "巡行" },
        ],
        relatedBeastId: "yingzhao",
      },
      {
        id: "xishan-17",
        original:
          "南望昆仑，其光熊熊，其气魂魂。西望大泽，后稷所潜也。其中多玉，其阴多榣木之有若。",
        translation:
          "从槐江山向南望，可以看见昆仑山，那里光芒熊熊，气象万千。向西望是大泽，那是后稷潜伏之地。泽中多玉，山的北面多榣木上的若木。",
        difficultChars: [
          { char: "熊熊", pinyin: "xióng xióng", meaning: "光焰炽盛貌" },
          { char: "魂魂", pinyin: "hún hún", meaning: "气象盛美貌" },
          { char: "榣", pinyin: "yáo", meaning: "榣木，传说中大树" },
        ],
      },
      {
        id: "xishan-18",
        original:
          "又西三百里，曰阴山。浊浴之水出焉，而南流注于番泽，其中多文贝。有兽焉，其状如狸而白首，名曰天狗，其音如榴榴，可以御凶。",
        translation:
          "再往西三百里，有座阴山。浊浴水从这座山发源，向南流入番泽，水中有很多带花纹的贝。山中有一种兽，形状像野猫却长着白色的头，名叫天狗，叫声像猫叫，可以用来抵御凶邪。",
        difficultChars: [
          { char: "浊浴", pinyin: "zhuó yù", meaning: "水名" },
          { char: "番", pinyin: "pān", meaning: "番泽，泽名" },
          { char: "狸", pinyin: "lí", meaning: "野猫" },
        ],
        relatedBeastId: "tiangou",
      },
      {
        id: "xishan-19",
        original:
          "有兽焉，其状如羊而四角，名曰土蝼，是食人。有鸟焉，其状如蜂，大如鸳鸯，名曰钦原，蠚鸟兽则死，蠚木则枯。",
        translation:
          "山中有一种兽，形状像羊却长着四只角，名叫土蝼，会吃人。山中有一种鸟，形状像蜂，大小如鸳鸯，名叫钦原，它螫鸟兽则鸟兽死，螫树木则树木枯。",
        difficultChars: [
          { char: "土蝼", pinyin: "tǔ lóu", meaning: "兽名，似羊四角" },
          { char: "钦原", pinyin: "qīn yuán", meaning: "鸟名，似蜂" },
          { char: "蠚", pinyin: "hē", meaning: "蜇、刺" },
        ],
        relatedBeastId: "tulou",
      },
      {
        id: "xishan-20",
        original:
          "又西三百五十里，曰玉山，是西王母所居也。西王母其状如人，豹尾虎齿而善啸，蓬发戴胜，是司天之厉及五残。",
        translation:
          "再往西三百五十里，有座玉山，是西王母居住的地方。西王母的形状像人，长着豹子的尾巴和老虎的牙齿，善于长啸，蓬松的头发上戴着玉胜，她掌管天上的瘟疫和五刑。",
        difficultChars: [
          { char: "胜", pinyin: "shèng", meaning: "玉胜，一种玉制头饰" },
          { char: "厉", pinyin: "lì", meaning: "瘟疫" },
          { char: "五残", pinyin: "wǔ cán", meaning: "五种刑罚" },
        ],
        relatedBeastId: "xiwangmu",
      },
      {
        id: "xishan-21",
        original:
          "有兽焉，其状如犬而豹文，其角如牛，其名曰狡，其音如吠犬，见则其国大穰。有鸟焉，其状如翟而赤，名曰胜遇，是食鱼，其音如录，见则其国大水。",
        translation:
          "山中有一种兽，形状像狗却长着豹子的花纹，角像牛角，名叫狡，叫声像狗叫，它一出现那个国家就会大丰收。山中有一种鸟，形状像野鸡却是红色的，名叫胜遇，以鱼为食，叫声像鹿鸣，它一出现那个国家就会发大水。",
        difficultChars: [
          { char: "狡", pinyin: "jiǎo", meaning: "兽名" },
          { char: "穰", pinyin: "ráng", meaning: "丰收" },
          { char: "翟", pinyin: "dí", meaning: "长尾野鸡" },
          { char: "录", pinyin: "lù", meaning: "通'鹿'，鹿鸣声" },
        ],
        relatedBeastId: "jiao",
      },
      {
        id: "xishan-22",
        original:
          "又西二百六十里，曰邽山。其上有兽焉，其状如牛，猬毛，名曰穷奇，音如獆狗，是食人。濛水出焉，南流注于洋水，其中多黄贝。",
        translation:
          "再往西二百六十里，有座邽山。山上有一种兽，形状像牛，长着刺猬一样的毛，名叫穷奇，叫声像嚎叫的狗，会吃人。濛水从这座山发源，向南流入洋水，水中有很多黄色的贝。",
        difficultChars: [
          { char: "邽", pinyin: "guī", meaning: "邽山，山名" },
          { char: "猬", pinyin: "wèi", meaning: "刺猬" },
          { char: "獆", pinyin: "háo", meaning: "嚎叫" },
        ],
        relatedBeastId: "qiongqi",
      },
      {
        id: "xishan-23",
        original:
          "有鸟焉，其状如凫，而一足彘尾，其名曰蛮蛮，见则天下大水。",
        translation:
          "山中有一种鸟，形状像野鸭，却只有一只脚和猪一样的尾巴，名叫蛮蛮，它一出现天下就会发大水。",
        difficultChars: [
          { char: "凫", pinyin: "fú", meaning: "野鸭" },
          { char: "蛮蛮", pinyin: "mán mán", meaning: "鸟名" },
        ],
        relatedBeastId: "manman",
      },
      {
        id: "xishan-24",
        original:
          "有木焉，其状如棠，黄华赤实，其味如李而无核，名曰沙棠，可以御水，食之使人不溺。",
        translation:
          "山上有一种树，形状像棠梨树，开黄色的花结红色的果实，味道像李子却没有核，名叫沙棠，可以用来抵御水患，吃了它能使人不溺水。",
        difficultChars: [
          { char: "棠", pinyin: "táng", meaning: "棠梨树" },
          { char: "沙棠", pinyin: "shā táng", meaning: "树名" },
          { char: "溺", pinyin: "nì", meaning: "溺水" },
        ],
      },
      {
        id: "xishan-25",
        original:
          "又西三百五十里，曰昆仑之丘，是实惟帝之下都。陆吾司之，其神状虎身而九尾，人面而虎爪。是神也，司天之九部及帝之囿时。",
        translation:
          "再往西三百五十里，有座昆仑丘，这里其实是天帝在下界的都城。陆吾掌管此地，他的神形是老虎的身体和九条尾巴，人的面孔和老虎的爪子。这位神灵掌管天上的九部以及天帝园圃的时节。",
        difficultChars: [
          { char: "陆吾", pinyin: "lù wú", meaning: "神名，昆仑山守护神" },
          { char: "囿", pinyin: "yòu", meaning: "园囿、苑囿" },
          { char: "九部", pinyin: "jiǔ bù", meaning: "天之九部，指天界分区" },
        ],
        relatedBeastId: "luwu",
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
      {
        id: "beishan-16",
        original:
          "又北三百二十里，曰蔓渠之山，其上多金玉，其下多竹箭。伊水出焉，而东流注于洛。有兽焉，其名曰马腹，其状如人面虎身，其音如婴儿，是食人。",
        translation:
          "再往北三百二十里，有座蔓渠山，山上盛产金属矿物和美玉，山下多竹箭。伊水从这座山发源，向东流入洛水。山中有一种兽，名叫马腹，形状像人面虎身，叫声像婴儿啼哭，会吃人。",
        difficultChars: [
          { char: "蔓", pinyin: "màn", meaning: "蔓渠，山名" },
          { char: "马腹", pinyin: "mǎ fù", meaning: "兽名，人面虎身" },
        ],
        relatedBeastId: "mafu",
      },
      {
        id: "beishan-17",
        original:
          "又北三百里，曰带山，其上多玉，其下多青碧。有兽焉，其状如马，一角有错，其名曰䑏疏，可以辟火。",
        translation:
          "再往北三百里，有座带山，山上盛产玉石，山下多青碧色的美石。山中有一种兽，形状像马，长着一只角，角上有错纹，名叫䑏疏，可以用来辟防火灾。",
        difficultChars: [
          { char: "䑏", pinyin: "huān", meaning: "䑏疏，兽名" },
          { char: "错", pinyin: "cuò", meaning: "错纹，交错的花纹" },
          { char: "辟", pinyin: "bì", meaning: "辟除、防御" },
        ],
        relatedBeastId: "huanshu",
      },
      {
        id: "beishan-18",
        original:
          "又北二百里，曰北岳之山，多枳棘刚木。有兽焉，其状如牛，而四角、人目、彘耳，其名曰诸怀，其音如鸣雁，是食人。诸怀之水出焉，而西流注于嚣水。",
        translation:
          "再往北二百里，有座北岳山，山上多枳树、棘树和坚硬的树木。山中有一种兽，形状像牛，长着四只角、人一样的眼睛和猪一样的耳朵，名叫诸怀，叫声像大雁鸣叫，会吃人。诸怀水从这座山发源，向西流入嚣水。",
        difficultChars: [
          { char: "枳棘", pinyin: "zhǐ jí", meaning: "枳树和棘树，皆多刺之木" },
          { char: "嚣", pinyin: "xiāo", meaning: "嚣水，水名" },
        ],
        relatedBeastId: "zhuhuai",
      },
      {
        id: "beishan-19",
        original:
          "又北二百里，曰少咸之山。无草木，多青碧。有兽焉，其状如牛，而四角、人目、彘耳，其名曰窳，其音如鸣雁，是食人。",
        translation:
          "再往北二百里，有座少咸山。山上不长草木，盛产青碧色的美石。山中有一种兽，形状像牛，长着四只角、人一样的眼睛和猪一样的耳朵，名叫窳，叫声像大雁鸣叫，会吃人。",
        difficultChars: [
          { char: "窳", pinyin: "yà yǔ", meaning: "兽名，似牛四角" },
        ],
        relatedBeastId: "yayu",
      },
      {
        id: "beishan-20",
        original:
          "又东北二百里，曰天池之山，其上无草木，多文石。有兽焉，其状如兔而鼠首，以其背飞，其名曰飞鼠。",
        translation:
          "再向东北二百里，有座天池山，山上不长草木，遍布带花纹的石头。山中有一种兽，形状像兔子却长着老鼠的头，用背飞行，名叫飞鼠。",
        difficultChars: [
          { char: "以其背飞", pinyin: "yǐ qí bèi fēi", meaning: "用背飞行" },
          { char: "飞鼠", pinyin: "fēi shǔ", meaning: "兽名，能以背飞行" },
        ],
        relatedBeastId: "feishu",
      },
      {
        id: "beishan-21",
        original:
          "又北二百里，曰泰头之山，其上多金玉，其下多竹箭。有兽焉，其状如牛而尾长，四足毫，其名曰领胡，其鸣自呼，见则其国大败。",
        translation:
          "再往北二百里，有座泰头山，山上盛产金属矿物和美玉，山下多竹箭。山中有一种兽，形状像牛却拖着长尾巴，四脚长着长毛，名叫领胡，叫声就像在呼唤自己的名字，它一出现那个国家就会大败。",
        difficultChars: [
          { char: "泰头", pinyin: "tài tóu", meaning: "山名" },
          { char: "领胡", pinyin: "lǐng hú", meaning: "兽名" },
          { char: "毫", pinyin: "háo", meaning: "细长之毛" },
        ],
        relatedBeastId: "linghu",
      },
      {
        id: "beishan-22",
        original:
          "又北三百二十里，曰阳山，其上多玉，其下多金铜。有鸟焉，其状如雌雉，而五彩以文，是自为牝牡，名曰象蛇，其鸣自呼。",
        translation:
          "再往北三百二十里，有座阳山，山上盛产玉石，山下盛产金铜。山中有一种鸟，形状像雌野鸡，身上有五彩花纹，雌雄同体，名叫象蛇，叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "雌雉", pinyin: "cí zhì", meaning: "雌性野鸡" },
          { char: "牝牡", pinyin: "pìn mǔ", meaning: "雌性和雄性" },
          { char: "象蛇", pinyin: "xiàng shé", meaning: "鸟名，雌雄同体" },
        ],
        relatedBeastId: "xiangshe",
      },
      {
        id: "beishan-23",
        original:
          "又北百里，曰景山，其上多玉，其下多青碧。有鸟焉，其状如蛇而四翼、三足，名曰酸与，其鸣自呼，见则其邑有恐。",
        translation:
          "再往北一百里，有座景山，山上盛产玉石，山下多青碧色的美石。山中有一种鸟，形状像蛇却长着四只翅膀、三只脚，名叫酸与，叫声就像在呼唤自己的名字，它一出现那个城邑就会有恐慌之事。",
        difficultChars: [
          { char: "酸与", pinyin: "suān yǔ", meaning: "鸟名，蛇形四翼三足" },
          { char: "恐", pinyin: "kǒng", meaning: "恐慌、恐惧之事" },
        ],
        relatedBeastId: "suanyu",
      },
      {
        id: "beishan-24",
        original:
          "又北二百里，曰发鸠之山，其上多柘木。有鸟焉，其状如乌，文首，白喙，赤足，名曰精卫，其鸣自詨。是炎帝之少女，名曰女娃。女娃游于东海，溺而不返，故为精卫。常衔西山之木石，以堙于东海。漳水出焉，东流注于河。",
        translation:
          "再往北二百里，有座发鸠山，山上长满了柘树。山中有一种鸟，形状像乌鸦，头上有花纹，白色的嘴，红色的脚，名叫精卫，它的叫声就像在呼唤自己的名字。她原本是炎帝的小女儿，名叫女娃。女娃到东海游玩，不幸溺水而亡，再也没有回来，于是化身为精卫鸟。精卫常常衔着西山上的树枝和石子，用来填塞东海。漳水从发鸠山发源，向东流入黄河。",
        difficultChars: [
          { char: "詨", pinyin: "xiào", meaning: "呼叫" },
          { char: "堙", pinyin: "yīn", meaning: "填塞、堵塞" },
          { char: "漳", pinyin: "zhāng", meaning: "漳水，水名" },
        ],
        relatedBeastId: "jingwei",
      },
      {
        id: "beishan-25",
        original:
          "又北三百五十里，曰钩吾之山，其上多玉，其下多铜。有兽焉，其状如羊身人面，其目在腋下，虎齿人爪，其音如婴儿，名曰狍鸮，是食人。",
        translation:
          "再往北三百五十里，有座钩吾山，山上盛产玉石，山下盛产铜。山中有一种兽，形状是羊的身体和人的面孔，眼睛长在腋下，长着老虎的牙齿和人的爪子，叫声像婴儿啼哭，名叫狍鸮，会吃人。",
        difficultChars: [
          { char: "钩吾", pinyin: "gōu wú", meaning: "山名" },
          { char: "狍鸮", pinyin: "páo xiāo", meaning: "兽名，羊身人面" },
          { char: "腋", pinyin: "yè", meaning: "腋下、胳肢窝" },
        ],
        relatedBeastId: "paoxiao",
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
      {
        id: "dongshan-13",
        original:
          "又南三百里，曰栒状之山，其上多金玉，其下多青碧石。有兽焉，其状如犬，六足，其名曰从从，其鸣自詨。",
        translation:
          "再往南三百里，有座栒状山，山上盛产金属矿物和美玉，山下多青碧色的石头。山中有一种兽，形状像狗，长着六只脚，名叫从从，叫声就像在呼唤自己的名字。",
        difficultChars: [
          { char: "栒", pinyin: "xún", meaning: "栒状，山名" },
          { char: "从从", pinyin: "cóng cóng", meaning: "兽名，六足似犬" },
          { char: "詨", pinyin: "xiào", meaning: "呼叫" },
        ],
        relatedBeastId: "congcong",
      },
      {
        id: "dongshan-14",
        original:
          "有鸟焉，其状如鸡而鼠毛，其名曰䖪鼠，见则其邑大旱。",
        translation:
          "山中有一种鸟，形状像鸡却长着老鼠一样的毛，名叫䖪鼠，它一出现那个城邑就会大旱。",
        difficultChars: [
          { char: "䖪鼠", pinyin: "zī shǔ", meaning: "鸟名，似鸡鼠毛" },
        ],
        relatedBeastId: "zishu",
      },
      {
        id: "dongshan-15",
        original:
          "𣲵水出焉，而北流注于湖水。其中多箴鱼，其状如儵，其喙如箴，食之无疫疾。",
        translation:
          "𣲵水从这座山发源，向北流入湖水。水中有很多箴鱼，形状像儵鱼，嘴像针一样尖，吃了可以不生瘟疫。",
        difficultChars: [
          { char: "𣲵", pinyin: "zhǐ", meaning: "水名" },
          { char: "箴鱼", pinyin: "zhēn yú", meaning: "鱼名，喙如针" },
          { char: "儵", pinyin: "shū", meaning: "儵鱼，一种白鱼" },
        ],
        relatedBeastId: "zhenyu",
      },
      {
        id: "dongshan-16",
        original:
          "又东二百里，曰子桐之山，子桐之水出焉，而西流注于余如之水。其中多䱤鱼，其状如鱼而鸟翼，出入有光，其音如鸳鸯，见则天下大旱。",
        translation:
          "再往东二百里，有座子桐山，子桐水从这座山发源，向西流入余如水。水中有很多䱤鱼，形状像鱼却长着鸟的翅膀，出入水中时闪闪发光，叫声像鸳鸯，它一出现天下就会大旱。",
        difficultChars: [
          { char: "䱤", pinyin: "hán", meaning: "䱤鱼，一种有翼的异鱼" },
          { char: "余如", pinyin: "yú rú", meaning: "水名" },
        ],
        relatedBeastId: "hanyu",
      },
      {
        id: "dongshan-17",
        original:
          "又东北二百里，曰剡山，多金玉。有兽焉，其状如彘而人面，黄身而赤尾，其名曰合窳，其音如婴儿，是兽也，食人，亦食虫蛇，见则天下大水。",
        translation:
          "再往东北二百里，有座剡山，盛产金属矿物和美玉。山中有一种兽，形状像猪却长着人的面孔，黄色的身子红色的尾巴，名叫合窳，叫声像婴儿啼哭，这种兽会吃人，也吃虫和蛇，它一出现天下就会发大水。",
        difficultChars: [
          { char: "剡", pinyin: "yǎn", meaning: "剡山，山名" },
          { char: "合窳", pinyin: "hé yǔ", meaning: "兽名，似猪人面" },
        ],
        relatedBeastId: "heyu",
      },
      {
        id: "dongshan-18",
        original:
          "又东二百里，曰太山，上多金玉、桢木。有兽焉，其状如牛而白首，一目而蛇尾，其名曰蜚，行水则竭，行草则死，见则天下大疫。",
        translation:
          "再往东二百里，有座太山，山上盛产金属矿物、美玉和桢木。山中有一种兽，形状像牛却长着白色的头，一只眼睛和蛇一样的尾巴，名叫蜚，它经过水则水干涸，经过草则草枯死，它一出现天下就会大瘟疫。",
        difficultChars: [
          { char: "桢", pinyin: "zhēn", meaning: "桢木，一种常绿乔木" },
          { char: "蜚", pinyin: "fěi", meaning: "兽名，似牛白首蛇尾" },
          { char: "竭", pinyin: "jié", meaning: "干涸" },
        ],
        relatedBeastId: "fei",
      },
      {
        id: "dongshan-19",
        original:
          "又东三百里，曰独山，其上多金玉，其下多美石。末涂之水出焉，而东南流注于沔。其中多儵蠕，其状如黄蛇，鱼翼，出入有光，见则其邑大旱。",
        translation:
          "再往东三百里，有座独山，山上盛产金属矿物和美玉，山下多美石。末涂水从这座山发源，向东南流入沔水。水中有很多儵蠕，形状像黄色的蛇，长着鱼的翅膀，出入水中时闪闪发光，它一出现那个城邑就会大旱。",
        difficultChars: [
          { char: "末涂", pinyin: "mò tú", meaning: "水名" },
          { char: "沔", pinyin: "miǎn", meaning: "沔水，水名" },
          { char: "儵蠕", pinyin: "shū rú", meaning: "水中生物名，似黄蛇鱼翼" },
        ],
      },
      {
        id: "dongshan-20",
        original:
          "又南三百里，曰姑逢之山，无草木，多金玉。有鸟焉，其状如鸢而人目，名曰絜钩，见则其国大兵。",
        translation:
          "再往南三百里，有座姑逢山，山上不长草木，盛产金属矿物和美玉。山中有一种鸟，形状像老鹰却长着人的眼睛，名叫絜钩，它一出现那个国家就会发生大战。",
        difficultChars: [
          { char: "鸢", pinyin: "yuān", meaning: "老鹰一类的猛禽" },
          { char: "絜钩", pinyin: "xié gōu", meaning: "鸟名，似鸢人目" },
        ],
        relatedBeastId: "xiegou",
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
      {
        id: "hainei-13",
        original:
          "贰负之臣曰危，危与贰负杀窫窳。",
        translation:
          "贰负的臣子名叫危，危和贰负一起杀死了窫窳。",
        difficultChars: [
          { char: "贰负", pinyin: "èr fù", meaning: "天神名" },
          { char: "窫窳", pinyin: "yà yǔ", meaning: "神兽名" },
        ],
      },
      {
        id: "hainei-14",
        original:
          "帝乃梏之疏属之山，桎其右足，反缚两手与发，系之山上木。",
        translation:
          "天帝于是把危枷锁在疏属山上，给他的右脚戴上脚镣，反绑双手并和头发系在一起，拴在山上的树木上。",
        difficultChars: [
          { char: "梏", pinyin: "gù", meaning: "拘禁、枷锁" },
          { char: "疏属", pinyin: "shū shǔ", meaning: "山名" },
          { char: "桎", pinyin: "zhì", meaning: "脚镣" },
          { char: "缚", pinyin: "fù", meaning: "捆绑" },
        ],
      },
      {
        id: "hainei-15",
        original:
          "有木，其状如牛，引之有皮，若缨、黄蛇，其叶如罗，其实如栾，其木若蓲，其名曰建木。",
        translation:
          "有一种树，形状像牛，拉它有树皮，像帽缨和黄蛇，叶子像罗网，果实像栾树果，树干像蓲树，它的名字叫建木。",
        difficultChars: [
          { char: "缨", pinyin: "yīng", meaning: "帽带、缨子" },
          { char: "栾", pinyin: "luán", meaning: "栾树，一种落叶乔木" },
          { char: "蓲", pinyin: "qiū", meaning: "蓲树，一种大树" },
        ],
        relatedBeastId: "jianmu",
      },
      {
        id: "hainei-16",
        original:
          "有九丘，以水络之，名曰陶唐之丘、有叔得之丘、孟盈之丘、昆吾之丘、黑白之丘、赤望之丘、参卫之丘、武夫之丘、神民之丘。",
        translation:
          "有九座山丘，被水环绕着，分别叫陶唐丘、叔得丘、孟盈丘、昆吾丘、黑白丘、赤望丘、参卫丘、武夫丘和神民丘。",
        difficultChars: [
          { char: "络", pinyin: "luò", meaning: "缠绕、环绕" },
          { char: "参卫", pinyin: "shēn wèi", meaning: "丘名" },
          { char: "武夫", pinyin: "wǔ fū", meaning: "丘名" },
        ],
      },
      {
        id: "hainei-17",
        original:
          "有窳，龙首，是食人。",
        translation:
          "有一种名叫窳的异兽，长着龙的头，会吃人。",
        difficultChars: [
          { char: "窳", pinyin: "yà yǔ", meaning: "兽名，龙首食人" },
        ],
        relatedBeastId: "yayu",
      },
      {
        id: "hainei-18",
        original:
          "从极之渊，深三百仞，维冰夷恒都焉。冰夷人面，乘两龙。",
        translation:
          "从极渊深三百仞，是冰夷常驻的地方。冰夷长着人的面孔，乘着两条龙。",
        difficultChars: [
          { char: "冰夷", pinyin: "bīng yí", meaning: "即河伯，河神之名" },
          { char: "仞", pinyin: "rèn", meaning: "古代长度单位，一仞约八尺" },
          { char: "都", pinyin: "dū", meaning: "居住、常驻" },
        ],
        relatedBeastId: "bingyi",
      },
      {
        id: "hainei-19",
        original:
          "洪水滔天，鲧窃帝之息壤以堙洪水，不待帝命。帝令祝融杀鲧于羽郊。",
        translation:
          "洪水滔天，鲧偷了天帝的息壤用来填塞洪水，没有得到天帝的命令。天帝命令祝融在羽郊杀死了鲧。",
        difficultChars: [
          { char: "息壤", pinyin: "xī rǎng", meaning: "能自己生长的神土" },
          { char: "祝融", pinyin: "zhù róng", meaning: "火神名" },
          { char: "羽郊", pinyin: "yǔ jiāo", meaning: "羽山之郊" },
        ],
      },
      {
        id: "hainei-20",
        original:
          "鲧复生禹，帝乃命禹卒布土以定九州。",
        translation:
          "鲧的腹中孕育生了禹，天帝于是命令禹完成布土治水的事业，以此平定九州。",
        difficultChars: [
          { char: "复", pinyin: "fù", meaning: "此处指鲧死后腹中孕育" },
          { char: "卒", pinyin: "zú", meaning: "完成、终了" },
          { char: "布土", pinyin: "bù tǔ", meaning: "分布水土、治水" },
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
      {
        id: "zhongshan-13",
        original:
          "又东三十里，曰泰室之山。其上多玉，其下多铁。有草焉，其状如茒，白华黑实，泽如蘡薁，其名曰䔄草，服之不昧。",
        translation:
          "再往东三十里，有座泰室山。山上盛产玉石，山下盛产铁。山上有一种草，形状像茅草，开白色的花结黑色的果实，光泽像蘡薁，名叫䔄草，吃了可以不昏昧。",
        difficultChars: [
          { char: "泰室", pinyin: "tài shì", meaning: "泰室山，即嵩山太室峰" },
          { char: "茒", pinyin: "máo", meaning: "同'茅'，茅草" },
          { char: "蘡薁", pinyin: "yīng yù", meaning: "一种野葡萄" },
        ],
      },
      {
        id: "zhongshan-14",
        original:
          "有鸟焉，其状如鴢而白目赤足，名曰𫛩，食之不疽。",
        translation:
          "山中有一种鸟，形状像鴢鸟却长着白色的眼睛和红色的脚，名叫𫛩，吃了它的肉可以不生疽病。",
        difficultChars: [
          { char: "鴢", pinyin: "yāo", meaning: "鴢鸟，一种水鸟" },
          { char: "𫛩", pinyin: "yàn", meaning: "鸟名" },
          { char: "疽", pinyin: "jū", meaning: "疽病，一种毒疮" },
        ],
        relatedBeastId: "yan",
      },
      {
        id: "zhongshan-15",
        original:
          "有草焉，其状如葌，而方茎，黄华赤实，其本如藁本，名曰荀草，服之美人色。",
        translation:
          "山上有一种草，形状像葌草，茎是方形的，开黄色的花结红色的果实，根部像藁本，名叫荀草，吃了可以使人面色美丽。",
        difficultChars: [
          { char: "葌", pinyin: "jiān", meaning: "葌草，一种香草" },
          { char: "藁本", pinyin: "gǎo běn", meaning: "一种香草，可入药" },
          { char: "美人色", pinyin: "měi rén sè", meaning: "使人的面色美丽" },
        ],
        relatedBeastId: "xuncao",
      },
      {
        id: "zhongshan-16",
        original:
          "武罗司之，其状人面而豹文，小要而白齿，而穿耳以鐻，其鸣如鸣玉。是山也，宜女子。",
        translation:
          "武罗神掌管此山，他的形状是人的面孔和豹子般的花纹，腰很细，牙齿洁白，耳朵上穿着鐻作为耳饰，叫声像玉石相击的声音。这座山适宜女子居住。",
        difficultChars: [
          { char: "武罗", pinyin: "wǔ luó", meaning: "山神名" },
          { char: "要", pinyin: "yāo", meaning: "同'腰'" },
          { char: "鐻", pinyin: "qú", meaning: "金玉制的耳饰" },
        ],
        relatedBeastId: "wuluo",
      },
      {
        id: "zhongshan-17",
        original:
          "渠猪之水出焉，而南流注于河。其中多豪鱼，状如鲔，赤喙尾赤羽，可以已白癣。",
        translation:
          "渠猪水从这座山发源，向南流入黄河。水中有很多豪鱼，形状像鲟鱼，红色的嘴和尾巴，还有红色的鳍，可以用来治疗白癣。",
        difficultChars: [
          { char: "豪鱼", pinyin: "háo yú", meaning: "鱼名，似鲔赤喙" },
          { char: "鲔", pinyin: "wěi", meaning: "鲟鱼一类的鱼" },
          { char: "喙", pinyin: "huì", meaning: "嘴" },
        ],
        relatedBeastId: "haoyu",
      },
      {
        id: "zhongshan-18",
        original:
          "又西九十里，曰騩山，其阳多美玉赤金，其阴多铁，其木多橿杻。",
        translation:
          "再往西九十里，有座騩山，山的南面盛产美玉和赤金，山的北面盛产铁，山上的树木多是橿树和杻树。",
        difficultChars: [
          { char: "騩", pinyin: "guī", meaning: "騩山，山名" },
          { char: "橿", pinyin: "jiāng", meaning: "一种常绿乔木" },
          { char: "杻", pinyin: "niǔ", meaning: "一种落叶乔木" },
        ],
      },
      {
        id: "zhongshan-19",
        original:
          "又西三十里，曰鲜山，其阳多金，其阴多铁。其中多鸣蛇，其状如蛇而四翼，其音如磬，见则其邑大旱。",
        translation:
          "再往西三十里，有座鲜山，山的南面盛产金，山的北面盛产铁。水中有许多鸣蛇，形状像蛇却长着四只翅膀，叫声像敲击磬的声音，它一出现那个城邑就会大旱。",
        difficultChars: [
          { char: "鲜山", pinyin: "xiān shān", meaning: "山名" },
          { char: "鸣蛇", pinyin: "míng shé", meaning: "蛇名，四翼能鸣" },
          { char: "磬", pinyin: "qìng", meaning: "古代打击乐器" },
        ],
        relatedBeastId: "mingshe",
      },
      {
        id: "zhongshan-20",
        original:
          "又东三十里，曰敏山，其上多金玉，其下有木焉，名曰蓟柏，其叶如楮而赤华。有兽焉，其状如彘，黄身白头白尾，名曰闻獜，见则天下大风。",
        translation:
          "再往东三十里，有座敏山，山上盛产金属矿物和美玉，山下有一种树，名叫蓟柏，叶子像楮树叶却开红色的花。山中有一种兽，形状像猪，黄色的身子白色的头和尾巴，名叫闻獜，它一出现天下就会刮大风。",
        difficultChars: [
          { char: "蓟柏", pinyin: "jì bǎi", meaning: "树名" },
          { char: "楮", pinyin: "chǔ", meaning: "楮树，一种落叶乔木" },
          { char: "闻獜", pinyin: "wén lìn", meaning: "兽名，似猪黄身白首尾" },
        ],
        relatedBeastId: "wenlin",
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
      {
        id: "haiwainan-11",
        original: "有成山，甘水穷焉。有羽民之国，其民皆生毛羽。",
        translation:
          "有一座成山，甘水在这里流到尽头。有一个羽民国，那里的百姓都长着羽毛。",
        difficultChars: [
          { char: "穷", pinyin: "qióng", meaning: "尽头，此处指水流到尽头" },
          { char: "毛羽", pinyin: "máo yǔ", meaning: "羽毛" },
        ],
      },
      {
        id: "haiwainan-12",
        original: "比翼鸟在其东，其为鸟一青一赤，两鸟比翼。一曰在南山东。",
        translation:
          "比翼鸟在它的东面，这种鸟一只青色一只赤色，两只鸟并翼而飞。另一种说法是在南山的东面。",
        difficultChars: [
          { char: "比翼", pinyin: "bǐ yì", meaning: "翅膀并列，比喻并飞" },
          { char: "赤", pinyin: "chì", meaning: "红色" },
        ],
      },
      {
        id: "haiwainan-13",
        original:
          "有鸟焉，其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也，见则其邑有讹火。",
        translation:
          "有一种鸟，形状像鹤，只有一只脚，青色的身体上有红色花纹，白色的嘴，名叫毕方，它的叫声像在叫自己的名字，它一出现，那个城邑就会发生怪火。",
        difficultChars: [
          { char: "鹤", pinyin: "hè", meaning: "鹤，一种大型水鸟" },
          { char: "赤文青质", pinyin: "chì wén qīng zhì", meaning: "红色花纹青色底子" },
          { char: "讹火", pinyin: "é huǒ", meaning: "怪火、妖火" },
        ],
        relatedBeastId: "bifang",
      },
      {
        id: "haiwainan-14",
        original:
          "有人名曰驩头。鲧妻士敬，士敬子曰琰融，生驩头。讙头人面鸟喙，有翼，食海中鱼，杖翼而行。",
        translation:
          "有个人名叫驩头。鲧的妻子叫士敬，士敬的儿子叫琰融，生了驩头。驩头长着人的面孔和鸟的嘴，有翅膀，吃海中的鱼，靠翅膀行走。",
        difficultChars: [
          { char: "驩", pinyin: "huān", meaning: "同\"欢\"，此处为人名" },
          { char: "杖", pinyin: "zhàng", meaning: "拄着、依靠" },
          { char: "琰融", pinyin: "yǎn róng", meaning: "人名" },
        ],
      },
      {
        id: "haiwainan-15",
        original: "三苗国在赤水东，其为人相随。一曰三毛国。",
        translation:
          "三苗国在赤水的东面，那里的人相互跟随而行。另一种说法叫三毛国。",
        difficultChars: [
          { char: "三苗", pinyin: "sān miáo", meaning: "古族名，相传为蚩尤之后" },
          { char: "相随", pinyin: "xiāng suí", meaning: "相互跟随" },
        ],
      },
      {
        id: "haiwainan-16",
        original:
          "三珠树在厌火北，生赤水上，其为树如柏，叶皆为珠。一曰其为树若彗。",
        translation:
          "三珠树在厌火国的北面，生长在赤水之上，这种树像柏树，叶子都是珍珠。另一种说法说这种树像彗星。",
        difficultChars: [
          { char: "珠", pinyin: "zhū", meaning: "珍珠" },
          { char: "彗", pinyin: "huì", meaning: "彗星，扫帚星" },
        ],
      },
      {
        id: "haiwainan-17",
        original: "长臂国在其东，捕鱼水中，其臂长。一曰在周饶东，捕鱼海中。",
        translation:
          "长臂国在它的东面，那里的人在水中捕鱼，手臂很长。另一种说法是在周饶国的东面，在海中捕鱼。",
        difficultChars: [
          { char: "臂", pinyin: "bì", meaning: "手臂" },
          { char: "周饶", pinyin: "zhōu ráo", meaning: "国名，即侏儒国" },
        ],
      },
      {
        id: "haiwainan-18",
        original: "有不死之国，阿姓，甘木是食。",
        translation:
          "有一个不死国，那里的人姓阿，以甘木（不死树）为食。",
        difficultChars: [
          { char: "甘木", pinyin: "gān mù", meaning: "即不死树，食之不老" },
          { char: "阿", pinyin: "ē", meaning: "姓氏" },
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
      {
        id: "haiwaixi-11",
        original:
          "大乐之野，夏后启于此儛九代，乘两龙，云盖三层。左手操翳，右手操环，佩玉璜。在大运山北。一曰大遗之野。",
        translation:
          "大乐之野，夏后启在这里表演九代的舞蹈，乘着两条龙，云彩做的车盖有三层。他左手拿着羽翳，右手拿着玉环，身上佩戴着玉璜。这个地方在大运山的北面。另一种说法叫大遗之野。",
        difficultChars: [
          { char: "儛", pinyin: "wǔ", meaning: "同\"舞\"，跳舞" },
          { char: "翳", pinyin: "yì", meaning: "用羽毛做的华盖" },
          { char: "璜", pinyin: "huáng", meaning: "半璧形的玉器" },
        ],
      },
      {
        id: "haiwaixi-12",
        original:
          "轩辕之国在此穷山之际，其不寿者八百岁。在女子国北。人面蛇身，尾交首上。",
        translation:
          "轩辕国在穷山附近，那里的人即使不长寿也能活八百岁。在女子国的北面。轩辕国的人长着人的面孔和蛇的身子，尾巴交结在头上。",
        difficultChars: [
          { char: "际", pinyin: "jì", meaning: "边际、附近" },
          { char: "尾交首上", pinyin: "wěi jiāo shǒu shàng", meaning: "尾巴交结在头顶上" },
        ],
      },
      {
        id: "haiwaixi-13",
        original: "女子国在巫咸北，两女子居，水周之。一曰居一门中。",
        translation:
          "女子国在巫咸国的北面，有两个女子居住在那里，四周被水环绕。另一种说法是她们住在一个门中。",
        difficultChars: [
          { char: "周", pinyin: "zhōu", meaning: "环绕" },
        ],
      },
      {
        id: "haiwaixi-14",
        original: "灭蒙鸟在结匈国北，为鸟青，赤尾。",
        translation:
          "灭蒙鸟在结匈国的北面，这种鸟是青色的，尾巴是红色的。",
        difficultChars: [
          { char: "灭蒙", pinyin: "miè méng", meaning: "鸟名" },
        ],
      },
      {
        id: "haiwaixi-15",
        original: "肃慎之国在白民北。有树名曰雄常，先入伐帝，于此取之。",
        translation:
          "肃慎国在白民国的北面。那里有一种树名叫雄常，圣人继位时，就取这种树的皮来做衣服。",
        difficultChars: [
          { char: "肃慎", pinyin: "sù shèn", meaning: "古族名，在东北方" },
          { char: "雄常", pinyin: "xióng cháng", meaning: "树名，可取皮为衣" },
        ],
      },
      {
        id: "haiwaixi-16",
        original: "西方蓐收，左耳有蛇，乘两龙。",
        translation:
          "西方的神叫蓐收，左耳上挂着蛇，乘着两条龙。",
        difficultChars: [
          { char: "蓐收", pinyin: "rù shōu", meaning: "西方之神，金神" },
        ],
      },
      {
        id: "haiwaixi-17",
        original:
          "龙鱼陵居在其北，状如狸。一曰鰕。即有神圣乘此以行九野。一曰鳖鱼在夭野北，其为鱼也如鲤。",
        translation:
          "龙鱼生活在丘陵上，在它的北面，形状像狸猫。一种说法说像虾。有神圣乘着它巡行九野。另一种说法是鳖鱼在诸夭之野的北面，形状像鲤鱼。",
        difficultChars: [
          { char: "陵居", pinyin: "líng jū", meaning: "生活在丘陵上" },
          { char: "狸", pinyin: "lí", meaning: "狸猫" },
          { char: "鰕", pinyin: "xiā", meaning: "同\"虾\"" },
        ],
      },
      {
        id: "haiwaixi-18",
        original: "丈夫国在维鸟北，其为人衣冠带剑。",
        translation:
          "丈夫国在维鸟的北面，那里的人衣冠整齐，身上佩带宝剑。",
        difficultChars: [
          { char: "丈夫", pinyin: "zhàng fū", meaning: "男子，此处指国中皆为男子" },
          { char: "维鸟", pinyin: "wéi niǎo", meaning: "鸟名，或指鸟栖息之处" },
        ],
      },
    ],
  },
  {
    id: "haiwaidong",
    name: "海外东经",
    subtitle: "海外东方的奇幻国度",
    introduction:
      "《海外东经》记载了海外东方的奇幻国度与神灵。天吴为水伯，八首八足；青丘之狐九尾；君子国之人谦让不争，衣冠带剑；东方句芒鸟身人面，乘两龙而行。汤谷扶桑，十日并浴，一日方至一日方出，皆载于乌——东方的神话瑰丽而壮阔。",
    sentences: [
      {
        id: "haiwaidong-1",
        original:
          "朝阳之谷，神曰天吴，是为水伯。在𫊸北两水间。其为兽也，八首人面，八足八尾，皆青黄。",
        translation:
          "朝阳之谷中有一位神叫天吴，他是水神。在𫊸国北面的两条水流之间。他作为兽的形状是：长着八个脑袋、人的面孔，八只脚八条尾巴，都是青黄色的。",
        difficultChars: [
          { char: "𫊸", pinyin: "jiāo", meaning: "古国名" },
          { char: "伯", pinyin: "bó", meaning: "长官、首领，此处指水神之长" },
          { char: "首", pinyin: "shǒu", meaning: "头" },
        ],
      },
      {
        id: "haiwaidong-2",
        original: "青丘国在其北，其狐四足九尾。",
        translation:
          "青丘国在朝阳之谷的北面，那里的狐狸长着四只脚和九条尾巴。",
        difficultChars: [
          { char: "青丘", pinyin: "qīng qiū", meaning: "古国名，传说中的地名" },
          { char: "狐", pinyin: "hú", meaning: "狐狸" },
          { char: "九尾", pinyin: "jiǔ wěi", meaning: "九条尾巴" },
        ],
      },
      {
        id: "haiwaidong-3",
        original:
          "黑齿国在其北，为人黑齿，食稻啖蛇，其一蛇一赤。",
        translation:
          "黑齿国在青丘国的北面，那里的人牙齿漆黑，以稻米为食，还吃蛇，常有一条青蛇和一条赤蛇相伴。",
        difficultChars: [
          { char: "啖", pinyin: "dàn", meaning: "吃" },
          { char: "稻", pinyin: "dào", meaning: "稻米" },
          { char: "赤", pinyin: "chì", meaning: "红色" },
        ],
      },
      {
        id: "haiwaidong-4",
        original:
          "玄股之国在其北，其为人衣鱼食䳅，两鸟夹之。",
        translation:
          "玄股国在黑齿国的北面，那里的人穿着鱼皮做的衣服，以䳅鸟为食，有两只鸟在两旁护卫。",
        difficultChars: [
          { char: "玄股", pinyin: "xuán gǔ", meaning: "大腿黑色，国名" },
          { char: "衣", pinyin: "yì", meaning: "穿（动词）" },
          { char: "䳅", pinyin: "zhì", meaning: "鸟名" },
        ],
      },
      {
        id: "haiwaidong-5",
        original: "毛民之国在其北，为人身生毛。",
        translation:
          "毛民国在玄股国的北面，那里的人浑身长满毛。",
        difficultChars: [
          { char: "毛民", pinyin: "máo mín", meaning: "浑身生毛的人，国名" },
          { char: "生", pinyin: "shēng", meaning: "生长" },
        ],
      },
      {
        id: "haiwaidong-6",
        original: "劳民国在其北，其为人黑。",
        translation:
          "劳民国在毛民国的北面，那里的人皮肤黝黑。",
        difficultChars: [
          { char: "劳", pinyin: "láo", meaning: "劳累，国名" },
          { char: "黑", pinyin: "hēi", meaning: "皮肤黑色" },
        ],
      },
      {
        id: "haiwaidong-7",
        original: "东方句芒，鸟身人面，乘两龙。",
        translation:
          "东方的神名叫句芒，长着鸟的身子、人的面孔，乘着两条龙。",
        difficultChars: [
          { char: "句芒", pinyin: "gōu máng", meaning: "东方之神，木神" },
          { char: "乘", pinyin: "chéng", meaning: "驾驭、乘坐" },
        ],
      },
      {
        id: "haiwaidong-8",
        original:
          "汤谷上有扶桑，十日所浴，在黑齿北。居水中，有大木，九日居下枝，一日居上枝。",
        translation:
          "汤谷上面有扶桑树，是十个太阳沐浴的地方，在黑齿国的北面。太阳们住在水中，有一棵大树，九个太阳住在下面的树枝上，一个太阳住在上面的树枝上。",
        difficultChars: [
          { char: "汤谷", pinyin: "yáng gǔ", meaning: "即旸谷，日出之处" },
          { char: "扶桑", pinyin: "fú sāng", meaning: "神话中的神树，日出其下" },
          { char: "浴", pinyin: "yù", meaning: "洗澡" },
          { char: "枝", pinyin: "zhī", meaning: "树枝" },
        ],
      },
      {
        id: "haiwaidong-9",
        original: "一日方至，一日方出，皆载于乌。",
        translation:
          "一个太阳刚刚到来，一个太阳刚刚出发，太阳们都由乌鸟载着运行。",
        difficultChars: [
          { char: "方", pinyin: "fāng", meaning: "正当、刚刚" },
          { char: "载", pinyin: "zài", meaning: "承载、驮载" },
          { char: "乌", pinyin: "wū", meaning: "乌鸦，传说日中有乌" },
        ],
      },
      {
        id: "haiwaidong-10",
        original:
          "雨师妾在其北，其为人黑，两手各操一蛇，左耳有青蛇，右耳有赤蛇。",
        translation:
          "雨师妾国在汤谷的北面，那里的人皮肤黝黑，两只手各握着一条蛇，左耳上挂着青蛇，右耳上挂着赤蛇。",
        difficultChars: [
          { char: "雨师妾", pinyin: "yǔ shī qiè", meaning: "国名，或指雨师的侍妾" },
          { char: "操", pinyin: "cāo", meaning: "握、拿" },
        ],
      },
      {
        id: "haiwaidong-11",
        original:
          "君子国在其北，衣冠带剑，食兽，使二大虎在旁，其人好让不争。",
        translation:
          "君子国在雨师妾的北面，那里的人衣冠整齐、身佩宝剑，吃野兽，身边使唤两只大虎，他们为人谦让不爱争斗。",
        difficultChars: [
          { char: "冠", pinyin: "guān", meaning: "帽子" },
          { char: "剑", pinyin: "jiàn", meaning: "宝剑" },
          { char: "让", pinyin: "ràng", meaning: "谦让" },
        ],
      },
      {
        id: "haiwaidong-12",
        original: "虹虹在其北，各有两首。",
        translation:
          "虹虹在君子国的北面，它们各有两个脑袋。",
        difficultChars: [
          { char: "虹虹", pinyin: "hóng hóng", meaning: "传说中的双头兽" },
          { char: "首", pinyin: "shǒu", meaning: "头" },
        ],
      },
      {
        id: "haiwaidong-13",
        original:
          "嗟丘，方各三百里，在东海中，两山夹丘，上有树木。",
        translation:
          "嗟丘方圆各三百里，位于东海之中，两座山夹着这座土丘，丘上长有树木。",
        difficultChars: [
          { char: "嗟", pinyin: "jiē", meaning: "叹词，此处为丘名" },
          { char: "方", pinyin: "fāng", meaning: "方圆" },
          { char: "夹", pinyin: "jiā", meaning: "从两旁挟持" },
        ],
      },
      {
        id: "haiwaidong-14",
        original: "嗽丝之野在其北，其人两手操丝。",
        translation:
          "嗽丝之野在嗟丘的北面，那里的人两手都拿着蚕丝。",
        difficultChars: [
          { char: "嗽", pinyin: "sòu", meaning: "此处指吐丝、操丝" },
          { char: "操", pinyin: "cāo", meaning: "握、拿" },
        ],
      },
      {
        id: "haiwaidong-15",
        original:
          "奢比之尸在其北，兽身、人面、大耳，珥两青蛇。",
        translation:
          "奢比之尸在嗽丝之野的北面，他长着兽的身子、人的面孔、很大的耳朵，耳上挂着两条青蛇。",
        difficultChars: [
          { char: "奢比", pinyin: "shē bǐ", meaning: "神名" },
          { char: "尸", pinyin: "shī", meaning: "神像、神主" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
        ],
      },
    ],
  },
  {
    id: "haiwaibei",
    name: "海外北经",
    subtitle: "海外北方的神异传说",
    introduction:
      "《海外北经》记述了海外北方的神异传说。钟山之神烛阴，睁目为昼、闭目为夜；夸父逐日，渴死化杖为邓林；北海之神禺彊，人面鸟身，珥蛇践蛇；共工之台，威灵赫赫。北方的神话凛冽而苍茫，诉说着天地初开时的壮烈与神奇。",
    sentences: [
      {
        id: "haiwaibei-1",
        original:
          "钟山之神，名曰烛阴，视为昼，瞑为夜，吹为冬，呼为夏，不饮，不食，不息，息为风。",
        translation:
          "钟山的山神名叫烛阴，他睁眼就是白天，闭眼就是黑夜，吹气就是冬天，呼气就是夏天，不喝水，不吃饭，不呼吸，一呼吸就化为风。",
        difficultChars: [
          { char: "烛阴", pinyin: "zhú yīn", meaning: "即烛龙，钟山山神" },
          { char: "视", pinyin: "shì", meaning: "睁开眼" },
          { char: "瞑", pinyin: "míng", meaning: "闭眼" },
        ],
      },
      {
        id: "haiwaibei-2",
        original:
          "身长千里，其为物，人面，蛇身，赤色，居钟山下。",
        translation:
          "他的身子长达千里，形状是人的面孔、蛇的身子，通体赤红，住在钟山脚下。",
        difficultChars: [
          { char: "千里", pinyin: "qiān lǐ", meaning: "形容极长" },
          { char: "赤色", pinyin: "chì sè", meaning: "红色" },
        ],
      },
      {
        id: "haiwaibei-3",
        original: "夸父与日逐走，入日。",
        translation:
          "夸父与太阳赛跑，追赶到太阳落下的地方。",
        difficultChars: [
          { char: "逐走", pinyin: "zhú zǒu", meaning: "赛跑、追赶" },
          { char: "入日", pinyin: "rù rì", meaning: "追到太阳落下的地方" },
        ],
      },
      {
        id: "haiwaibei-4",
        original:
          "渴欲得饮，饮于河、渭，河、渭不足，北饮大泽，未至，道渴而死。弃其杖，化为邓林。",
        translation:
          "他口渴想要喝水，在黄河和渭水饮水，黄河渭水不够喝，又向北去喝大泽的水，还没到达，就在路上渴死了。他丢弃的手杖，化作了邓林（桃林）。",
        difficultChars: [
          { char: "渭", pinyin: "wèi", meaning: "渭水，黄河支流" },
          { char: "大泽", pinyin: "dà zé", meaning: "大湖泊" },
          { char: "邓林", pinyin: "dèng lín", meaning: "桃林，传说为夸父之杖所化" },
        ],
      },
      {
        id: "haiwaibei-5",
        original: "无肠之国在其北，其为人长而无肠。",
        translation:
          "无肠国在夸父国的北面，那里的人身材高大却没有肠子。",
        difficultChars: [
          { char: "无肠", pinyin: "wú cháng", meaning: "没有肠子" },
          { char: "长", pinyin: "cháng", meaning: "身材高大" },
        ],
      },
      {
        id: "haiwaibei-6",
        original: "深目国，为人举一手一目。一曰在共工台东。",
        translation:
          "深目国的人总是举起一只手，只有一只眼睛。另一种说法是在共工台的东面。",
        difficultChars: [
          { char: "深目", pinyin: "shēn mù", meaning: "眼窝深陷" },
          { char: "举", pinyin: "jǔ", meaning: "举起、抬起" },
        ],
      },
      {
        id: "haiwaibei-7",
        original:
          "北海之渚中，有神，人面鸟身，珥两青蛇，践两赤蛇，名曰禺彊。",
        translation:
          "北海的岛屿中，有一位神，长着人的面孔和鸟的身子，耳朵上挂着两条青蛇，脚下踩着两条赤蛇，名叫禺彊，是北海之神。",
        difficultChars: [
          { char: "渚", pinyin: "zhǔ", meaning: "水中的小洲、岛屿" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
          { char: "践", pinyin: "jiàn", meaning: "踩踏" },
          { char: "禺彊", pinyin: "yú qiáng", meaning: "北海之神" },
        ],
      },
      {
        id: "haiwaibei-8",
        original: "一目国在其东，一目中其面而居。",
        translation:
          "一目国在它的东面，那里的人只有一只眼睛，长在脸的正中间。",
        difficultChars: [
          { char: "一目", pinyin: "yī mù", meaning: "只有一只眼睛" },
          { char: "中", pinyin: "zhòng", meaning: "正中、居中" },
        ],
      },
      {
        id: "haiwaibei-9",
        original:
          "柔利国在一目东，为人一手一足，反厀，曲足居上。",
        translation:
          "柔利国在一目国的东面，那里的人只有一只手一只脚，膝盖向后弯，弯曲的脚长在身体上方。",
        difficultChars: [
          { char: "柔利", pinyin: "róu lì", meaning: "国名" },
          { char: "反厀", pinyin: "fǎn xī", meaning: "膝盖反向，厀同膝" },
          { char: "曲", pinyin: "qū", meaning: "弯曲" },
        ],
      },
      {
        id: "haiwaibei-10",
        original: "共工之台，射者不敢北向。",
        translation:
          "共工之台在此处，射箭的人不敢向北面射箭，因为敬畏共工的威灵。",
        difficultChars: [
          { char: "台", pinyin: "tái", meaning: "高台、祭台" },
          { char: "射", pinyin: "shè", meaning: "射箭" },
          { char: "北向", pinyin: "běi xiàng", meaning: "向北面射箭" },
        ],
      },
      {
        id: "haiwaibei-11",
        original: "无䏿之国在长山东，为人无䏿。",
        translation:
          "无䏿国在长山的东面，那里的人没有小腿肚子。",
        difficultChars: [
          { char: "䏿", pinyin: "qǐ", meaning: "小腿肚子，即腓" },
          { char: "长山", pinyin: "cháng shān", meaning: "山名" },
        ],
      },
      {
        id: "haiwaibei-12",
        original:
          "平丘在三桑东，爰有遗玉、青马、视肉、杨柳、甘柤、甘华，百果所生。",
        translation:
          "平丘在三桑树的东面，这里有遗玉、青马、视肉、杨柳、甘柤、甘华等各种果树生长。",
        difficultChars: [
          { char: "爰", pinyin: "yuán", meaning: "这里、于此" },
          { char: "遗玉", pinyin: "yí yù", meaning: "一种古玉" },
          { char: "柤", pinyin: "zhā", meaning: "通\"楂\"，果木名" },
        ],
      },
      {
        id: "haiwaibei-13",
        original: "有秬黍之国，四面皆秬黍，使四鸟，虎豹熊罴。",
        translation:
          "有一个秬黍之国，四面都种满了黑黍，那里的人能驱使四种鸟兽：虎、豹、熊、罴。",
        difficultChars: [
          { char: "秬黍", pinyin: "jù shǔ", meaning: "黑黍，一种谷物" },
          { char: "罴", pinyin: "pí", meaning: "棕熊" },
        ],
      },
      {
        id: "haiwaibei-14",
        original:
          "北海之渚中，有神，人面鸟身，珥两黄蛇，践两黄蛇，名曰禺彊。",
        translation:
          "北海的岛屿中，有一位神，长着人的面孔和鸟的身子，耳朵上挂着两条黄蛇，脚下踩着两条黄蛇，名叫禺彊。",
        difficultChars: [
          { char: "黄蛇", pinyin: "huáng shé", meaning: "黄色的蛇" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
        ],
      },
      {
        id: "haiwaibei-15",
        original: "夸父国在聂耳东，其为人大。",
        translation:
          "夸父国在聂耳国的东面，那里的人身材高大。",
        difficultChars: [
          { char: "聂耳", pinyin: "niè ěr", meaning: "国名，其人两手聂其耳" },
          { char: "大", pinyin: "dà", meaning: "身材高大" },
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
      {
        id: "dahuangdong-11",
        original:
          "有中容之国。帝俊生中容，中容人食兽、木实，使四鸟：豹、虎、熊、罴。",
        translation:
          "有一个中容国。帝俊生了中容，中容国人吃野兽和树的果实，能驱使四种鸟兽：豹、虎、熊、罴。",
        difficultChars: [
          { char: "木实", pinyin: "mù shí", meaning: "树的果实" },
          { char: "罴", pinyin: "pí", meaning: "棕熊" },
        ],
      },
      {
        id: "dahuangdong-12",
        original:
          "东南海之外，甘水之间，有羲和之国。有女子名曰羲和，方浴日于甘渊。羲和者，帝俊之妻，是生十日。",
        translation:
          "东南海之外，甘水之间，有一个羲和国。有个女子名叫羲和，正在甘渊中给太阳洗澡。羲和是帝俊的妻子，生了十个太阳。",
        difficultChars: [
          { char: "羲和", pinyin: "xī hé", meaning: "神话中太阳之母" },
          { char: "浴日", pinyin: "yù rì", meaning: "给太阳洗澡" },
        ],
      },
      {
        id: "dahuangdong-13",
        original:
          "东海之渚中，有神，人面鸟身，珥两黄蛇，践两黄蛇，名曰禺䝞。黄帝生禺䝞，禺䝞生禺京。禺京处北海，禺䝞处东海，是惟海神。",
        translation:
          "东海的岛屿中，有一位神，长着人的面孔和鸟的身子，耳朵上挂着两条黄蛇，脚下踩着两条黄蛇，名叫禺䝞。黄帝生了禺䝞，禺䝞生了禺京。禺京住在北海，禺䝞住在东海，他们都是海神。",
        difficultChars: [
          { char: "渚", pinyin: "zhǔ", meaning: "水中的小洲、岛屿" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
          { char: "践", pinyin: "jiàn", meaning: "踩踏" },
          { char: "䝞", pinyin: "hào", meaning: "神名" },
        ],
      },
      {
        id: "dahuangdong-14",
        original:
          "有司幽之国。帝俊生晏龙，晏龙生司幽，司幽生思土，不妻；思女，不夫。食黍，食兽，是使四鸟。",
        translation:
          "有一个司幽国。帝俊生了晏龙，晏龙生了司幽，司幽生了思土，思土不娶妻；还生了思女，思女不嫁夫。他们吃黍米和野兽，能驱使四种鸟兽。",
        difficultChars: [
          { char: "司幽", pinyin: "sī yōu", meaning: "国名" },
          { char: "不妻", pinyin: "bù qī", meaning: "不娶妻" },
          { char: "不夫", pinyin: "bù fū", meaning: "不嫁夫" },
        ],
      },
      {
        id: "dahuangdong-15",
        original:
          "河念有易，有易潜出，为国于兽，方食之，名曰摇民。帝舜生戏，戏生摇民。",
        translation:
          "河伯怜悯有易人，有易人偷偷逃出，在野兽中建立国家，靠吃野兽为生，名叫摇民国。帝舜生了戏，戏生了摇民。",
        difficultChars: [
          { char: "念", pinyin: "niàn", meaning: "怜悯、顾念" },
          { char: "潜出", pinyin: "qián chū", meaning: "偷偷逃出" },
          { char: "摇民", pinyin: "yáo mín", meaning: "国名/族名" },
        ],
      },
      {
        id: "dahuangdong-16",
        original:
          "大荒之中，有山名曰鞠陵于天、东极、离瞀，日月所出。名曰折丹——东方曰折，来风曰俊——处东极以出入风。",
        translation:
          "大荒之中，有三座山名叫鞠陵于天、东极、离瞀，是日月升起的地方。有一位神名叫折丹——东方人称他为折，从东方吹来的风叫俊风——他住在东极，掌管风的出入。",
        difficultChars: [
          { char: "鞠陵于天", pinyin: "jū líng yú tiān", meaning: "山名" },
          { char: "离瞀", pinyin: "lí mào", meaning: "山名" },
          { char: "出入风", pinyin: "chū rù fēng", meaning: "掌管风的出入" },
        ],
      },
      {
        id: "dahuangdong-17",
        original: "大荒之中，有山名曰猗天苏山，日月所生。有壎民之国。",
        translation:
          "大荒之中，有一座山名叫猗天苏山，是日月产生的地方。有一个壎民国。",
        difficultChars: [
          { char: "猗天苏山", pinyin: "yī tiān sū shān", meaning: "山名" },
          { char: "壎", pinyin: "xūn", meaning: "古同\"埙\"，陶制吹奏乐器，此处为国名" },
        ],
      },
      {
        id: "dahuangdong-18",
        original:
          "有五采之鸟，相乡弃沙。惟帝俊下友。帝下两坛，采鸟是司。",
        translation:
          "有五彩的鸟，相对起舞。帝俊下来与它们交友。天帝设有两座祭坛，由彩鸟来掌管。",
        difficultChars: [
          { char: "相乡", pinyin: "xiāng xiàng", meaning: "相对、面对面" },
          { char: "弃沙", pinyin: "qì shā", meaning: "盘旋起舞的样子" },
          { char: "司", pinyin: "sī", meaning: "掌管" },
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
      {
        id: "dahuangbei-11",
        original:
          "钟山之神，名曰烛阴，视为昼，瞑为夜，吹为冬，呼为夏，不饮，不食，不息，息为风。身长千里，其为物，人面，蛇身，赤色，居钟山下。",
        translation:
          "钟山的山神名叫烛阴，他睁眼就是白天，闭眼就是黑夜，吹气就是冬天，呼气就是夏天，不喝水，不吃饭，不呼吸，一呼吸就化为风。他的身子长达千里，形状是人的面孔、蛇的身子，通体赤红，住在钟山脚下。",
        difficultChars: [
          { char: "烛阴", pinyin: "zhú yīn", meaning: "即烛龙，钟山山神" },
          { char: "视", pinyin: "shì", meaning: "睁开眼" },
          { char: "吹", pinyin: "chuī", meaning: "吹气，代表冬天" },
        ],
        relatedBeastId: "zhulong",
      },
      {
        id: "dahuangbei-12",
        original:
          "夸父与日逐走，入日，渴欲得饮，饮于河、渭，河、渭不足，北饮大泽，未至，道渴而死。弃其杖，化为邓林。",
        translation:
          "夸父与太阳赛跑，追赶到太阳落下的地方，口渴想要喝水，喝了黄河和渭水的水，黄河和渭水不够喝，又向北去喝大泽的水，还没走到，就在半路上渴死了。他丢弃的手杖，化为一片邓林。",
        difficultChars: [
          { char: "逐走", pinyin: "zhú zǒu", meaning: "赛跑、追赶" },
          { char: "邓林", pinyin: "dèng lín", meaning: "桃林，传说为夸父之杖所化" },
        ],
      },
      {
        id: "dahuangbei-13",
        original:
          "共工臣名曰相繇，九首蛇身，自环，食于九土。其所歍所尼，即为源泽，不辛乃苦，百兽莫能处。禹湮洪水，杀相繇，其血腥臭，不可生谷；其地多水，不可居也。",
        translation:
          "共工的臣子名叫相繇，长着九个脑袋和蛇的身子，身体盘旋成环，在九座山上觅食。他呕吐和停息的地方，就变成沼泽溪流，不是辛辣就是苦涩，百兽都无法在那里居住。大禹治理洪水时，杀死了相繇，相繇的血腥臭不堪，那地方不能生长五谷；那里多水，无法居住。",
        difficultChars: [
          { char: "相繇", pinyin: "xiāng yáo", meaning: "即相柳，共工之臣" },
          { char: "歍", pinyin: "wū", meaning: "呕吐" },
          { char: "尼", pinyin: "nì", meaning: "停息" },
          { char: "湮", pinyin: "yān", meaning: "堵塞、治理" },
        ],
      },
      {
        id: "dahuangbei-14",
        original: "有系昆之山者，有共工之台，射者不敢北向。",
        translation:
          "有一座系昆山，山上有共工台，射箭的人不敢向北面射箭（因为敬畏共工的威灵）。",
        difficultChars: [
          { char: "系昆", pinyin: "xì kūn", meaning: "山名" },
          { char: "北向", pinyin: "běi xiàng", meaning: "向北面射箭" },
        ],
      },
      {
        id: "dahuangbei-15",
        original:
          "有人衣青衣，名曰黄帝女魃。蚩尤作兵伐黄帝，黄帝乃令应龙攻之冀州之野。应龙畜水，蚩尤请风伯雨师，纵大风雨。黄帝乃下天女曰魃，雨止，遂杀蚩尤。魃不得复上，所居不雨。",
        translation:
          "有个人穿着青色衣服，名叫黄帝女魃。蚩尤兴兵讨伐黄帝，黄帝便命令应龙在冀州之野攻击他。应龙蓄水，蚩尤请来风伯雨师，降下狂风暴雨。黄帝便派天女魃下凡，雨停了，于是杀死了蚩尤。魃再也不能回到天上，她所住的地方就不会下雨。",
        difficultChars: [
          { char: "作兵", pinyin: "zuò bīng", meaning: "兴兵、起兵" },
          { char: "畜水", pinyin: "xù shuǐ", meaning: "蓄水" },
          { char: "纵", pinyin: "zòng", meaning: "降下、放纵" },
        ],
        relatedBeastId: "nuba",
      },
      {
        id: "dahuangbei-16",
        original: "又有无肠国，是任姓。无继子，食鱼。",
        translation:
          "又有一个无肠国，那里的人姓任。没有后代，以鱼为食。",
        difficultChars: [
          { char: "无肠", pinyin: "wú cháng", meaning: "没有肠子" },
          { char: "无继子", pinyin: "wú jì zǐ", meaning: "没有后代" },
        ],
      },
      {
        id: "dahuangbei-17",
        original: "深目国在其东，为人举一手一目。",
        translation:
          "深目国在它的东面，那里的人总是举起一只手，只有一只眼睛。",
        difficultChars: [
          { char: "深目", pinyin: "shēn mù", meaning: "眼窝深陷" },
          { char: "举", pinyin: "jǔ", meaning: "举起、抬起" },
        ],
      },
      {
        id: "dahuangbei-18",
        original:
          "北海之渚中，有神，人面鸟身，珥两青蛇，践两赤蛇，名曰禺彊。",
        translation:
          "北海的岛屿中，有一位神，长着人的面孔和鸟的身子，耳朵上挂着两条青蛇，脚下踩着两条赤蛇，名叫禺彊。",
        difficultChars: [
          { char: "渚", pinyin: "zhǔ", meaning: "水中的小洲、岛屿" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
          { char: "践", pinyin: "jiàn", meaning: "踩踏" },
          { char: "禺彊", pinyin: "yú qiáng", meaning: "北海之神" },
        ],
      },
    ],
  },
  {
    id: "dahuangnan",
    name: "大荒南经",
    subtitle: "南方大荒的神话世界",
    introduction:
      "《大荒南经》描绘了南方大荒的神话世界。羲和浴日，十日并出；不死之国，甘木是食；南方祝融，兽身人面，乘两龙；帝尧、帝喾、帝舜皆葬于岳山。南方大荒的传说丰富多彩，充满对生命永恒与自然神灵的想象。",
    sentences: [
      {
        id: "dahuangnan-1",
        original: "有女子名曰羲和，方浴日于甘渊。",
        translation:
          "有位女子名叫羲和，正在甘渊中给太阳洗澡。",
        difficultChars: [
          { char: "羲和", pinyin: "xī hé", meaning: "神话中太阳之母，帝俊之妻" },
          { char: "浴", pinyin: "yù", meaning: "洗澡、沐浴" },
          { char: "甘渊", pinyin: "gān yuān", meaning: "水名，传说中太阳沐浴之处" },
        ],
      },
      {
        id: "dahuangnan-2",
        original: "有三苗之国，在赤水东，一名三毛国。",
        translation:
          "有一个三苗国，在赤水的东面，又叫三毛国。",
        difficultChars: [
          { char: "三苗", pinyin: "sān miáo", meaning: "古族名，相传为蚩尤之后" },
          { char: "赤水", pinyin: "chì shuǐ", meaning: "水名" },
        ],
      },
      {
        id: "dahuangnan-3",
        original: "有不死之国，阿姓，甘木是食。",
        translation:
          "有一个不死国，那里的人姓阿，以甘木（不死树）为食。",
        difficultChars: [
          { char: "不死", pinyin: "bù sǐ", meaning: "不会死亡" },
          { char: "甘木", pinyin: "gān mù", meaning: "即不死树，食之不老" },
        ],
      },
      {
        id: "dahuangnan-4",
        original: "有反舌国，其人反舌。",
        translation:
          "有一个反舌国（即歧舌国），那里的人舌头反向生长。",
        difficultChars: [
          { char: "反舌", pinyin: "fǎn shé", meaning: "舌头反着长，即歧舌" },
          { char: "歧舌", pinyin: "qí shé", meaning: "即反舌，舌头分叉或反向" },
        ],
      },
      {
        id: "dahuangnan-5",
        original:
          "西海之南，流沙之滨，赤水之后，黑水之前，有大山，名曰昆仑之丘。",
        translation:
          "在西海的南面、流沙的边缘、赤水的后方、黑水的前方，有一座大山，名叫昆仑丘。",
        difficultChars: [
          { char: "流沙", pinyin: "liú shā", meaning: "流动的沙漠" },
          { char: "昆仑", pinyin: "kūn lún", meaning: "神话中的神山" },
        ],
      },
      {
        id: "dahuangnan-6",
        original: "南方祝融，兽身人面，乘两龙。",
        translation:
          "南方的神名叫祝融，长着兽的身子、人的面孔，乘着两条龙。",
        difficultChars: [
          { char: "祝融", pinyin: "zhù róng", meaning: "南方之神，火神" },
          { char: "乘", pinyin: "chéng", meaning: "驾驭、乘坐" },
        ],
      },
      {
        id: "dahuangnan-7",
        original: "有申涂之国。",
        translation:
          "有一个申涂国。",
        difficultChars: [
          { char: "申涂", pinyin: "shēn tú", meaning: "国名" },
        ],
      },
      {
        id: "dahuangnan-8",
        original: "羲和者，帝俊之妻，是生十日。",
        translation:
          "羲和是帝俊的妻子，她生了十个太阳。",
        difficultChars: [
          { char: "帝俊", pinyin: "dì jùn", meaning: "山海经中的天帝" },
          { char: "十日", pinyin: "shí rì", meaning: "十个太阳" },
        ],
      },
      {
        id: "dahuangnan-9",
        original: "帝尧、帝喾、帝舜葬于岳山。",
        translation:
          "帝尧、帝喾、帝舜都埋葬在岳山。",
        difficultChars: [
          { char: "帝喾", pinyin: "dì kù", meaning: "上古帝王名" },
          { char: "岳山", pinyin: "yuè shān", meaning: "山名，帝王葬地" },
        ],
      },
      {
        id: "dahuangnan-10",
        original: "有人名曰㛮比之尸。",
        translation:
          "有一位神名叫㛮比之尸。",
        difficultChars: [
          { char: "㛮比", pinyin: "sǎo bǐ", meaning: "神名" },
          { char: "尸", pinyin: "shī", meaning: "神像、神主" },
        ],
      },
      {
        id: "dahuangnan-11",
        original: "有巫山者。有黄鸟。",
        translation:
          "有一座巫山。山上有黄鸟。",
        difficultChars: [
          { char: "巫山", pinyin: "wū shān", meaning: "山名，传说巫师聚集之地" },
          { char: "黄鸟", pinyin: "huáng niǎo", meaning: "黄色的鸟" },
        ],
      },
      {
        id: "dahuangnan-12",
        original: "有荣山，黄鸟。黄鸟于巫山，司此玄蛇。",
        translation:
          "有一座荣山，山上有黄鸟。黄鸟栖息在巫山，掌管那里的玄蛇。",
        difficultChars: [
          { char: "荣山", pinyin: "róng shān", meaning: "山名" },
          { char: "司", pinyin: "sī", meaning: "掌管、管理" },
          { char: "玄蛇", pinyin: "xuán shé", meaning: "黑色的蛇" },
        ],
      },
      {
        id: "dahuangnan-13",
        original:
          "南海渚中，有神，人面，珥两青蛇，践两赤蛇，名曰不廷胡余。",
        translation:
          "南海的岛屿中，有一位神，长着人的面孔，耳朵上挂着两条青蛇，脚下踩着两条赤蛇，名叫不廷胡余。",
        difficultChars: [
          { char: "渚", pinyin: "zhǔ", meaning: "水中的小洲、岛屿" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
          { char: "不廷胡余", pinyin: "bù tíng hú yú", meaning: "南方之神名" },
        ],
      },
      {
        id: "dahuangnan-14",
        original: "有蜮民之国，桑姓，食黍，射蜮是食。",
        translation:
          "有一个蜮民国，那里的人姓桑，以黍为食，也以射猎的蜮（含沙射影之虫）为食。",
        difficultChars: [
          { char: "蜮", pinyin: "yù", meaning: "传说中能含沙射影害人的虫" },
          { char: "桑", pinyin: "sāng", meaning: "桑树，此处为姓" },
          { char: "黍", pinyin: "shǔ", meaning: "黄米" },
        ],
      },
      {
        id: "dahuangnan-15",
        original: "有女子方浴月。帝俊妻常羲，生月十有二，此始浴之。",
        translation:
          "有位女子正在给月亮洗澡。帝俊的妻子常羲，生了十二个月亮，这是她最初给月亮洗澡的地方。",
        difficultChars: [
          { char: "常羲", pinyin: "cháng xī", meaning: "神话中月亮之母，帝俊之妻" },
          { char: "浴月", pinyin: "yù yuè", meaning: "给月亮洗澡" },
          { char: "十有二", pinyin: "shí yòu èr", meaning: "十二，有通又" },
        ],
      },
    ],
  },
  {
    id: "dahuangxi",
    name: "大荒西经",
    subtitle: "西方大荒的神话传说",
    introduction:
      "《大荒西经》记述了西方大荒的神话传说。西王母穴处昆仑之丘，虎齿豹尾；刑天断首犹舞干戚，不屈之志震慑天地；黄帝与蚩尤大战于冀州之野；灵山十巫，从此升降，百药爰在。西方的神话雄浑苍茫，承载着华夏先民对生死、战争与永恒的思考。",
    sentences: [
      {
        id: "dahuangxi-1",
        original:
          "西海之南，流沙之滨，赤水之后，黑水之前，有大山，名叫昆仑之丘。有神，人面虎身，有文有尾，皆白，处之。",
        translation:
          "在西海的南面、流沙的边缘、赤水的后方、黑水的前方，有一座大山，名叫昆仑丘。山中有位神，长着人的面孔、老虎的身子，身上有花纹和尾巴，通体白色，居住在这里。",
        difficultChars: [
          { char: "昆仑", pinyin: "kūn lún", meaning: "神话中的神山" },
          { char: "文", pinyin: "wén", meaning: "花纹" },
          { char: "皆白", pinyin: "jiē bái", meaning: "全部白色" },
        ],
      },
      {
        id: "dahuangxi-2",
        original:
          "有人戴胜，虎齿，有豹尾，穴处，名叫西王母。此山万物尽有。",
        translation:
          "有个人头上戴着玉胜，长着老虎的牙齿和豹子的尾巴，住在洞穴中，名叫西王母。这座山上万物尽有。",
        difficultChars: [
          { char: "胜", pinyin: "shèng", meaning: "玉胜，古代妇女的首饰" },
          { char: "穴处", pinyin: "xué chǔ", meaning: "住在洞穴中" },
          { char: "尽有", pinyin: "jìn yǒu", meaning: "全部都有" },
        ],
      },
      {
        id: "dahuangxi-3",
        original:
          "蚩尤作兵伐黄帝，黄帝乃令应龙攻之冀州之野。应龙畜水，蚩尤请风伯雨师，纵大风雨。",
        translation:
          "蚩尤兴兵讨伐黄帝，黄帝便命令应龙在冀州之野攻击他。应龙蓄水，蚩尤请来风伯雨师，降下狂风暴雨。",
        difficultChars: [
          { char: "作兵", pinyin: "zuò bīng", meaning: "兴兵、起兵" },
          { char: "畜水", pinyin: "xù shuǐ", meaning: "蓄水" },
          { char: "纵", pinyin: "zòng", meaning: "降下、放纵" },
        ],
      },
      {
        id: "dahuangxi-4",
        original:
          "刑天与帝争神，帝断其首，葬之常羊之山，乃以乳为目，以脐为口，操干戚以舞。",
        translation:
          "刑天与天帝争夺神位，天帝砍下了他的头，把他埋葬在常羊山，刑天便用两乳当作眼睛，用肚脐当作嘴巴，手持盾牌和斧头继续挥舞战斗。",
        difficultChars: [
          { char: "争神", pinyin: "zhēng shén", meaning: "争夺神位" },
          { char: "首", pinyin: "shǒu", meaning: "头" },
          { char: "脐", pinyin: "qí", meaning: "肚脐" },
          { char: "干戚", pinyin: "gān qī", meaning: "盾牌和斧头" },
        ],
      },
      {
        id: "dahuangxi-5",
        original:
          "有神十人，名叫女娲之肠，化为神，处栗广之野，横道而处。",
        translation:
          "有十位神灵，名叫女娲之肠，由女娲的肠子化为神灵，居住在栗广的原野上，横卧在道路中间。",
        difficultChars: [
          { char: "女娲", pinyin: "nǚ wā", meaning: "上古创世女神" },
          { char: "栗广", pinyin: "lì guǎng", meaning: "地名，原野名" },
          { char: "横道", pinyin: "héng dào", meaning: "横在道路中间" },
        ],
      },
      {
        id: "dahuangxi-6",
        original:
          "有人名叫石夷，来风曰韦，处西北隅以司日月长短。",
        translation:
          "有个人名叫石夷，从西北方吹来的风叫韦风，他住在西北角，掌管日月的运行和昼夜的长短。",
        difficultChars: [
          { char: "石夷", pinyin: "shí yí", meaning: "神名，西方之神" },
          { char: "韦", pinyin: "wéi", meaning: "风名" },
          { char: "司", pinyin: "sī", meaning: "掌管" },
        ],
      },
      {
        id: "dahuangxi-7",
        original: "有五采之鸟，有冠，名叫狂鸟。",
        translation:
          "有一种五彩斑斓的鸟，头上有冠，名叫狂鸟。",
        difficultChars: [
          { char: "五采", pinyin: "wǔ cǎi", meaning: "五彩，采通彩" },
          { char: "冠", pinyin: "guān", meaning: "鸟冠" },
          { char: "狂", pinyin: "kuáng", meaning: "狂放，鸟名" },
        ],
      },
      {
        id: "dahuangxi-8",
        original: "有西周之国，姬姓，食谷。",
        translation:
          "有一个西周国，那里的人姓姬，以谷物为食。",
        difficultChars: [
          { char: "西周", pinyin: "xī zhōu", meaning: "国名，即周族" },
          { char: "姬", pinyin: "jī", meaning: "姓氏，周朝王室之姓" },
        ],
      },
      {
        id: "dahuangxi-9",
        original:
          "西南海之外，赤水之南，流沙之西，有人珥两青蛇，乘两龙，名叫夏后开。",
        translation:
          "在西南海以外、赤水的南面、流沙的西面，有个人耳上挂着两条青蛇，乘着两条龙，名叫夏后开（即夏启）。",
        difficultChars: [
          { char: "夏后开", pinyin: "xià hòu kāi", meaning: "即夏启，夏朝开国君主" },
          { char: "珥", pinyin: "ěr", meaning: "戴在耳上作装饰" },
          { char: "乘", pinyin: "chéng", meaning: "驾驭" },
        ],
      },
      {
        id: "dahuangxi-10",
        original: "有互人之国，炎帝之妻，生炎居。",
        translation:
          "有一个互人国，炎帝的妻子，生了炎居。",
        difficultChars: [
          { char: "互人", pinyin: "hù rén", meaning: "国名" },
          { char: "炎帝", pinyin: "yán dì", meaning: "上古帝王，即神农氏" },
          { char: "炎居", pinyin: "yán jū", meaning: "人名，炎帝之后" },
        ],
      },
      {
        id: "dahuangxi-11",
        original:
          "大荒之中，有山名叫日月山，天枢也。吴姖天门，日月所入。",
        translation:
          "大荒之中，有一座山叫日月山，是天地的枢纽。有吴姖天门，是日月落下的地方。",
        difficultChars: [
          { char: "天枢", pinyin: "tiān shū", meaning: "天地的枢纽" },
          { char: "吴姖", pinyin: "wú jù", meaning: "天门名" },
          { char: "所入", pinyin: "suǒ rù", meaning: "落下之处" },
        ],
      },
      {
        id: "dahuangxi-12",
        original:
          "有灵山，巫咸、巫即、巫朌、巫彭、巫姑、巫真、巫礼、巫抵、巫谢、巫罗十巫，从此升降，百药爰在。",
        translation:
          "有一座灵山，巫咸、巫即、巫朌、巫彭、巫姑、巫真、巫礼、巫抵、巫谢、巫罗等十位巫师，从此山上下往来，各种草药都在这里。",
        difficultChars: [
          { char: "灵山", pinyin: "líng shān", meaning: "山名，巫师聚集之地" },
          { char: "朌", pinyin: "bān", meaning: "巫师名" },
          { char: "升降", pinyin: "shēng jiàng", meaning: "上下往来，沟通天地" },
          { char: "爰", pinyin: "yuán", meaning: "于此、在这里" },
        ],
      },
      {
        id: "dahuangxi-13",
        original: "西方蓐收，左耳有蛇，乘两龙。",
        translation:
          "西方的神叫蓐收，左耳上挂着蛇，乘着两条龙。",
        difficultChars: [
          { char: "蓐收", pinyin: "rù shōu", meaning: "西方之神，金神" },
          { char: "乘", pinyin: "chéng", meaning: "驾驭、乘坐" },
        ],
      },
      {
        id: "dahuangxi-14",
        original: "有山名叫丰沮玉门山，日月所入。",
        translation:
          "有一座山叫丰沮玉门山，是太阳和月亮落下的地方。",
        difficultChars: [
          { char: "丰沮", pinyin: "fēng jǔ", meaning: "山名" },
          { char: "玉门", pinyin: "yù mén", meaning: "山名，意如玉石之门" },
          { char: "所入", pinyin: "suǒ rù", meaning: "落下之处" },
        ],
      },
      {
        id: "dahuangxi-15",
        original: "有人衣青，以袂蔽面，名叫女丑之尸。",
        translation:
          "有个人穿着青色衣服，用衣袖遮住脸面，名叫女丑之尸。",
        difficultChars: [
          { char: "衣青", pinyin: "yì qīng", meaning: "穿青色衣服" },
          { char: "袂", pinyin: "mèi", meaning: "衣袖" },
          { char: "尸", pinyin: "shī", meaning: "神像、神主" },
        ],
      },
    ],
  },
];
