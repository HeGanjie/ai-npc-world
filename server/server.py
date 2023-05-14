from flask import Flask, request, jsonify
import logging
from agent_service import AgentService
from nlu_service import NLUService

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
    # data: {npcName: {age: 0, traits: [], status: "N/A", init_obs: [...]}, ...}
    agent_service = AgentService.get_instance()
    for npc_name, npc_info in data.items():
        agent_service.init_agent(npc_name, npc_info["age"], npc_info["traits"], npc_info["status"], npc_info["init_obs"])

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

@app.route("/understand_npc_action", methods=["POST"])
def understand_npc_action():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    # data: {npc: "", reaction: "", question: "", options: "a/b/c"}
    nlu_service = NLUService.get_instance()
    action = nlu_service.classify_action(data["npc"], data["reaction"], data["question"], data["options"])

    # log
    logging.info("understand npc action: %s, %s", data)

    # 返回响应
    return jsonify({"answer": action}), 200


@app.route("/interview_agent", methods=["POST"])
def interview_agent():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON payload received"}), 400

    # data: {name: "", msg: ""}
    agent_service = AgentService.get_instance()

    response = agent_service.interview_agent(data["name"], data.get("interview_by", "旁白君"), data["msg"])

    # log
    logging.info("interview agent: %s", data)

    # 返回响应
    return jsonify({"response": response}), 200

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)