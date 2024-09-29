from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = "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"  # 실제 API 키로 변경

def solve_math_problem(problem):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "당신은 수학 문제를 푸는 어시스턴트입니다."},
                {"role": "user", "content": f"문제: {problem}. 이 문제를 풀어주세요."},
            ],
            max_tokens=100,
            temperature=0.5
        )
        answer = response['choices'][0]['message']['content']
        return answer.strip()
    except Exception as e:
        return f"오류: {e}"

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    question = data.get("question", "")
    if not question:
        return jsonify({"error": "질문이 없습니다."})

    solution = solve_math_problem(question)
    return jsonify({"answer": solution})

if __name__ == '__main__':
    app.run(debug=True)
