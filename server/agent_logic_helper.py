# 参考自 https://python.langchain.com/en/latest/use_cases/agent_simulations/characters.html

from datetime import datetime, timedelta
from typing import List
# from termcolor import colored


from langchain.chat_models import ChatOpenAI
from langchain.docstore import InMemoryDocstore
from langchain.embeddings import OpenAIEmbeddings
from langchain.retrievers import TimeWeightedVectorStoreRetriever
from langchain.vectorstores import FAISS

from langchain.experimental.generative_agents import GenerativeAgent, GenerativeAgentMemory
import math
import faiss

USER_NAME = "Person A"  # The name you want to use when interviewing the agent.
LLM = ChatOpenAI(max_tokens=1500)  # Can be any LLM you want.


def relevance_score_fn(score: float) -> float:
    """Return a similarity score on a scale [0, 1]."""
    # This will differ depending on a few things:
    # - the distance / similarity metric used by the VectorStore
    # - the scale of your embeddings (OpenAI's are unit norm. Many others are not!)
    # This function converts the euclidean norm of normalized embeddings
    # (0 is most similar, sqrt(2) most dissimilar)
    # to a similarity function (0 to 1)
    return 1.0 - score / math.sqrt(2)


def create_new_memory_retriever():
    """Create a new vector store retriever unique to the agent."""
    # Define your embedding model
    embeddings_model = OpenAIEmbeddings()
    # Initialize the vectorstore as empty
    embedding_size = 1536
    index = faiss.IndexFlatL2(embedding_size)
    vectorstore = FAISS(embeddings_model.embed_query, index, InMemoryDocstore({}), {},
                        relevance_score_fn=relevance_score_fn)
    return TimeWeightedVectorStoreRetriever(vectorstore=vectorstore, other_score_keys=["importance"], k=15)


def create_agent(name, age, traits, status='N/A', init_obs=[], reflection_threshold=8, verbose=False):
    """Create a new agent."""
    agent_memory = GenerativeAgentMemory(
        llm=LLM,
        memory_retriever=create_new_memory_retriever(),
        verbose=verbose,
        reflection_threshold=reflection_threshold
        # we will give this a relatively low number to show how reflection works
    )

    agent = GenerativeAgent(name=name,
                            age=age,
                            traits=traits,  # You can add more persistent traits here
                            status=status,
                            # When connected to a virtual world, we can have the characters update their status
                            memory_retriever=create_new_memory_retriever(),
                            llm=LLM,
                            memory=agent_memory
                            )

    agent_add_memory(agent, init_obs)
    return agent


def summery_agent(agent: GenerativeAgent, force_refresh=False):
    print(agent.get_summary(force_refresh=force_refresh))


def agent_add_memory(agent: GenerativeAgent, observations: List[str]):
    for observation in observations:
        agent.memory.add_memory(observation)


def interview_agent(agent: GenerativeAgent, message: str) -> str:
    """Help the notebook user interact with the agent."""
    new_message = f"{USER_NAME} says {message}"
    return agent.generate_dialogue_response(new_message)[1]


def agent_generate_reaction(agent: GenerativeAgent, observation: str) -> str:
    _, reaction = agent.generate_reaction(observation)
    return reaction


def run_conversation(agents: List[GenerativeAgent], initial_observation: str) -> None:
    """Runs a conversation between agents."""
    _, observation = agents[1].generate_reaction(initial_observation)
    print(observation)
    turns = 0
    while True:
        break_dialogue = False
        for agent in agents:
            stay_in_dialogue, observation = agent.generate_dialogue_response(observation)
            print(observation)
            # observation = f"{agent.name} said {reaction}"
            if not stay_in_dialogue:
                break_dialogue = True
        if break_dialogue:
            break
        turns += 1
