# TypeScript and Vitest - Solution

This is the solution for the TypeScript and Vitest TDD Exercise.

> **Note:** If you encounter a "Unexpected token '﻿'" error when running tests, this is a BOM (Byte Order Mark) encoding issue in the package.json file. The BOM has been removed from this solution.

## What's Included

This solution provides:
- Working tests for midnight and midday
- Implementation that passes both test cases
- Proper TypeScript configuration
- Vitest setup and configuration

## Solution Approach

The solution uses a simple conditional approach:

1. **Check for midnight**: If hour is 0 and minute is 0, return "midnight"
2. **Check for midday**: If hour is 12 and minute is 0, return "midday"
3. **Return default**: For all other times (not implemented in basic solution)

## Running the Solution

### Install Dependencies

```powershell
npm install
```

### Run Tests

```powershell
# Run tests once
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Extending the Solution

Students can extend this solution to handle:

1. **Minutes past midnight**: 
   ```typescript
   // Example: 00:30:00 → "30 minutes past midnight"
   if (time.hour === 0) {
     return `${time.minute} minutes past midnight`;
   }
   ```

2. **Minutes past midday**:
   ```typescript
   // Example: 12:45:00 → "45 minutes past midday"
   if (time.hour === 12) {
     return `${time.minute} minutes past midday`;
   }
   ```

3. **Morning times (AM)**:
   ```typescript
   // Example: 08:15:00 → "15 minutes past 8 AM"
   if (time.hour < 12) {
     return `${time.minute} minutes past ${time.hour} AM`;
   }
   ```

4. **Afternoon/evening times (PM)**:
   ```typescript
   // Example: 14:30:00 → "30 minutes past 2 PM"
   if (time.hour > 12) {
     return `${time.minute} minutes past ${time.hour - 12} PM`;
   }
   ```

## Key Learning Points

1. **TDD Workflow**: Tests written before implementation
2. **Red-Green-Refactor**: Each test starts failing, then passes
3. **Simple Solutions First**: Start with the simplest case
4. **Incremental Development**: Add complexity gradually
5. **Type Safety**: TypeScript ensures type correctness

## File Structure

```
solutions/typescript-vitest/
├── src/
│   └── TimeAsText.ts       # Implementation
├── tests/
│   └── TimeAsText.test.ts  # Test suite
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Testing Concepts Demonstrated

- **Unit testing**: Testing individual functions
- **Arrange-Act-Assert**: Clear test structure
- **Descriptive test names**: Tests document behavior
- **Type safety**: TypeScript interfaces in tests
- **Test organization**: Using describe blocks

## Notes for Instructors

This is a **minimal solution** that only implements:
- Midnight (00:00:00)
- Midday (12:00:00)

This is intentional to:
1. Show students the starting point
2. Encourage them to extend the solution
3. Practice TDD by adding more test cases
4. Build confidence with small, working examples

Students should add their own tests and implementations for additional time formats.
