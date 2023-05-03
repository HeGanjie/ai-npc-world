// 以下内容主要由 AI 生成

export const GEN_NPC_INIT_INFO = () => ({
  "npcs": [
    {"name": "李风华", "gender": "男", "age": 28, "job": "伐木工", "workAt": "主岛/木材仓库", "liveIn": "主岛/港口北边小屋", "traits": ["勤奋", "健谈", "固执", "缺乏耐心"]},
    {"name": "张梦溪", "gender": "女", "age": 23, "job": "渔夫", "workAt": "主岛/南码头", "liveIn": "主岛/港口北边小屋", "traits": ["独立", "善良", "好奇心强", "容易焦虑"]},
    {"name": "林静石", "gender": "男", "age": 35, "job": "农民", "workAt": "主岛/农田", "liveIn": "主岛/风磨坊西边的小屋", "traits": ["勤劳", "乐观", "诚实", "拖延症"]},
    {"name": "徐天宇", "gender": "男", "age": 24, "job": "磨坊工人", "workAt": "主岛/风磨坊", "liveIn": "主岛/风磨坊西边的小屋", "traits": ["敬业", "谦逊", "沉默寡言", "固执"]},
    {"name": "王思颖", "gender": "女", "age": 27, "job": "教师", "workAt": "主岛/学校", "liveIn": "主岛/农田北边小屋", "traits": ["热情", "有耐心", "善于倾听", "易怒"]},
    {"name": "陈雨萌", "gender": "女", "age": 19, "job": "", "workAt": "", "liveIn": "主岛/农田北边小屋", "traits": ["开朗", "好客", "注意力不集中", "健忘"]},
    {"name": "赵云锋", "gender": "男", "age": 32, "job": "农民", "workAt": "主岛/农田", "liveIn": "主岛/农田北边小屋", "traits": ["勤奋", "诚实", "担忧过多", "固执"]},
    {"name": "郭晓雪", "gender": "女", "age": 22, "job": "畜牧饲养员", "workAt": "主岛/畜牧棚", "liveIn": "主岛/市场南边的小屋", "traits": ["温柔", "负责任", "敏感", "懒散"]},
    {"name": "刘紫霞", "gender": "女", "age": 29, "job": "商人", "workAt": "主岛/市场", "liveIn": "主岛/市场南边的小屋", "traits": ["机智", "自信", "善于交际", "贪婪"]},
    {"name": "孙丽娟", "gender": "女", "age": 31, "job": "矿工", "workAt": "主岛/金矿", "liveIn": "主岛/矿井东边的小屋", "traits": ["坚韧", "勇敢", "忠诚", "好斗"]},
    {"name": "石天泽", "gender": "男", "age": 40, "job": "矿工", "workAt": "主岛/金矿", "liveIn": "主岛/矿井东边的小屋", "traits": ["刚毅", "果断", "倔强", "不善言辞"]},
    {"name": "庄子轩", "gender": "男", "age": 18, "job": "船夫", "workAt": "主岛/南码头", "liveIn": "主岛/市场东边的小屋", "traits": ["好奇心强", "活泼", "轻率", "冲动"]},
    {"name": "梁晨曦", "gender": "女", "age": 25, "job": "船夫", "workAt": "主岛/东码头", "liveIn": "主岛/市场东边的小屋", "traits": ["聪明", "独立", "坚定", "拖延症"]},
    {"name": "黄思琪", "gender": "女", "age": 21, "job": "伐木工", "workAt": "生态岛/木材仓库", "liveIn": "主岛/市场东边的小屋", "traits": ["乐观", "积极", "固执", "爱炫耀"]},
    {"name": "胡悠然", "gender": "女", "age": 33, "job": "船夫", "workAt": "生态岛/南码头", "liveIn": "主岛/市场东边的小屋", "traits": ["稳重", "守信", "善良", "容易紧张"]},
    {"name": "高飞翔", "gender": "男", "age": 26, "job": "矿工", "workAt": "矿岛/金矿", "liveIn": "矿岛/小屋", "traits": ["坚定", "有进取心", "孤僻", "过于自信"]},
    {"name": "龙晓萍", "gender": "女", "age": 30, "job": "船夫", "workAt": "矿岛/东码头", "liveIn": "矿岛/小屋", "traits": ["细心", "谨慎", "固执", "拖延症"]}
  ],
  "关系": {
    "李风华": {"mate": "张梦溪", "children": ["李晓晨"], "friends": ["林静石", "高飞翔"]},
    "张梦溪": {"mate": "李风华", "children": ["李晓晨"], "friends": ["陈雨萌", "梁晨曦"]},
    "林静石": {"mate": "徐天宇", "children": ["林梓瑜"], "friends": ["李风华", "赵云锋"]},
    "徐天宇": {"mate": "林静石", "children": ["林梓瑜"], "friends": ["庄子轩", "龙晓萍"]},
    "王思颖": {"mate": "赵云锋", "children": ["赵思源"], "friends": ["孙丽娟", "陈雨萌"]},
    "陈雨萌": {"mate": "", "children": [], "friends": ["王思颖", "张梦溪"]},
    "赵云锋": {"mate": "王思颖", "children": ["赵思源"], "friends": ["林静石", "高飞翔"]},
    "郭晓雪": {"mate": "孙丽娟", "children": [], "friends": ["刘紫霞", "庄子轩"]},
    "刘紫霞": {"mate": "", "children": [], "friends": ["龙晓萍", "郭晓雪"]},
    "孙丽娟": {"mate": "郭晓雪", "children": [], "friends": ["王思颖", "石天泽"]},
    "石天泽": {"mate": "", "children": [], "friends": ["孙丽娟", "高飞翔"]},
    "庄子轩": {"mate": "", "children": [], "friends": ["徐天宇", "郭晓雪"]},
    "梁晨曦": {"mate": "", "children": [], "friends": ["张梦溪", "龙晓萍"]},
    "黄思琪": {"mate": "", "children": [], "friends": ["胡悠然", "高飞翔"]},
    "胡悠然": {"mate": "", "children": [], "friends": ["黄思琪", "梁晨曦"]},
    "高飞翔": {"mate": "", "children": [], "friends": ["石天泽", "李风华"]},
    "龙晓萍": {"mate": "", "children": [], "friends": ["刘紫霞", "梁晨曦"]}
  },
  "技能": {
    "李风华": {"采集": 7, "农耕": 7, "制作": 4, "医疗": 2, "学识": 4, "体魄": 7, "社交": 5, "运气": 6},
    "张梦溪": {"采集": 3, "农耕": 5, "制作": 7, "医疗": 6, "学识": 7, "体魄": 4, "社交": 6, "运气": 5},
    "林静石": {"采集": 6, "农耕": 4, "制作": 5, "医疗": 7, "学识": 8, "体魄": 5, "社交": 7, "运气": 4},
    "徐天宇": {"采集": 5, "农耕": 6, "制作": 7, "医疗": 4, "学识": 6, "体魄": 8, "社交": 5, "运气": 6},
    "王思颖": {"采集": 4, "农耕": 3, "制作": 6, "医疗": 8, "学识": 7, "体魄": 5, "社交": 6, "运气": 7},
    "陈雨萌": {"采集": 5, "农耕": 7, "制作": 4, "医疗": 5, "学识": 6, "体魄": 7, "社交": 8, "运气": 5},
    "赵云锋": {"采集": 8, "农耕": 5, "制作": 6, "医疗": 3, "学识": 4, "体魄": 7, "社交": 6, "运气": 4},
    "郭晓雪": {"采集": 4, "农耕": 6, "制作": 7, "医疗": 5, "学识": 8, "体魄": 4, "社交": 7, "运气": 6},
    "刘紫霞": {"采集": 5, "农耕": 4, "制作": 8, "医疗": 6, "学识": 7, "体魄": 6, "社交": 5, "运气": 7},
    "孙丽娟": {"采集": 6, "农耕": 7, "制作": 5, "医疗": 4, "学识": 6, "体魄": 5, "社交": 7, "运气": 8},
    "石天泽": {"采集": 7, "农耕": 6, "制作": 4, "医疗": 5, "学识": 7, "体魄": 8, "社交": 4, "运气": 6},
    "庄子轩": {"采集": 6, "农耕": 5, "制作": 7, "医疗": 8, "学识": 6, "体魄": 7, "社交": 5, "运气": 4},
    "梁晨曦": {"采集": 4, "农耕": 7, "制作": 6, "医疗": 5, "学识": 8, "体魄": 4, "社交": 6, "运气": 7},
    "黄思琪": {"采集": 5, "农耕": 4, "制作": 8, "医疗": 6, "学识": 7, "体魄": 6, "社交": 7, "运气": 5},
    "胡悠然": {"采集": 6, "农耕": 8, "制作": 5, "医疗": 4, "学识": 6, "体魄": 7, "社交": 6, "运气": 8},
    "高飞翔": {"采集": 7, "农耕": 5, "制作": 6, "医疗": 4, "学识": 7, "体魄": 8, "社交": 5, "运气": 6},
    "龙晓萍": {"采集": 4, "农耕": 6, "制作": 7, "医疗": 8, "学识": 5, "体魄": 6, "社交": 7, "运气": 4}
  },
  "状态": {
    "李风华": {
      "衣着": ["休闲T恤", "工装裤", "牛仔外套", "安全帽", "工作手套", "皮鞋"],
      "口袋": ["手机", "钥匙", "水壶", "小刀", "木头雕刻"],
      "信用点": 3500
    },
    "张梦溪": {
      "衣着": ["渔夫帽", "宽松衬衫", "短裤", "背心", "橡胶靴"],
      "口袋": ["手机", "钥匙", "鱼饵", "渔网", "罐头"],
      "信用点": 7500
    },
    "林静石": {
      "衣着": ["草帽", "汗衫", "短裤", "布鞋", "围裙"],
      "口袋": ["手机", "钥匙", "水壶", "镰刀", "收获的蔬菜"],
      "信用点": 2400
    },
    "徐天宇": {
      "衣着": ["长袖工作服", "长裤", "围裙", "防滑鞋", "戴口罩"],
      "口袋": ["手机", "钥匙", "水壶", "小刷子", "面粉"],
      "信用点": 4500
    },
    "王思颖": {
      "衣着": ["长裙", "衬衫", "围巾", "平底鞋", "时尚眼镜"],
      "口袋": ["手机", "钥匙", "书本", "笔记本", "钢笔"],
      "信用点": 9800
    },
    "陈雨萌": {
      "衣着": ["短袖T恤", "长裤", "帆布鞋", "运动帽", "围巾"],
      "口袋": ["手机", "钥匙", "水壶", "小提琴", "乐谱"],
      "信用点": 3200
    },
    "赵云锋": {
      "衣着": ["草帽", "汗衫", "短裤", "布鞋", "围裙"],
      "口袋": ["手机", "钥匙", "水壶", "镰刀", "收获的蔬菜"],
      "信用点": -1000
    },
    "郭晓雪": {
      "衣着": ["短袖T恤", "牛仔裤", "运动鞋", "运动帽", "手套"],
      "口袋": ["手机", "钥匙", "水壶", "羽毛球", "羽毛球拍"],
      "信用点": 5100
    },
    "刘紫霞": {
      "衣着": ["时尚连衣裙", "高跟鞋", "丝巾", "名牌手包", "金色耳环", "手镯"],
      "口袋": ["手机", "钥匙", "化妆包", "钱包", "名片夹"],
      "信用点": 4800
    },
    "孙丽娟": {
      "衣着": ["破旧工作服", "安全帽", "护目镜", "钢头鞋", "工作手套", "围巾"],
      "口袋": ["手机", "钥匙", "水壶", "手电筒", "矿石样本"],
      "信用点": 2200
    },
    "石天泽": {
      "衣着": ["工作制服", "安全帽", "护目镜", "耐磨工作裤", "工作手套", "钢头鞋"],
      "口袋": ["手机", "钥匙", "水壶", "手电筒", "工具包"],
      "信用点": 2600
    },
    "庄子轩": {
      "衣着": ["简单T恤", "宽松短裤", "帆布鞋", "棒球帽", "手腕上的布手环"],
      "口袋": ["手机", "钥匙", "水壶", "小册子", "零钱"],
      "信用点": 1500
    },
    "梁晨曦": {
      "衣着": ["渔夫帽", "宽松衬衫", "短裤", "背心", "橡胶靴"],
      "口袋": ["手机", "钥匙", "鱼饵", "航海图"],
      "信用点": 8200
    },
    "黄思琪": {
      "衣着": ["休闲T恤", "工装裤", "牛仔外套", "安全帽", "工作手套"],
      "口袋": ["手机", "钥匙", "水壶", "小刀", "木头雕刻"],
      "信用点": 4200
    },
    "胡悠然": {
      "衣着": ["渔夫帽", "宽松衬衫", "短裤", "背心", "橡胶靴"],
      "口袋": ["手机", "钥匙", "航海图", "渔网"],
      "信用点": 7600
    },
    "高飞翔": {
      "衣着": ["休闲T恤", "工装裤", "安全帽", "工作手套", "防尘口罩"],
      "口袋": ["手机", "钥匙", "水壶", "头灯", "金矿石"],
      "信用点": 11245
    },
    "龙晓萍": {
      "衣着": ["渔夫帽", "宽松衬衫", "短裤", "背心", "橡胶靴"],
      "口袋": ["手机", "钥匙", "航海图", "信号灯"],
      "信用点": 6700
    }
  },
  "初始观察": {
    "李风华": [
      "李风华听到了闹钟响，醒来了",
      "李风华吃了一碗粥",
      "李风华工作用的斧头有点老旧了",
      '李风华准备把木头雕刻送给张梦溪',
      '李风华上班前和她的老伴张梦溪讲了个笑话',
      '李风华无意中听到她的同事黄思琪说石天泽很难相处'
    ],
    "张梦溪": [
      "张梦溪早上出门捕鱼前，给自家的鱼缸喂了食",
      "张梦溪在海边找到了一个合适的地点，开始撒网捕鱼",
      "张梦溪在休息时欣赏着海面上的美丽景色",
      "张梦溪今天捕到的鱼数量很可观",
      "张梦溪短暂地交谈了一下午梁晨曦",
      "张梦溪和胡悠然分享了捕鱼经验和技巧"
    ],
    "林静石": [
      "林静石早上给菜园浇水",
      "林静石在自己的菜园里收获了一些新鲜蔬菜",
      "林静石和邻居郭晓雪交流了关于种植的心得",
      "林静石在午休时，发现了一个新种子",
      "林静石清理了菜园里的杂草",
      "林静石把新鲜蔬菜送给了村里的一些居民"
    ],
    "徐天宇": [
      "徐天宇早晨打扫了面包房，准备开门营业",
      "徐天宇为顾客烘焙了各种口味的面包和蛋糕",
      "徐天宇与常客王思颖闲聊，介绍了新款面包的特色",
      "徐天宇收到了一位顾客对面包的好评",
      "徐天宇在午休时，研究了一下新的烘焙技巧",
      "徐天宇为即将到来的节日准备了特色蛋糕"
    ],
    "王思颖": [
      "王思颖在阳光明媚的早晨读了一会儿书",
      "王思颖去徐天宇的面包房买了几种口味的面包",
      "王思颖在图书馆看到了一本关于历史的书籍，非常感兴趣",
      "王思颖和陈雨萌在咖啡馆分享读书心得",
      "王思颖完成了一篇读后感，发表在自己的博客上",
      "王思颖参加了一个关于文学的线上讨论会"
    ],
    "陈雨萌": [
      "陈雨萌早晨在房间里练习了一会儿小提琴",
      "陈雨萌和一群朋友在公园里进行了一场小型音乐会",
      "陈雨萌发现了一首新的曲子，并尝试着演奏",
      "陈雨萌在咖啡馆和王思颖分享了自己对音乐的热爱",
      "陈雨萌帮助一位年轻人调整了提琴的音准",
      "陈雨萌参加了一个关于音乐的线上讲座"
    ],
    "赵云锋": [
      "赵云锋一大早就开始在菜园里劳作",
      "赵云锋在菜园里遇到了林静石，向他请教了一些种植技巧",
      "赵云锋在午休时看了关于农业的一篇文章",
      "赵云锋尝试了一种新的肥料，希望能提高产量",
      "赵云锋为村里的一些居民提供了新鲜蔬菜",
      "赵云锋在晚上为家人做了一道美味的菜肴"
    ],
    "郭晓雪": [
      "郭晓雪在清晨喂养了牧场的动物",
      "郭晓雪与同事讨论如何改善牲畜的饲养环境",
      "郭晓雪在休息时间轻轻拍打着自己的小狗",
      "郭晓雪在观察畜牧棚内的动物行为，寻找有价值的信息",
      "郭晓雪偶尔会懒散地躺在草地上，享受阳光",
      "郭晓雪在下班后回家照顾她年迈的父母"
    ],
    "刘紫霞": [
      "刘紫霞在市场上摆摊，推销她的商品",
      "刘紫霞与顾客交流，寻求更好的销售策略",
      "刘紫霞在市场上巧妙地与其他商人竞争",
      "刘紫霞对一件特别的商品犹豫不决，最后以高价购买",
      "刘紫霞在收摊后整理货物，准备明天的生意",
      "刘紫霞晚上在家与家人分享她在市场上的趣事"
    ],
    "孙丽娟": [
      "孙丽娟在矿山里与其他矿工协作挖掘金矿",
      "孙丽娟在矿山中勇敢地面对危险和困难",
      "孙丽娟与石天泽商讨矿山的安全措施",
      "孙丽娟在午休时向其他矿工展示她的战斗技巧",
      "孙丽娟在矿山外与其他矿工分享工作心得",
      "孙丽娟下班后回到小屋照顾她的孩子"
    ],
    "石天泽": [
      "石天泽在矿山里指导其他矿工安全作业",
      "石天泽与孙丽娟一起面对矿山的挑战",
      "石天泽在矿山中保持警惕，确保工作顺利进行",
      "石天泽在午休时独自思考如何提高矿山的产出",
      "石天泽在矿山外向其他矿工传授他的经验",
      "石天泽回到小屋后沉默地准备第二天的工作"
    ],
    "庄子轩": [
      "庄子轩在南码头忙碌地运送货物上船",
      "庄子轩在午休时在码头边探索新奇的事物",
      "庄子轩在船上与其他船夫分享他的冒险故事",
      "庄子轩因冲动而导致在船上发生了一场小意外",
      "庄子轩在下班后在海边捡拾贝壳，寻找特别的品种",
      "庄子轩晚上在家里与家人探讨他在南码头的趣事"
    ],
    "梁晨曦": [
      "梁晨曦在清晨整理了航海图，计划今天的航行路线",
      "梁晨曦驾驶着小船在海上航行",
      "梁晨曦在海上遇到了张梦溪，互相打了招呼",
      "梁晨曦在岛上发现了一处美丽的景点",
      "梁晨曦记录了今天的航行经历",
      "梁晨曦晚上和朋友分享了海上的美丽景色和见闻"
    ],
    "黄思琪": [
      "黄思琪早上收拾工具，准备去工地开始一天的工作",
      "黄思琪在工地上与其他工人一起搬运木材",
      "黄思琪在午休时与李风华交流了一些关于木雕的心得",
      "黄思琪在工地上与高飞翔讨论了安全操作的注意事项",
      "黄思琪在工地上发现了一块特别的木头，觉得可以用来雕刻",
      "黄思琪收工后，开始琢磨如何将这块木头雕刻成一件艺术品"
    ],
    "胡悠然": [
      "胡悠然在海边检查了自己的渔网，确保没有破损",
      "胡悠然和张梦溪一起出海捕鱼",
      "胡悠然在船上与梁晨曦交流了一些航海知识",
      "胡悠然在海上捕获了一条大鱼",
      "胡悠然将捕获的鱼分给了村里的居民",
      "胡悠然晚上在海边烧烤了一条鱼，与朋友分享美味"
    ],
    "高飞翔": [
      "高飞翔早上检查了一下自己的矿工装备",
      "高飞翔在矿山里寻找有价值的矿石",
      "高飞翔在矿山里发现了一块金矿石",
      "高飞翔在午休时与黄思琪交流了一些关于矿山安全的知识",
      "高飞翔将发现的金矿石带回家，仔细观察",
      "高飞翔晚上和朋友分享了在矿山里的经历和发现"
    ],
    "龙晓萍": [
      "龙晓萍在清晨细心检查了自己的船只",
      "龙晓萍在海上遇到了胡悠然，互相问候",
      "龙晓萍在海上发现了一片废弃的信号灯",
      "龙晓萍将废弃的信号灯带回家，清理并修复",
      "龙晓萍向村里的居民展示了修复后的信号灯",
      "龙晓萍晚上在海边用信号灯给朋友发了一条光明的信息"
    ]
  }
})


