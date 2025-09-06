# Control Flow Lab

## Objectives
- Practice using conditional statements (if/else, switch)
- Implement different types of loops
- Use break and continue statements effectively
- Work with nested control structures

## Exercise 1: Number Analyzer
Create a program that analyzes numbers and provides different information based on various conditions.

### Requirements:
1. Create a function that takes a number as input
2. Determine if the number is:
   - Positive, negative, or zero
   - Even or odd
   - Prime or not prime
3. Use appropriate if/else statements
4. Use a loop for prime number checking
5. Handle invalid inputs (non-numbers)

### Expected Output:
```
Number Analysis: 7
-------------------
Type: Positive
Even/Odd: Odd
Prime: Yes

Number Analysis: -4
-------------------
Type: Negative
Even/Odd: Even
Prime: No
```

## Exercise 2: Pattern Generator
Create a program that generates different patterns using nested loops.

### Requirements:
1. Create functions for at least three different patterns
2. Use nested loops
3. Allow customizable pattern size
4. Include at least one pattern that uses both * and spaces

### Example Patterns:
```
Pattern 1 (size 4):
*
**
***
****

Pattern 2 (size 4):
   *
  **
 ***
****

Pattern 3 (size 4):
   *
  ***
 *****
*******
```

## Exercise 3: Number Guessing Game
Create a simple number guessing game with various control flows.

### Requirements:
1. Generate a random number between 1 and 100
2. Allow the user to guess multiple times
3. Provide hints (higher/lower)
4. Keep track of the number of guesses
5. Allow the option to play again
6. Use appropriate loops and break statements
7. Implement a maximum number of guesses

### Expected Interaction:
```
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
Enter your guess: 50
Too high! Try again.
Enter your guess: 25
Too low! Try again.
Enter your guess: 37
Congratulations! You got it in 3 guesses!
Play again? (y/n): 
```

## Bonus Challenge
Add difficulty levels to the number guessing game:
- Easy: 1-50, unlimited guesses
- Medium: 1-100, 10 guesses
- Hard: 1-200, 5 guesses

## Tips
- Break down each problem into smaller steps
- Test your code with different inputs
- Use console.log() for debugging
- Pay attention to edge cases
- Comment your code to explain your logic

## Getting Started
1. Create numberAnalyzer.js for Exercise 1
2. Create patternGenerator.js for Exercise 2
3. Create guessingGame.js for Exercise 3
4. Run your code using Node.js: `node filename.js`
