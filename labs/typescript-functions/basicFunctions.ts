/**
 * Exercise 1: Function Essentials
 * 
 * This exercise covers:
 * - Typed parameters and return types
 * - Default parameters
 * - Optional parameters
 * - Rest parameters
 * - Lambda expressions
 */

// TODO: 1. Create a function called `calculateTotal` that:
//   - Takes typed parameters for an array of prices and an optional tax rate
//   - Returns the total price with tax applied (if provided)
//   - Uses a default tax rate of 0.1 (10%) if none is provided


// TODO: 2. Create a function called `formatName` that:
//   - Takes required parameters for firstName and lastName
//   - Takes an optional parameter for middleName
//   - Returns the formatted full name


// TODO: 3. Create a function called `logMessages` that:
//   - Uses rest parameters to accept any number of string messages
//   - Logs each message with a timestamp
//   - Returns the count of messages logged


// TODO: 4. Implement a `processItems` function that:
//   - Takes an array of items
//   - Takes a lambda function as a second parameter
//   - Applies the lambda function to each item
//   - Returns a new array with the processed items


// Demo: Uncomment the following lines to test your functions

/*
// Test calculateTotal function
console.log("--- Calculate Total ---");
const prices = [10, 20, 30];
console.log(calculateTotal(prices)); // Should output: 66 (default 10% tax)
console.log(calculateTotal(prices, 0.2)); // Should output: 72 (20% tax)

// Test formatName function
console.log("\n--- Format Name ---");
console.log(formatName("John", "Doe")); // Should output: "John Doe"
console.log(formatName("John", "Doe", "Smith")); // Should output: "John Smith Doe"

// Test logMessages function
console.log("\n--- Log Messages ---");
const messageCount = logMessages("Starting application", "Loading data", "Process complete");
console.log(`Total messages logged: ${messageCount}`);

// Test processItems function
console.log("\n--- Process Items ---");
const numbers = [1, 2, 3, 4, 5];
const doubled = processItems(numbers, (num) => num * 2);
console.log(doubled); // Should output: [2, 4, 6, 8, 10]
*/
