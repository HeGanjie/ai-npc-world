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
3. NLU 接口，主要用于根据反应描述，得出下一步的动作
4. 提供采访 AI 的接口

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

目前的效果：
1. 目前只试验了单个 npc。
2. 时间初始化到早上 6 点，npc 会醒来，吃早饭，然后去上班。
3. 但是碰到个问题，自然语言理解模块不会总是正常工作，我还在研究怎么解决。可以看下面例子：

接口调用效果：
```bash
# 初始化 NPC 信息接口
curl 'http://localhost:5173/lang-chain/init_agents' \
  -H 'Content-Type: application/json' \
  --data-raw '{"李风华":{"name":"李风华","age":28,"location":"主岛的港口北边小屋","traits":"勤奋, 健谈, 固执, 缺乏耐心",\
  "status":"李风华是男性，日常用语是汉语，现在居住在主岛的港口北边小屋，职业是伐木工，在主岛的木材仓库工作。张梦溪是李风华的伴侣，\
  李晓晨是李风华的孩子，林静石、高飞翔是李风华的朋友。李风华的能力，可以打分为 采集: 7, 农耕: 7, 制作: 4, 医疗: 2, 学识: 4, 体魄: 7,\
   社交: 5, 运气: 6。","init_obs":["李风华身上正在穿着这些：休闲T恤, 工装裤, 牛仔外套, 安全帽, 工作手套, 皮鞋。",\
   "李风华身上带着这些：手机, 钥匙, 水壶, 小刀, 木头雕刻。","李风华的存款有3500个信用点。","李风华工作用的斧头有点老旧了。",\
   "李风华准备把木头雕刻送给张梦溪。","李风华上班前和她的老伴张梦溪讲了个笑话。","李风华无意中听到她的同事黄思琪说石天泽很难相处。",\
   "李风华听到了闹钟响，醒来了。"]}}'  
# response:
{ "message": "JSON payload received and processed" }


# 生成下一步反应接口
curl 'http://localhost:5173/lang-chain/agent_gen_reaction' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"李风华","obs":"过了一段时间，现在时间是：2023-05-03 06:00，李风华现在位于：港口北边小屋。\
  李风华感到饥肠辘辘、精神饱满并且较为欢快。\n李风华能看到主岛的港口北边小屋。\
  现在，李风华刚关掉了闹钟，清醒后，你感觉应该做些什么。"}'
# response:
{ "reaction": "李风华 stretches and decides to start his day, perhaps by preparing breakfast." }

# 自然语言理解接口，主要用于将 AI 的反应进行分类，得出下一步的动作
curl 'http://localhost:5173/lang-chain/understand_npc_action' \
  -H 'Content-Type: application/json' \
  --data-raw '{"npc":"李风华","reaction":"李风华 stretches and decides to start his day, \
  perhaps by preparing breakfast.","question":"李风华打算吃多少食物？",\
   "options":"不进食/零食/小吃一顿/大吃一顿/早餐/午餐/晚餐/没有提及"}'
# response:
{ "answer": "早餐" }

#有问题的 case
curl 'http://localhost:5173/lang-chain/understand_npc_action' \
  -H 'Content-Type: application/json' \
  --data-raw '{"npc":"李风华","reaction":"李风华 continues on his way to the wood warehouse.",
  "question":"李风华打算去哪里？","options":"自己家里/自己工作的地方/别人家里/别人工作的地方/没有提及"}'
# response:
{ "answer": "别人工作的地方" }
  
  
# 采访 AI 接口
curl 'http://localhost:5173/lang-chain/interview_agent' \
  -H 'Content-Type: application/json' \
  --data-raw '{"name":"李风华","msg":"你小孩叫什么名字？请用中文回答。"}'
  
# response:
{ "response": "李风华 said \"My child's name is Li Xiaochen.\"" }

```

#### 运行效果截图

![效果1](https://github.com/HeGanjie/ai-npc-world/raw/main/assets/result1.png)

![效果2-npc工作时](https://github.com/HeGanjie/ai-npc-world/raw/main/assets/result2-working.png)

![效果3-采访npc](https://github.com/HeGanjie/ai-npc-world/raw/main/assets/result3-interview.png)
