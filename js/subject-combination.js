// candidate must check the box to proceed if subject combination is correct
const checkbox = document.getElementById('subject-combination-checkbox');
const nextButton = document.getElementById('next-section'); 

nextButton.addEventListener('click', () => {
    console.log(checkbox.checked);
    if (checkbox.checked) {
        window.location.href = 'student-verification-screen.html';
    }
});
