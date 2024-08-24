import numpy as np

class GuitarDegreeCalculator:
    def __init__(self, G1, G2, current_string_number, current_fret_number, current_degree, increase_degree):
        self.G1 = G1
        self.G2 = G2
        self.current_string_number = int(current_string_number)
        self.current_fret_number = int(current_fret_number)
        self.current_degree = int(current_degree)
        self.increase_degree = int(increase_degree)
        self.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        self.standard_tuning = ['E', 'A', 'D', 'G', 'B', 'E']  # 6번 줄부터 1번 줄까지의 기본 튜닝

    def calculate_note_name(self, string_number, fret_number, degree_type):
        base_note = self.standard_tuning[6 - string_number]  # 표준 튜닝에서 해당 줄의 기본 음이름
        note_index = self.notes.index(base_note)
        
        # degree_type에 따라 음이름 조정
        if degree_type == "단":
            note_index = (note_index + fret_number) % len(self.notes)  
        elif degree_type == "장":
            note_index = (note_index + fret_number) % len(self.notes)  
        elif degree_type == "완전":
            note_index = (note_index + fret_number) % len(self.notes)  
        elif degree_type == "감":
            note_index = (note_index + fret_number ) % len(self.notes)  
        elif degree_type == "증":
            note_index = (note_index + fret_number ) % len(self.notes)  
        
        return self.notes[note_index]


    def determine_degree_type(self, after_degree):
        # increase_degree에 따른 도수 종류 결정
        if self.increase_degree == 1:
            return "완전"
        elif self.increase_degree == 2:
            return "단" if after_degree in [4, 1] else "장"
        elif self.increase_degree == 3:
            return "장" if after_degree in [3, 6, 7] else "단"
        elif self.increase_degree == 4:
            return "증" if after_degree == 7 else "완전"
        elif self.increase_degree == 5:
            return "감" if after_degree == 4 else "완전"
        elif self.increase_degree == 6:
            return "장" if after_degree in [6, 7, 2, 3] else "단"
        elif self.increase_degree == 7:
            return "장" if after_degree in [7, 3] else "단"

    def calculate_degree(self, drop_string_number):
        if self.increase_degree in [1, 2, 3, 4, 5, 6, 7]:  # Increase degree 처리
            G1_first_degree = self.G1[:, 0]
            G1_second_degree = self.G1[:, 1]
            G1_third_degree = self.G1[:, 2]
            G1_fourth_degree = self.G1[:, 3]
            G1_fifth_degree = self.G1[:, 4]
            G1_sixth_degree = self.G1[:, 5]
            G1_seventh_degree = self.G1[:, 6]
            G2_perfect_degree = self.G2[0, :] 
            G2_jang_degree = self.G2[0, :]
            G2_dan_degree = self.G2[1, :]
            G2_gam_degree = self.G2[1, :]
            G2_jeung_degree = self.G2[2, :]

            after_degree = (self.current_degree + (self.increase_degree - 1)) % 7  # 도수 조정 및 7을 넘어가면 1로 돌아감
            after_degree = after_degree if after_degree != 0 else 7  # 0일 경우 7로 변경
            degree_type = self.determine_degree_type(after_degree)

            if self.current_string_number == 6:
                # 6번 줄 처리
                if drop_string_number >= 0 and drop_string_number <= 5:
                    if drop_string_number == 4 or drop_string_number == 5:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[0]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[0]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[0]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[0]
                    else:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[1]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[1]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[1]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[1]
                    
                    after_string_number = self.current_string_number - drop_string_number
                    note_name = self.calculate_note_name(after_string_number, after_fret_number, degree_type)
                    
                    return after_fret_number, after_string_number, after_degree, note_name, degree_type

            elif self.current_string_number == 5:
                # 5번 줄 처리
                if drop_string_number >= 0 and drop_string_number <= 4:
                    if drop_string_number == 3 or drop_string_number == 4:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[0]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[0]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[0]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[0]
                    else:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[1]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[1]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[1]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[1]
                    
                    after_string_number = self.current_string_number - drop_string_number
                    note_name = self.calculate_note_name(after_string_number, after_fret_number, degree_type)
                    
                    return after_fret_number, after_string_number, after_degree, note_name, degree_type

            elif self.current_string_number == 4:
                # 4번 줄 처리
                if drop_string_number >= 0 and drop_string_number <= 3:
                    if drop_string_number == 2 or drop_string_number == 3:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[0]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[0]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[0]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[0]
                    else:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[1]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[1]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[1]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[1]
                    
                    after_string_number = self.current_string_number - drop_string_number
                    note_name = self.calculate_note_name(after_string_number, after_fret_number, degree_type)
                    
                    return after_fret_number, after_string_number, after_degree, note_name, degree_type

            elif self.current_string_number == 3:
                # 3번 줄 처리
                if drop_string_number >= 0 and drop_string_number <= 2:
                    if drop_string_number == 1 or drop_string_number == 2:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[0]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[0]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[0]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[0]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[0]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[0]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[0]
                    else:
                        if self.increase_degree == 1:
                            after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[1]
                        elif self.increase_degree == 2:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 3:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 4:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '증':
                                after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[1]
                        elif self.increase_degree == 5:
                            if degree_type == '완전':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[1]
                            elif degree_type == '감':
                                after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[1]
                        elif self.increase_degree == 6:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[1]
                        elif self.increase_degree == 7:
                            if degree_type == '장':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[1]
                            elif degree_type == '단':
                                after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[1]
                    
                    after_string_number = self.current_string_number - drop_string_number
                    note_name = self.calculate_note_name(after_string_number, after_fret_number, degree_type)
                    
                    return after_fret_number, after_string_number, after_degree, note_name, degree_type

            elif self.current_string_number == 2:
                # 2번 줄 처리
                if drop_string_number >= 0 and drop_string_number <= 1:
                    
                        
                    if self.increase_degree == 1:
                        after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[1]
                    elif self.increase_degree == 2:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[1]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[1]
                    elif self.increase_degree == 3:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[1]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[1]
                    elif self.increase_degree == 4:
                        if degree_type == '완전':
                            after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[1]
                        elif degree_type == '증':
                            after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[1]
                    elif self.increase_degree == 5:
                        if degree_type == '완전':
                            after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[1]
                        elif degree_type == '감':
                            after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[1]
                    elif self.increase_degree == 6:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[1]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[1]
                    elif self.increase_degree == 7:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[1]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[1]
            
                    after_string_number = self.current_string_number - drop_string_number
                    note_name = self.calculate_note_name(after_string_number, after_fret_number, degree_type)
                    
                    return after_fret_number, after_string_number, after_degree, note_name, degree_type

            if self.current_string_number == 1:
            # 1번 줄 처리
                if drop_string_number == 0:
                    if self.increase_degree == 1:
                        after_fret_number = self.current_fret_number + G1_first_degree[drop_string_number] + G2_perfect_degree[0]
                    elif self.increase_degree == 2:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_jang_degree[0]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_second_degree[drop_string_number] + G2_dan_degree[0]
                    elif self.increase_degree == 3:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_jang_degree[0]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_third_degree[drop_string_number] + G2_dan_degree[0]
                    elif self.increase_degree == 4:
                        if degree_type == '완전':
                            after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_perfect_degree[0]
                        elif degree_type == '증':
                            after_fret_number = self.current_fret_number + G1_fourth_degree[drop_string_number] + G2_jeung_degree[0]
                    elif self.increase_degree == 5:
                        if degree_type == '완전':
                            after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_perfect_degree[0]
                        elif degree_type == '감':
                            after_fret_number = self.current_fret_number + G1_fifth_degree[drop_string_number] + G2_gam_degree[0]
                    elif self.increase_degree == 6:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_jang_degree[0]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_sixth_degree[drop_string_number] + G2_dan_degree[0]
                    elif self.increase_degree == 7:
                        if degree_type == '장':
                            after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_jang_degree[0]
                        elif degree_type == '단':
                            after_fret_number = self.current_fret_number + G1_seventh_degree[drop_string_number] + G2_dan_degree[0]

                    after_string_number = self.current_string_number - drop_string_number
                    note_name = self.calculate_note_name(after_string_number, after_fret_number, degree_type)

                    return after_fret_number, after_string_number, after_degree, note_name, degree_type
                else:
                    return None, None, None, None, None  # drop_string_number가 1 이상일 경우 처리 불가능한 상황 처리

                
        return None, None, None, None, None

