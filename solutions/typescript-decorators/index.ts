// TypeScript Decorators Lab - Complete Solutions
// Modern ECMAScript 2022+ decorator implementations

console.log("=== TypeScript Decorators Solutions ===\n");

// ===================================
// SOLUTION 1: Basic Method Decorator
// ===================================

function logMethodCall(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  
  return function(this: any, ...args: any[]) {
    console.log(`[LOG] Calling method: ${methodName}`);
    console.log(`[LOG] Arguments:`, args);
    
    const result = originalMethod.apply(this, args);
    
    console.log(`[LOG] Method ${methodName} returned:`, result);
    return result;
  };
}

// ===================================
// SOLUTION 2: Parameterized Decorator
// ===================================

function validateArgs(validator: (args: any[]) => boolean) {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);
    
    return function(this: any, ...args: any[]) {
      console.log(`[VALIDATE] Validating arguments for ${methodName}:`, args);
      
      if (!validator(args)) {
        throw new Error(`[VALIDATE] Invalid arguments for ${methodName}: ${JSON.stringify(args)}`);
      }
      
      console.log(`[VALIDATE] Arguments valid for ${methodName}`);
      return originalMethod.apply(this, args);
    };
  };
}

// ===================================
// SOLUTION 3: Class Decorator
// ===================================

function addTimestamp<T extends new (...args: any[]) => any>(originalClass: T, context: ClassDecoratorContext) {
  console.log(`[DECORATOR] Adding timestamp functionality to ${context.name}`);
  
  return class extends originalClass {
    public createdAt: Date = new Date();
    
    constructor(...args: any[]) {
      super(...args);
      console.log(`[TIMESTAMP] Instance of ${context.name} created at ${this.createdAt.toISOString()}`);
    }
    
    getAge(): number {
      const age = Date.now() - this.createdAt.getTime();
      console.log(`[TIMESTAMP] Instance age: ${age}ms`);
      return age;
    }
    
    getCreatedAt(): Date {
      return this.createdAt;
    }
  };
}

// ===================================
// ENHANCED SOLUTIONS (Bonus)
// ===================================

// Performance monitoring decorator
function measurePerformance(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  
  return function(this: any, ...args: any[]) {
    const start = performance.now();
    
    const result = originalMethod.apply(this, args);
    
    const end = performance.now();
    const duration = end - start;
    
    console.log(`[PERF] ${methodName} executed in ${duration.toFixed(2)}ms`);
    
    return result;
  };
}

// Retry decorator factory
function retry(maxAttempts: number = 3, delay: number = 100) {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    const methodName = String(context.name);
    
    return async function(this: any, ...args: any[]) {
      let lastError: Error;
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          console.log(`[RETRY] ${methodName} attempt ${attempt}/${maxAttempts}`);
          return await originalMethod.apply(this, args);
        } catch (error) {
          lastError = error as Error;
          console.log(`[RETRY] ${methodName} attempt ${attempt} failed:`, lastError.message);
          
          if (attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      }
      
      throw new Error(`[RETRY] ${methodName} failed after ${maxAttempts} attempts: ${lastError!.message}`);
    };
  };
}

// ===================================
// TEST CLASSES WITH DECORATORS APPLIED
// ===================================

// Calculator with method decorators
class Calculator {
  @logMethodCall
  add(a: number, b: number): number {
    return a + b;
  }

  @validateArgs((args) => args.length === 2 && args.every(arg => typeof arg === 'number'))
  @logMethodCall
  multiply(a: number, b: number): number {
    return a * b;
  }

  @measurePerformance
  @validateArgs((args) => args.length === 1 && typeof args[0] === 'number' && args[0] >= 0)
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

// UserAccount with class decorator
@addTimestamp
class UserAccount {
  constructor(public username: string, public email: string) {
    console.log(`UserAccount created for ${username}`);
  }

  @logMethodCall
  getAccountInfo(): string {
    return `User: ${this.username} (${this.email})`;
  }

  @validateArgs((args) => args.length === 1 && typeof args[0] === 'string' && args[0].includes('@'))
  updateEmail(newEmail: string): void {
    const oldEmail = this.email;
    this.email = newEmail;
    console.log(`Email updated from ${oldEmail} to ${newEmail}`);
  }
}

// BankAccount with multiple decorators
@addTimestamp
class BankAccount {
  private balance: number = 0;

