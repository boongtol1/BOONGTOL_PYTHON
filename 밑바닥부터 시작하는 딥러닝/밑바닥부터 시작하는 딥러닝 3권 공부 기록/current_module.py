# current_module.py
print("current_module.py is being executed")
print("__name__ in current_module.py:", __name__)

from and_gate import AND        # and_gate 내의 __name__ 은 현재 코딩공간의 __name__(__main__) 이 아니다! 이때 and_gate 내의 __name__은 and_gate 이다!
        # what is 현재 코딩공간이다 함?--> 제일 처음 본 코딩공간!!!
def main():
    print(AND(1, 0))

if __name__ == "__main__":
    main()
