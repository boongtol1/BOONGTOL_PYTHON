// Framework: JavaScript

class GuitarDegreeCalculator {
    constructor(G1, G2, currentStringNumber, currentFretNumber, currentDegree, increaseDegree) {
        this.G1 = G1;
        this.G2 = G2;
        this.currentStringNumber = parseInt(currentStringNumber);
        this.currentFretNumber = parseInt(currentFretNumber);
        this.currentDegree = parseInt(currentDegree);
        this.increaseDegree = parseInt(increaseDegree);
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];  // Standard tuning from 6th string to 1st string
    }

    calculateNoteName(stringNumber, fretNumber, degreeType) {
        let baseNote = this.standardTuning[6 - stringNumber];  // Base note for the specified string in standard tuning
        let noteIndex = this.notes.indexOf(baseNote);
        
        // Adjust the note name based on the degree type
        if (degreeType === "단" || degreeType === "장" || degreeType === "완전" || degreeType === "감" || degreeType === "증") {
            noteIndex = (noteIndex + fretNumber) % this.notes.length;  
        }
        
        return this.notes[noteIndex];
    }

    determineDegreeType(afterDegree) {
        // Determine the degree type based on the increaseDegree
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
        if ([1, 2, 3, 4, 5, 6, 7].includes(this.increaseDegree)) {  // Process increase degree
            const G1FirstDegree = this.G1[:, 0];
            const G1SecondDegree = this.G1[:, 1];
            const G1ThirdDegree = this.G1[:, 2];
            const G1FourthDegree = this.G1[:, 3];
            const G1FifthDegree = this.G1[:, 4];
            const G1SixthDegree = this.G1[:, 5];
            const G1SeventhDegree = this.G1[:, 6];
            const G2PerfectDegree = this.G2[0, :]; 
            const G2JangDegree = this.G2[0, :];
            const G2DanDegree = this.G2[1, :];
            const G2GamDegree = this.G2[1, :];
            const G2JeungDegree = this.G2[2, :];

            let afterDegree = (this.currentDegree + (this.increaseDegree - 1)) % 7;  // Adjust degree and wrap around if over 7
            afterDegree = afterDegree !== 0 ? afterDegree : 7;  // Change 0 to 7
            const degreeType = this.determineDegreeType(afterDegree);
        }
    }
}


// Framework: JavaScript

            if (self.currentStringNumber === 6) {
                // 6번 줄 처리
                if (dropStringNumber >= 0 && dropStringNumber <= 5) {
                    if (dropStringNumber === 4 || dropStringNumber === 5) {
                        if (self.increaseDegree === 1) {
                            afterFretNumber = self.currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[0];
                        } else if (self.increaseDegree === 2) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (self.increaseDegree === 3) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (self.increaseDegree === 4) {
                            if (degreeType === '완전') {
                                afterFretNumber = self.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '증') {
                                afterFretNumber = self.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[0];
                            }
                        } else if (self.increaseDegree === 5) {
                            if (degreeType === '완전') {
                                afterFretNumber = self.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '감') {
                                afterFretNumber = self.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[0];
                            }
                        } else if (self.increaseDegree === 6) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (self.increaseDegree === 7) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        }
                    }
                }
            }


// This code is translated from Python to JavaScript

            else {
                if (increaseDegree === 1) {
                    afterFretNumber = currentFretNumber + G1FirstDegree[dropStringNumber] + G2PerfectDegree[1];
                } else if (increaseDegree === 2) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1SecondDegree[dropStringNumber] + G2JangDegree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1SecondDegree[dropStringNumber] + G2DanDegree[1];
                    }
                } else if (increaseDegree === 3) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1ThirdDegree[dropStringNumber] + G2JangDegree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1ThirdDegree[dropStringNumber] + G2DanDegree[1];
                    }
                } else if (increaseDegree === 4) {
                    if (degreeType === '완전') {
                        afterFretNumber = currentFretNumber + G1FourthDegree[dropStringNumber] + G2PerfectDegree[1];
                    } else if (degreeType === '증') {
                        afterFretNumber = currentFretNumber + G1FourthDegree[dropStringNumber] + G2JeungDegree[1];
                    }
                } else if (increaseDegree === 5) {
                    if (degreeType === '완전') {
                        afterFretNumber = currentFretNumber + G1FifthDegree[dropStringNumber] + G2PerfectDegree[1];
                    } else if (degreeType === '감') {
                        afterFretNumber = currentFretNumber + G1FifthDegree[dropStringNumber] + G2GamDegree[1];
                    }
                } else if (increaseDegree === 6) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1SixthDegree[dropStringNumber] + G2JangDegree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1SixthDegree[dropStringNumber] + G2DanDegree[1];
                    }
                } else if (increaseDegree === 7) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1SeventhDegree[dropStringNumber] + G2JangDegree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1SeventhDegree[dropStringNumber] + G2DanDegree[1];
                    }
                }

                afterStringNumber = currentStringNumber - dropStringNumber;
                noteName = calculateNoteName(afterStringNumber, afterFretNumber, degreeType);

                return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
            }


