# AI NPC world demo (WIP)

### 项目介绍

尝试使用 LangChain 使得 AI NPC 可以在游戏中，像真人一样生活，工作，交流，甚至是贸易。


### 实现思路

1. 在网上找一张 [tilemap](https://pixelhole.itch.io/pixelholes-overworld-tileset)，已经包含了屋子的，以它作为地图构建世界。
2. 将地图上的建筑，以及 npc 的物品栏、性格等，记录到 json 对象中，作为世界的初始状态。
3. 实现后端接口，主要是对 langChain 进行接口化封装，参考 [Generative Agents in LangChain](https://python.langchain.com/en/latest/use_cases/agent_simulations/characters.html)
4. 实现前端界面，主要作用是世界运行与可视化，使用 react 开发，npc 周围会有一个观察范围，范围内的事件会触发 npc 的反应。

### 世界的运行

1. 前端根据初始状态，渲染出 npc
2. 世界在前端模拟运行，如果 npc 靠近物体或其他 npc，则会触发事件，npc 可以决定后续动作。
3. 玩家可以通过点击 npc，采访 npc，npc 会根据玩家的提问，回答问题

### 后端需要实现的接口

1. 初始化 NPC 信息
2. 根据 npc 最新观察，生成 npc 下一步反应
3. 提供采访 AI 的接口

### 如何运行

1. 安装依赖

```bash
npm install
cd server && pip install -r requirements.txt
```

2. 运行前端

```bash
npm run dev
```

3. 运行后端

```bash
cd server && OPENAI_API_KEY=xxx python server.py
```

### 目前运行效果小结

项目使用了 LangChain 最近出的 [Generative Agents](https://python.langchain.com/en/latest/use_cases/agent_simulations/characters.html#dialogue-between-generative-agents) 来尝试实现，但总体做得比较粗糙，是试水性质的项目。并且接口调用所需要时间比较长，所以运行效果不是很好，但是可以看到 npc 会根据预设的人设，进行一些合理的行为。

目前遇到的问题：
1. 无法让 npc 说中文，即使加上 npc 的日常用语是中文的记忆，也还是返回了英文。
2. 采访 NPC 时 npc 会比较啰嗦，会说很多无关的话，导致不知道怎么进行下一步的行为。

接口调用效果：
```bash
# 初始化 NPC 信息接口
curl 'http://localhost:5173/lang-chain/init_agents' \
  -H 'Content-Type: application/json' \
  --data-raw '{"李风华":{"name":"李风华","age":28,"location":"主岛的港口北边小屋",\
  "traits":"勤奋, 健谈, 固执, 缺乏耐心","status":"李风华是男性，现在居住在主岛的港口北边小屋，\
  职业是伐木工，在主岛的木材仓库工作。张梦溪是李风华的伴侣，李晓晨是李风华的孩子，林静石、高飞翔是李风华的朋友。\
  李风华的能力，可以打分为 采集: 7, 农耕: 7, 制作: 4, 医疗: 2, 学识: 4, 体魄: 7, 社交: 5, 运气: 6。",\
  "init_obs":["李风华的日常用语是汉语","李风华身上正在穿着这些：休闲T恤, 工装裤, 牛仔外套, 安全帽, 工作手套, 皮鞋",\
  "李风华身上带着这些：手机, 钥匙, 水壶, 小刀, 木头雕刻","李风华的存款有3500个信用点","李风华听到了闹钟响，醒来了",\
  "李风华起床后吃了一碗粥","李风华工作用的斧头有点老旧了","李风华准备把木头雕刻送给张梦溪",\
  "李风华上班前和她的老伴张梦溪讲了个笑话","李风华无意中听到她的同事黄思琪说石天泽很难相处",\
  "李风华现在（2023-05-03 06:00）位于主岛的港口北边小屋"]}}'

# response:
{ "message": "JSON payload received and processed" }


# 生成下一步反应接口
curl 'http://localhost:5173/lang-chain/agent_gen_reaction' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"李风华","obs":"现在时间是：2023-05-03 06:00，你感到吃得很饱并且精神饱满，当前任务：暂无任务。\
   \n你现在位于：主岛的港口北边小屋\n你看到主岛的港口北边小屋"}'

# response:
{ "reaction": "李风华 continues with his daily routine and does not react to the observation." }


# 采访 AI 接口
curl 'http://localhost:5173/lang-chain/interview_agent' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"李风华","msg":"假如现在给你几个选择，A. 回家睡觉  B. 去吃xxx  C. 去到xxx  D. 去找xxx \
   E. 去玩耍放松  F. 去购买xx  G. 去做xxx \n你会选择（填好xxx）："}'

# response:
{
    "response": "李风华 said \"Hmm, I think I would choose option D and go find my friend Lin Jingshi.\
     We haven't caught up in a while and it would be nice to see how he's been doing. \
     Plus, I could bring along the wooden carving I made as a gift for him. Thanks for asking!\""
}
```
