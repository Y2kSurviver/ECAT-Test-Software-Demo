const studentDetailShow = document.getElementById('show-student-detail');
const studentDetailClose = document.getElementById('close-button');
const popup = document.getElementById('popup-container');
const currentQuestionP = document.getElementById('current-question');
const optionsForm = document.getElementById('options-form');
const optionChoices = document.getElementsByClassName('option');
const radioButtons = document.querySelectorAll('input[type="radio"]');
const optionContainers = document.getElementsByClassName('option-container');
const questionsGrid = document.getElementById('questions-grid-display');
const skipButton = document.getElementById('skip-button');
const saveButton = document.getElementById('save-button');

// data about the questions grid at the bottom
const questions = [];
let current = null;
let choice = null;

studentDetailShow.addEventListener('click', () => {
    popup.classList.remove('close');
});

studentDetailClose.addEventListener('click', () => {
    popup.classList.add('close');
});

radioButtons.forEach((radio, i) => {
    radio.addEventListener('change', () => {
        current.attempted = true;
        choice = String.fromCharCode(65 + i);
    });
});

skipButton.addEventListener('click', () => {
    if (!current.attempted) {
        current.skip();
    }
});

saveButton.addEventListener('click', () => {
    if (current.attempted) {
        current.save();
    }
});


fetch('content/ecat_mcqs.json')
    .then(res => res.json())
    .then(handleMCQs);

function handleMCQs(mcqs) {
    for (let i = 0; i < mcqs.questions.length; i++) {
        const question = new Question(mcqs.questions[i], i);
        questions.push(question);
    }

    current = questions[0];
    current.state = states.CURRENT;
    current.render(currentQuestionP, optionChoices);

    console.log(questions);

    for (let question of questions) {
        question.renderToGrid(questionsGrid);
    }
    // generateOptions(data);
}

//TODO: add option-select class to radion buttons for highlighting

