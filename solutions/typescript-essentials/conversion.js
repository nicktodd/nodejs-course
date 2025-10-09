// Original JavaScript code for reference

// Simple calculator in JavaScript
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
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

const calculator = {
    add,
    subtract,
    multiply,
    divide,
    performOperation: function(operation, a, b) {
        return this[operation](a, b);
    }
};

const result1 = calculator.performOperation('add', 10, 5);
const result2 = calculator.performOperation('subtract', 10, 5);
const result3 = calculator.performOperation('multiply', 10, 5);
const result4 = calculator.performOperation('divide', 10, 5);

console.log(`Addition: ${result1}`);
console.log(`Subtraction: ${result2}`);
console.log(`Multiplication: ${result3}`);
console.log(`Division: ${result4}`);
