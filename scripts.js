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

        const examples = document.createElement('ul');
        data[tense].forEach((verb, index) => {
            const example = document.createElement('li');
            example.textContent = verb.sentence.replace('____', verb.answer);
            examples.appendChild(example);

            const form = document.createElement('form');
            form.innerHTML = `
                <label for="verb${tense}${index + 1}">${verb.sentence}</label>
                <input type="text" id="verb${tense}${index + 1}" name="verb${tense}${index + 1}">
                <button type="button" onclick="checkAnswer('verb${tense}${index + 1}', '${verb.answer}')">Check</button>
            `;

            const feedback = document.createElement('p');
            feedback.id = `feedback${tense}${index + 1}`;

            tabContent.appendChild(example);
            tabContent.appendChild(form);
            tabContent.appendChild(feedback);
        });
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkAnswer(inputId, correctAnswer) {
    const userAnswer = document.getElementById(inputId).value;
    const feedback = document.getElementById('feedback' + inputId.charAt(inputId.length - 1));
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Try again!';
        feedback.style.color = 'red';
    }
}
