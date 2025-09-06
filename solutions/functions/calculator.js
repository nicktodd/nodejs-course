// Calculator Library Solution

// Basic operations using different function types

// Function declaration
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Invalid input: numbers required');
    }
    return a + b;
}

// Function expression
const subtract = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Invalid input: numbers required');
    }
    return a - b;
};

// Arrow function
const multiply = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Invalid input: numbers required');
    }
    return a * b;
};

// Method shorthand in object
const calculator = {
    divide(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input: numbers required');
        }
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return a / b;
    }
};

// Advanced operations
function power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
        throw new Error('Invalid input: numbers required');
    }
    if (exponent < 0) {
        throw new Error('Negative exponents not supported');
    }
    if (exponent === 0) return 1;
    return base * power(base, exponent - 1);
}

function factorial(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        throw new Error('Invalid input: non-negative integer required');
    }
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

function average(...numbers) {
    if (numbers.length === 0) {
        throw new Error('No numbers provided');
    }
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error('Invalid input: numbers required');
    }
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Function factory
function createOperation(operator) {
    return function(x) {
        if (typeof x !== 'number') {
            throw new Error('Invalid input: number required');
        }
        switch(operator) {
            case 'double': return x * 2;
            case 'triple': return x * 3;
            case 'square': return x * x;
            default: throw new Error('Unknown operation');
        }
    };
}

// Memory functions
class CalculatorMemory {
    constructor() {
        this.memory = 0;
    }

    store(value) {
        if (typeof value !== 'number') {
            throw new Error('Invalid input: number required');
        }
        this.memory = value;
        return value;
    }

    recall() {
        return this.memory;
    }

    clear() {
        this.memory = 0;
        return this.memory;
    }
}

// Test the calculator
console.log('Calculator Operations');
console.log('-------------------');

// Test basic operations
console.log('\nBasic Operations:');
try {
    console.log('5 + 3 =', add(5, 3));
    console.log('10 - 4 =', subtract(10, 4));
    console.log('6 * 7 =', multiply(6, 7));
    console.log('15 / 3 =', calculator.divide(15, 3));
} catch (error) {
    console.error('Error:', error.message);
}

// Test advanced operations
console.log('\nAdvanced Operations:');
try {
    console.log('2^3 =', power(2, 3));
    console.log('5! =', factorial(5));
    console.log('Average(1,2,3,4,5) =', average(1, 2, 3, 4, 5));
} catch (error) {
    console.error('Error:', error.message);
}

// Test custom operations
console.log('\nCustom Operations:');
try {
    const double = createOperation('double');
    const triple = createOperation('triple');
    console.log('Double(5) =', double(5));
    console.log('Triple(5) =', triple(5));
} catch (error) {
    console.error('Error:', error.message);
}

// Test memory operations
console.log('\nMemory Operations:');
try {
    const memory = new CalculatorMemory();
    console.log('Stored:', memory.store(42));
    console.log('Recalled:', memory.recall());
    memory.clear();
    console.log('Memory Cleared');
} catch (error) {
    console.error('Error:', error.message);
}
