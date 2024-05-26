const questions = [
    {
        question: "Which type of JavaScript language is ?",
        answers: [
            { text: "Object-Oriented", correct: false },
            { text: "Object-Based", correct: true },
            { text: "Assembly-language", correct: false },
            { text: "High-level", correct: false },
        ]
    },
    {
        question: "Which one of the following also known as Conditional Expression:",
        answers: [
            { text: "Alternative to if-else", correct: false },
            { text: "Switch statement", correct: false },
            { text: "Switch statement", correct: false },
            { text: "immediate if", correct: true },
        ]
    },
    {
        question: "In JavaScript, what is a block of statement?",
        answers: [
            { text: "Conditional block", correct: false },
            { text: "block that combines a number of statements into a single compound statement", correct: true },
            { text: "both conditional block and a single statement", correct: false },
            { text: "block that contains a single statement", correct: false },
        ]
    },
    {
        question: "When interpreter encounters an empty statements, what it will do:",
        answers: [
            { text: "Shows a warning", correct: false },
            { text: "Prompts to complete the statement", correct: false },
            { text: "Throws an error", correct: false },
            { text: "Ignores the statements", correct: true },
        ]
    },
    {
        question: "The function and var are known as: ",
        answers: [
            { text: "Keywords", correct: false },
            { text: "Data types", correct: false },
            { text: "Declaration statements", correct: true },
            { text: "High-level", correct: false },
        ]
    },
    {
        question: "In JavaScript, what will be used for calling the function definition expression:",
        answers: [
            { text: "Function prototype", correct: false },
            { text: "Function literal", correct: true },
            { text: "Function calling", correct: false },
            { text: "Function declaration", correct: false },
        ]
    },
    {
        question: "In the JavaScript, which one of the following is not considered as an error:",
        answers: [
            { text: "Syntax error", correct: false },
            { text: "Missing of semicolons", correct: false },
            { text: "Division by zero", correct: true },
            { text: "Missing of Bracket", correct: false },
        ]
    },
    {
        question: "Which of the following number object function returns the value of the number?",
        answers: [
            { text: "toString()", correct: false },
            { text: "valueOf()", correct: true },
            { text: "toLocaleString()", correct: false },
            { text: "toPrecision()", correct: false },
        ]
    },
    {
        question: "Which of the following option is used as hexadecimal literal beginning?",
        answers: [
            { text: "00", correct: false },
            { text: "0x", correct: false },
            { text: "0X", correct: false },
            { text: "Both 0x and 0X", correct: true },
        ]
    },
    {
        question: "Which of the following type of a variable is volatile?",
        answers: [
            { text: "Mutable variable", correct: true },
            { text: "Dynamic variable", correct: false },
            { text: "Volatile variable", correct: false },
            { text: "Immutable variable", correct: false },
        ]
    },
    // {
    //     question: "Which one of the following is the correct way for calling the JavaScript code?",
    //     answers: [
    //         { text: "Preprocessor", correct: false },
    //         { text: "RMI", correct: false },
    //         { text: "Function/Method", correct: true },
    //         { text: "Triggering Event", correct: false },
    //     ]
    // }
];

const questionElement = document.getElementById("questions");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Your Score: ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
