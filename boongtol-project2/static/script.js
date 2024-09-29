document.getElementById('math-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const answerSection = document.getElementById('answer-section');
    const answerDisplay = document.getElementById('answer');

    fetch('http://127.0.0.1:5000/solve', {  // Flask 서버 주소로 요청
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        answerSection.classList.remove('hidden');
        answerDisplay.innerHTML = data.answer;
    })
    .catch(error => {
        console.error('Error:', error);
        answerSection.classList.remove('hidden');
        answerDisplay.innerHTML = '문제를 해결할 수 없습니다. 다시 시도해주세요.';
    });
});
