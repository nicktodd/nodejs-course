# TypeScript Decorators Lab Exercise

## Quick Start Guide
```bash
cd labs/typescript-decorators
npm install
npm start        # Run starter.ts (recommended for beginners)
# OR
npm run dev      # Run index.ts (more advanced version)
```

## Overview
In this comprehensive lab, you'll learn how to create and use TypeScript decorators using the modern **ECMAScript 2022+ syntax**. You'll implement both method decorators and class decorators to add cross-cutting functionality like logging, validation, performance monitoring, and auditing to your classes.

This lab focuses on the **new standardized decorator syntax**, not the legacy experimental decorators. You'll learn industry-standard patterns used in modern frameworks and enterprise applications.

## Prerequisites
- **TypeScript 5.0+** with modern decorator support
- **Node.js 18+** 
- Basic understanding of TypeScript classes, functions, and higher-order functions
- Familiarity with concepts like closures and function composition

## Learning Objectives
By the end of this lab, you will be able to:

### Core Concepts
- Create **method decorators** using modern `(value, context)` syntax
- Create **class decorators** that extend constructor functionality
- Build **decorator factories** for parameterized behavior
- Understand **decorator composition** and execution order
- Apply decorators to solve **real-world problems** like logging and validation

### Advanced Patterns
- Implement **cross-cutting concerns** (AOP patterns)
- Handle **async operations** in decorators
- Create **reusable decorator libraries**
- Debug and troubleshoot decorator implementations
- Understand performance implications and best practices

## Lab Files Structure

### Exercise Files
- **`starter.ts`** - 🎯 **START HERE** - Simplified exercise with clear TODO sections
- **`index.ts`** - Advanced exercise file with comprehensive examples
- **`test.ts`** - Test runner to verify your implementations

### Reference Files
- **`package.json`** - Project dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration for modern decorators
- **`README.md`** - This comprehensive guide

## Step-by-Step Exercise Guide

### Exercise 1: Basic Method Decorator
**Goal**: Create a `logMethodCall` decorator that automatically logs method invocations.

**What you'll implement**:
```typescript
function logMethodCall(originalMethod: any, context: ClassMethodDecoratorContext) {
  // Your implementation here
  // Should log: method name, arguments, and return value
}
```

**Expected behavior**:
- Log when a method is called with its name
- Log the arguments passed to the method
- Call the original method and preserve its behavior
- Log and return the result

**Real-world use case**: Debugging, auditing, API call tracking

### Exercise 2: Parameterized Decorator Factory
**Goal**: Create a `validateArgs` decorator factory for flexible argument validation.

**What you'll implement**:
```typescript
function validateArgs(validator: (args: any[]) => boolean) {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    // Your implementation here
    // Should validate arguments before method execution
  };
}
```

**Expected behavior**:
- Take a validator function as parameter
- Return a decorator that validates arguments before execution
- Throw descriptive errors if validation fails
- Allow method execution if validation passes

**Usage example**:
```typescript
@validateArgs((args) => args.every(arg => typeof arg === 'number'))
multiply(a: number, b: number) { return a * b; }
```

**Real-world use case**: Input validation, type checking, business rule enforcement

### Exercise 3: Class Decorator
**Goal**: Create an `addTimestamp` decorator that enhances classes with audit functionality.

**What you'll implement**:
```typescript
function addTimestamp(originalClass: any, context: ClassDecoratorContext) {
  // Your implementation here
  // Should extend the class with timestamp functionality
}
```

**Expected behavior**:
- Add a `createdAt` property set to current date when instance is created
- Add a `getAge()` method that returns milliseconds since creation
- Preserve all original class functionality
- Use class extension pattern

**Usage example**:
```typescript
@addTimestamp
class User {
  constructor(public name: string) {}
}

const user = new User("Alice");
console.log(user.getAge()); // Returns milliseconds since creation
```

**Real-world use case**: Auditing, object lifecycle tracking, debugging

### Exercise 4: Multiple Decorators & Composition
**Goal**: Apply multiple decorators to understand execution order and composition.

**What you'll learn**:
- Decorators execute from **bottom to top** (or right to left)
- Each decorator wraps the previous one
- Understanding the "decorator chain"

**Example**:
```typescript
@validateArgs((args) => args.every(arg => typeof arg === 'number'))
@logMethodCall
multiply(a: number, b: number) {
  return a * b;
}
```