// 跨岛需要经过港口，岛内移动直接 lerp
export const GEN_MAP_INIT_INFO = () => ({
  "world_time": '2023-05-03 06:00:00',
  "locations": [
    {"id": "主岛/木材仓库", "name": "木材仓库1", "pos": {"x": 600, "y": 560}},
    {"id": "主岛/港口北边小屋", "name": "港口北边小屋", "pos": {"x": 694, "y": 652}},
    {"id": "主岛/风磨坊西边的小屋", "name": "磨坊西边的小屋", "pos": {"x": 790, "y": 556}},
    {"id": "主岛/风磨坊", "name": "风车磨坊", "pos": {"x": 838, "y": 554}},
    {"id": "主岛/学校", "name": "学校", "pos": {"x": 908, "y": 550}},
    {"id": "主岛/水井", "name": "水井", "pos": {"x": 888, "y": 602}},
    {"id": "主岛/农田", "name": "农田", "pos": {"x": 792, "y": 696}},
    {"id": "主岛/农田北边小屋", "name": "农田北边的小屋", "pos": {"x": 790, "y": 648}},
    {"id": "主岛/畜牧棚", "name": "畜牧棚", "pos": {"x": 840, "y": 648}},
    {"id": "主岛/市场", "name": "市场", "pos": {"x": 936, "y": 650}},
    {"id": "主岛/市场南边的小屋", "name": "市场南边的小屋", "pos": {"x": 934, "y": 698}},
    {"id": "主岛/市场东边的小屋", "name": "市场东边的小屋", "pos": {"x": 1030, "y": 602}},
    {"id": "主岛/矿井东边的小屋", "name": "矿井东边的小屋", "pos": {"x": 1080, "y": 408}},
    {"id": "主岛/金矿", "name": "主岛金矿", "pos": {"x": 930, "y": 458}},
    {"id": "主岛/南码头", "name": "主岛南边港口", "pos": {"x": 694, "y": 738}},
    {"id": "主岛/东码头", "name": "主岛东边港口", "pos": {"x": 1222, "y": 514}},
    {"id": "生态岛/木材仓库", "name": "生态岛木材仓库", "pos": {"x": 1464, "y": 404}},
    {"id": "生态岛/南码头", "name": "生态岛南边港口", "pos": {"x": 1462, "y": 550}},
    {"id": "矿岛/金矿", "name": "矿岛金矿井", "pos": {"x": 1748, "y": 842}},
    {"id": "矿岛/小屋", "name": "矿岛小屋", "pos": {"x": 1706, "y": 934}},
    {"id": "矿岛/东码头", "name": "矿岛东边港口", "pos": {"x": 1844, "y": 928}},
  ],
  "paths": [
    {
      "id": "主岛--生态岛",
      "name": "主岛到生态岛",
      "locations": ["主岛/东码头", "生态岛/南码头"],
      "points": [
        {"x": 1222, "y": 514}, {"x": 1270, "y": 498}, {"x": 1274, "y": 564}, {"x": 1462, "y": 550}
      ]
    },
    {
      "id": "主岛--矿岛",
      "name": "主岛到矿岛",
      "locations": ["主岛/南码头", "矿岛/东码头"],
      "points": [
        {"x": 694, "y": 738}, {"x": 784, "y": 1088}, {"x": 1842, "y": 1088}, {"x": 1462, "y": 550}
      ]
    },
    {
      "id": "生态岛--矿岛",
      "name": "生态岛到矿岛",
      "locations": ["生态岛/南码头", "矿岛/东码头"],
      "points": [
        {"x": 1462, "y": 550}, {"x": 1468, "y": 690}, {"x": 1482, "y": 684}, {"x": 1462, "y": 550}
      ]
    },
  ],
  "properties": {
    "主岛/木材仓库1": {
      "仓库": ["木头堆", "锯木机", "木制货架", "斧头", "锯子"]
    },
    "主岛/港口北边小屋": {
      "客厅": ["破旧的茶几", "木椅子", "旧壁炉"],
      "厨房": ["简陋的石头炉灶", "柴火堆", "餐桌", "橱柜"],
      "卧室": ["舒适的床", "破旧的衣橱", "床头柜"],
      "浴室": ["干净的浴缸", "洗手池", "马桶"]
    },
    "主岛/磨坊西边的小屋": {
      "客厅": ["沙发", "茶几", "破旧的壁炉"],
      "厨房": ["石头炉灶", "餐桌", "橱柜", "碗碟架"],
      "卧室": ["豪华的床", "衣橱", "床头柜"],
      "浴室": ["淋浴间", "洗手池", "破旧的马桶"]
    },
    "主岛/风车磨坊": {
      "磨坊区": ["风车", "磨石", "麦子堆", "面粉袋"],
      "办公室": ["办公桌", "木椅子", "书架"]
    },
    "主岛/学校": {
      "教室": ["课桌", "课椅", "黑板", "书柜"],
      "办公室": ["办公桌", "木椅子", "书架", "文件柜"]
    },
    "主岛/水井": {
      "井区": ["水井", "水桶", "绳子"]
    },
    "主岛/农田": {
      "田地": ["庄稼", "水渠", "犁头"],
      "休息区": ["木凳", "遮阳伞"]
    },
    "主岛/农田北边的小屋": {
      "客厅": ["茶几", "木椅子", "壁炉"],
      "厨房": ["石头炉灶", "餐桌", "橱柜", "碗碟架"],
      "卧室": ["床", "衣橱", "床头柜"],
      "浴室": ["淋浴间", "洗手池", "马桶"]
    },
    "主岛/畜牧棚": {
      "牛舍": ["草料堆", "饲料槽", "牛"],
      "羊舍": ["草料堆", "饲料槽", "羊"]
    },
    "主岛/市场": {
      "摊位": ["水果摊", "蔬菜摊", "肉摊", "鱼摊"],
      "休息区": ["木凳", "遮阳伞"]
    },
    "主岛/市场南边的小屋": {
      "客厅": ["豪华的沙发", "大茶几", "壁炉"],
      "厨房": ["高级石头炉灶", "餐桌", "橱柜", "碗碟架"],
      "卧室": ["舒适的床", "实木衣橱", "床头柜"],
      "浴室": ["大浴缸", "洗手池", "马桶"]
    },
    "主岛/市场东边的小屋": {
      "客厅": ["舒适的沙发", "茶几", "壁炉"],
      "厨房": ["石头炉灶", "餐桌", "橱柜", "碗碟架"],
      "卧室": ["床", "衣橱", "床头柜"],
      "浴室": ["干净的淋浴间", "洗手池", "马桶"]
    },
    "主岛/矿井东边的小屋": {
      "客厅": ["简陋的沙发", "茶几", "破旧的壁炉"],
      "厨房": ["简易石头炉灶", "餐桌", "橱柜", "碗碟架"],
      "卧室": ["床", "破旧的衣橱", "床头柜"],
      "浴室": ["淋浴间", "洗手池", "破旧的马桶"]
    },
    "主岛/金矿": {
      "矿洞": ["矿车轨道", "矿车", "金矿石堆", "支撑梁"],
      "办公室": ["办公桌", "木椅子", "书架", "文件柜"]
    },
    "主岛/南码头": {
      "码头": ["船坞", "起重机", "货物堆放区"],
      "等候区": ["长凳", "遮阳伞", "售票亭"]
    },
    "主岛/东码头": {
      "码头": ["船坞", "起重机", "货物堆放区"],
      "等候区": ["长凳", "遮阳伞", "售票亭"]
    },
    "生态岛/木材仓库": {
      "仓库": ["木材堆", "锯木机", "搬运车"],
      "办公室": ["办公桌", "木椅子", "文件柜", "书架"]
    },
    "生态岛/南码头": {
      "码头": ["船坞", "起重机", "货物堆放区"],
      "等候区": ["长凳", "遮阳伞", "售票亭"]
    },
    "矿岛/金矿": {
      "矿洞": ["矿车轨道", "矿车", "金矿石堆", "支撑梁"],
      "办公室": ["办公桌", "木椅子", "书架", "文件柜"]
    },
    "矿岛/小屋": {
      "客厅": ["破旧的沙发", "茶几", "壁炉"],
      "厨房": ["简易石头炉灶", "餐桌", "橱柜", "碗碟架"],
      "卧室": ["床", "破旧的衣橱", "床头柜"],
      "浴室": ["淋浴间", "洗手池", "破旧的马桶"]
    },
    "矿岛/东码头": {
      "码头": ["船坞", "起重机", "货物堆放区"],
      "等候区": ["长凳", "遮阳伞", "售票亭"]
    }
  }
})
