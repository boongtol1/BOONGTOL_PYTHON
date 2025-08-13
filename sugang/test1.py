from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# 가상 데이터
courses = {"A": 2, "B": 2}  # 정원
cart = {}  # {학생ID: [과목리스트]}

@app.route("/cart", methods=["POST"])
def add_cart():
    data = request.json
    cart[data["student_id"]] = data["courses"]
    return jsonify({"message": "장바구니 저장 완료"})

@app.route("/allocate", methods=["POST"])
def allocate():
    # 초기화
    result = {s: [] for s in cart}
    capacity = courses.copy()
    
    # 랜덤 순서
    order = list(cart.keys())
    random.shuffle(order)
    
    # 순차 처리
    for student in order:
        for course in cart[student]:
            if capacity[course] > 0:
                result[student].append(course)
                capacity[course] -= 1
                break

    return jsonify({"order": order, "result": result, "remain": capacity})

if __name__ == "__main__":
    app.run(debug=True)
