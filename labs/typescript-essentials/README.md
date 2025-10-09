# TypeScript Essentials Lab

## Objectives
- Practice using TypeScript basic types and type annotations
- Work with arrays, tuples, and enums
- Configure TypeScript compiler options
- Convert JavaScript code to TypeScript
- Handle type checking and strictness

## Exercise 1: Getting Started with TypeScript
Set up a TypeScript environment and practice basic type annotations.

### Requirements:
1. Create a new file called `basics.ts`
2. Define variables with the following types:
   - `name` (string)
   - `age` (number)
   - `isStudent` (boolean)
   - `courses` (array of strings)
   - `grades` (array of numbers)
3. Define a simple function that accepts two numbers and returns their sum
4. Compile your TypeScript code using the TypeScript compiler
5. Run the compiled JavaScript code using Node.js

### Expected Output:
```typescript
// Example code
const name: string = "John Doe";
const age: number = 25;
const isStudent: boolean = true;
const courses: string[] = ["TypeScript", "JavaScript", "Node.js"];
const grades: number[] = [85, 90, 95];

function addNumbers(a: number, b: number): number {
    return a + b;
}

console.log(`${name} is ${age} years old`);
console.log(`Is student: ${isStudent}`);
console.log(`Courses: ${courses.join(", ")}`);
console.log(`Average grade: ${grades.reduce((a, b) => a + b, 0) / grades.length}`);
console.log(`Sum of 5 and 10: ${addNumbers(5, 10)}`);
```

## Exercise 2: Working with Complex Types
Practice working with arrays, tuples, and enums in TypeScript.

### Requirements:
1. Create a new file called `complex-types.ts`
2. Define an enum for `DaysOfWeek` (Monday through Sunday)
3. Create a tuple type called `Person` that contains a name (string), age (number), and whether they are employed (boolean)
4. Create an array of `Person` tuples
5. Write a function that filters the array to find people who are employed
6. Write a function that calculates the average age of people in the array
7. Use the enum in a function that returns whether a given day is a weekday or weekend

### Expected Output:
```typescript
// Example code
enum DaysOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

// Define Person tuple type
type Person = [string, number, boolean]; // [name, age, isEmployed]

// Create array of people
const people: Person[] = [
    ["Alice", 25, true],
    ["Bob", 30, false],
    ["Charlie", 35, true],
    ["Diana", 28, true]
];

// Function to filter employed people
function findEmployed(people: Person[]): Person[] {
    return people.filter(person => person[2] === true);
}

// Function to calculate average age
function calculateAverageAge(people: Person[]): number {
    const totalAge = people.reduce((sum, person) => sum + person[1], 0);
    return totalAge / people.length;
}

// Function to check if a day is a weekday
function isWeekday(day: DaysOfWeek): boolean {
    return day >= DaysOfWeek.Monday && day <= DaysOfWeek.Friday;
}

// Display results
const employed = findEmployed(people);
console.log("Employed people:", employed.length);
console.log("Average age:", calculateAverageAge(people));
console.log("Is Monday a weekday?", isWeekday(DaysOfWeek.Monday));
console.log("Is Saturday a weekday?", isWeekday(DaysOfWeek.Saturday));
```

## Exercise 3: TypeScript Configuration and Strictness
Learn how to configure TypeScript and work with strictness settings.

### Requirements:
1. Create a new project directory called `config-project`
2. Set up a `tsconfig.json` file with the following features:
   - Target ES2020
   - Enable strict mode
   - Include source map generation
   - Specify an output directory called "dist"
3. Create a file called `config-demo.ts` that includes:
   - Variables with explicit and implicit type assignments
   - A function with properly typed parameters and return value
   - An object with a defined interface
   - Usage of union types to allow null or undefined values
4. Compile the project using the configuration
5. Fix any strictness errors that appear

### Expected Output:
```typescript
// Example tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "strict": true,
    "sourceMap": true
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules"]
}

// Example config-demo.ts
interface User {
    id: number;
    name: string;
    email: string | null;
    age?: number; // Optional property
}

// Explicit type assignments
const userId: number = 1;
const userName: string = "John Doe";
const userEmail: string | null = null;

// Implicit type assignments (let TypeScript infer)
const isActive = true;
const scores = [85, 90, 95];

// Function with typed parameters and return value
function calculateTotal(prices: number[]): number {
    return prices.reduce((total, price) => total + price, 0);
}

// Object with defined interface
const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
    // age is optional
};

// Using union types for null/undefined
function getDisplayName(user: User): string {
    return user.name || "Anonymous";
}

console.log("User:", user);
console.log("Display name:", getDisplayName(user));
console.log("Total score:", calculateTotal(scores));
```

## Exercise 4: JavaScript to TypeScript Conversion
Practice converting JavaScript code to TypeScript.

### Requirements:
1. Create a new file called `conversion.js` with the following JavaScript code:
   ```javascript
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
   ```

2. Convert the JavaScript code to TypeScript in a new file called `conversion.ts`:
   - Add appropriate type annotations to function parameters and return types
   - Create an interface for the calculator object
   - Use string literal types for operation names
   - Enable strict type checking

3. Compile the TypeScript code and ensure it runs correctly

### Expected Output:
```typescript
// Example conversion to TypeScript
// The converted code should have proper type annotations
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
    performOperation(operation: 'add' | 'subtract' | 'multiply' | 'divide', a: number, b: number): number;
}

// Implementation with types
function add(a: number, b: number): number {
    return a + b;
}

// ... rest of the converted code with types
```

## Tips
- Use TypeScript's type inference where appropriate
- Make sure to run the TypeScript compiler to check for errors
- Test your compiled code to make sure it works as expected
- Practice using different compiler options

## Getting Started
1. Install TypeScript and the required types for Node.js:
   ```bash
   npm install -g typescript
   npm install @types/node
   ```
   
2. Create the necessary files for each exercise
   
3. Compile your TypeScript files:
   ```bash
   tsc filename.ts
   ```
   
4. Run the compiled JavaScript:
   ```bash
   node filename.js
   ```
   
5. For Exercise 3 with configuration:
   ```bash
   tsc -p config-project
   node config-project/dist/config-demo.js
   ```
