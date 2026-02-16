"use strict";
// Handles the Less or More game logic and UI
document.addEventListener('DOMContentLoaded', () => {
    const leftNumSpan = document.getElementById('left-number');
    const rightNumSpan = document.getElementById('right-number');
    const comparisonSymbol = document.getElementById('comparison-symbol');
    const statusText = document.getElementById('game-status-text');
    const lessBtn = document.getElementById('less-button');
    const moreBtn = document.getElementById('more-button');
    const nextBtn = document.getElementById('next-button');
    const scoreNum = document.getElementById('score-num');
    const highScoreNum = document.getElementById('high-score-num');
    let leftNumber = Math.floor(Math.random() * 10);
    let rightNumber = NaN;
    let score = 0;
    let highScore = 0;
    let roundActive = true;
    /**
     * Initialize the game by setting scores and starting the first round.
     */
    function initializeGame() {
        scoreNum.textContent = score.toString();
        highScoreNum.textContent = highScore.toString();
        startNewRound();
    }
    /**
     * Start a new round by generating a new right number and updating the UI.
     * After each round, the previous right number becomes the new left number.
     */
    function startNewRound() {
        // Start a new round
        roundActive = true;
        // Update left number to previous right number if valid
        if (isNaN(rightNumber) === false) {
            leftNumber = rightNumber;
        }
        rightNumber = Math.floor(Math.random() * 10);
        // Update UI elements for the new round
        leftNumSpan.textContent = leftNumber.toString();
        rightNumSpan.textContent = '?';
        comparisonSymbol.textContent = '?';
        lessBtn.disabled = false;
        moreBtn.disabled = false;
        lessBtn.style.display = '';
        moreBtn.style.display = '';
        nextBtn.style.display = 'none';
        nextBtn.disabled = true;
        statusText.textContent = 'Less or more?';
    }
    /**
     * Reveal right number and update UI after guess.
     * @param userGuess - The user's guess, either 'less' or 'more'.
     */
    function revealResult(userGuess) {
        let correct = false;
        // End the round
        roundActive = false;
        // Reveal the right number
        rightNumSpan.textContent = rightNumber.toString();
        // Determine if the user's guess was correct
        if (rightNumber === leftNumber) {
            correct = true;
            comparisonSymbol.textContent = '=';
        }
        else if (userGuess === 'less') {
            if (leftNumber > rightNumber) {
                correct = true;
                comparisonSymbol.textContent = '>';
            }
            else {
                correct = false;
                comparisonSymbol.textContent = '<';
            }
        }
        else if (userGuess === 'more') {
            if (leftNumber < rightNumber) {
                correct = true;
                comparisonSymbol.textContent = '<';
            }
            else {
                correct = false;
                comparisonSymbol.textContent = '>';
            }
        }
        // Update score and status text based on correctness
        if (correct) {
            score++;
            statusText.textContent = 'Good guess! 🎉';
            scoreNum.textContent = score.toString();
            if (score > highScore) {
                highScore = score;
                highScoreNum.textContent = highScore.toString();
            }
        }
        else {
            statusText.textContent = 'Wrong! Try again.';
            score = 0;
            scoreNum.textContent = '0';
        }
        // Make the Less and More buttons hidden and disable them
        lessBtn.style.display = 'none';
        moreBtn.style.display = 'none';
        lessBtn.disabled = true;
        moreBtn.disabled = true;
        // Show and enable the Next button
        nextBtn.style.display = '';
        nextBtn.disabled = false;
    }
    // Button event handlers
    lessBtn.addEventListener('click', () => {
        if (roundActive)
            revealResult('less');
    });
    moreBtn.addEventListener('click', () => {
        if (roundActive)
            revealResult('more');
    });
    nextBtn.addEventListener('click', () => {
        startNewRound();
    });
    // Initial state
    initializeGame();
});
//# sourceMappingURL=less_or_more.js.map