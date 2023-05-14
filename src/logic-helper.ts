import {GEN_MAP_INIT_INFO, GEN_NPC_INIT_INFO, GEN_RUNTIME_STATE} from "./consts";
import * as _ from "lodash";
import * as dayjs from "dayjs";
import {AgentInfo, NpcInitInfo, NpcState, WorldRuntimeState} from "./types";

function describeRelation(name: string, relation: {mate: string; children: string[]; friends: string[]}) {
    const {mate, children, friends} = relation
    return [
        mate ? `${mate}是${name}的伴侣` : null,
        _.isEmpty(children) ? null : `${children}是${name}的孩子`,
        _.isEmpty(friends) ? null : `${friends.join('、')}是${name}的朋友`
    ].filter(_.identity)
}

function describeSkill(name: string, skill: Record<string, number>) {
    const skillDesc = _.keys(skill)
        .map((skillName) => `${skillName}: ${skill[skillName]}`)
        .join(", ")
    return `${name}的能力，可以打分为 ${skillDesc}`
}

const npcInitInfo = GEN_NPC_INIT_INFO()
const mapInitInfo = GEN_MAP_INIT_INFO()

const mapLocDict = _.keyBy(mapInitInfo.locations, (loc) => loc.id)

function describeBaseInfo(npc: {name: string; gender: string; age: number; job: string; workAt: string; liveIn: string; traits: string[]}) {
    const {name, gender, job, workAt, liveIn, traits} = npc
    return [
        `${name}是${gender}性，日常用语是汉语，现在居住在${liveIn}，职业是${job}，在${workAt}工作`,
        traits.join(", ")
    ]
}

function descInventory(name: string, inv: {clothing: string[]; inventory: string[], credits: number; mood: number}) {
    const {clothing, inventory, credits} = inv
    return [
        `${name}身上正在穿着这些：${clothing.join(", ")}。`,
        `${name}身上带着这些：${inventory.join(", ")}。`,
        `${name}的存款有${credits}个信用点。`
    ]
}

export function getInitWorldRuntimeState() {
    const s = GEN_RUNTIME_STATE()

    const npcBaseInfoDict = _.keyBy(npcInitInfo.npcs, (npc) => npc.name)
    const testNpcs = _.pick(s.npcs, ['李风华']);
    return {
        time: s.time,
        npcs: _.mapValues(testNpcs, (npc, name) => {
            const baseInfo = npcBaseInfoDict[name]
            const pos = baseInfo.liveIn;
            const relation = npcInitInfo.relations[name];
            const skill = npcInitInfo.skills[name];
            const [basicInfo, traits] = describeBaseInfo(baseInfo)
            return {
                age: baseInfo.age,
                location: pos, // xx地点/ 从 xx地点 到 xx地点 途中（40%）
                traits,
                status: `${basicInfo}。${describeRelation(name, relation).join('，')}。${describeSkill(name, skill)}。`,
                init_obs: [
                    ...descInventory(name, npc),
                    ..._.map((npcInitInfo.init_obs[name] || []), s => `${s}。`)
                ]
            }
        }),
        buildings: s.buildings
    }
}

export function posDescribeToCoord(posDesc: string) {
    const m = /从(.+?)到(.+)途中（(\d+%)）/.exec(posDesc)
    if (m) {
        const [, from, to, percent] = m
        const fromCoord = posDescribeToCoord(from)
        const toCoord = posDescribeToCoord(to)
        if (!fromCoord || !toCoord) {
            return null
        }
        const x: number = fromCoord.x + (toCoord.x - fromCoord.x) * parseInt(percent) / 100
        const y: number = fromCoord.y + (toCoord.y - fromCoord.y) * parseInt(percent) / 100
        return {x, y}
    }
    // posDesc 可能是坐标
    const m2 = /(\d+),(\d+)/.exec(posDesc)
    if (m2) {
        const [, x, y] = m2
        return {x: parseInt(x), y: parseInt(y)}
    }
    const loc = mapLocDict[posDesc]
    return loc ? loc.pos : null
}

export const initWorld = _.debounce(async (
    gameState: ReturnType<typeof getInitWorldRuntimeState>,
    cb: (s: WorldRuntimeState) => void
) => {
    // data: {npcName: {age: 0, traits: [], status: "N/A"}, ...}

    const presend = _.mapValues(gameState.npcs, (npc, name) => {
        return {
            name: name,
            age: npc.age,
            location: npc.location, // 前端展示用
            traits: npc.traits,
            status: npc.status,
            init_obs: npc.init_obs
        }
    });
    const res = await fetch('/lang-chain/init_agents', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(presend)
    }).then(res => res.json())
    console.log('init agents res:', res, presend)

    cb?.({
        time: gameState.time,
        npcs: presend,
        buildings: gameState.buildings
    })
}, 1000);



