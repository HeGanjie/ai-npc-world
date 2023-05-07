import {GEN_MAP_INIT_INFO, GEN_NPC_INIT_INFO, GEN_RUNTIME_STATE} from "./consts";
import * as _ from "lodash";
import * as dayjs from "dayjs";

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
        `${name}是${gender}性，现在居住在${liveIn}，职业是${job}，在${workAt}工作`,
        traits.join(", ")
    ]
}

function descInventory(name: string, inv: {clothing: string[]; inventory: string[], credits: number}) {
    const {clothing, inventory, credits} = inv
    return [
        `${name}身上正在穿着这些：${clothing.join(", ")}`,
        `${name}身上带着这些：${inventory.join(", ")}`,
        `${name}的存款有${credits}个信用点`
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
                    `${name}的日常用语是汉语`,
                    ...descInventory(name, npc),
                    ...(npcInitInfo.init_obs[name] || []),
                    `${name}现在（${s.time}）位于${pos}`,
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

    const loc = mapLocDict[posDesc]
    if (!loc) {
        console.warn(`posDesc ${posDesc} not found`)
    }
    return loc ? loc.pos : null;
}

export interface AgentInfo {
    name: string;
    age: number;
    location: string;
    traits: string;
    status: string;
    init_obs: string[];
}

export interface WorldRuntimeState {
    time: string;
    npcs: Record<string, AgentInfo>;
    buildings: Record<string, Record<string, string[]>>
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



export interface NpcState {
    hunger: number
    sleep: number
    plan: string | null
}

function hungerDescription(hungerLevel: number) {
    const descriptions = ["要饿死了", "饥肠辘辘", "微饿", "不饿不饱", "略感饱足", "吃得很饱"];
    return descriptions[_.clamp((10 - hungerLevel) / 2, 0, 5)] || '不饿不饱'
}

function describeEnergyLevel(sleepLevel: number) {
    const energyLevels = ["困死了", "昏昏欲睡", "稍有疲惫", "精神尚可", "精神振奋", "精神饱满"];
    return energyLevels[_.clamp((10 - sleepLevel) / 2, 0, 5)] || '精神尚可'
}

export function genNpcRealtimeObs(time: string, npcState: NpcState, location: string, obsByLoc: string[]): string {
    const {hunger, sleep, plan} = npcState

    return _.compact([
        `现在时间是：${time}，你感到${hungerDescription(hunger)}并且${describeEnergyLevel(sleep)}，当前任务：${plan || '暂无任务'}。`,
        `你现在位于：${location}`,
        _.isEmpty(obsByLoc) ? null : `你看到${obsByLoc.join('、')}`,
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

export async function genReaction(npc: AgentInfo, plan: string | null, recentlyObs: string) {
    const npcName = npc.name
    const reaction = await fetch('/lang-chain/agent_gen_reaction', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: npcName, obs: recentlyObs})
    }).then(res => res.json())
    console.log('genReaction reaction:', npcName, recentlyObs, reaction)

    const options: string[] = _.compact([
        plan ? `继续${plan}` : null, '回家睡觉', '去吃xxx', '去到xxx', '去找xxx', '去玩耍放松', '去购买xx', '去做xxx'
    ])
    const nextAction = await fetch('/lang-chain/interview_agent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: npcName,
            msg: [
                `假如现在给你几个选择，${generateOptions(options)}`,
                '你会选择（填好xxx）：'
            ].join('\n')
        })
    }).then(res => res.json())
    console.log('genReaction nextAction:', npcName, nextAction)

    return {
        recentlyObs,
        reaction,
        options,
        nextAction
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
