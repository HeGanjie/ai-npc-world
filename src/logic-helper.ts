import {GEN_MAP_INIT_INFO, GEN_NPC_INIT_INFO, GEN_RUNTIME_STATE} from "./consts";
import * as _ from "lodash";

function describeRelation(name, relation) {
    const {mate, children, friends} = relation
    return [
        mate ? `${mate}是${name}的伴侣` : null,
        _.isEmpty(children) ? null : `${children}是${name}的孩子`,
        _.isEmpty(friends) ? null : `${friends}是${name}的朋友`
    ].filter(_.identity)
}

function describeSkill(name, skill) {
    const skillDesc = _.keys(skill)
        .map((skillName) => `${skillName}: ${skill[skillName]}`)
        .join(", ")
    return `${name}的能力，可以打分为${skillDesc}`
}

const npcInitInfo = GEN_NPC_INIT_INFO()
const mapInitInfo = GEN_MAP_INIT_INFO()

const mapLocDict = _.keyBy(mapInitInfo.locations, (loc) => loc.id)

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
            return {
                ...npc,
                location: pos, // xx地点/ 从 xx地点 到 xx地点 途中（40%）
                relation: relation,
                skill: skill,
                init_obs: [
                    `${name}现在位于${pos}`,
                    ...describeRelation(name, relation),
                    describeSkill(name, skill),
                    ...(npcInitInfo.init_obs[name] || [])
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