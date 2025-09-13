# Solution: Playwright API Testing Lab (TypeScript)

This solution demonstrates how to use Playwright Test with TypeScript to automate API testing against the SWAPI (Star Wars API).

## Files
- `swapi.spec.ts`: Contains Playwright tests for SWAPI endpoints written in TypeScript

## How to Run
1. Ensure you have Playwright and TypeScript installed in your project:
   ```sh
   npm install --save-dev @playwright/test typescript ts-node
   ```
2. Run the tests:
   ```sh
   npx playwright test solutions/basic-playwright/swapi.spec.ts
   ```

## Summary
- Tests basic GET requests for people and planets
- Validates response structure and key properties
- Checks error handling for non-existent resources
