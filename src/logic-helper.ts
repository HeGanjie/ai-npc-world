import {GEN_MAP_INIT_INFO, GEN_NPC_INIT_INFO, GEN_RUNTIME_STATE} from "./consts";
import * as _ from "lodash";

function describeRelation(name, relation) {
    const {mate, children, friends} = relation
    return [
        mate ? `${mate}是${name}的伴侣` : null,
        _.isEmpty(children) ? null : `${children}是${name}的孩子`,
        _.isEmpty(friends) ? null : `${friends.join('、')}是${name}的朋友`
    ].filter(_.identity)
}

function describeSkill(name, skill) {
    const skillDesc = _.keys(skill)
        .map((skillName) => `${skillName}: ${skill[skillName]}`)
        .join(", ")
    return `${name}的能力，可以打分为 ${skillDesc}`
}

const npcInitInfo = GEN_NPC_INIT_INFO()
const mapInitInfo = GEN_MAP_INIT_INFO()

const mapLocDict = _.keyBy(mapInitInfo.locations, (loc) => loc.id)

function describeBaseInfo(npc: {name: string; gender: string; age: number; job: string; workAt: string; liveIn: string; traits: string[]}) {
    const {name, gender, age, job, workAt, liveIn, traits} = npc
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
    return {
        time: s.time,
        npcs: _.mapValues(s.npcs, (npc, name) => {
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
        body: JSON.stringify(_.pick(presend, ['李风华'])) // 暂时只测试李风华
    }).then(res => res.json())
    console.log('init agents res:', res, presend)

    cb?.({
        time: gameState.time,
        npcs: presend,
        buildings: gameState.buildings
    })
}, 1000);