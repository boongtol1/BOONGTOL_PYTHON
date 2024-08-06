# current_module.py
print("current_module.py is being executed")
print("__name__ in current_module.py:", __name__)

from and_gate import AND        
def main():
    print(AND(1, 0))

if __name__ == "and_gate":
    main()

# and_gate.py 를 current_module.py 에 임포트 한 상태에서 current_module.py에서 프로그램을 돌릴때 and_gate.py의 __name__ 은 and_gate 이다!!

