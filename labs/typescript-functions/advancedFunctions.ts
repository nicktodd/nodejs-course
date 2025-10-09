/**
 * Exercise 3: Advanced Function Techniques
 * 
 * This exercise covers:
 * - Object parameters
 * - Type aliases
 * - Function type aliases
 * - Destructuring parameters
 * - Union types as parameters
 */

// TODO: 1. Create a type alias called `Config` for an object with properties:
// - name: string
// - enabled: boolean
// - values?: number[] (optional)
// - maxItems?: number (optional)


// TODO: 2. Create a function called `processConfig` that:
//   - Takes a Config object parameter
//   - Validates and processes the config
//   - Returns a processed version of the config


// TODO: 3. Create a type alias called `FilterFunction` for a function that:
//   - Takes any value
//   - Returns a boolean indicating whether to keep the value


// TODO: 4. Create a function called `filterItems` that:
//   - Uses the FilterFunction type alias
//   - Takes an array of any type and a filter function
//   - Returns filtered items


// TODO: 5. Create a function called `displayUserInfo` that:
//   - Demonstrates object destructuring in parameters
//   - Takes an object with name, age, and email properties
//   - Returns a formatted string with the user information


// TODO: 6. Create a function called `printValue` that:
//   - Uses union type parameters and type guards
//   - Can handle string, number, and boolean types
//   - Prints a different message based on the type


// Demo: Uncomment the following lines to test your functions

/*
// Test processConfig function
console.log("--- Process Config ---");
const result = processConfig({ 
  name: "TestConfig", 
  enabled: true, 
  values: [1, 2, 3] 
});
console.log(result);

// Test filterItems function
console.log("\n--- Filter Items ---");
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterItems(numbers, (n) => n % 2 === 0);
console.log(evenNumbers); // Should output: [2, 4, 6]

// Test displayUserInfo function
console.log("\n--- Display User Info ---");
const userInfo = displayUserInfo({ name: "John", age: 30, email: "john@example.com" });
console.log(userInfo); // Should output: "Name: John, Age: 30, Email: john@example.com"

// Test printValue function
console.log("\n--- Print Value ---");
printValue("Hello"); // Should output: "String: Hello"
printValue(42);      // Should output: "Number: 42"
printValue(true);    // Should output: "Boolean: true"
*/