function hungerDescription(hungerLevel: number) {
    const descriptions = ["要饿死了", "饥肠辘辘", "微饿", "不饿不饱", "略感饱足", "吃得很饱"];
    const s = _.round(_.clamp((10 - hungerLevel) / 2, 0, 5))
    return descriptions[s] || '不饿不饱'
}

function describeEnergyLevel(sleepLevel: number) {
    const energyLevels = ["困死了", "昏昏欲睡", "稍有疲惫", "精神尚可", "精神振奋", "精神饱满"];
    const s = _.round(_.clamp((10 - sleepLevel) / 2, 0, 5));
    return energyLevels[s] || '精神尚可'
}

function describeMood(score: number) {
    const moods = ["情绪崩溃", "心如死灰", "忧郁困扰", "情绪平淡", "较为欢快", "心情愉快"];
    const s = _.round(_.clamp(score / 2, 0, 5))
    return moods[s] || "情绪平淡";
}

function describeCurrPosByNearby(currPos: {x: number; y: number}) {
    // 输出最近的地点到当前位置的方位和距离
    const locSortedByDist = _.orderBy(mapLocDict, loc => {
        return Math.abs(loc.pos.x - currPos.x) + Math.abs(loc.pos.y - currPos.y)
    })
    const nearestLoc = locSortedByDist[0]
    const dx = nearestLoc.pos.x - currPos.x
    const dy = nearestLoc.pos.y - currPos.y
    const dist = Math.abs(dx) + Math.abs(dy)
    if (dist < 30) {
        return nearestLoc.name
    }
    // 东西南北, 东北，东南，西北，西南, 8个方向, 45度分隔
    const cardinalDirection8Dir = [
        '东', '东北', '北', '西北', '西', '西南', '南', '东南'
    ]
    const dirIdx = Math.round((Math.atan2(dy, dx) + Math.PI) / (Math.PI / 4)) % 8
    const cardinalDirection = cardinalDirection8Dir[dirIdx]
    return `${nearestLoc.name}的${cardinalDirection}方向${dist}米处`
}

export function genNpcRealtimeObs(time: string, npcName: string, npcState: NpcState, obsByLoc: string[]): string {
    const {hunger, sleep, mood, plan} = npcState

    const obsWithoutLoc = _.without(obsByLoc, npcState.targetLoc)
    const currLoc = npcState.targetLoc ? `去往${npcState.targetLoc}途中` : describeCurrPosByNearby(npcState.currPos);
    return _.compact([
        `过了一段时间，现在时间是：${time}，${npcName}现在位于：${currLoc}。`,
        `${npcName}感到${hungerDescription(hunger)}、${describeEnergyLevel(sleep)}并且${describeMood(mood)}。`,
        _.isEmpty(obsWithoutLoc) ? null : `${npcName}能看到${obsWithoutLoc.join('、')}。`,
        !plan
          ? `现在，${_.trim(plan || `${npcName}刚关掉了闹钟，清醒后，你感觉应该做些什么`)}。`
          : `刚才，${npcName}完成了上一个任务（${plan}），现在该做什么呢？`
    ]).join('\n')
}

function generateOptions(options: string[]) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    if (options.length > alphabet.length) {
        return '输入的选项数量超过了字母表的长度，请减少选项。';
    }

    for (let i = 0; i < options.length; i++) {
        result += `${alphabet[i]}. ${options[i]} `;
        if (i < options.length - 1) {
            result += ' ';
        }
    }

    return result;
}

function ask(npcName: string, reaction: string, question: string, options: string) {
    return fetch('/lang-chain/understand_npc_action', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({npc: npcName, reaction, question, options})
    })
        .then(res => res.json())
        .then(res => res.answer);
}

function queryMap(npc: string, locType: 'home' | 'work') {
    const readKey = ({home: 'liveIn', work: 'workAt'} as any)[locType]
    return _(npcInitInfo.npcs)
        .chain()
        .find(n => n.name === npc)
        .get(readKey)
        .value()
}

function queryNpcs(predicate: (npc: NpcInitInfo) => boolean) {
    return _.filter(npcInitInfo.npcs, predicate)
}

async function understandMovement(npcName: string, reaction: string) {
    const moveIntent = await ask(npcName, reaction, `${npcName}打算去哪里？`, '自己家里/自己工作的地方/别人家里/别人工作的地方/没有提及')
    if (/[否不无没]/.test(moveIntent)) {
        return null
    }
    if (/自己家里/.test(moveIntent)) {
        return queryMap(npcName, 'home')
    }
    if (/自己工作的地方/.test(moveIntent)) {
        return queryMap(npcName, 'work')
    }
    const otherNpcNames = queryNpcs(n => n.name !== npcName)
      .map(n => n.name)
    const forWho = await ask(npcName, reaction, `${npcName}打算去找谁？`, otherNpcNames.join('/'))
    if (/别人家里/.test(moveIntent)) {
        return queryMap(forWho, 'home')
    } else if (/别人工作的地方/.test(moveIntent)) {
        return queryMap(forWho, 'work')
    }
    return null
}

