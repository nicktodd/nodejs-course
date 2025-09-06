// Simple Calculator Solution

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Cannot divide by zero';
    }
    return a / b;
}

// Bonus: Input validation
function validateInput(num) {
    if (typeof num !== 'number') {
        return false;
    }
    return num >= -1000 && num <= 1000;
}

// Test calculator
const num1 = 10;
const num2 = 5;
const num3 = 0;

console.log('Calculator Results');
console.log('----------------');

// Only perform operations if inputs are valid
if (validateInput(num1) && validateInput(num2)) {
    console.log(`${num1} + ${num2} = ${add(num1, num2)}`);
    console.log(`${num1} - ${num2} = ${subtract(num1, num2)}`);
    console.log(`${num1} * ${num2} = ${multiply(num1, num2)}`);
    console.log(`${num1} / ${num2} = ${divide(num1, num2)}`);
    console.log(`${num1} / ${num3} = ${divide(num1, num3)}`);
} else {
    console.log('Invalid input: Numbers must be between -1000 and 1000');
}
