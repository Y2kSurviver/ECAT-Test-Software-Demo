const instructionArea = document.getElementById('instructions'); 
const r = fetch('content/exam-instruction.txt')
    .then((res) => res.text())
    .then(insertInstructions);

function insertInstructions(data) {
    let instructions = data.split('\n');
    instructions = instructions.filter((str) => str.length > 0);
    console.log(instructions);

    for (let instruction of instructions) {
        const par = document.createElement('p');
        par.textContent = '* ' + instruction;
        instructionArea.appendChild(par);
    }
}
