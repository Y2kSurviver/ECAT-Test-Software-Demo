// There are two special objects in the architecture
// 1) Question 
// 2) Current Question
// This class contains methods related to both


const states = {
    LOCKED: 'locked',
    SKIPPED: 'skipped',
    ATTEMPTED: 'attempted',
    CURRENT: 'current'
};

class Question {
    constructor(mcq, num) {
        this.mcq = mcq;
        this.button = document.createElement('button');
        this.state = states.LOCKED;
        this.questionNum = num;
        this.setStyling();
        this.attempted = false;
        this.choice = ''; // students answer
    }
   
    setStyling() {
        this.button.removeAttribute('class');
        this.button.classList.add(this.state);
    }

    // Render to the questions grid
    renderToGrid(gridDisplay) {
        this.button.textContent = `Q ${this.questionNum + 1}`;
        gridDisplay.appendChild(this.button);
    }

    // Used my the current question to render to the display div
    render(display, optionsDisplay) {
        // Render the current question
        display.innerText = this.mcq.question;

        // Render the options
        Object.entries(this.mcq.options).forEach(([key, option], i) => {
            const optionDisplay = optionsDisplay[i];
            optionDisplay.innerText = option; 
        });

        this.setStyling();
        this.setOptions();
    }

    setOptions() {
        radioButtons.forEach(radio => {
            radio.checked = false;
        });
    }

    // This will always be called on the current question
    skip() {
        // skip past all the attempted questoins
        for (let i = this.questionNum + 1; i < questions.length; i++) {
            if (!questions[i].attempted) {
                // (the previous queston, the new queston index);
                this.manageStateChange(states.SKIPPED, i);
                this.skipBack();
                //current.skipBack();
                break; 
            }
        }
    }

    save() {
        for (let i = this.questionNum + 1; i < questions.length; i++) {
            if (!questions[i].attempted) {
                // (the previous queston, the new queston index);
                this.manageStateChange(states.ATTEMPTED, i);
                this.setChoice();
                break; 
            }
        }
    }

    manageStateChange(state, index) {
        const next = questions[index];
        
        // change current 
        this.state = state;
        this.setStyling();

        // switch
        current = next;

        // next
        current.state = states.CURRENT;
        current.setStyling();
        current.render(currentQuestionP, optionChoices);
    }

    // prev being the previous question 
    // cannot skip forward
    skipBack() {
        this.button.addEventListener('click', () => {
            console.log({ current, other: this});
            if (!this.attempted) {
                if (!current.attempted) {
                    current.manageStateChange(states.SKIPPED, this.questionNum); 
                } 
                else {
                    current.setChoice();
                    current.manageStateChange(states.ATTEMPTED, this.questionNum); 
                }
            }
        });
    }

    setChoice() {
        if (this.attempted) {
            questions[this.questionNum].choice = choice;
        }
    }
}