**Execution order**: `validateArgs` → `logMethodCall` → `original method`

## Modern Decorator Syntax Reference

### Method Decorator Pattern
```typescript
function methodDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
  console.log(`Decorating method: ${String(context.name)}`);
  
  return function(this: any, ...args: any[]) {
    // Pre-execution logic
    console.log(`Calling ${String(context.name)} with args:`, args);
    
    // Call original method
    const result = originalMethod.apply(this, args);
    
    // Post-execution logic
    console.log(`Method ${String(context.name)} returned:`, result);
    
    return result;
  };
}
```

### Class Decorator Pattern
```typescript
function classDecorator(originalClass: any, context: ClassDecoratorContext) {
  console.log(`Decorating class: ${context.name}`);
  
  return class extends originalClass {
    // Add new properties
    public decoratedAt: Date = new Date();
    
    constructor(...args: any[]) {
      super(...args);
      console.log(`Enhanced instance of ${context.name} created`);
    }
    
    // Add new methods
    getDecoratedAt(): Date {
      return this.decoratedAt;
    }
  };
}
```

### Decorator Factory Pattern
```typescript
function decoratorFactory(options: { enabled: boolean; prefix: string }) {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    if (!options.enabled) {
      return originalMethod; // No-op if disabled
    }
    
    return function(this: any, ...args: any[]) {
      console.log(`${options.prefix}: ${String(context.name)}`);
      return originalMethod.apply(this, args);
    };
  };
}

// Usage
@decoratorFactory({ enabled: true, prefix: "API" })
fetchData() { /* ... */ }
```

## Detailed Implementation Instructions

### Getting Started
1. **Choose your starting point**:
   - **Beginners**: Start with `starter.ts` - has simpler structure and clear guidance
   - **Advanced**: Use `index.ts` - more comprehensive with complex examples

2. **Open your chosen file** and look for `TODO` comments

3. **Follow the implementation hints** in the comments

4. **Test incrementally** - implement one decorator at a time and test it

### Implementation Tips

#### Method Decorators
```typescript
// Template for method decorators
function myDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
  // Access method name
  const methodName = String(context.name);
  
  // Return wrapper function
  return function(this: any, ...args: any[]) {
    // Pre-processing
    console.log(`Before ${methodName}`);
    
    // Call original (preserve 'this' context)
    const result = originalMethod.apply(this, args);
    
    // Post-processing
    console.log(`After ${methodName}`);
    
    return result;
  };
}
```

#### Class Decorators
```typescript
// Template for class decorators
function myClassDecorator(originalClass: any, context: ClassDecoratorContext) {
  // Return extended class
  return class extends originalClass {
    constructor(...args: any[]) {
      super(...args); // Call parent constructor
      // Add initialization logic
    }
    
    // Add new methods/properties
  };
}
```

#### Error Handling
```typescript
function safeDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
  return function(this: any, ...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      console.error(`Error in ${String(context.name)}:`, error);
      throw error; // Re-throw or handle as needed
    }
  };
}
```

## Testing Your Implementation

### Running Tests
```bash
npm test        # Run test suite
npm start       # Run your implementation
npm run dev     # Watch mode for development
```

### Manual Testing Checklist
- Method decorator logs method calls correctly
- Validation decorator prevents invalid inputs
- Class decorator adds timestamp functionality
- Multiple decorators work together
- Error cases are handled properly
- Original functionality is preserved

### Expected Output
When your implementation is correct, you should see:
```
=== TypeScript Decorators Lab - Starter ===

--- Calculator Tests ---
[LOG] Calling method: add
[LOG] Arguments: [5, 3]
[LOG] Method add returned: 8
Result of 5 + 3: 8

[VALIDATE] Validating arguments for multiply: [4, 6]
[VALIDATE] Arguments valid for multiply
[LOG] Calling method: multiply
[LOG] Arguments: [4, 6]
[LOG] Method multiply returned: 24
Result of 4 * 6: 24
```

## Common Pitfalls & Solutions

### Problem: Losing 'this' context
```typescript
// Wrong - loses 'this' binding
return originalMethod;

// Correct - preserves 'this' binding
return function(this: any, ...args: any[]) {
  return originalMethod.apply(this, args);
};
```

