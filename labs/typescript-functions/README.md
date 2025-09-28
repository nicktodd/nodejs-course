# TypeScript Functions Lab

This lab contains exercises focused on TypeScript functions that will help you practice the key concepts of the module.

## Objectives
- Practice function essentials (typed parameters, returns, optional parameters)
- Implement function overloading
- Use additional techniques (object parameters, type aliases, destructuring)

## Prerequisites
- Node.js (v14 or higher)
- TypeScript (installed via npm)

## Setup
1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript files:
```bash
npm run build
```

3. Run the examples:
```bash
npx ts-node filename.ts
```

## Exercise 1: Function Essentials

Create a file named `basicFunctions.ts` that demonstrates the core concepts of TypeScript functions.

### Requirements:
1. Create a function called `calculateTotal` that:
   - Takes typed parameters for an array of prices and an optional tax rate
   - Returns the total price with tax applied (if provided)
   - Uses a default tax rate of 0.1 (10%) if none is provided

2. Create a function called `formatName` that:
   - Takes required parameters for firstName and lastName
   - Takes an optional parameter for middleName
   - Returns the formatted full name

3. Create a function called `logMessages` that:
   - Uses rest parameters to accept any number of string messages
   - Logs each message with a timestamp
   - Returns the count of messages logged

4. Implement a `processItems` function that:
   - Takes an array of items
   - Takes a lambda function as a second parameter
   - Applies the lambda function to each item
   - Returns a new array with the processed items

### Expected Output:
```typescript
// Example usage
const prices = [10, 20, 30];
console.log(calculateTotal(prices)); // 66 (default 10% tax)
console.log(calculateTotal(prices, 0.2)); // 72 (20% tax)

console.log(formatName("John", "Doe")); // "John Doe"
console.log(formatName("John", "Doe", "Smith")); // "John Smith Doe"

logMessages("Starting application", "Loading data", "Process complete");
// Outputs:
// [current timestamp] Starting application
// [current timestamp] Loading data
// [current timestamp] Process complete
// Returns: 3

const numbers = [1, 2, 3, 4, 5];
const doubled = processItems(numbers, (num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

## Exercise 2: Function Overloading

Create a file named `overloadedFunctions.ts` that demonstrates function overloading in TypeScript.

### Requirements:
1. Create an overloaded function called `formatData` that:
   - Can accept a string and return a string (uppercase)
   - Can accept a number and return a string (formatted with 2 decimal places)
   - Can accept an array of strings and return a single string (joined with commas)
   - Can accept an array of numbers and return a single string (sum formatted with 2 decimal places)

2. Create a `createElement` function that:
   - Can create a basic element with just a tag name
   - Can create an element with tag name and text content
   - Can create an element with tag name and a config object for attributes
   - Can create an element with tag name, config object, and text content

3. Implement proper type checking within the function body

### Expected Output:
```typescript
// Example usage
console.log(formatData("hello")); // "HELLO"
console.log(formatData(123.456)); // "123.46"
console.log(formatData(["apple", "banana", "cherry"])); // "apple, banana, cherry"
console.log(formatData([1, 2, 3, 4])); // "10.00"

const element1 = createElement("div");
// { tag: "div", attributes: {}, content: "" }

const element2 = createElement("p", "Hello World");
// { tag: "p", attributes: {}, content: "Hello World" }

const element3 = createElement("a", { href: "https://example.com", class: "link" });
// { tag: "a", attributes: { href: "https://example.com", class: "link" }, content: "" }

const element4 = createElement("button", { class: "btn" }, "Click Me");
// { tag: "button", attributes: { class: "btn" }, content: "Click Me" }
```

## Exercise 3: Advanced Function Techniques

Create a file named `advancedFunctions.ts` that demonstrates additional function techniques.

### Requirements:
1. Create a function called `processConfig` that:
   - Takes an object parameter with specific properties (name, enabled, values)
   - Has some optional properties
   - Validates and processes the config

2. Create a type alias called `FilterFunction` for a function that:
   - Takes any value
   - Returns a boolean indicating whether to keep the value

3. Create a function called `filterItems` that:
   - Uses the FilterFunction type alias
   - Takes an array of any type and a filter function
   - Returns filtered items

4. Create a function that demonstrates object destructuring in parameters

5. Create a function that uses union type parameters and type guards

### Expected Output:
```typescript
// Example usage
type Config = {
  name: string;
  enabled: boolean;
  values?: number[];
  maxItems?: number;
};

const result = processConfig({ 
  name: "TestConfig", 
  enabled: true, 
  values: [1, 2, 3] 
});
console.log(result);

// Using the FilterFunction type alias
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterItems(numbers, (n) => n % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// Using object destructuring
displayUserInfo({ name: "John", age: 30, email: "john@example.com" });
// Output: "Name: John, Age: 30, Email: john@example.com"

// Using union types
printValue("Hello"); // "String: Hello"
printValue(42);      // "Number: 42"
printValue(true);    // "Boolean: true"
```

## Tips

- Make sure to use proper type annotations for parameters and return values
- Test your functions with different inputs to ensure they work correctly
- Use type inference where appropriate
- Remember that optional parameters must come after required parameters
- Use descriptive parameter and function names
- Comment your code to explain your implementation decisions

## Bonus Challenge

Create a small utility library that combines concepts from all three exercises:

1. Create a function called `createValidator` that:
   - Is overloaded to handle different validation scenarios
   - Takes object parameters with optional properties
   - Returns functions that can validate different data types
   - Uses type aliases for readability
   - Incorporates lambda functions

2. Implement at least 3 different validation functions:
   - String validator (checks length, pattern, etc.)
   - Number validator (checks range, is integer, etc.)
   - Array validator (checks length, contents, etc.)

## Getting Started

1. Create the required files for each exercise:
   ```bash
   touch basicFunctions.ts overloadedFunctions.ts advancedFunctions.ts
   ```

2. Install required dependencies:
   ```bash
   npm install typescript @types/node
   ```

3. Compile and run:
   ```bash
   tsc filename.ts
   node filename.js
   ```

4. Alternatively, run directly with ts-node:
   ```bash
   npx ts-node filename.ts
   ```

## Summary of TypeScript Function Concepts Covered

1. **Function Essentials**
   - Typed parameters and return types
   - Default parameter values
   - Optional parameters (using ?)
   - Rest parameters (...args)
   - Lambda expressions/arrow functions

2. **Function Overloading**
   - Multiple function signatures
   - Implementation with type checking
   - Handling different parameter types and counts

3. **Additional Techniques**
   - Object parameters with defined shapes
   - Type aliases for function signatures
   - Object destructuring in parameters
   - Union types for parameters
   - Type guards for runtime type checking
