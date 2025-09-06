// Basic Function Types and Parameters

// Function with type annotations
function add(x: number, y: number): number {
    return x + y;
}
console.log('Add numbers:', add(5, 3));

// Function with optional parameter
function greet(name: string, title?: string): string {
    if (title) {
        return `Hello, ${title} ${name}`;
    }
    return `Hello, ${name}`;
}
console.log(greet('John'));
console.log(greet('John', 'Mr.'));

// Function with default parameter
function createEmail(to: string, subject = 'No Subject'): string {
    return `To: ${to}, Subject: ${subject}`;
}
console.log(createEmail('john@example.com'));
console.log(createEmail('jane@example.com', 'Meeting'));

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log('Sum:', sum(1, 2, 3, 4, 5));

// Function overloads
function convertToString(value: string): string;
function convertToString(value: number): string;
function convertToString(value: boolean): string;
function convertToString(value: string | number | boolean): string {
    return String(value);
}
console.log(convertToString('hello'));
console.log(convertToString(42));
console.log(convertToString(true));

// Arrow functions with type annotations
const multiply = (x: number, y: number): number => x * y;
console.log('Multiply:', multiply(4, 5));

// Method parameters and return type
class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }

    subtract(x: number, y: number): number {
        return x - y;
    }
}

// Function type aliases
type MathOperation = (x: number, y: number) => number;

const divide: MathOperation = (x, y) => {
    if (y === 0) throw new Error('Cannot divide by zero');
    return x / y;
};

// Generic function
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

console.log(firstElement([1, 2, 3]));
console.log(firstElement(['a', 'b', 'c']));

// Generic constraints
interface HasLength {
    length: number;
}

function describeLengthType<T extends HasLength>(item: T): string {
    return `Length: ${item.length}`;
}

console.log(describeLengthType('hello'));
console.log(describeLengthType([1, 2, 3]));

// Function as parameter
function executeOperation(x: number, y: number, operation: MathOperation): number {
    return operation(x, y);
}

console.log('Execute add:', executeOperation(5, 3, add));
console.log('Execute multiply:', executeOperation(5, 3, multiply));

// Async function with Promise
async function fetchData(url: string): Promise<string> {
    // Simulated fetch
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

// Using async/await
async function demonstrateAsync() {
    console.log('Fetching data...');
    const result = await fetchData('https://api.example.com/data');
    console.log('Result:', result);
}

demonstrateAsync().catch(console.error);

// Function with this parameter
interface User {
    name: string;
    greet(this: User): void;
}

const user: User = {
    name: 'John',
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

user.greet();

// Call signatures
interface StringFormatter {
    (str: string): string;
    locale?: string;
}

const toUpperCase: StringFormatter = (str: string) => str.toUpperCase();
toUpperCase.locale = 'en-US';

console.log(toUpperCase('hello'));
