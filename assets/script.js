// Define quiz questions and answers
const quizQuestions = [
    {
        question: "Which of these is NOT a javascript data type?",
        answers: ["Strings", "Booleans", "Letters", "Numbers"],
        correctAnswer: "Letters"
    },
    {
        question: "On what number does indexing start in a javascript array?",
        answers: ["0", "1", "-3", "42"],
        correctAnswer: "0"
    },
    {
        question: "What does === mean in Javascript?",
        answers: ["Triple Equals", "Strictly Equals", "Equals", "A red flag in any serious relationship"],
        correctAnswer: "Strictly Equals"
    },
    {
        question: "What set of symbols is used to house an array?",
        answers: ["{ }", "( )", "[ ]", "< >"],
        correctAnswer: "[ ]"
    },
    {
        question: "To call Javascript inside of HTML, which element do we use?",
        answers: ["< javascript >", "< js >", "< The Mitochondria is the Powerhouse of the Cell >", "< script >"],
        correctAnswer: "< script >"
    },
];

// Other global variables
let currentQuestionIndex = 0;
let timer;
let timeLeft = 60; // Initial time for the quiz (in seconds)

// Function to start the quiz
function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    // Start the timer
    timer = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endQuiz();
        }
        displayTimer(); // Update timer display every second
    }, 1000);

    // Display the first question
    displayQuestion();
    displayTimer();
}

// Function to display a question
function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.answers.map(answer => `<li onclick="handleAnswer('${answer}')">${answer}</li>`).join('')}
        </ul>
    `;
}

// Function to display the timer
function displayTimer() {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
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
        timeLeft -= 5;
        displayTimer();
    }
}

// Function to display high scores
function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    const highScoresContainer = document.getElementById("high-scores");
    highScoresContainer.innerHTML = "<h3>High Scores</h3>";
    highScores.forEach((score, index) => {
        const scoreItem = document.createElement("div");
        scoreItem.textContent = `${index + 1}. ${score.initials}: ${score.score}`;
        highScoresContainer.appendChild(scoreItem);
    });
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    const finalScore = timeLeft;
    const initials = document.getElementById("initials").value;

    saveUserData(initials, finalScore);

    const scoreMessage = `Your score is: ${finalScore}`;
    document.getElementById("score-message").textContent = scoreMessage;

    displayHighScores();

    const questionContainer = document.getElementById("question-container");
    questionContainer.parentNode.removeChild(questionContainer);

    document.getElementById("game-over").style.display = "block";

    document.getElementById("start-button").style.display = "none";

    document.getElementById("h3").style.display = "none";
}

// Function to save user's initials and final score in local storage
function saveUserData(initials, score) {

    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    if (initials.trim() !== "") {
        highScores.push({ initials, score });
        highScores.sort((a, b) => b.score - a.score);

        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
}

// Event listener for start button click
document.getElementById("start-button").addEventListener("click", startQuiz);

// Event listener for initials form submission
document.getElementById("initials-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const initials = document.getElementById("initials").value;
    const score = timeLeft;

    const highScoresContainer = document.getElementById("high-scores");
    const scoreItem = document.createElement("div");
    scoreItem.textContent = `${initials}: ${score}`;
    highScoresContainer.appendChild(scoreItem);

    document.getElementById("initials").value = "";
    saveUserData(initials, score);
});