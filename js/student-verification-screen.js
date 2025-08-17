const backButton = document.getElementById('back-button');
const verifyInputBox = document.getElementById('verify-input');
const verifyButton = document.getElementById('verify-button');

verifyInputBox.focus();
verifyButton.addEventListener('click', () => window.location.href = 'exam-instructions.html');

backButton.addEventListener('click', () => window.location.href = 'subject-combination.html');