### Problem: Not forwarding arguments
```typescript
// Wrong - doesn't forward arguments
return function() {
  return originalMethod();
};

// Correct - forwards all arguments
return function(this: any, ...args: any[]) {
  return originalMethod.apply(this, args);
};
```

### Problem: Decorator factory confusion
```typescript
// Wrong - returning decorator directly
function factory(options: any) {
  return originalMethod; // This is not a decorator!
}

// Correct - returning a decorator function
function factory(options: any) {
  return function(originalMethod: any, context: any) {
    return function(this: any, ...args: any[]) {
      // Implementation
    };
  };
}
```

## Advanced Challenges (Bonus)

Once you complete the basic exercises, try these advanced patterns:

### 1. Performance Monitor Decorator
```typescript
function measurePerformance(originalMethod: any, context: ClassMethodDecoratorContext) {
  // Measure and log execution time
  // Track performance metrics
  // Alert on slow operations
}
```

### 2. Retry Decorator
```typescript
function retry(maxAttempts: number, delay: number) {
  // Retry failed operations
  // Exponential backoff
  // Error aggregation
}
```

### 3. Cache Decorator
```typescript
function cache(ttl: number) {
  // Cache method results
  // LRU eviction
  // TTL expiration
}
```

### 4. Async Decorator Patterns
```typescript
function asyncTimeout(ms: number) {
  // Timeout async operations
  // Promise race conditions
  // Cleanup on timeout
}
```

## Real-World Applications

### Enterprise Patterns
- **Logging**: Method call tracing for debugging
- **Validation**: Input/output validation for APIs
- **Authorization**: Role-based access control
- **Caching**: Performance optimization
- **Monitoring**: Performance and health metrics
- **Retry Logic**: Resilience for network operations

### Framework Integration
- **Angular**: Dependency injection, lifecycle hooks
- **NestJS**: Guards, interceptors, pipes
- **TypeORM**: Entity decorators, column mappings
- **Express**: Route handlers, middleware

## Troubleshooting Guide

### TypeScript Compiler Errors
```bash
# Ensure modern decorator support
"experimentalDecorators": false,  # Important: should be false
"emitDecoratorMetadata": false,   # Important: should be false
```

### Runtime Errors
- Check that decorators return proper functions
- Verify 'this' binding is preserved
- Ensure arguments are forwarded correctly

### Performance Issues
- Avoid heavy computation in decorator factories
- Cache decorator instances when possible
- Profile decorator overhead in production

## Next Steps & Further Learning

### After This Lab
1. **Explore the solutions** in `../solutions/typescript-decorators/`
2. **Build a decorator library** for your own projects
3. **Study framework decorators** (Angular, NestJS, etc.)
4. **Contribute to open source** decorator libraries

### Advanced Topics
- Property decorators and accessor decorators
- Metadata reflection and design-time types
- Decorator composition libraries
- Performance optimization techniques
- Testing strategies for decorated classes

### Resources & References
- [TypeScript Decorator Documentation](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [ECMAScript Decorator Proposal](https://github.com/tc39/proposal-decorators)
- [Decorator Pattern (Gang of Four)](https://en.wikipedia.org/wiki/Decorator_pattern)
- [Aspect-Oriented Programming](https://en.wikipedia.org/wiki/Aspect-oriented_programming)

## Getting Help

### If You Get Stuck
1. **Review the syntax examples** above
2. **Check the solutions** for working implementations
3. **Use TypeScript compiler errors** as guidance
4. **Test one decorator at a time** to isolate issues
5. **Console.log liberally** to understand execution flow

### Common Questions
**Q: Why aren't my decorators executing?**
A: Make sure you're applying them with `@` syntax and that TypeScript is configured correctly.

**Q: My method loses its 'this' context, why?**
A: Use `.apply(this, args)` instead of calling the method directly.

**Q: Can I use decorators on arrow functions?**
A: No, decorators only work on class methods and class declarations.

**Q: What's the difference between legacy and modern decorators?**
A: Modern decorators use `(value, context)` signature and are standardized. Legacy decorators are experimental.

---

## Ready to Start?

Choose your path:
- **New to decorators?** → Start with `starter.ts`
- **Want full examples?** → Jump to `index.ts`
- **Ready to test?** → Run `npm test`

**Good luck building your decorator expertise!**