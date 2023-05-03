from flask import Flask, request, jsonify
import logging
from agent_service import AgentService

logging.basicConfig(level=logging.ERROR)

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/init_agents", methods=["POST"])
def init_agents():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    # init agents
    # data: {npcName: {age: 0, traits: [], status: "N/A"}, ...}
    agent_service = AgentService.get_instance()
    for npc_name, npc_info in data.items():
        agent_service.init_agent(npc_name, npc_info["age"], npc_info["traits"], npc_info["status"])

    # log
    logging.info("init agents: %s", data)

    # 返回响应
    return jsonify({"message": "JSON payload received and processed"}), 200

@app.route("/agent_gen_reaction", methods=["POST"])
def agent_gen_reaction():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    # data: {name: "", obs: ""}
    agent_service = AgentService.get_instance()
    reaction = agent_service.agent_gen_reaction(data["name"], data["obs"])

    # log
    logging.info("agent gen reaction: %s", data)

    # 返回响应
    return jsonify({"reaction": reaction}), 200

@app.route("/interview_agent", methods=["POST"])
def interview_agent():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    # data: {name: "", msg: ""}
    agent_service = AgentService.get_instance()
    response = agent_service.interview_agent(data["name"], data["msg"])

    # log
    logging.info("interview agent: %s", data)

    # 返回响应
    return jsonify({"response": response}), 200

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)