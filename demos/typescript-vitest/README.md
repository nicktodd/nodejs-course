# TypeScript/Vitest Mocking Demo

## Overview
This demonstration showcases modern mocking and testing patterns using **TypeScript** and **Vitest** as a modern alternative to Jest. The demo replicates the functionality of the original Jest-based mocking demo while highlighting the advantages of TypeScript's type safety and Vitest's performance benefits.

## What's Included

### Core Components
This demo implements a **Speaking Clock** system that demonstrates various mocking scenarios:

1. **Clock Module** - Provides current time functionality
2. **TimeAsText Module** - Converts time objects to human-readable text
3. **SpeechEngine Module** - Handles text-to-speech functionality
4. **SpeakingClock Module** - Main orchestrator that coordinates all components
5. **Publisher/Subscriber Pattern** - Demonstrates function mocking and observer pattern


## Project Structure

```
src/
├── Clock.ts              # Time provider with type definitions
├── TimeAsText.ts         # Time formatter with enhanced logic
├── SpeechEngine.ts       # Speech synthesis with options
├── SpeakingClock.ts      # Main coordinator class
├── Publisher.ts          # Publisher/Subscriber pattern demo
├── Subscriber.ts         # Message handling utilities
└── index.ts              # Demo entry point

test/
├── SpeakingClock.test.ts # Comprehensive mocking examples
├── Publisher.test.ts     # Function mocking patterns
├── TimeAsText.test.ts    # Pure function testing
├── Subscriber.test.ts    # Console mocking and async testing
└── *.test.ts             # Additional test files

Configuration:
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Vitest-specific configuration
└── README.md            # This comprehensive guide
```

## Setup and Installation

### Prerequisites
- **Node.js 18+**
- **TypeScript 5.0+**
- **Modern package manager** (npm, yarn, or pnpm)

### Installation
```bash
# Navigate to the demo directory
cd demos/typescript-vitest

# Install dependencies
npm install

# Run the demo
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests once (CI mode)
npm run test:run
```

## Mocking Patterns Demonstrated

### 1. Module Mocking
**Mocking entire modules** for dependency isolation:

```typescript
import { vi } from 'vitest';
import { Clock } from '../src/Clock.js';

// Mock the entire Clock module
vi.mock('../src/Clock.js');

// Get typed mock for better IntelliSense
const mockClock = vi.mocked(Clock);

test('should use mocked Clock', () => {
  mockClock.getTime.mockReturnValue(new Date('2023-01-01'));
  // Test implementation...
});
```

### 2. Function Mocking
**Mocking individual functions** for precise control:

```typescript
test('should mock function calls', () => {
  const mockHandler = vi.fn();
  const publisher = new Publisher(mockHandler);
  
  publisher.publishMessage('test');
  
  expect(mockHandler).toHaveBeenCalledTimes(1);
  expect(mockHandler).toHaveBeenCalledWith('test');
});

// Note: vi.fn() creates functions with name "spy"
// For truly anonymous functions, use arrow functions or function expressions
test('should handle different function types', () => {
  const spyFunction = vi.fn(); // function.name === "spy"
  const anonymousFunction = () => {}; // function.name === ""
  const namedFunction = function myHandler() {}; // function.name === "myHandler"
});
```

### 3. Async Function Mocking
**Handling asynchronous operations** with proper typing:

```typescript
test('should handle async operations', async () => {
  const asyncHandler = vi.fn().mockResolvedValue(undefined);
  const publisher = new AsyncPublisher(asyncHandler);
  
  await publisher.publishMessage('async test');
  
  expect(asyncHandler).toHaveBeenCalledWith('async test');
});
```

### 4. Console Mocking
**Mocking console methods** for testing output:

```typescript
import { vi, beforeEach, afterEach } from 'vitest';

let consoleLogSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  consoleLogSpy.mockRestore();
});

test('should log messages', () => {
  Subscriber.receiveMessage('test');
  expect(consoleLogSpy).toHaveBeenCalledWith('[Subscriber] Received: test');
});
```

