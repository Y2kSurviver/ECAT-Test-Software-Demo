const showPasswordCheckBox = document.getElementById('show-password');
const passwordInput = document.getElementById('pwd');

showPasswordCheckBox.addEventListener('change', () => {
    if (showPasswordCheckBox.checked) passwordInput.type = 'text';
    else passwordInput.type = 'password';
});

const usernameInput = document.getElementById('username');

usernameInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        event.preventDefault();
        passwordInput.focus();
    }
});

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    //window.location.replace('subject-combination.html');
    window.location.href = 'subject-combination.html';
});

