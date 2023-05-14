export interface NpcInitInfo {
    name: string
    gender: string
    age: number
    job: string
    workAt: string
    liveIn: string
    traits: string[]
}

export type NpcRelations = Record<string, { mate: string; children: string[]; friends: string[] }>;

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

export interface NpcState {
    hunger: number
    sleep: number
    mood: number
    plan: string | null
    currPos: { x: number; y: number }
    targetLoc: string | null
    clock: string // npc的时钟，因为每个 npc 计算反应的时间不同，不能统一处理
}