// This code snippet seems to relate to music theory or guitar fretboard navigation.
            if (self.currentStringNumber === 5) {
                // Processing line 5
                if (dropStringNumber >= 0 && dropStringNumber <= 4) {
                    if (dropStringNumber === 3 || dropStringNumber === 4) {
                        if (self.increaseDegree === 1) {
                            afterFretNumber = self.currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[0];
                        } else if (self.increaseDegree === 2) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (self.increaseDegree === 3) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (self.increaseDegree === 4) {
                            if (degreeType === '완전') {
                                afterFretNumber = self.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '증') {
                                afterFretNumber = self.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[0];
                            }
                        } else if (self.increaseDegree === 5) {
                            if (degreeType === '완전') {
                                afterFretNumber = self.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '감') {
                                afterFretNumber = self.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[0];
                            }
                        } else if (self.increaseDegree === 6) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (self.increaseDegree === 7) {
                            if (degreeType === '장') {
                                afterFretNumber = self.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = self.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        }
                    }
                }
            }


// Framework: JavaScript

            else {
                if (increaseDegree === 1) {
                    afterFretNumber = currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[1];
                } else if (increaseDegree === 2) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (increaseDegree === 3) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (increaseDegree === 4) {
                    if (degreeType === '완전') {
                        afterFretNumber = currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[1];
                    } else if (degreeType === '증') {
                        afterFretNumber = currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[1];
                    }
                } else if (increaseDegree === 5) {
                    if (degreeType === '완전') {
                        afterFretNumber = currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[1];
                    } else if (degreeType === '감') {
                        afterFretNumber = currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[1];
                    }
                } else if (increaseDegree === 6) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (increaseDegree === 7) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                }

                afterStringNumber = currentStringNumber - dropStringNumber;
                noteName = calculateNoteName(afterStringNumber, afterFretNumber, degreeType);

                return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
            }


// Framework: JavaScript
            if (this.currentStringNumber === 4) {
                // 4번 줄 처리
                if (dropStringNumber >= 0 && dropStringNumber <= 3) {
                    if (dropStringNumber === 2 || dropStringNumber === 3) {
                        if (this.increaseDegree === 1) {
                            afterFretNumber = this.currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[0];
                        } else if (this.increaseDegree === 2) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (this.increaseDegree === 3) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (this.increaseDegree === 4) {
                            if (degreeType === '완전') {
                                afterFretNumber = this.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '증') {
                                afterFretNumber = this.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[0];
                            }
                        } else if (this.increaseDegree === 5) {
                            if (degreeType === '완전') {
                                afterFretNumber = this.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '감') {
                                afterFretNumber = this.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[0];
                            }
                        } else if (this.increaseDegree === 6) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (this.increaseDegree === 7) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        }
                    }
                }
            }


