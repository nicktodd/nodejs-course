# Basic JavaScript Lab

## Objectives
- Practice using JavaScript variables and data types
- Work with JavaScript operators
- Create and run a simple JavaScript application
- Practice debugging using console.log

## Prerequisites
- Basic terminal usage
- Node.js installed locally
- Completion of foundational JavaScript demos in this course

## Exercise 1: Temperature Converter
Create a program that converts temperatures between Fahrenheit and Celsius.

### Requirements:
1.1 Create variables for input temperatures in Fahrenheit and Celsius.
1.2 Implement Fahrenheit to Celsius conversion using the provided formula.
1.3 Implement Celsius to Fahrenheit conversion using the provided formula.
1.4 Use descriptive variable names and template literals for output.
1.5 Format numeric results to 2 decimal places.

### Formula:
- Celsius to Fahrenheit: (C x 9/5) + 32
- Fahrenheit to Celsius: (F - 32) x 5/9

### Expected Output:
```
Temperature Converter
--------------------
32F is 0.00C
0C is 32.00F
98.6F is 37.00C
37C is 98.60F
```

## Exercise 2: Simple Calculator
Create a calculator that performs basic arithmetic operations.

### Requirements:
2.1 Create variables for two numbers.
2.2 Implement addition, subtraction, multiplication, and division.
2.3 Use appropriate arithmetic operators for each operation.
2.4 Handle division by zero with a clear message.
2.5 Format output clearly for each calculation.

### Expected Output:
```
Calculator Results
----------------
10 + 5 = 15
10 - 5 = 5
10 * 5 = 50
10 / 5 = 2
10 / 0 = Cannot divide by zero
```

## Bonus Challenge
Add input validation to ensure numbers are within a reasonable range (e.g., between -1000 and 1000).

## Tips
- Test your code with different values
- Use console.log() for debugging
- Pay attention to code formatting and organization
- Comment your code to explain what it does

## Getting Started
1. Open the existing file temperature.js for Exercise 1.
2. Open the existing file calculator.js for Exercise 2.
3. Run your code with Node.js:

```bash
node temperature.js
node calculator.js
```
