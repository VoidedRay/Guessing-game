let secretNumber = null;
let attempts = 0;
let timer = null;
let timeLeft = 30;

// Countdown Timer Handler
function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            const feedback = document.getElementById("feedback");
            feedback.innerText = "⏳ Time's up! Game over!";
            feedback.className = "feedback hint-high";
            disableInputs();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timeLeftElem = document.getElementById("timeLeft");
    const timerBox = document.getElementById("timerDisplay");
    
    if (timeLeftElem) {
        timeLeftElem.innerText = `${timeLeft}s`;
    }

    if (timerBox) {
        if (timeLeft <= 10) {
            timerBox.classList.add("warning");
        } else {
            timerBox.classList.remove("warning");
        }
    }
}

function disableInputs() {
    const guessInput = document.getElementById("guessInput") || document.getElementById("player2Guess");
    const submitBtn = document.getElementById("submitBtn");
    
    if (guessInput) guessInput.disabled = true;
    if (submitBtn) submitBtn.disabled = true;
}

// 1-Player Initialization
function initSinglePlayer() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    startTimer();
}

// 1-Player Guess Logic
function makeSinglePlayerGuess() {
    const guessInput = document.getElementById("guessInput");
    const feedback = document.getElementById("feedback");
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        feedback.innerText = "Please enter a valid number!";
        feedback.className = "feedback";
        return;
    }

    attempts++;

    if (guess > secretNumber) {
        feedback.innerText = "Too high! 🍂 Try again.";
        feedback.className = "feedback hint-high";
    } else if (guess < secretNumber) {
        feedback.innerText = "Too low! 🌾 Try again.";
        feedback.className = "feedback hint-low";
    } else {
        clearInterval(timer);
        feedback.innerText = `🎉 Correct! You guessed it in ${attempts} attempt(s)!`;
        feedback.className = "feedback hint-correct";
        disableInputs();
    }

    guessInput.value = "";
}

// 2-Player Set Secret Number
function setSecretNumber() {
    const input = document.getElementById("secretNum");
    const val = parseInt(input.value);

    if (isNaN(val)) {
        alert("Please enter a valid number!");
        return;
    }

    secretNumber = val;
    attempts = 0;

    document.getElementById("setupSection").style.display = "none";
    document.getElementById("guessSection").style.display = "block";
    document.getElementById("feedback").innerText = "Secret number locked in! Player 2's turn.";
    document.getElementById("feedback").className = "feedback";

    startTimer();
}

// 2-Player Guess Logic
function makeTwoPlayerGuess() {
    const guessInput = document.getElementById("player2Guess");
    const feedback = document.getElementById("feedback");
    const guess = parseInt(guessInput.value);

    if (isNaN(guess)) {
        feedback.innerText = "Please enter a valid number!";
        feedback.className = "feedback";
        return;
    }

    attempts++;

    if (guess > secretNumber) {
        feedback.innerText = "Too high! 🍂 Try again.";
        feedback.className = "feedback hint-high";
    } else if (guess < secretNumber) {
        feedback.innerText = "Too low! 🌾 Try again.";
        feedback.className = "feedback hint-low";
    } else {
        clearInterval(timer);
        feedback.innerText = `🎉 Player 2 got it! Solved in ${attempts} attempt(s)!`;
        feedback.className = "feedback hint-correct";
        disableInputs();
    }

    guessInput.value = "";
}