// Advanced Types and Type Manipulation

// Interfaces
interface Person {
    name: string;
    age: number;
    email?: string; // Optional property
    greet(): void;
}

// Implementing an interface
class Employee implements Person {
    constructor(
        public name: string,
        public age: number,
        private salary: number
    ) {}

    greet(): void {
        console.log(`Hello, I'm ${this.name}`);
    }

    // Private method
    private calculateBonus(): number {
        return this.salary * 0.1;
    }
}

// Type intersection
type Admin = {
    role: string;
    privileges: string[];
};

type StaffMember = Person & Admin;

const staffMember: StaffMember = {
    name: 'Jane',
    age: 32,
    role: 'Administrator',
    privileges: ['create', 'delete'],
    greet() {
        console.log(`Hello, I'm ${this.name}, the ${this.role}`);
    }
};

// Generic type
interface Box<T> {
    content: T;
}

const numberBox: Box<number> = { content: 42 };
const stringBox: Box<string> = { content: 'Hello' };

// Union types with type guards
type StringOrNumber = string | number;

function processInput(input: StringOrNumber): void {
    if (typeof input === 'string') {
        console.log(input.toUpperCase());
    } else {
        console.log(input.toFixed(2));
    }
}

// Literal types with unions
type Theme = 'light' | 'dark' | 'system';
let currentTheme: Theme = 'light';

// Mapped types
type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};

// Example usage of mapped types
interface User {
    name: string;
    age: number;
}

const readOnlyUser: ReadOnly<User> = {
    name: 'John',
    age: 30
};

// Demonstrating the features
console.log('TypeScript Advanced Types Demo');

const john = new Employee('John', 30, 50000);
john.greet();

console.log('\nStaff Member:');
staffMember.greet();

console.log('\nBoxed Values:');
console.log('Number box:', numberBox.content);
console.log('String box:', stringBox.content);

console.log('\nProcessing Union Types:');
processInput('hello');
processInput(42.123);

console.log('\nCurrent Theme:', currentTheme);

// Type assertion with 'as'
let someString = 'Hello' as const;
let len = (someString as string).length;

// Index types
interface Dictionary<T> {
    [key: string]: T;
}

const numberDict: Dictionary<number> = {
    'one': 1,
    'two': 2,
    'three': 3
};

console.log('\nDictionary Values:', numberDict);

// Conditional types
type IsString<T> = T extends string ? true : false;
type Result1 = IsString<string>;  // true
type Result2 = IsString<number>;  // false

// Utility types
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type PartialTodo = Partial<Todo>;  // All properties become optional
type ReadonlyTodo = Readonly<Todo>;  // All properties become readonly

const partialTodo: PartialTodo = {
    title: 'Learn TypeScript'
    // Other fields are optional
};

console.log('\nPartial Todo:', partialTodo);