### 5. Mock Return Values and Implementations
**Controlling mock behavior** with various return strategies:

```typescript
// Mock return value
mockClock.getTime.mockReturnValue(testDate);

// Mock implementation
mockHandler.mockImplementation((message) => {
  console.log(`Custom: ${message}`);
});

// Mock resolved/rejected promises
asyncHandler.mockResolvedValue('success');
asyncHandler.mockRejectedValue(new Error('failure'));

// Mock different return values for sequential calls
mockFunction.mockReturnValueOnce('first')
           .mockReturnValueOnce('second')
           .mockReturnValue('default');
```

## TypeScript Advantages

### 1. Type Safety in Tests
```typescript
// TypeScript ensures correct type usage
const time: Time = { hour: 0, minute: 0, second: 0 };
mockTimeAsText.getTimeAsText.mockReturnValue("midnight");

// Compile-time error if types don't match
// mockTimeAsText.getTimeAsText.mockReturnValue(123); // Error!
```

### 2. Better IntelliSense and Refactoring
```typescript
// vi.mocked() provides full type information
const mockClock = vi.mocked(Clock);
mockClock.getTime. // IntelliSense shows available methods
```

### 3. Interface-Based Mocking
```typescript
// Mock interfaces for dependency injection
interface TimeProvider {
  getCurrentTime(): Date;
}

const mockTimeProvider: TimeProvider = {
  getCurrentTime: vi.fn().mockReturnValue(testDate)
};
```

## Advanced Vitest Features

### 1. Mock Factories
```typescript
// Create reusable mock factories
const createMockDate = (year: number, month: number, day: number) => 
  new Date(year, month - 1, day);

// Use in tests
mockClock.getTime.mockReturnValue(createMockDate(2023, 1, 1));
```

### 2. Partial Mocking
```typescript
// Mock only specific methods
vi.mock('../src/Clock.js', async () => {
  const actual = await vi.importActual('../src/Clock.js');
  return {
    ...actual,
    Clock: {
      ...actual.Clock,
      getTime: vi.fn()
    }
  };
});
```

### 3. Mock Timers
```typescript
import { vi } from 'vitest';

test('should handle timeouts', async () => {
  vi.useFakeTimers();
  
  const promise = Subscriber.receiveMessageAsync('test');
  
  // Fast-forward time
  vi.advanceTimersByTime(100);
  
  await promise;
  
  vi.useRealTimers();
});
```

## Testing Best Practices

### 1. Test Structure (AAA Pattern)
```typescript
test('should demonstrate AAA pattern', () => {
  // Arrange - Set up test data and mocks
  const testMessage = 'hello world';
  const mockHandler = vi.fn();
  const publisher = new Publisher(mockHandler);

  // Act - Execute the code under test
  publisher.publishMessage(testMessage);

  // Assert - Verify the results
  expect(mockHandler).toHaveBeenCalledWith(testMessage);
});
```

### 2. Mock Cleanup
```typescript
import { beforeEach } from 'vitest';

describe('Component Tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });
  
  // Tests here...
});
```

### 3. Descriptive Test Names
```typescript
// Good: Describes behavior and expected outcome
test('should call speech engine with formatted time when getting current time', () => {
  // Test implementation...
});

// Avoid: Vague or implementation-focused names
test('should call getTime', () => {
  // Test implementation...
});
```

## Running and Debugging Tests

### Command Line Options
```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- SpeakingClock.test.ts

# Run tests matching a pattern
npm test -- --grep "should handle midnight"

# Run tests with verbose output
npm test -- --reporter=verbose
```

### Debugging in VS Code
1. Install the **Vitest** extension
2. Set breakpoints in your test files
3. Use "Debug Test" code lens or command palette
4. Step through your code with full TypeScript support

## Comparison: Original vs TypeScript/Vitest

