document.addEventListener('DOMContentLoaded', () => {
    fetch('verbs.json')
        .then(response => response.json())
        .then(data => generateContent(data))
        .catch(error => console.error('Error fetching the JSON:', error));

    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            tabLinks.forEach(link => link.classList.remove('current'));
            this.classList.add('current');

            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('current'));
            document.getElementById(tabId).classList.add('current');
        });
    });
});

function generateContent(data) {
    for (const tense in data) {
        const tabContent = document.getElementById(tense);
        tabContent.innerHTML = `<h2>${capitalizeFirstLetter(tense)} Tense</h2>`;

        data[tense].forEach((verb, index) => {
            const example = document.createElement('p');
            example.textContent = verb.sentence.replace('____', verb.answer);
            tabContent.appendChild(example);

            const form = document.createElement('form');
            form.innerHTML = `
                <label for="verb${tense}${index}">${verb.sentence}</label>
                <input type="text" id="verb${tense}${index}" name="verb${tense}${index}">
                <button type="button" onclick="checkAnswer('verb${tense}${index}', '${verb.answer}', 'feedback${tense}${index}')">Check</button>
            `;

            const feedback = document.createElement('p');
            feedback.id = `feedback${tense}${index}`;

            tabContent.appendChild(form);
            tabContent.appendChild(feedback);
        });
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkAnswer(inputId, correctAnswer, feedbackId) {
    const userAnswer = document.getElementById(inputId).value;
    const feedback = document.getElementById(feedbackId);
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Try again!';
        feedback.style.color = 'red';
    }
}
