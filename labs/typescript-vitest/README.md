# TypeScript and Vitest Lab - TDD Exercise

## Overview

In this lab, you'll practice **Test-Driven Development (TDD)** using TypeScript and Vitest. You'll create a function that converts time objects into human-readable text descriptions.

## Learning Objectives

By completing this lab, you will:
- Set up a TypeScript project with Vitest
- Configure Vitest for TypeScript testing
- Practice the TDD workflow (Red → Green → Refactor)
- Write unit tests for TypeScript code
- Implement functionality driven by tests

## Prerequisites

- Node.js and npm installed
- Basic TypeScript knowledge
- Understanding of testing concepts

## Project Setup

### 1. Install Dependencies

First, install the required dependencies:

```powershell
npm install --save-dev typescript vitest @vitest/ui
```

### 2. Create TypeScript Configuration

Create a `tsconfig.json` file in the project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}
```

### 3. Create Vitest Configuration

Create a `vitest.config.ts` file in the project root:

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
})
```

### 4. Create Project Structure

Create the following folders:
```
labs/typescript-vitest/
├── src/              # Your implementation code goes here
├── tests/            # Your test files go here
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Understanding TDD

### The TDD Cycle: Red → Green → Refactor

1. **Red**: Write a failing test first
   - Think about what you want to achieve
   - Write a test that describes the behavior
   - Run the test and watch it fail (it should fail because you haven't implemented the code yet)

2. **Green**: Write the minimum code to make the test pass
   - Focus on making the test pass, not on perfect code
   - Don't worry about optimization yet
   - Keep it simple

3. **Refactor**: Improve the code while keeping tests green
   - Clean up the code
   - Remove duplication
   - Improve readability
   - Run tests to ensure they still pass

### TDD Benefits

- **Confidence**: Tests prove your code works
- **Design**: Writing tests first leads to better design
- **Documentation**: Tests document how your code should behave
- **Regression Prevention**: Tests catch bugs when you make changes

## The Exercise

### Goal

Create a `TimeAsText` class with a static method that converts time objects into human-readable text.

### Type Definition

Create a `Time` type/interface:

```typescript
export interface Time {
  hour: number;    // 0-23
  minute: number;  // 0-59
  second: number;  // 0-59
}
```

### Requirements

Implement a `TimeAsText` class with a static method:

```typescript
static getTimeAsText(time: Time): string
```

### Test Cases to Consider

Start with the simplest cases and build up:

1. **Midnight**: `{ hour: 0, minute: 0, second: 0 }` → `"midnight"`
2. **Midday**: `{ hour: 12, minute: 0, second: 0 }` → `"midday"`

Then expand to handle more cases if you have time:

3. **Morning times**: `{ hour: 8, minute: 15, second: 0 }` → `"15 minutes past 8 AM"`
4. **Afternoon times**: `{ hour: 14, minute: 30, second: 0 }` → `"30 minutes past 2 PM"`
5. **Minutes past midnight**: `{ hour: 0, minute: 30, second: 0 }` → `"30 minutes past midnight"`
6. **Minutes past midday**: `{ hour: 12, minute: 45, second: 0 }` → `"45 minutes past midday"`

### Getting Started

A sample test file (`tests/example.test.ts`) is provided to show you how Vitest tests work. You can delete this file once you understand the structure.

## Step-by-Step Guide

### 1. Create the Time Interface

In `src/TimeAsText.ts`, create the `Time` interface:

```typescript
export interface Time {
  hour: number;
  minute: number;
  second: number;
}
```

### 2. Write Your First Test

In `tests/TimeAsText.test.ts`, start with the simplest test case (midnight):

```typescript
import { describe, it, expect } from 'vitest';
import { TimeAsText } from '../src/TimeAsText';

describe('TimeAsText', () => {
  it('should return "midnight" for 00:00:00', () => {
    // Arrange
    const time = { hour: 0, minute: 0, second: 0 };
    
    // Act
    const result = TimeAsText.getTimeAsText(time);
    
    // Assert
    expect(result).toBe('midnight');
  });
});
```

### 3. Run the Test (Red)

```powershell
npm test
```

The test should fail because you haven't implemented the code yet. This is expected!

### 4. Implement the Minimum Code (Green)

In `src/TimeAsText.ts`, write just enough code to make the test pass:

```typescript
export class TimeAsText {
  static getTimeAsText(time: Time): string {
    // Implement your logic here
    return 'midnight'; // Start with the simplest implementation
  }
}
```

### 5. Run the Test Again

```powershell
npm test
```

The test should now pass!

### 6. Add Another Test

Now add a test for midday:

```typescript
it('should return "midday" for 12:00:00', () => {
  const time = { hour: 12, minute: 0, second: 0 };
  const result = TimeAsText.getTimeAsText(time);
  expect(result).toBe('midday');
});
```

### 7. Update Your Implementation

Modify your code to handle both cases:

```typescript
static getTimeAsText(time: Time): string {
  if (time.hour === 0 && time.minute === 0) {
    return 'midnight';
  } else if (time.hour === 12 && time.minute === 0) {
    return 'midday';
  }
  // Add more conditions as needed
  return '';
}
```

### 8. Continue the Cycle

Keep adding tests and implementation following the TDD cycle:
- Write a test (Red)
- Make it pass (Green)
- Refactor if needed
- Repeat

## Running Tests

```powershell
# Run tests once
npm test

# Run tests in watch mode (reruns on file changes)
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Tips

1. **Start Simple**: Begin with midnight and midday, then add complexity
2. **One Test at a Time**: Don't write multiple tests before implementing
3. **Make It Pass First**: Don't worry about perfect code initially
4. **Refactor After Green**: Only refactor when tests are passing
5. **Test Edge Cases**: Think about boundary conditions
6. **Descriptive Test Names**: Use clear, descriptive test names


## Common Vitest Assertions

```typescript
expect(value).toBe(expected)              // Strict equality
expect(value).toEqual(expected)           // Deep equality
expect(value).toBeTruthy()                // Truthy value
expect(value).toBeFalsy()                 // Falsy value
expect(array).toContain(item)             // Array contains item
expect(string).toMatch(/pattern/)         // String matches regex
expect(fn).toThrow()                      // Function throws error
expect(value).toBeGreaterThan(number)     // Number comparison
```

## Troubleshooting

### "Cannot find module" errors
- Check your import paths use `.js` extension: `from './TimeAsText.js'`
- Ensure `"type": "module"` is in package.json

### Tests not running
- Make sure test files end with `.test.ts` or `.spec.ts`
- Check that vitest is installed: `npm list vitest`

### TypeScript errors
- Ensure tsconfig.json is properly configured
- Run `npx tsc --noEmit` to check for TypeScript errors

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- Check `demos/typescript-vitest/` for a complete working example


