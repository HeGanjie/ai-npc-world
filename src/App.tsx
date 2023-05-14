import timeMapUrl from "./assets/pixelholes-overworld-tileset-demo.png";
import {useEffect, useMemo, useState} from "react";
import {getInitWorldRuntimeState, initWorld, posDescribeToCoord} from "./logic-helper.ts";
import {GEN_MAP_INIT_INFO} from "./consts.ts";
import * as _ from "lodash";
import {Button} from "antd";
import * as dayjs from "dayjs";
import {WorldRuntimeState} from "./types";
import {Npc} from "./npc.tsx";


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

  const incTime1Hour = (gameState: WorldRuntimeState, inc: number) => () => {
    const gameTime = dayjs(gameState.time)
    setGameState({
      ...gameState,
      time: gameTime.add(inc, 'hour').format('YYYY-MM-DD HH:mm')
    })
  };
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
          <>
            <Button className='ml-4 bg-white' type='default' onClick={incTime1Hour(gameState, 1)}>+ 1 小时</Button>
            <Button className='ml-4 bg-white' type='default' onClick={incTime1Hour(gameState, 2)}>+ 2 小时</Button>
          </>
        )}
      </div>
      {_.map(gameState?.npcs, (npc, npcName) => {
        return (
          <Npc key={npcName} time={gameState!.time} npc={npc} queryObsByLoc={queryObsByLoc}/>
        )
      })}

    </div>
  );
};

export default GameApp
