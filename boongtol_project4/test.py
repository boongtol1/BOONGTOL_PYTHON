from flask import Flask, render_template, request, jsonify

class CAGEDChord:
    def __init__(self, name, shape, degrees):
        self.name = name  # 코드 이름
        self.shape = shape  # CAGED 모양
        self.degrees = degrees  # 도수

    def display_chord(self):
        shape_degree_count = {
            "C": 5,
            "A": 5,
            "E": 6,
            "G": 6,
            "D": 4
        }
        display_degrees = [d if d <= 7 else (d - 7) for d in self.degrees[:shape_degree_count[self.shape]]]
        return f"[{self.name} - {self.shape} 모양] 도수: {'-'.join(map(str, display_degrees))}"

def generate_major_scale_chords():
    scales = {
        "C": ["C Major", "D Minor", "E Minor", "F Major", "G Major", "A Minor"],
        "C#": ["C# Major", "D# Minor", "F Minor", "F# Major", "G# Major", "A# Minor"],
        "D": ["D Major", "E Minor", "F# Minor", "G Major", "A Major", "B Minor"],
        "D#": ["D# Major", "F Minor", "G Minor", "G# Major", "A# Major", "C Minor"],
        "E": ["E Major", "F# Minor", "G# Minor", "A Major", "B Major", "C# Minor"],
        "F": ["F Major", "G Minor", "A Minor", "A# Major", "C Major", "D Minor"],
        "F#": ["F# Major", "G# Minor", "A# Minor", "B Major", "C# Major", "D# Minor"],
        "G": ["G Major", "A Minor", "B Minor", "C Major", "D Major", "E Minor"],
        "G#": ["G# Major", "A# Minor", "C Minor", "C# Major", "D# Major", "F Minor"],
        "A": ["A Major", "B Minor", "C# Minor", "D Major", "E Major", "F# Minor"],
        "A#": ["A# Major", "C Minor", "D Minor", "D# Major", "F Major", "G Minor"],
        "B": ["B Major", "C# Minor", "D# Minor", "E Major", "F# Major", "G# Minor"]
    }

    chords = {}
    for key, scale in scales.items():
        chords[key] = {
            "1도 Major": [
                CAGEDChord(scale[0], shape, [1, 3, 5, 1, 3, 1] if shape in ["C", "G"] else [1, 5, 1, 3, 5, 1])
                for shape in ["C", "A", "G", "E", "D"]
            ],
            "2도 Minor": [
                CAGEDChord(scale[1], shape, [2, 4, 6, 2, 4, 2] if shape in ["C", "G"] else [2, 6, 2, 4, 6, 2])
                for shape in ["C", "A", "G", "E", "D"]
            ],
            "3도 Minor": [
                CAGEDChord(scale[2], shape, [3, 5, 7, 3, 5, 3] if shape in ["C", "G"] else [3, 7, 3, 5, 7, 3])
                for shape in ["C", "A", "G", "E", "D"]
            ],
            "4도 Major": [
                CAGEDChord(scale[3], shape, [4, 6, 1, 4, 6, 4] if shape in ["C", "G"] else [4, 1, 4, 6, 1, 4])
                for shape in ["C", "A", "G", "E", "D"]
            ],
            "5도 Major": [
                CAGEDChord(scale[4], shape, [5, 7, 2, 5, 7, 5] if shape in ["C", "G"] else [5, 2, 5, 7, 2, 5])
                for shape in ["C", "A", "G", "E", "D"]
            ],
            "6도 Minor": [
                CAGEDChord(scale[5], shape, [6, 1, 3, 6, 1, 6] if shape in ["C", "G"] else [6, 3, 6, 1, 3, 6])
                for shape in ["C", "A", "G", "E", "D"]
            ]
        }
    return chords

app = Flask(__name__)
all_chords = generate_major_scale_chords()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_chords', methods=['POST'])
def get_chords():
    key = request.json.get('key')
    result = {}
    if key in all_chords:
        for chord_type, chord_list in all_chords[key].items():
            result[chord_type] = [chord.display_chord() for chord in chord_list]
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5001,debug=True)
