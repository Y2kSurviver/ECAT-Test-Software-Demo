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
const zoomOut = document.getElementById('zoom-out-button');
const zoomIn = document.getElementById('zoom-in-button');
let zoom = 15;
const minZoom = 10;
const maxZoom = 30;
const totalTime = 6000; // In seconds
let timeLeft = totalTime;
const timeLeftP = document.getElementById('time-left');
let attemptedQuestions = 0;
const attemptedQuestionsP = document.getElementById('attempted-questions-count');
let canFinish = false;
const finishBt = document.getElementById('finish-button');
// data about the questions grid at the bottom
const questions = [];
let current = null;
let choice = null;

setInterval(() => {
    timeLeft--;
    timeLeftP.innerText = format(timeLeft);
}, 1000);

finishBt.addEventListener('click', () => {
    if (canFinish) {
        console.log('test finished');
    }
});

zoomOut.addEventListener('click', () => {
    zoom = limitVal(zoom - 1, minZoom, maxZoom);
    currentQuestionP.style.fontSize = `${zoom}px`;
});

zoomIn.addEventListener('click', () => {
     zoom = limitVal(zoom + 1, minZoom, maxZoom);
    currentQuestionP.style.fontSize = `${zoom}px`;
});

studentDetailShow.addEventListener('click', () => {
    popup.classList.remove('close');
});

studentDetailClose.addEventListener('click', () => {
    popup.classList.add('close');
});

radioButtons.forEach((radio, i) => {
    radio.addEventListener('change', () => {
        current.attempted = true;
        resetOptionsStyling();
        optionContainers[i].classList.add('option-selected');
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
        resetOptionsStyling();
        attemptedQuestions++;
        setAttempted();
    }
});


fetch('content/ecat_mcqs.json')
    .then(res => res.json())
    .then(handleMCQs);

function handleMCQs(mcqs) {
    shuffle(mcqs.questions, 100);
    for (let i = 0; i < mcqs.questions.length; i++) {
        const question = new Question(mcqs.questions[i], i);
        questions.push(question);
    }


    current = questions[0];
    current.state = states.CURRENT;
    current.render(currentQuestionP, optionChoices);

    for (let question of questions) {
        question.renderToGrid(questionsGrid);
    }
}

function resetOptionsStyling() {
    const optionCarr = Object.values(optionContainers);
    optionCarr.forEach(optionC => {
        optionC.classList.remove('option-selected');
    });
}

function limitVal(val, min, max) {
    if (val < min) {
        return min;
    } else if (val > max) {
        return max;
    } else {
        return val;
    }
}

function format(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `0${hours}:${minutes}:${seconds}`;
}

// Set the text in attempted questions
function setAttempted() {
    attemptedQuestionsP.innerText = `Attempted Questions: ${attemptedQuestions}/10`;
    if (attemptedQuestions >= 50) {
        canFinish = true;
        finishBt.style.color = 'black';
        finishBt.style.fontWeight = 'bold';
    }
}

function shuffle(arr, iter) {
    for (let i = 0; i < iter; i++) {
        const indexA = Math.floor(Math.random() * 100);
        const indexB = Math.floor(Math.random() * 100);
        swap(arr, indexA, indexB);
    }
}

function swap(arr, a, b) {
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}
