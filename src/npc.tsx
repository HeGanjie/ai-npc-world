import * as dayjs from "dayjs";
import {calculateFatigue, calculateHunger, genNpcRealtimeObs, genReaction, posDescribeToCoord} from "./logic-helper.ts";
import {AgentInfo, NpcState} from "./types";
import {useDeepCompareEffect, useReactive, useRequest} from "ahooks";
import * as _ from "lodash";
import {Input, Modal, Popover, Spin} from "antd";
import {GEN_NPC_INIT_INFO} from "./consts.ts";

const npcIconDict = GEN_NPC_INIT_INFO().icon
const MAP_WIDTH = 1872
const MAP_HEIGHT = 1248

function calculateMood(prevTime: string, currTime: string, hunger: number, sleep: number, mood: number) {
  // 如果饥饿度和疲劳度都很高，那么心情会变差，否则趋于好心情
  const timeElapsed = dayjs(currTime).diff(dayjs(prevTime), 'hour');

  const targetMood = _.clamp(10 - (hunger + sleep) / 2, 0, 10)
  const moodDelta = (targetMood - mood) / 3 * timeElapsed
  return _.clamp(mood + moodDelta, 0, 10)
}

function calcCurrPos(prevTime: string, time: string, currPos: { x: number; y: number }, targetLoc: string) {
  const timeElapsed = dayjs(time).diff(dayjs(prevTime), 'hour');
  const targetPos = posDescribeToCoord(targetLoc) || currPos
  const humanSpeedPerHour = 2000
  const remainingDistance = Math.sqrt(Math.pow(targetPos.x - currPos.x, 2) + Math.pow(targetPos.y - currPos.y, 2))
  if (remainingDistance < humanSpeedPerHour * timeElapsed) {
    return targetPos
  }
  const xDelta = (targetPos.x - currPos.x) / remainingDistance * humanSpeedPerHour * timeElapsed
  const yDelta = (targetPos.y - currPos.y) / remainingDistance * humanSpeedPerHour * timeElapsed
  return {
    x: currPos.x + xDelta,
    y: currPos.y + yDelta
  }
}

function useNpcInterviewModal(npcName: string) {
  const reactiveState = useReactive<{visible: boolean; interviewContent: string; response: string}>({
    visible: false,
    interviewContent: '',
    response: '',
  })

  const {runAsync, loading} = useRequest(() => {
    return fetch(`/lang-chain/interview_agent`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: npcName, msg: reactiveState.interviewContent})
    })
      .then((res) => res.json())
  }, {
    manual: true,
    onSuccess: (res) => {
      reactiveState.response = res.response
    }
  })

  return {
    reactiveState,
    dom: !reactiveState.visible ? null : (
      <Modal
        title={`采访 ${npcName}（会影响记忆）`}
        open={reactiveState.visible}
        onOk={() => runAsync().catch((e) => console.error(e))}
        onCancel={() => {
          reactiveState.visible = false
          reactiveState.interviewContent = ''
          reactiveState.response = ''
        }}
        okButtonProps={{
          loading
        }}
        okText='提问'
        cancelText='关闭'
      >
        <Input.TextArea
          value={reactiveState.interviewContent}
          onChange={(e) => {
            reactiveState.interviewContent = e.target.value
          }}
          autoSize={{minRows: 3, maxRows: 10}}
          placeholder="请输入提问内容"
        />
        {!reactiveState.response ? null : (
          <div>
            <div>回答：</div>
            <div>{reactiveState.response}</div>
          </div>
        )}
      </Modal>
    )
  }

}

export const Npc = (props: { time: string; npc: AgentInfo; queryObsByLoc: (location: string) => string[] }) => {
  const {time, npc, queryObsByLoc} = props
  const npcName = npc.name
  const reactiveState = useReactive<NpcState>({
    hunger: 8,
    sleep: 0,
    mood: 7,
    plan: '',
    currPos: posDescribeToCoord(npc.location) || {"x": 888, "y": 602}, // 默认位于水井旁
    targetLoc: '',
    clock: time
  })
  const posInfo = reactiveState.currPos

  // 根据环境变动触发事件
  const obsByLoc = _.without(queryObsByLoc(npc.location), npcName)

  const {
    loading,
    run,
    data: res
  } = useRequest(() => genReaction(npc, genNpcRealtimeObs(time, npcName, reactiveState, obsByLoc)), {
    ready: !!npcName,
    manual: true,
    debounceWait: 1000,
    onSuccess: (res) => {
      reactiveState.hunger = calculateHunger(reactiveState.clock, reactiveState.hunger, time)
      reactiveState.sleep = calculateFatigue(reactiveState.clock, reactiveState.sleep, time)
      reactiveState.mood = calculateMood(reactiveState.clock, time, reactiveState.hunger, reactiveState.sleep, reactiveState.mood)
      const {movementAction, reaction, eatingAmount, restAmount} = res
      if (movementAction) {
        reactiveState.plan = reaction
        reactiveState.targetLoc = movementAction
      }
      if (!reactiveState.plan) {
        reactiveState.plan = reaction
      }
      reactiveState.hunger = _.clamp(reactiveState.hunger - eatingAmount, 0, 10)
      reactiveState.sleep = _.clamp(reactiveState.sleep - restAmount, 0, 10)
      if (reactiveState.targetLoc) {
        reactiveState.currPos = calcCurrPos(reactiveState.clock, time, reactiveState.currPos, reactiveState.targetLoc)
      }
      reactiveState.clock = time

      return res
    }
  })

  useDeepCompareEffect(() => {
    if (!npcName || loading) {
      return;
    }
    run()
  }, [npcName, time])

  const {dom, reactiveState: interviewState} = useNpcInterviewModal(npcName)

  if (!posInfo) return null
  return (
    <>
      <Popover
        content={() => (
          <div className='max-w-[50vw]'>
            <div>姓名：{npcName}</div>
            <div>年龄：{npc.age}</div>
            <div>性格：{npc.traits}</div>
            <div>状态：{npc.status}</div>
            <div>历史观察：{npc.init_obs}</div>
            <div>当前观察：{res?.recentlyObs || '暂无'}</div>
            <div>当前反应：{res?.reaction || '暂无'}</div>
          </div>
        )}
      >
        <div
          key={npcName}
          className='absolute rounded cursor-pointer'
          style={{
            top: `${posInfo.y / MAP_HEIGHT * 100}%`,
            left: `${posInfo.x / MAP_WIDTH * 100}%`,
            transform: `translate(-50%, -50%)`,
            background: 'white'
          }}
          title={npcName}
          onClick={() => {
            interviewState.visible = true
          }}
        >
          {npcIconDict[npcName]}
          {loading ? <Spin/> : null}
        </div>
      </Popover>
      {dom}
    </>
  )
}