# Playwright Basic Demo: SWAPI API (TypeScript)

This demo shows how to use Playwright's API testing features with TypeScript to test the public [SWAPI](https://swapi.dev/) Star Wars API.

## Features
- Simple GET requests to SWAPI endpoints
- TypeScript-based Playwright test
- Minimal setup for quick experimentation

## Setup

1. **Install dependencies**
   ```sh
   cd demos/playwright-basic
   npm install
   ```

2. **Install Playwright and TypeScript**
   ```sh
   npm install --save-dev @playwright/test typescript ts-node
   npx playwright install
   ```

3. **Run the test**
   ```sh
   npx playwright test tests/swapi.spec.ts
   ```

## File Structure
- `tests/swapi.spec.ts` — Playwright API test for SWAPI
- `playwright.config.ts` — Playwright configuration
- `tsconfig.json` — TypeScript configuration
- `package.json` — Project dependencies and scripts

## Example Test
The included test checks that the SWAPI `/people/1` endpoint returns Luke Skywalker and that `/planets/1` returns Tatooine.

## Customization
You can add more tests for other SWAPI endpoints or try POST/PUT requests to other public APIs.

---

For more info on Playwright API testing, see [Playwright Docs](https://playwright.dev/docs/api-testing).
