// Number Guessing Game Solution

// Simulate user input (in a real implementation, you would use readline or another input method)
let mockUserInput = [50, 25, 75, 62, 68, 65];
let inputIndex = 0;

function getInput(prompt) {
    // In a real implementation, this would get actual user input
    console.log(prompt);
    return mockUserInput[inputIndex++];
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame(maxNumber, maxGuesses) {
    const targetNumber = generateRandomNumber(1, maxNumber);
    let guesses = 0;
    let won = false;

    console.log(`I'm thinking of a number between 1 and ${maxNumber}.`);
    
    while (guesses < maxGuesses || maxGuesses === -1) {
        const guess = getInput(`Enter your guess (${guesses + 1}${maxGuesses === -1 ? '' : '/' + maxGuesses}): `);
        guesses++;

        // Input validation
        if (isNaN(guess) || guess < 1 || guess > maxNumber) {
            console.log(`Please enter a valid number between 1 and ${maxNumber}.`);
            continue;
        }

        // Check guess
        if (guess === targetNumber) {
            console.log(`Congratulations! You got it in ${guesses} guesses!`);
            won = true;
            break;
        } else if (guess < targetNumber) {
            console.log('Too low! Try again.');
        } else {
            console.log('Too high! Try again.');
        }

        // Check if out of guesses
        if (maxGuesses !== -1 && guesses >= maxGuesses) {
            console.log(`Sorry, you're out of guesses. The number was ${targetNumber}.`);
            break;
        }
    }

    return won;
}

function setDifficulty(level) {
    switch (level.toLowerCase()) {
        case 'easy':
            return { maxNumber: 50, maxGuesses: -1 }; // -1 for unlimited
        case 'medium':
            return { maxNumber: 100, maxGuesses: 10 };
        case 'hard':
            return { maxNumber: 200, maxGuesses: 5 };
        default:
            console.log('Invalid difficulty. Defaulting to medium.');
            return { maxNumber: 100, maxGuesses: 10 };
    }
}

// Game initialization
console.log('Welcome to the Number Guessing Game!');
console.log('Choose difficulty: easy, medium, or hard');

// Simulate choosing medium difficulty
const difficulty = 'medium';
const gameSettings = setDifficulty(difficulty);
console.log(`\nPlaying on ${difficulty} difficulty`);
startGame(gameSettings.maxNumber, gameSettings.maxGuesses);

// Note: In a real implementation, you would:
// 1. Use readline or another method for actual user input
// 2. Add a play again feature
// 3. Handle actual user difficulty selection
// 4. Add error handling for user inputs