// This code translates a Python function to JavaScript
            else {
                if (increaseDegree === 1) {
                    afterFretNumber = currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[1];
                } else if (increaseDegree === 2) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (increaseDegree === 3) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (increaseDegree === 4) {
                    if (degreeType === '완전') {
                        afterFretNumber = currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[1];
                    } else if (degreeType === '증') {
                        afterFretNumber = currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[1];
                    }
                } else if (increaseDegree === 5) {
                    if (degreeType === '완전') {
                        afterFretNumber = currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[1];
                    } else if (degreeType === '감') {
                        afterFretNumber = currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[1];
                    }
                } else if (increaseDegree === 6) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (increaseDegree === 7) {
                    if (degreeType === '장') {
                        afterFretNumber = currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                }

                afterStringNumber = currentStringNumber - dropStringNumber;
                noteName = calculateNoteName(afterStringNumber, afterFretNumber, degreeType);
                
                return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
            }


// Framework: JavaScript

            if (this.currentStringNumber === 3) {
                // 3번 줄 처리
                if (dropStringNumber >= 0 && dropStringNumber <= 2) {
                    if (dropStringNumber === 1 || dropStringNumber === 2) {
                        if (this.increaseDegree === 1) {
                            afterFretNumber = this.currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[0];
                        } else if (this.increaseDegree === 2) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (this.increaseDegree === 3) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (this.increaseDegree === 4) {
                            if (degreeType === '완전') {
                                afterFretNumber = this.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '증') {
                                afterFretNumber = this.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[0];
                            }
                        } else if (this.increaseDegree === 5) {
                            if (degreeType === '완전') {
                                afterFretNumber = this.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[0];
                            } else if (degreeType === '감') {
                                afterFretNumber = this.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[0];
                            }
                        } else if (this.increaseDegree === 6) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        } else if (this.increaseDegree === 7) {
                            if (degreeType === '장') {
                                afterFretNumber = this.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[0];
                            } else if (degreeType === '단') {
                                afterFretNumber = this.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[0];
                            }
                        }
                    }
                }
            }


