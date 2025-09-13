# Core API Testing with Playwright (TypeScript)

This lab guides you through testing a REST API for TV shows using TypeScript, Playwright, and Zod for schema validation. The API is already provided in the `src/` folder.

## Objectives
- Set up Playwright for API testing in TypeScript
- Write Playwright API tests for all endpoints of the provided TV show API
- Validate API responses against a Zod schema

## TV Show Data Model
- `id`: number
- `title`: string
- `genre`: string
- `seasons`: number
- `rating`: number (0-10)
- `description`: string (optional)

## Lab Steps

### 1. Install Dependencies
1. Open a terminal and navigate to the lab folder:
   ```sh
   cd labs/playwright-core
   npm install
   ```
2. Start the API server:
   ```sh
   npm run dev
   ```
   The API will run on `http://localhost:3000` by default.

### 2. Set Up Playwright
1. Stay in the `labs/playwright-core` folder.
2. Install Playwright and TypeScript:
   ```sh
   npm install --save-dev @playwright/test typescript ts-node zod
   ```
3. Initialize Playwright Test:
   ```sh
   npx playwright install
   ```
4. Your `tsconfig.json` should include both `src` and `tests` folders:
   ```json
   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true,
       "outDir": "dist"
     },
     "include": ["src/*.ts", "tests/*.ts"]
   }
   ```

### 3. Write Playwright API Tests
1. There should be a `tests/` folder in `labs/playwright-core`. If it does not exist, create it:
   ```sh
   mkdir tests
   ```
2. Create a file `tvshow.spec.ts` inside `tests/`.

#### Write the First Two Tests (Step-by-Step)

**Test 1: Fetch all TV shows (`GET /tvshows`)**
- Import Playwright's test and expect, and the Zod schema from `src/tvshow.schema.ts`.
- Make a GET request to `/tvshows`.
- Assert the response status is OK.
- Assert the response is an array.
- Validate each item in the array against the Zod schema.

Example:
```typescript
import { test, expect } from '@playwright/test';
import { TVShowSchema } from '../src/tvshow.schema';

const BASE_URL = 'http://localhost:3000';

test('GET /tvshows returns an array of TV shows', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/tvshows`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  data.forEach((item: any) => {
    expect(() => TVShowSchema.parse(item)).not.toThrow();
  });
});
```

**Test 2: Fetch a TV show by ID (`GET /tvshows/:id`)**
- Make a GET request to `/tvshows/1` (or another valid ID).
- Assert the response status is OK.
- Validate the response object against the Zod schema.
- Assert specific fields (e.g., title, genre) match expected values for that show.

Example:
```typescript
test('GET /tvshows/:id returns a single TV show', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/tvshows/1`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(() => TVShowSchema.parse(data)).not.toThrow();
  expect(data.title).toBe('Doctor Who'); // Adjust to match your data
  expect(data.genre).toBe('Sci-Fi');
});
```

#### Write the Remaining Tests Yourself
- Add a new TV show (`POST /tvshows`):
  - Send a valid TV show object in the request body.
  - Assert the response status and validate the returned object.
- Update a TV show (`PUT /tvshows/:id`):
  - Send updated data for an existing show.
  - Assert the response and validate the updated fields.
- Delete a TV show (`DELETE /tvshows/:id`):
  - Send a DELETE request for an existing show.
  - Assert the response status and check the show is removed.
- For each, validate responses using Zod and assert key fields.

### 4. Run the Tests
Run Playwright tests from the `labs/playwright-core` folder:
```sh
npx playwright test tests/tvshow.spec.ts
```

#### Running the API Server and Tests Together

You can automate starting the API server and running your Playwright tests in one command using the `start-server-and-test` package:

1. Install the package:
   ```sh
   npm install --save-dev start-server-and-test
   ```
2. Add the following script to your `package.json`:
   ```json
   "scripts": {
     "dev": "ts-node src/server.ts",
     "test:all": "start-server-and-test dev http://localhost:3000 'playwright test tests/tvshow.spec.ts'"
   }
   ```
3. Run both the server and tests together:
   ```sh
   npm run test:all
   ```

This will start the API server, wait until it is ready, run your Playwright tests, and then shut down the server automatically. This is especially useful for CI/CD and when you want a single command to run everything.

### 5. Bonus Challenges
- Add negative tests for invalid data
- Test error responses (e.g., 404 for missing TV show)
- Add schema validation to all test cases
- Use Playwright's test hooks for setup/teardown

**Example: Setup and Teardown in Playwright**

You can use Playwright's `test.beforeEach` and `test.afterEach` hooks to set up and clean up test state:

```typescript
import { test } from '@playwright/test';

// Setup: runs before each test
test.beforeEach(async ({ request }) => {
  // Example: Add a test TV show before each test
  await request.post('http://localhost:3000/tvshows', {
    data: {
      title: 'Test Show',
      genre: 'Test Genre',
      seasons: 1,
      rating: 5,
      description: 'Setup test show.'
    }
  });
});

// Teardown: runs after each test
test.afterEach(async ({ request }) => {
  // Example: Remove the test TV show after each test
  // (Assumes you know the ID or can search by title)
  const response = await request.get('http://localhost:3000/tvshows');
  const shows = await response.json();
  const testShow = shows.find((s: any) => s.title === 'Test Show');
  if (testShow) {
    await request.delete(`http://localhost:3000/tvshows/${testShow.id}`);
  }
});
```

You can use these hooks to ensure your tests run in a clean environment and do not interfere with each other.