async function understandEatingAmount(npcName: string, reaction: string) {
    const eatIntent = await ask(npcName, reaction, `${npcName}打算吃多少食物？`, '不进食/零食/小吃一顿/大吃一顿/早餐/午餐/晚餐/没有提及')
    if (/[否不无没]/.test(eatIntent)) {
        return 0
    }
    if (/零食/.test(eatIntent)) {
        return 5
    }
    if (/小吃一顿|早餐/.test(eatIntent)) {
        return 8
    }
    if (/大吃一顿|午餐|晚餐/.test(eatIntent)) {
        return 12
    }
    return 0
}

async function understandRest(npcName: string, reaction: string) {
    const restType = await ask(npcName, reaction, `${npcName}打算休息多久？`, '不休息/瞌睡片刻/小憩/打盹/睡一觉/没有提及');
    if (/[否不无没]/.test(restType)) {
        return 0;
    }

    let recovery = 0;
    if (/瞌睡片刻/.test(restType)) {
        recovery = 1;
    } else if (/小憩/.test(restType)) {
        recovery = 3;
    } else if (/打盹/.test(restType)) {
        recovery = 5;
    } else if (/睡一觉/.test(restType)) {
        recovery = 8;
    }

    return recovery;
}

async function understandTaskTime(npcName: string, reaction: string) {
    const taskTime = await ask(npcName, reaction, `你估计${npcName}大概需要多少时间来完成这个任务？`, '请输入小时数（0.0~24.0）')
    if (!taskTime || isNaN(taskTime)) {
        return 0
    }

    return Number(taskTime)
}



export async function genReaction(npc: AgentInfo, recentlyObs: string) {
    const npcName = npc.name
    const res = await fetch('/lang-chain/agent_gen_reaction', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: npcName, obs: recentlyObs})
    }).then(res => res.json())
    const reaction = res.reaction
    console.log('genReaction reaction:', npcName, recentlyObs, reaction)

    const [movementAction, eatingAmount, restAmount] = await Promise.all([
        understandMovement(npcName, reaction),
        understandEatingAmount(npcName, reaction),
        understandRest(npcName, reaction)
    ])

    return {
        recentlyObs,
        reaction,
        movementAction,
        eatingAmount,
        restAmount,
    }
}

export function calculateHunger(prevTime: string, prevHunger: number, currentTime: string, currentAction?: string) {
    const timeElapsed = dayjs(currentTime).diff(dayjs(prevTime), 'hour');
    let newHunger = prevHunger;

    // 基本饥饿度增加
    newHunger += timeElapsed;

    if (/跑步|工作/.test(currentAction || '')) {
        newHunger += timeElapsed * 0.67; // 每 15 分钟增加 1 的速度累积
    } else if (/吃饭/.test(currentAction || '')) {
        newHunger = 0;
    } else if (/吃零食/.test(currentAction || '')) {
        newHunger -= 2;
    }

    // 限制饥饿值范围在 0~10 之间
    return _.clamp(newHunger, 0, 10);
}

export function calculateFatigue(prevTime: string, prevFatigue: number, currentTime: string, currentAction?: string) {
    const timeElapsed = dayjs(currentTime).diff(dayjs(prevTime), 'hour');

    let newFatigue = prevFatigue;

    // 基本疲劳值增加
    newFatigue += timeElapsed;

    if (/跑步/.test(currentAction || '')) {
        newFatigue += timeElapsed * 0.1; // 每 10 分钟增加 1 的速度累积
    } else if (/睡/.test(currentAction || '')) {
        newFatigue = 0;
    } else if (/攻击/.test(currentAction || '')) {
        newFatigue += 1;
    } else if (/被攻击/.test(currentAction || '')) {
        newFatigue += 1; // 根据伤害程度，可以调整为 1~3
    } else if (/完成工作/.test(currentAction || '')) {
        newFatigue += 2;
    } else if (/喝咖啡/.test(currentAction || '')) {
        newFatigue -= 2;
    }

    // 限制疲劳值范围在 0~10 之间
    return _.clamp(newFatigue, 0, 10);
}

export function getSelectedOption(options: string[], selection: string) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = selection.toUpperCase().match(/[A-Z]/);

    if (!letter) {
        return '未找到有效的字母，请输入包含有效字母的选择。';
    }
    const index = alphabet.indexOf(letter[0]);

    if (index < 0 || index >= options.length) {
        console.error('无效的选择，请输入有效的字母。')
        return null
    }

    return options[index];
}
