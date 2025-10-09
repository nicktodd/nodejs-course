# TypeScript Asynchronous Programming Demo

This directory contains demonstration code for asynchronous programming concepts in TypeScript.

## Introduction

Modern JavaScript and TypeScript applications frequently need to handle asynchronous operations such as:

- Making HTTP requests
- Reading/writing files
- Database operations
- User interface events

TypeScript provides excellent support for these operations with strong typing for promises and async/await syntax.

## Demo Files

This demo includes several examples of asynchronous programming patterns:

1. `promises.ts` - Working with Promises using `.then()` and `.catch()`
2. `async-await.ts` - Using the modern `async/await` syntax
3. `parallel.ts` - Running promises in parallel with `Promise.all()`
4. `race.ts` - Handling timeouts with `Promise.race()`

Each file demonstrates proper TypeScript practices for handling asynchronous code, including:
- Strong typing of async operations
- Error handling patterns
- Proper use of TypeScript interfaces

## Running the Demos

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the demos:
   ```bash
   npm run start:promises
   npm run start:async-await
   npm run start:parallel
   npm run start:race
   ```

## Key Concepts

### Promises

Promises are objects representing the eventual completion or failure of an asynchronous operation. They help manage asynchronous code in a more readable way than callbacks.

A Promise has three states:
- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: The operation completed successfully
- **Rejected**: The operation failed

### Async/Await

Async/await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code:

- `async` keyword declares that a function returns a promise
- `await` keyword pauses execution until the promise resolves
- Error handling uses familiar try/catch blocks

### Parallel Execution

`Promise.all()` allows multiple promises to execute concurrently and wait for all to complete:

```typescript
const results = await Promise.all([promise1, promise2, promise3]);
```

### Race Conditions

`Promise.race()` executes multiple promises in parallel but resolves or rejects with the result of the first settled promise:

```typescript
const result = await Promise.race([promise, timeout]);
```

## API Used in Demos

The demos use the Star Wars API (SWAPI) to demonstrate real-world API interactions:
- [SWAPI Documentation](https://swapi.dev/documentation)
- Base URL: https://swapi.dev/api/
