// TypeScript Decorators Lab Exercise
// Complete the TODO sections to implement modern ECMAScript 2022+ decorators

console.log("=== TypeScript Decorators Lab ===\n");

// ===================================
// EXERCISE 1: Basic Method Decorator
// ===================================
/*
TODO: Create a method decorator called 'logMethodCall' that:
1. Uses the modern (value, context) signature
2. Logs when a method is called with its name
3. Logs the method arguments and return value
4. Returns a wrapper function that preserves the original functionality

Hint: The decorator should return a function that replaces the original method
*/

// TODO: Implement the logMethodCall decorator here
function logMethodCall(originalMethod: any, context: ClassMethodDecoratorContext) {
  // Your implementation here
  // Remember to return a wrapper function that:
  // 1. Logs the method call
  // 2. Calls the original method
  // 3. Logs the return value
  // 4. Returns the result
}

// ===================================
// EXERCISE 2: Parameterized Decorator
// ===================================
/*
TODO: Create a decorator factory called 'validateArgs' that:
1. Takes a validator function as parameter
2. Returns a decorator that validates method arguments
3. Throws an error if validation fails
4. Allows the method to execute if validation passes

Example usage: @validateArgs((args) => args.every(arg => typeof arg === 'string'))
*/

// TODO: Implement the validateArgs decorator factory here
function validateArgs(validator: (args: any[]) => boolean) {
  // Your implementation here
  // Return a decorator function that:
  // 1. Validates arguments before method execution
  // 2. Throws error if validation fails
  // 3. Calls original method if validation passes
}

// ===================================
// EXERCISE 3: Class Decorator
// ===================================
/*
TODO: Create a class decorator called 'addTimestamp' that:
1. Adds a 'createdAt' property to instances
2. Adds a 'getAge()' method that returns milliseconds since creation
3. Preserves all original class functionality
4. Uses class extension to add the new features

Hint: Return a class that extends the original class
*/

// TODO: Implement the addTimestamp decorator here
function addTimestamp(originalClass: any, context: ClassDecoratorContext) {
  // Your implementation here
  // Return a class that extends originalClass and adds:
  // 1. createdAt property set to new Date()
  // 2. getAge() method that returns Date.now() - createdAt.getTime()
}

// ===================================
// TEST CLASSES
// ===================================

// Test class for Exercise 1 & 2
class Calculator {
  // TODO: Apply the logMethodCall decorator to this method
  add(a: number, b: number): number {
    return a + b;
  }

  // TODO: Apply the validateArgs decorator to ensure both args are numbers
  // Use: @validateArgs((args) => args.length === 2 && args.every(arg => typeof arg === 'number'))
  multiply(a: number, b: number): number {
    return a * b;
  }
}

// Test class for Exercise 3
// TODO: Apply the addTimestamp decorator to this class
class UserAccount {
  constructor(public username: string, public email: string) {
    console.log(`UserAccount created for ${username}`);
  }

  getAccountInfo(): string {
    return `User: ${this.username} (${this.email})`;
  }
}

// ===================================
// EXERCISE 4: Multiple Decorators
// ===================================
/*
TODO: Create a class that uses multiple decorators and observe their execution order.
Apply both logMethodCall and validateArgs to the same method.
Note: Decorators execute from bottom to top (right to left in horizontal syntax)
*/

class BankAccount {
  private balance: number = 0;

  constructor(public accountNumber: string, initialBalance: number = 0) {
    this.balance = initialBalance;
  }

  // TODO: Apply both decorators - logMethodCall and validateArgs
  // validateArgs should ensure amount is a positive number: (args) => args[0] > 0
  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }

  // TODO: Apply both decorators with appropriate validation
  withdraw(amount: number): number {
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
    return this.balance;
  }

  getBalance(): number {
    return this.balance;
  }
}

// ===================================
// TEST YOUR IMPLEMENTATION
// ===================================

console.log("Testing Calculator...");
const calc = new Calculator();
console.log("5 + 3 =", calc.add(5, 3));
console.log("4 * 6 =", calc.multiply(4, 6));

console.log("\nTesting UserAccount...");
const user = new UserAccount("alice", "alice@example.com");
console.log(user.getAccountInfo());
// TODO: Test the getAge() method after implementing addTimestamp decorator

console.log("\nTesting BankAccount...");
const account = new BankAccount("ACC123", 100);
console.log("Initial balance:", account.getBalance());
console.log("After deposit of 50:", account.deposit(50));
console.log("After withdrawal of 30:", account.withdraw(30));

// TODO: Test error cases
console.log("\nTesting error cases...");
try {
  // This should trigger validation error if validateArgs is implemented correctly
  // calc.multiply("invalid", "args");
} catch (error) {
  console.log("Validation error:", (error as Error).message);
}

try {
  // This should trigger insufficient funds error
  account.withdraw(1000);
} catch (error) {
  console.log("Business logic error:", (error as Error).message);
}

console.log("\n=== Lab Complete ===");
console.log("If you see method calls being logged and validations working,");
console.log("you've successfully implemented modern TypeScript decorators!");

// ===================================
// BONUS CHALLENGES (Optional)
// ===================================
/*
1. Create a @cache decorator that caches method results
2. Create a @retry decorator that retries failed method calls
3. Create a @deprecated decorator that warns when methods are called
4. Combine multiple decorators on the same method/class
*/