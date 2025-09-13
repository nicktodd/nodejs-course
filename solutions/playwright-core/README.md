# Solution: Core API Testing with Playwright (TypeScript)

This solution provides a completed implementation of the TV show API and Playwright tests for all endpoints, including bonus challenges.

## How to Run

1. Install dependencies:
   ```powershell
   cd solutions/playwright-core
   npm install
   ```
2. Start the API server:
   ```powershell
   npm run dev
   ```
   The API will run on `http://localhost:3000` by default.
3. In a separate terminal, run the Playwright tests:
   ```powershell
   npx playwright test tests/tvshow.spec.ts
   ```

## What's Included
- API source code in `src/`
- Playwright tests in `tests/`
- Comprehensive CRUD and validation tests
- Bonus: Negative tests, error handling, setup/teardown examples

## Notes
- The API uses in-memory data for UK TV shows
- All tests use Zod for schema validation
- Setup and teardown hooks ensure clean test state