### Original Jest Implementation
```javascript
// JavaScript with Jest
const Clock = require("../src/Clock");
jest.mock("../src/Clock");

it("should call collaborators", () => {
  jest.spyOn(Clock, "getTime").mockReturnValue(testDate);
  // Test continues...
});
```

### Enhanced TypeScript/Vitest Implementation
```typescript
// TypeScript with Vitest
import { Clock, type Time } from '../src/Clock.js';
import { vi } from 'vitest';

vi.mock('../src/Clock.js');
const mockClock = vi.mocked(Clock);

test('should call collaborators with type safety', () => {
  const expectedTime: Time = { hour: 0, minute: 0, second: 0 };
  mockClock.getTime.mockReturnValue(new Date(2019, 11, 1, 0, 0));
  
  // Type-safe assertions
  expect(TimeAsText.getTimeAsText).toHaveBeenCalledWith(expectedTime);
});
```

## Key Improvements

### 1. **Performance**
- **Faster test execution** with Vite's bundling
- **Hot reload** during development
- **Parallel test execution** by default

### 2. **Developer Experience**
- **Native TypeScript support** without additional configuration
- **Better error messages** with source map support
- **Modern ES modules** support out of the box

### 3. **Type Safety**
- **Compile-time error detection** in tests
- **IntelliSense support** for mocks and assertions
- **Refactoring safety** across tests and source code

### 4. **Modern JavaScript Support**
- **ESM imports/exports** without transpilation
- **Top-level await** support
- **Dynamic imports** for conditional testing

## Common Patterns and Use Cases

### 1. Testing Error Conditions
```typescript
test('should handle errors gracefully', async () => {
  const failingHandler = vi.fn().mockRejectedValue(new Error('Network error'));
  const publisher = new AsyncPublisher(failingHandler);
  
  await expect(publisher.publishMessage('test')).rejects.toThrow('Network error');
});
```

### 2. Testing Side Effects
```typescript
test('should verify side effects', () => {
  const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  
  Subscriber.receiveMessage('test message');
  
  expect(consoleLogSpy).toHaveBeenCalledWith('[Subscriber] Received: test message');
  
  consoleLogSpy.mockRestore();
});
```

### 3. Testing Integration Points
```typescript
test('should integrate components correctly', () => {
  // Mock external dependencies
  mockClock.getTime.mockReturnValue(testDate);
  mockTimeAsText.getTimeAsText.mockReturnValue('midnight');
  
  // Test the integration
  SpeakingClock.getTime();
  
  // Verify the flow
  expect(Clock.getTime).toHaveBeenCalled();
  expect(TimeAsText.getTimeAsText).toHaveBeenCalledWith(expectedTimeObject);
  expect(SpeechEngine.sayTime).toHaveBeenCalledWith('midnight');
});
```

## Next Steps

### Extending the Demo
1. **Add more complex mocking scenarios** (partial mocks, mock factories)
2. **Implement snapshot testing** for UI components
3. **Add integration tests** with real dependencies
4. **Explore Vitest's browser mode** for DOM testing
5. **Add performance benchmarks** with Vitest's bench feature

### Production Considerations
1. **Set up CI/CD integration** with test reporting
2. **Configure code coverage** thresholds
3. **Add visual regression testing** with Playwright/Vitest
4. **Implement test parallelization** strategies
5. **Set up test data management** patterns

## Resources and References

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

### Migration Guides
- [Jest to Vitest Migration](https://vitest.dev/guide/migration.html)
- [TypeScript Testing Guide](https://www.typescriptlang.org/docs/handbook/testing.html)

### Related Topics
- **Unit Testing Patterns**
- **Dependency Injection**
- **Test-Driven Development (TDD)**
- **Behavior-Driven Development (BDD)**
- **Mock vs Stub vs Fake vs Spy**

---

This demo provides a comprehensive foundation for understanding modern TypeScript testing with Vitest, showcasing migration patterns from Jest while highlighting the benefits of type safety and improved developer experience.