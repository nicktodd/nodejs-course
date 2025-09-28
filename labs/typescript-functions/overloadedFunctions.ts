/**
 * Exercise 2: Function Overloading
 * 
 * This exercise covers:
 * - Function overload signatures
 * - Implementation of overloaded functions
 * - Type guards with overloaded functions
 */

// TODO: 1. Create an overloaded function called `formatData` that:
//   - Can accept a string and return a string (uppercase)
//   - Can accept a number and return a string (formatted with 2 decimal places)
//   - Can accept an array of strings and return a single string (joined with commas)
//   - Can accept an array of numbers and return a single string (sum formatted with 2 decimal places)


// TODO: 2. Create a `createElement` function that:
//   - Can create a basic element with just a tag name
//   - Can create an element with tag name and text content
//   - Can create an element with tag name and a config object for attributes
//   - Can create an element with tag name, config object, and text content


// TODO: 3. Implement proper type checking within the function body using type guards


// Demo: Uncomment the following lines to test your functions

/*
// Test formatData function
console.log("--- Format Data Function ---");
console.log(formatData("hello")); // Should output: "HELLO"
console.log(formatData(123.456)); // Should output: "123.46"
console.log(formatData(["apple", "banana", "cherry"])); // Should output: "apple, banana, cherry"
console.log(formatData([1, 2, 3, 4])); // Should output: "10.00"

// Test createElement function
console.log("\n--- Create Element Function ---");
const element1 = createElement("div");
console.log(element1);
// Should output: { tag: "div", attributes: {}, content: "" }

const element2 = createElement("p", "Hello World");
console.log(element2);
// Should output: { tag: "p", attributes: {}, content: "Hello World" }

const element3 = createElement("a", { href: "https://example.com", class: "link" });
console.log(element3);
// Should output: { tag: "a", attributes: { href: "https://example.com", class: "link" }, content: "" }

const element4 = createElement("button", { class: "btn" }, "Click Me");
console.log(element4);
// Should output: { tag: "button", attributes: { class: "btn" }, content: "Click Me" }
*/
