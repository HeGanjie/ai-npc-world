import timeMapUrl from "./assets/pixelholes-overworld-tileset-demo.png";
import {useState} from "react";
import {getInitWorldRuntimeState, posDescribeToCoord} from "./logic-helper.ts";
import {GEN_NPC_INIT_INFO} from "./consts.ts";
import * as _ from "lodash";

const npcIconDict = GEN_NPC_INIT_INFO().icon

const MAP_WIDTH = 1872
const MAP_HEIGHT = 1248

const GameApp = () => {
    const [gameState, setGameState] = useState(() => getInitWorldRuntimeState());

    console.log(gameState)

    return (
      <div
          className='h-full relative'
          style={{
              background: `url(${timeMapUrl}) no-repeat center center fixed`,
          }}
      >
          {_.map(gameState.npcs, (npc, npcName) => {
              const posInfo = posDescribeToCoord(npc.location)
              if (!posInfo) return null
              return (
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
              )
          })}

      </div>
    );
};

export default GameApp