// Framework: Vanilla JavaScript
            else {
                if (this.increaseDegree === 1) {
                    afterFretNumber = this.currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[1];
                } else if (this.increaseDegree === 2) {
                    if (degreeType === '장') {
                        afterFretNumber = this.currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = this.currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (this.increaseDegree === 3) {
                    if (degreeType === '장') {
                        afterFretNumber = this.currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = this.currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (this.increaseDegree === 4) {
                    if (degreeType === '완전') {
                        afterFretNumber = this.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[1];
                    } else if (degreeType === '증') {
                        afterFretNumber = this.currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[1];
                    }
                } else if (this.increaseDegree === 5) {
                    if (degreeType === '완전') {
                        afterFretNumber = this.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[1];
                    } else if (degreeType === '감') {
                        afterFretNumber = this.currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[1];
                    }
                } else if (this.increaseDegree === 6) {
                    if (degreeType === '장') {
                        afterFretNumber = this.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = this.currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                } else if (this.increaseDegree === 7) {
                    if (degreeType === '장') {
                        afterFretNumber = this.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[1];
                    } else if (degreeType === '단') {
                        afterFretNumber = this.currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[1];
                    }
                }

                afterStringNumber = this.currentStringNumber - dropStringNumber;
                noteName = this.calculate_note_name(afterStringNumber, afterFretNumber, degreeType);

                return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
            }


// Framework: JavaScript

            if (this.currentStringNumber === 2) {
                // Processing line 2
                if (dropStringNumber >= 0 && dropStringNumber <= 1) {

                    let afterFretNumber;

                    if (this.increaseDegree === 1) {
                        afterFretNumber = this.currentFretNumber + G1FirstDegree[dropStringNumber] + G2PerfectDegree[1];
                    } else if (this.increaseDegree === 2) {
                        if (degreeType === '장') {
                            afterFretNumber = this.currentFretNumber + G1SecondDegree[dropStringNumber] + G2JangDegree[1];
                        } else if (degreeType === '단') {
                            afterFretNumber = this.currentFretNumber + G1SecondDegree[dropStringNumber] + G2DanDegree[1];
                        }
                    } else if (this.increaseDegree === 3) {
                        if (degreeType === '장') {
                            afterFretNumber = this.currentFretNumber + G1ThirdDegree[dropStringNumber] + G2JangDegree[1];
                        } else if (degreeType === '단') {
                            afterFretNumber = this.currentFretNumber + G1ThirdDegree[dropStringNumber] + G2DanDegree[1];
                        }
                    } else if (this.increaseDegree === 4) {
                        if (degreeType === '완전') {
                            afterFretNumber = this.currentFretNumber + G1FourthDegree[dropStringNumber] + G2PerfectDegree[1];
                        } else if (degreeType === '증') {
                            afterFretNumber = this.currentFretNumber + G1FourthDegree[dropStringNumber] + G2JeungDegree[1];
                        }
                    } else if (this.increaseDegree === 5) {
                        if (degreeType === '완전') {
                            afterFretNumber = this.currentFretNumber + G1FifthDegree[dropStringNumber] + G2PerfectDegree[1];
                        } else if (degreeType === '감') {
                            afterFretNumber = this.currentFretNumber + G1FifthDegree[dropStringNumber] + G2GamDegree[1];
                        }
                    } else if (this.increaseDegree === 6) {
                        if (degreeType === '장') {
                            afterFretNumber = this.currentFretNumber + G1SixthDegree[dropStringNumber] + G2JangDegree[1];
                        } else if (degreeType === '단') {
                            afterFretNumber = this.currentFretNumber + G1SixthDegree[dropStringNumber] + G2DanDegree[1];
                        }
                    } else if (this.increaseDegree === 7) {
                        if (degreeType === '장') {
                            afterFretNumber = this.currentFretNumber + G1SeventhDegree[dropStringNumber] + G2JangDegree[1];
                        } else if (degreeType === '단') {
                            afterFretNumber = this.currentFretNumber + G1SeventhDegree[dropStringNumber] + G2DanDegree[1];
                        }
                    }

                    const afterStringNumber = this.currentStringNumber - dropStringNumber;
                    const noteName = this.calculateNoteName(afterStringNumber, afterFretNumber, degreeType);

                    return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
                }
            }


// This code is a translation from Python to JavaScript.
            if (currentStringNumber === 1) {
                // 1번 줄 처리
                if (dropStringNumber === 0) {
                    let afterFretNumber;
                    if (increaseDegree === 1) {
                        afterFretNumber = currentFretNumber + G1_first_degree[dropStringNumber] + G2_perfect_degree[0];
                    } else if (increaseDegree === 2) {
                        if (degreeType === '장') {
                            afterFretNumber = currentFretNumber + G1_second_degree[dropStringNumber] + G2_jang_degree[0];
                        } else if (degreeType === '단') {
                            afterFretNumber = currentFretNumber + G1_second_degree[dropStringNumber] + G2_dan_degree[0];
                        }
                    } else if (increaseDegree === 3) {
                        if (degreeType === '장') {
                            afterFretNumber = currentFretNumber + G1_third_degree[dropStringNumber] + G2_jang_degree[0];
                        } else if (degreeType === '단') {
                            afterFretNumber = currentFretNumber + G1_third_degree[dropStringNumber] + G2_dan_degree[0];
                        }
                    } else if (increaseDegree === 4) {
                        if (degreeType === '완전') {
                            afterFretNumber = currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_perfect_degree[0];
                        } else if (degreeType === '증') {
                            afterFretNumber = currentFretNumber + G1_fourth_degree[dropStringNumber] + G2_jeung_degree[0];
                        }
                    } else if (increaseDegree === 5) {
                        if (degreeType === '완전') {
                            afterFretNumber = currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_perfect_degree[0];
                        } else if (degreeType === '감') {
                            afterFretNumber = currentFretNumber + G1_fifth_degree[dropStringNumber] + G2_gam_degree[0];
                        }
                    } else if (increaseDegree === 6) {
                        if (degreeType === '장') {
                            afterFretNumber = currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_jang_degree[0];
                        } else if (degreeType === '단') {
                            afterFretNumber = currentFretNumber + G1_sixth_degree[dropStringNumber] + G2_dan_degree[0];
                        }
                    } else if (increaseDegree === 7) {
                        if (degreeType === '장') {
                            afterFretNumber = currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_jang_degree[0];
                        } else if (degreeType === '단') {
                            afterFretNumber = currentFretNumber + G1_seventh_degree[dropStringNumber] + G2_dan_degree[0];
                        }
                    }

                    const afterStringNumber = currentStringNumber - dropStringNumber;
                    const noteName = calculateNoteName(afterStringNumber, afterFretNumber, degreeType);

                    return [afterFretNumber, afterStringNumber, afterDegree, noteName, degreeType];
                } else {
                    return [null, null, null, null, null]; // drop_string_number가 1 이상일 경우 처리 불가능한 상황 처리
                }
            }

            return [null, null, null, null, null];


// This code snippet is a translation from Python to JavaScript

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
console.log();
console.log(`현재 줄 번호: ${currentStringNumber}`);
console.log(`현재 프렛 번호: ${currentFretNumber}`);
console.log(`현재 도수: ${currentDegree}`);
console.log(`올릴 도수: ${increaseDegree}`);
