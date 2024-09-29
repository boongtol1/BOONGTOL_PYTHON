class GuitarDegreeCalculator {
    constructor(G1, G2, currentStringNumber, currentFretNumber, currentDegree, increaseDegree) {
        this.G1 = G1;
        this.G2 = G2;
        this.currentStringNumber = parseInt(currentStringNumber);
        this.currentFretNumber = parseInt(currentFretNumber);
        this.currentDegree = parseInt(currentDegree);
        this.increaseDegree = parseInt(increaseDegree);
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];  // 표준 튜닝(6번 줄에서 1번 줄 순서)
    }

    calculateNoteName(stringNumber, fretNumber, degreeType) {
        let baseNote = this.standardTuning[6 - stringNumber];  // 해당 줄의 기본 음표
        let noteIndex = this.notes.indexOf(baseNote);
        
        // 음정 종류에 따라 음표 조정
        if (degreeType === "단" || degreeType === "장" || degreeType === "완전" || degreeType === "감" || degreeType === "증") {
            noteIndex = (noteIndex + fretNumber) % this.notes.length;  
        }
        
        return this.notes[noteIndex];
    }

    determineDegreeType(afterDegree) {
        // 올릴 도수에 따라 음정 종류 결정
        if (this.increaseDegree === 1) {
            return "완전";
        } else if (this.increaseDegree === 2) {
            return afterDegree === 4 || afterDegree === 1 ? "단" : "장";
        } else if (this.increaseDegree === 3) {
            return afterDegree === 3 || afterDegree === 6 || afterDegree === 7 ? "장" : "단";
        } else if (this.increaseDegree === 4) {
            return afterDegree === 7 ? "증" : "완전";
        } else if (this.increaseDegree === 5) {
            return afterDegree === 4 ? "감" : "완전";
        } else if (this.increaseDegree === 6) {
            return afterDegree === 6 || afterDegree === 7 || afterDegree === 2 || afterDegree === 3 ? "장" : "단";
        } else if (this.increaseDegree === 7) {
            return afterDegree === 7 || afterDegree === 3 ? "장" : "단";
        }
    }

    calculateDegree(dropStringNumber) {
        if ([1, 2, 3, 4, 5, 6, 7].includes(this.increaseDegree)) {  // 올릴 도수를 처리
            const G1FirstDegree = this.G1.map(row => row[0]);
            const G1SecondDegree = this.G1.map(row => row[1]);
            const G1ThirdDegree = this.G1.map(row => row[2]);
            const G1FourthDegree = this.G1.map(row => row[3]);
            const G1FifthDegree = this.G1.map(row => row[4]);
            const G1SixthDegree = this.G1.map(row => row[5]);
            const G1SeventhDegree = this.G1.map(row => row[6]);
            const G2PerfectDegree = this.G2[0]; 
            const G2JangDegree = this.G2[0];
            const G2DanDegree = this.G2[1];
            const G2GamDegree = this.G2[1];
            const G2JeungDegree = this.G2[2];

            let afterDegree = (this.currentDegree + (this.increaseDegree - 1)) % 7;  // 도수 조정 및 7을 초과하면 다시 1로
            afterDegree = afterDegree !== 0 ? afterDegree : 7;  // 0을 7로 변경
            const degreeType = this.determineDegreeType(afterDegree);

            let afterFretNumber;
            if (this.currentStringNumber === 6) {
                if (dropStringNumber >= 0 && dropStringNumber <= 5) {
                    if (dropStringNumber === 4 || dropStringNumber === 5) {
                        if (this.increaseDegree === 1) {
                            afterFretNumber = this.currentFretNumber + G1FirstDegree[dropStringNumber] + G2PerfectDegree[0];
                        } else if (this.increaseDegree === 2) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1SecondDegree[dropStringNumber] + G2JangDegree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1SecondDegree[dropStringNumber] + G2DanDegree[0];
                            }
                        }
                        // 이후 코드 생략 (유사한 구조로 작성)
                    }
                }
            } else {
                // 6번 줄이 아닌 다른 줄 처리 (유사한 로직을 사용하여 작성)
            }
            
            const afterStringNumber = this.currentStringNumber - dropStringNumber;
            const noteName = this.calculateNoteName(afterStringNumber, afterFretNumber, degreeType);

            return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
        }
        return [null, null, null, null, null];
    }
}

const G1 = [
    [1, 3, 5, 6, 8, 10, 12],
    [-4, -2, 0, 1, 3, 5, 7],
    [-9, -7, -5, -4, -2, 0, 2],
    [-14, -12, -10, -9, -7, -5, -3],
    [-19, -17, -15, -14, -12, -10, -8],
    [-24, -22, -20, -19, -17, -15, -13]
];

const G2 = [
    [0, -1],
    [-1, -2],
    [1, 0]
];

// 사용자 입력
const currentStringNumber = prompt('현재 줄 번호를 입력하세요: ');
const currentFretNumber = prompt('현재 프렛 번호를 입력하세요: ');
const currentDegree = prompt('현재 도수를 입력하세요: ');
const increaseDegree = prompt('올릴 도수를 입력하세요: ');

// 객체 생성
const calculator = new GuitarDegreeCalculator(G1, G2, currentStringNumber, currentFretNumber, currentDegree, increaseDegree);

// 자동으로 drop_string_number를 0부터 5까지 실행
for (let dropStringNumber = 0; dropStringNumber < 6; dropStringNumber++) {
    const [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType] = calculator.calculateDegree(dropStringNumber);
    if (afterFretNumber !== null) {
        console.log(`drop_string_number: ${dropStringNumber}, 프렛 번호: ${afterFretNumber}, 줄 번호: ${afterStringNumber}, 도수: ${afterDegree}, 음이름: ${noteName}, 음정종류: ${degreeType}`); 
    } else {
        console.log(`drop_string_number: ${dropStringNumber}, 조건에 맞는 계산 결과가 없습니다.`);
    }
}
