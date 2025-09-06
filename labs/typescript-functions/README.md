# TypeScript Functions Lab - Solutions

This lab contains solutions for three TypeScript function exercises that demonstrate various TypeScript features and patterns.

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
# Run Task Scheduler demo
npx ts-node taskScheduler.ts

# Run Event System demo
npx ts-node eventSystem.ts

# Run Function Composition demo
npx ts-node functionComposition.ts
```

## Exercise Solutions

### 1. Task Scheduler (taskScheduler.ts)
Demonstrates:
- Function overloads
- Generic types
- Async/await
- Error handling
- Priority queue implementation
- Type-safe task management

Key features:
- Priority-based task execution
- Async task handlers
- Type-safe task registration
- Error recovery
- Task status tracking

### 2. Advanced Function Types (functionTypes.ts)
Demonstrates:
- Discriminated unions
- Type guards and type narrowing
- Higher-order functions
- Async function composition
- Error handling patterns

Key features:
- Type-safe error handling
- Function composition with type guards
- Asynchronous data transformation
- Validation and error reporting
- Type narrowing examples

### 3. Type Inference & Conditional Types (typeInference.ts)
Demonstrates:
- Advanced type inference
- Conditional types
- Type-safe decorators
- Generic constraints
- JSON type handling

Key features:
- Validation decorators
- Promise type unwrapping
- Parameter and return type inference
- Complex type constraints
- Runtime type validation

### 2. Type-Safe Event System (eventSystem.ts)
Demonstrates:
- Event type definitions
- Type guards
- Async event handling
- Generic event handling
- Type-safe event emission

Key features:
- Strongly typed events and payloads
- Async event handlers
- One-time event handlers
- Error handling
- Type-safe event registration

### 3. Function Composition (functionComposition.ts)
Demonstrates:
- Generic function types
- Function composition
- Currying
- Partial application
- Data transformation pipeline

Key features:
- Type-safe function composition
- Data validation pipeline
- Curried functions
- Partial application
- Error handling

## Running Individual Examples

Each solution file contains a demo function that shows the implementation in action:

- `taskScheduler.ts` - Shows priority-based task execution
- `eventSystem.ts` - Demonstrates type-safe event handling
- `functionComposition.ts` - Shows functional programming patterns

## Type Features Demonstrated

1. Generic Types:
   - Function composition
   - Event handling
   - Task scheduling

2. Type Guards:
   - Event name validation
   - Data validation

3. Function Overloads:
   - Task registration
   - Event handling

4. Async/Await:
   - Task execution
   - Event emission
   - Error handling

5. Type Safety:
   - Event payloads
   - Task priorities
   - Function composition
2. Implement methods for:
   - Registering typed event handlers
   - Emitting events with proper payloads
   - Removing event handlers
3. Use generics for type safety
4. Implement proper error handling
5. Add support for once listeners

### Expected Output:
```typescript
interface UserEvent {
    type: 'userLoggedIn';
    payload: { userId: string; timestamp: Date };
}

const emitter = new TypedEventEmitter<UserEvent>();

emitter.on('userLoggedIn', (event) => {
    console.log(`User ${event.payload.userId} logged in`);
});

emitter.emit('userLoggedIn', {
    userId: 'user123',
    timestamp: new Date()
});
```

## Exercise 3: Function Composition Framework
Create a framework for composing functions with type safety.

### Requirements:
1. Implement typed versions of:
   - compose function
   - pipe function
   - curry function
2. Add support for:
   - Async functions
   - Error handling
   - Function overloading
3. Create utility functions
4. Add type guards
5. Implement proper error propagation

### Expected Output:
```typescript
const add = (x: number) => x + 1;
const multiply = (x: number) => x * 2;
const toString = (x: number) => x.toString();

const pipeline = pipe(add, multiply, toString);
console.log(pipeline(5)); // "12"

const curriedAdd = curry((x: number, y: number) => x + y);
console.log(curriedAdd(5)(3)); // 8
```

## Bonus Challenge
Add support for cancellable async operations and proper cleanup in the task scheduler.

## Tips
- Use strict type checking
- Implement proper error handling
- Use type guards where appropriate
- Document your code with TSDoc comments
- Consider edge cases
- Test with different types and scenarios

## Getting Started
1. Create taskScheduler.ts for Exercise 1
2. Create eventSystem.ts for Exercise 2
3. Create functionUtils.ts for Exercise 3
4. Install required dependencies:
   ```bash
   npm install typescript @types/node
   ```
5. Compile and run:
   ```bash
   tsc filename.ts
   node filename.js
   ```
