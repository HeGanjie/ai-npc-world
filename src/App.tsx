import timeMapUrl from "./assets/pixelholes-overworld-tileset-demo.png";
import {useEffect, useState} from "react";
import {AgentInfo, getInitWorldRuntimeState, initWorld, posDescribeToCoord, WorldRuntimeState} from "./logic-helper.ts";
import {GEN_NPC_INIT_INFO} from "./consts.ts";
import * as _ from "lodash";
import {Popover} from "antd";

const npcIconDict = GEN_NPC_INIT_INFO().icon

const MAP_WIDTH = 1872
const MAP_HEIGHT = 1248

const Npc = (props: {time: string; npc: AgentInfo}) => {
    const {time, npc} = props
    const npcName = npc.name
    const posInfo = posDescribeToCoord(npc.location)
    if (!posInfo) return null

    // TODO 触发初始事件
    // TODO 根据环境变动触发事件

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
            </div>
        </Popover>
    )
}

const GameApp = () => {
    const [gameState, setGameState] = useState<WorldRuntimeState | null>(null);

    useEffect(() => {
        const gameState = getInitWorldRuntimeState()
        console.log('init agents:', gameState)
        initWorld(gameState, setGameState)
    }, [])

    return (
      <div
          className='h-full relative'
          style={{
              background: `url(${timeMapUrl}) no-repeat center center fixed`,
          }}
      >
          <div className="absolute top0 left0 text-white text-xl">{gameState?.time || '正在初始化...'}</div>
          {_.map(gameState?.npcs, (npc, npcName) => {
              return (
                  <Npc time={gameState?.time!} npc={npc} />
              )
          })}

      </div>
    );
};

export default GameApp
