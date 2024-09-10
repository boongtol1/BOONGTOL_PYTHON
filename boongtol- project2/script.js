document.getElementById('math-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const answerSection = document.getElementById('answer-section');
    const answerDisplay = document.getElementById('answer');

    // API 요청 부분 (실제 API를 사용해 연동할 수 있습니다)
    fetch('https://api.mathsolver.com/solve', {
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
