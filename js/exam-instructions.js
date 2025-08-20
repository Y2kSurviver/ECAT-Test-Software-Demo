const instructionConfirm = document.getElementById('instruction-confirm-check');
const softwareConfirm = document.getElementById('software-confirm-check');
const startExam = document.getElementById('start-exam-button');
const instructionArea = document.getElementById('instructions'); 
const downloadStatus = document.getElementById('paper-status');

startExam.addEventListener('click', () => {
    if (instructionConfirm.checked && softwareConfirm.checked) {
        window.location.href = 'exam-screen.html';
    }
});

fetch('content/exam-instruction.txt')
    .then(res => res.text())
    .then(insertInstructions)
    .catch(err => console.error(err));

function insertInstructions(data) {
    let instructions = data.split('\n');
    instructions = instructions.filter((str) => str.length > 0);

    for (let instruction of instructions) {
        const par = document.createElement('p');
        par.textContent = '* ' + instruction;
        instructionArea.appendChild(par);
    }
}