# 매트릭스 정의
G1 = np.array([[1, 3, 5, 6, 8, 10, 12],
               [-4, -2, 0, 1, 3, 5, 7],
               [-9, -7, -5, -4, -2, 0, 2],
               [-14, -12, -10, -9, -7, -5, -3],
               [-19, -17, -15, -14, -12, -10, -8],
               [-24, -22, -20, -19, -17, -15, -13]])

G2 = np.array([[0, -1],
               [-1, -2],
               [1, 0]])

"""
# 사용자 입력
current_string_number = input('현재 줄 번호를 입력하세요: ')
current_fret_number = input('현재 프렛 번호를 입력하세요: ')
current_degree = input('현재 도수를 입력하세요: ')
increase_degree = input('올릴 도수를 입력하세요: ')

# 객체 생성
calculator = GuitarDegreeCalculator(G1, G2, current_string_number, current_fret_number, current_degree, increase_degree)

# 자동으로 drop_string_number를 0부터 5까지 실행
for drop_string_number in range(6):
    after_fret_number, after_string_number, after_degree, note_name, degree_type = calculator.calculate_degree(drop_string_number)
    if after_fret_number is not None:
        print(f"drop_string_number: {drop_string_number}, 프렛 번호: {after_fret_number}, 줄 번호: {after_string_number}, 도수: {after_degree}, 음이름: {note_name}, 음정종류: {degree_type}") 
    else:
        print(f"drop_string_number: {drop_string_number}, 조건에 맞는 계산 결과가 없습니다.")
print()
print(f"현재 줄 번호: {current_string_number}")
print(f"현재 프렛 번호: {current_fret_number}")
print(f"현재 도수: {current_degree}")
print(f"올릴 도수: {increase_degree}")
"""

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        current_string_number = request.form['current_string_number']
        current_fret_number = request.form['current_fret_number']
        current_degree = request.form['current_degree']
        increase_degree = request.form['increase_degree']

        # 임의의 G1, G2 값을 사용합니다.
         

        # 객체 생성
        calculator = GuitarDegreeCalculator(G1, G2, current_string_number, current_fret_number, current_degree, increase_degree)

        results = []
        # 자동으로 drop_string_number를 0부터 5까지 실행
        for drop_string_number in range(6):
            after_fret_number, after_string_number, after_degree, note_name, degree_type = calculator.calculate_degree(drop_string_number)
            if after_fret_number is not None:
                results.append(f"drop_string_number: {drop_string_number}, 프렛 번호: {after_fret_number}, 줄 번호: {after_string_number}, 도수: {after_degree}, 음이름: {note_name}, 음정종류: {degree_type}")
            else:
                results.append(f"drop_string_number: {drop_string_number}, 조건에 맞는 계산 결과가 없습니다.")

        return render_template('index.html', results=results, current_string_number=current_string_number, current_fret_number=current_fret_number, current_degree=current_degree, increase_degree=increase_degree)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
