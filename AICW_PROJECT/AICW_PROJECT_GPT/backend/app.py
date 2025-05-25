import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import anthropic

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")
anthropic_client = anthropic.Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

@app.post("/chat")
def chat():
    data = request.get_json()
    messages = data["messages"]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7,
        max_tokens=1000,
    )
    return jsonify({"reply": response["choices"][0]["message"]["content"]})

@app.post("/continue/claude")
def continue_claude():
    data = request.get_json()
    messages = data["messages"]
    joined = "\n".join(f"{m['role']}: {m['content']}" for m in messages)

    resp = anthropic_client.messages.create(
        model="claude-3-opus-20240229",
        messages=[{"role": "user", "content": joined}],
        max_tokens=1024,
    )
    return jsonify({"reply": resp.content[0].text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
