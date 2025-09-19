// TypeScript Decorators Lab Exercise - Starter Template
// Complete the TODO sections below to learn modern decorator patterns

console.log("=== TypeScript Decorators Lab - Starter ===\n");

/*
INSTRUCTIONS:
1. Implement the three decorator functions below
2. Apply the decorators to the test classes
3. Run the code to see your decorators in action
4. Experiment with different decorator combinations

MODERN DECORATOR SYNTAX:
- Method decorator: (originalMethod, context) => newMethod
- Class decorator: (originalClass, context) => newClass
- Context provides: { kind, name, static, private, access, addInitializer }
*/

// ===================================
// TODO 1: Implement Method Decorator
// ===================================
/*
Create a decorator that logs when methods are called.
It should:
- Log the method name when called
- Log the arguments passed to the method
- Call the original method
- Log and return the result
*/

// TODO: Implement this function
function logMethodCall(originalMethod: any, context: ClassMethodDecoratorContext) {
  // HINT: Return a wrapper function that:
  // 1. Logs method name using context.name
  // 2. Logs the arguments
  // 3. Calls originalMethod.apply(this, arguments)
  // 4. Logs and returns the result
  
  // Your code here...
  return originalMethod; // Replace this with your implementation
}

// ===================================
// TODO 2: Implement Validation Decorator Factory
// ===================================
/*
Create a decorator factory that validates method arguments.
It should:
- Take a validator function as parameter
- Return a decorator that validates arguments before method execution
- Throw an error if validation fails
- Allow method execution if validation passes
*/

// TODO: Implement this function
function validateArgs(validator: (args: any[]) => boolean) {
  // HINT: Return a decorator function that:
  // 1. Checks arguments using the validator
  // 2. Throws error if invalid
  // 3. Calls original method if valid
  
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    // Your code here...
    return originalMethod; // Replace this with your implementation
  };
}

// ===================================
// TODO 3: Implement Class Decorator
// ===================================
/*
Create a class decorator that adds a timestamp to instances.
It should:
- Add a 'createdAt' property with current date
- Add a 'getAge()' method that returns age in milliseconds
- Preserve all original class functionality
*/

// TODO: Implement this function
function addTimestamp(originalClass: any, context: ClassDecoratorContext) {
  // HINT: Return a class that extends originalClass and adds:
  // 1. createdAt property in constructor
  // 2. getAge() method
  
  // Your code here...
  return originalClass; // Replace this with your implementation
}

// ===================================
// TEST CLASSES - Apply Your Decorators Here
// ===================================

// Simple Calculator class
class Calculator {
  // TODO: Add @logMethodCall decorator above this method
  add(a: number, b: number): number {
    return a + b;
  }

  // TODO: Add validation decorator to ensure both arguments are numbers
  // Use: @validateArgs((args) => args.length === 2 && args.every(arg => typeof arg === 'number'))
  // TODO: Also add @logMethodCall decorator
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// User class for testing class decorator
// TODO: Add @addTimestamp decorator above this class
class User {
  constructor(public name: string, public email: string) {
    console.log(`User created: ${name}`);
  }

  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

// ===================================
// TEST YOUR IMPLEMENTATION
// ===================================

console.log("Testing your decorator implementations...\n");

// Test Calculator
console.log("--- Calculator Tests ---");
const calc = new Calculator();
console.log("Result of 5 + 3:", calc.add(5, 3));
console.log("Result of 4 * 6:", calc.multiply(4, 6));

// Test User with timestamp (if implemented)
console.log("\n--- User Tests ---");
const user = new User("Alice", "alice@example.com");
console.log("User info:", user.getInfo());

// If you implemented addTimestamp correctly, these should work:
// console.log("User created at:", (user as any).createdAt);
// console.log("User age (ms):", (user as any).getAge());

// Test validation (if implemented)
console.log("\n--- Validation Tests ---");
try {
  // This should work if validateArgs is implemented:
  // calc.multiply(2, 3);
  
  // This should fail if validateArgs is implemented:
  // (calc as any).multiply("invalid", "args");
  console.log("Add validation decorator to see this in action!");
} catch (error) {
  console.log("Validation error:", (error as Error).message);
}

console.log("\n=== Next Steps ===");
console.log("1. Implement logMethodCall to see method logging");
console.log("2. Implement validateArgs to see argument validation");  
console.log("3. Implement addTimestamp to see class enhancement");
console.log("4. Apply decorators to the test classes");
console.log("5. Run the code again to see your decorators work!");

// ===================================
// BONUS CHALLENGES
// ===================================
/*
Once you complete the basic decorators, try these:

1. Performance Decorator:
   Create a decorator that measures how long methods take to execute

2. Retry Decorator:
   Create a decorator that retries failed method calls

3. Cache Decorator:
   Create a decorator that caches method results

4. Multiple Decorators:
   Apply multiple decorators to the same method and observe execution order
*/