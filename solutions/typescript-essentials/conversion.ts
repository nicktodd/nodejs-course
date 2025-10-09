// TypeScript Essentials - Exercise 4 Solution: JavaScript to TypeScript Conversion

// Define types for the calculator
type OperationType = 'add' | 'subtract' | 'multiply' | 'divide';

interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    performOperation(operation: OperationType, a: number, b: number): number;
}

// Implementation with types
function add(a: number, b: number): number {
    return a + b;
}

function subtract(a: number, b: number): number {
    return a - b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

const calculator: Calculator = {
    add,
    subtract,
    multiply,
    divide,
    performOperation: function(operation: OperationType, a: number, b: number): number {
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
