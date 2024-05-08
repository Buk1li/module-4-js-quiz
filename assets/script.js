// Define quiz questions and answers
const quizQuestions = [
    {
        question: "Question One?",
        answers: ["One", "Two", "Three", "Four"],
        correctAnswer: "One"
    },
    {
        question: "Question Two?",
        answers: ["One", "Two", "Three", "Four"],
        correctAnswer: "Two"
    },
    // Add more questions here...
];

// Other global variables
let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // Initial time for the quiz (in seconds)

// Function to start the quiz
function startQuiz() {
    // Start the timer
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);

    // Display the first question
    displayQuestion();
}

// Function to display a question
function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.answers.map(answer => `<li>${answer}</li>`).join('')}
        </ul>
    `;
}

// Function to handle user's answer
function handleAnswer(answer) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
        // Correct answer, move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        // Incorrect answer, subtract time
        timeLeft -= 10; // Penalty time (in seconds)
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    // Display game over message
    document.getElementById("question-container").innerHTML = "<h2>Game Over</h2>";
    // Allow user to save initials and score
    const initials = prompt("Enter your initials:");
    const score = timeLeft;
    // Save initials and score (you can implement this part as needed)
}

// Event listener for start button click
document.getElementById("start-button").addEventListener("click", startQuiz);