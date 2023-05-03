# AI NPC world (WIP)

## 项目简介

使用 LangChain 使得 AI NPC 可以在游戏中，像真人一样生活，工作，交流，甚至是贸易。

## 故事背景
在一个宁静的海域，三个岛屿共同构成了一个迷人的世界。这是一个充满活力的地区，各个岛屿的居民们正忙碌地生活、工作和交流。作为玩家，您将扮演一名观察者和故事讲述人，见证这片土地上的日常生活和独特文化。

主岛是地区的核心，资源丰富，产业多样。东侧的生态岛以可持续发展为核心，注重环保科研；而矿岛则依赖金矿开采为主产业。三岛之间通过航线紧密联系，互通物资与文化。

在这个模拟经营游戏中，NPC们会像真人一样在岛屿上生活、工作、交流和贸易。每个岛屿的居民都有自己的职责和目标，为共同的家园做出贡献。在生态岛上，居民们积极投入环保科研，发展可再生能源。矿岛的居民则努力在资源开发与生态保护之间找到平衡。

玩家可以通过观察和交流，了解岛屿居民们的需求、目标和梦想。在游戏中，您可以帮助讲述这个世界的故事，把握居民们的生活节奏，分享他们的喜怒哀乐。

在这个充满挑战与机遇的世界里，您将深入了解各个岛屿的独特风情，欣赏美丽的风景，品味淳朴的民风。作为故事讲述人，您的任务是通过观察和互动，将这个世界变得更加生动、有趣，让这片土地上的人们过上更加美好的生活。

这是一个以 AI 技术为核心的游戏项目，旨在打造一个真实世界，让玩家沉浸其中，体验充满生活气息的岛屿冒险。在这里，您可以随时跳入故事，成为这个世界中不可或缺的一部分。

### 实现思路

1. 在网上找一张 tilemap，已经包含了屋子的，以它作为地图构建世界。
2. 将地图上的建筑，以及 npc 的物品栏、性格等，记录到 json 对象中，作为世界的初始状态。
3. 实现后端接口，主要是对 langChain 进行接口化封装，参考 [Generative Agents in LangChain](https://python.langchain.com/en/latest/use_cases/agent_simulations/characters.html)
4. 实现前端界面，主要作用是世界运行与可视化，使用 pixi.js，npc 周围会有一个观察范围，范围内的事件会触发 npc 的反应。

### 世界的运行

1. 前端根据初始状态，渲染出 npc
2. 世界在前端模拟运行，如果 npc 靠近物体或其他 npc，则会触发事件，npc 可以决定后续动作。
3. 玩家可以通过点击 npc，采访 npc，npc 会根据玩家的提问，回答问题

### 后端需要实现的接口

1. 初始化 NPC 信息
2. 根据 npc 最新观察，生成 npc 下一步反应
3. 提供采访 AI 的接口
