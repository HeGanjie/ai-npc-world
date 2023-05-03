from agent_logic_helper import create_agent, agent_generate_reaction, interview_agent


class AgentService:
    _agent_dict = {}
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        if self._instance is not None:
            raise RuntimeError("Use 'Singleton.get_instance()' to create a new instance.")
        # 其他初始化代码

    def init_agent(self, npc_name, npc_age, npc_traits, npc_status):
        self._agent_dict[npc_name] = create_agent(
            npc_name, npc_age, npc_traits, npc_status, reflection_threshold=8, verbose=True)

    def agent_gen_reaction(self, agent_name, observation):
        agent = self._agent_dict[agent_name]
        if agent is None:
            raise Exception("Agent not found")
        return agent_generate_reaction(agent, observation)

    def interview_agent(self, agent_name, message):
        agent = self._agent_dict[agent_name]
        if agent is None:
            raise Exception("Agent not found")
        return interview_agent(agent, message)
