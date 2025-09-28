# TypeScript Asynchronous Programming Solutions

This directory contains the solutions for the TypeScript Async lab exercises.

## Solution Files

1. `promises.ts` - Demonstrates using Promise syntax with `.then()` and `.catch()`
2. `async-await.ts` - Implements the same functionality using async/await syntax
3. `parallel.ts` - Shows how to execute multiple promises in parallel with `Promise.all()`
4. `race.ts` - Demonstrates the use of `Promise.race()` for handling timeouts

## Running the Solutions

First, install dependencies:

```bash
npm install
```

Then run individual solutions:

```bash
# Run the Promises example
npm run start:promises

# Run the Async/Await example
npm run start:async-await

# Run the Parallel Promises example
npm run start:parallel

# Run the Promise.race() example
npm run start:race
```

## Key Concepts Demonstrated

1. **Promise Chaining** - Using `.then()` to sequence asynchronous operations
2. **Error Handling** - Using `.catch()` and try/catch blocks
3. **Async/Await** - Using modern syntax for cleaner asynchronous code
4. **Parallel Execution** - Using `Promise.all()` to run operations concurrently
5. **Race Conditions** - Using `Promise.race()` for timeouts and competitions

## Notes

- The solutions use the Star Wars API (SWAPI) to demonstrate real-world API interactions
- TypeScript interfaces are used to type the API responses
- Error handling is implemented throughout the code
- The solutions demonstrate proper TypeScript practices for asynchronous code
