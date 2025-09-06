// Basic Types and Type Annotations
console.log('TypeScript Basic Types Demo');

// Basic type annotations
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
let anyValue: any = 'can be anything';
let unknownValue: unknown = 4;

// Type inference
let inferredString = 'This is a string'; // TypeScript infers string type
let inferredNumber = 42;                 // TypeScript infers number type

// Arrays
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ['apple', 'banana', 'orange'];

// Tuple
let tuple: [string, number] = ['age', 25];

// Enum
enum Direction {
    North,
    South,
    East,
    West
}
let userDirection: Direction = Direction.North;

// Object type
let user: {
    name: string;
    age: number;
    active?: boolean; // Optional property
} = {
    name: 'John',
    age: 30
};

// Demonstrating type checking
console.log('\nType Examples:');
console.log('String:', name);
console.log('Number:', age);
console.log('Boolean:', isActive);
console.log('Any:', anyValue);
console.log('Unknown:', unknownValue);
console.log('Array of numbers:', numbers);
console.log('Tuple:', tuple);
console.log('Enum:', userDirection);
console.log('Object:', user);

// Type assertions
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
// Alternative syntax:
// let strLength: number = (<string>someValue).length;

// Union types
let id: string | number = 101;
id = "202"; // Both valid
console.log('\nUnion type:', id);

// Literal types
let mouseEvent: 'click' | 'dblclick' | 'mouseup' | 'mousedown';
mouseEvent = 'click'; // Only these values are allowed
// mouseEvent = 'scroll'; // This would cause an error

// Type aliases
type Point = {
    x: number;
    y: number;
};

let position: Point = { x: 10, y: 20 };
console.log('\nPosition:', position);

// Null and undefined
let nullableString: string | null = null;
let undefinedNumber: number | undefined;

// void type
function logMessage(message: string): void {
    console.log(message);
}

// never type
function throwError(message: string): never {
    throw new Error(message);
}

// Trying to use type checking
function processValue(val: unknown) {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    }
}

console.log('\nType Checking:');
processValue('hello');
processValue(42.123);
