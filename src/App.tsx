import timeMapUrl from "./assets/pixelholes-overworld-tileset-demo.png";
import {useEffect, useMemo, useState} from "react";
import {
    AgentInfo, calculateFatigue, calculateHunger, genNpcRealtimeObs,
    genReaction,
    getInitWorldRuntimeState, getSelectedOption,
    initWorld,
    NpcState,
    posDescribeToCoord,
    WorldRuntimeState
} from "./logic-helper.ts";
import {GEN_MAP_INIT_INFO, GEN_NPC_INIT_INFO} from "./consts.ts";
import * as _ from "lodash";
import {Button, Popover, Spin} from "antd";
import {useDeepCompareEffect, usePrevious, useReactive, useRequest} from "ahooks";
import * as dayjs from "dayjs";

const npcIconDict = GEN_NPC_INIT_INFO().icon

const MAP_WIDTH = 1872
const MAP_HEIGHT = 1248


const Npc = (props: {time: string; npc: AgentInfo; queryObsByLoc: (location: string) => string[]}) => {
    const {time, npc, queryObsByLoc} = props
    const npcName = npc.name
    const posInfo = posDescribeToCoord(npc.location)
    const reactiveState = useReactive<NpcState>({hunger: 0, sleep: 0, plan: '',})

    // 根据环境变动触发事件
    const obsByLoc = _.without(queryObsByLoc(npc.location), npcName)
    const recentlyObs = genNpcRealtimeObs(time, reactiveState, npc.location, obsByLoc)


    const {loading, run} = useRequest(() => genReaction(npc, reactiveState.plan, recentlyObs), {
        ready: !!npcName,
        manual: true,
        debounceWait: 1000,
        onSuccess: (res) => {
            const nextAction = getSelectedOption(res.options, res.nextAction)
            if (/继续/.test(nextAction || '')) {
                return
            }
            reactiveState.plan = nextAction
        }
    })

    const previousTime = usePrevious(time)

    useDeepCompareEffect(() => {
        if (!npcName || loading) {
            return;
        }
        if (!previousTime) {
            // 触发初始事件
            run()
            return
        }
        reactiveState.hunger = calculateHunger(previousTime, reactiveState.hunger, time)
        reactiveState.sleep = calculateFatigue(previousTime, reactiveState.sleep, time)

        run()
    }, [npcName, time, recentlyObs])

    if (!posInfo) return null
    return (
        <Popover
            content={() => (
                <div>
                    <div>姓名：{npcName}</div>
                    <div>年龄：{npc.age}</div>
                    <div>性格：{npc.traits}</div>
                    <div>状态：{npc.status}</div>
                    <div>历史观测：{npc.init_obs}</div>
                    <div>当前位置：{npc.location}</div>
                    <div>饥饿度：{reactiveState.hunger}</div>
                    <div>疲劳度：{reactiveState.sleep}</div>
                    <div>计划：{reactiveState.plan}</div>
                </div>
            )}
        >
            <div
                key={npcName}
                className='absolute rounded'
                style={{
                    top: `${posInfo.y / MAP_HEIGHT * 100}%`,
                    left: `${posInfo.x / MAP_WIDTH * 100}%`,
                    transform: `translate(-50%, -50%)`,
                    background: 'white'
                }}
                title={npcName}
            >
                {npcIconDict[npcName]}
                {loading ? <Spin /> : null}
            </div>
        </Popover>
    )
}

const mapInitInfo = GEN_MAP_INIT_INFO()
const allBuildingPos = _(mapInitInfo.locations)
    .keyBy('id')
    .mapValues((loc) => loc.pos)
    .value()

const GameApp = () => {
    const [gameState, setGameState] = useState<WorldRuntimeState | null>(null);

    useEffect(() => {
        const gameState = getInitWorldRuntimeState()
        console.log('init agents:', gameState)
        initWorld(gameState, setGameState)
    }, [])

    const queryObsByLoc = useMemo(() => {
        const allNpcPos = _.mapValues(gameState?.npcs, (npc) => posDescribeToCoord(npc.location))
        return (location: string) => {
            const myPos = posDescribeToCoord(location)
            if (!myPos) return []

            // 一定范围内的 npc 和建筑
            const range = 50
            const nearbyNpc = _.pickBy(allNpcPos, (pos) => {
                if (!pos) return false
                return Math.abs(pos.x - myPos.x) < range && Math.abs(pos.y - myPos.y) < range
            })
            const nearbyBuilding = _.pickBy(allBuildingPos, (pos) => {
                if (!pos) return false
                return Math.abs(pos.x - myPos.x) < range && Math.abs(pos.y - myPos.y) < range
            })
            return [
                ..._.keys(nearbyNpc),
                ..._.keys(nearbyBuilding),
            ]
        }
    }, [gameState])

    return (
      <div
          className='h-full relative'
          style={{
              background: `url(${timeMapUrl}) no-repeat center center fixed`,
          }}
      >
          <div className="absolute top0 left0 text-white text-xl">
              {gameState?.time || '正在初始化...'}
              {!gameState?.time ? null : (
                  <Button
                      className='ml-4'
                      type='primary'
                      onClick={() => {
                          const gameTime = dayjs(gameState?.time)
                          setGameState({
                              ...gameState,
                              time: gameTime.add(1, 'hour').format('YYYY-MM-DD HH:mm')
                          })
                      }}
                  >时间增加 1 小时</Button>
              )}
          </div>
          {_.map(gameState?.npcs, (npc, npcName) => {
              return (
                  <Npc key={npcName} time={gameState!.time} npc={npc} queryObsByLoc={queryObsByLoc} />
              )
          })}

      </div>
    );
};

export default GameApp