  constructor(public accountNumber: string, initialBalance: number = 0) {
    this.balance = initialBalance;
    console.log(`BankAccount ${accountNumber} created with balance ${initialBalance}`);
  }

  @validateArgs((args) => args.length === 1 && typeof args[0] === 'number' && args[0] > 0)
  @logMethodCall
  deposit(amount: number): number {
    this.balance += amount;
    return this.balance;
  }

  @validateArgs((args) => args.length === 1 && typeof args[0] === 'number' && args[0] > 0)
  @logMethodCall
  withdraw(amount: number): number {
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
    return this.balance;
  }

  @logMethodCall
  getBalance(): number {
    return this.balance;
  }
}

// Advanced example with async operations
class APIClient {
  constructor(public baseUrl: string) {}

  @retry(3, 500)
  @measurePerformance
  @validateArgs((args) => args.length === 1 && typeof args[0] === 'string')
  async fetchData(endpoint: string): Promise<string> {
    console.log(`Fetching data from ${this.baseUrl}${endpoint}`);
    
    // Simulate API call that might fail
    const shouldFail = Math.random() < 0.7; // 70% chance of failure for demo
    
    if (shouldFail) {
      throw new Error('Network error');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return `Data from ${endpoint}`;
  }
}

// ===================================
// COMPREHENSIVE TESTING
// ===================================

async function runTests() {
  console.log("=== Testing Solutions ===\n");
  
  // Test Calculator
  console.log("--- Testing Calculator ---");
  const calc = new Calculator();
  console.log("5 + 3 =", calc.add(5, 3));
  console.log("4 * 6 =", calc.multiply(4, 6));
  console.log("Fibonacci(10) =", calc.fibonacci(10));
  
  // Test validation error
  try {
    (calc as any).multiply("invalid", "args");
  } catch (error) {
    console.log("Validation error caught:", (error as Error).message);
  }
  
  // Test UserAccount with timestamp
  console.log("\n--- Testing UserAccount ---");
  const user = new UserAccount("alice", "alice@example.com") as any;
  console.log(user.getAccountInfo());
  console.log("Account age:", user.getAge(), "ms");
  console.log("Created at:", user.getCreatedAt());
  
  // Test email validation
  user.updateEmail("alice.new@example.com");
  try {
    user.updateEmail("invalid-email");
  } catch (error) {
    console.log("Email validation error caught:", (error as Error).message);
  }
  
  // Test BankAccount
  console.log("\n--- Testing BankAccount ---");
  const account = new BankAccount("ACC123", 100) as any;
  console.log("Initial balance:", account.getBalance());
  console.log("After deposit of 50:", account.deposit(50));
  console.log("After withdrawal of 30:", account.withdraw(30));
  console.log("Account age:", account.getAge(), "ms");
  
  // Test error cases
  try {
    account.deposit(-10);
  } catch (error) {
    console.log("Negative deposit error caught:", (error as Error).message);
  }
  
  try {
    account.withdraw(1000);
  } catch (error) {
    console.log("Insufficient funds error caught:", (error as Error).message);
  }
  
  // Test API Client with retry
  console.log("\n--- Testing APIClient with Retry ---");
  const apiClient = new APIClient("https://api.example.com");
  
  try {
    const data = await apiClient.fetchData("/users");
    console.log("API call succeeded:", data);
  } catch (error) {
    console.log("API call failed after retries:", (error as Error).message);
  }
  
  console.log("\n=== All Tests Complete ===");
  console.log("Method decorators: logMethodCall, validateArgs, measurePerformance");
  console.log("Class decorators: addTimestamp");
  console.log("Decorator factories: retry, validateArgs");
  console.log("Multiple decorator composition");
  console.log("Error handling and validation");
  console.log("Async decorator support");
}

// Run all tests
runTests().catch(console.error);

// ===================================
// LEARNING SUMMARY
// ===================================
console.log("\n=== Key Decorator Concepts Demonstrated ===");
console.log("1. Modern ECMAScript 2022+ syntax: (value, context) => newValue");
console.log("2. Method decorators: ClassMethodDecoratorContext");
console.log("3. Class decorators: ClassDecoratorContext with class extension");
console.log("4. Decorator factories: Functions that return decorators");
console.log("5. Decorator composition: Multiple decorators on same target");
console.log("6. Context usage: context.name for method/class names");
console.log("7. Proper 'this' binding and argument forwarding");
console.log("8. Error handling and validation patterns");
console.log("9. Performance monitoring and retry mechanisms");
console.log("10. Async decorator support for modern applications");