# Advanced API Testing Patterns with Playwright

This lab builds on your previous experience with the TV Shows API to explore advanced testing patterns with Playwright, including:

- Authentication and authorization testing
- File uploads and downloads
- Test data management with fixtures
- Response chaining for complex API workflows
- Test organization and structure best practices

## API Enhancements

The TV Shows API has been enhanced with the following features:

1. **Authentication**:
   - Login endpoint (`/auth/login`) returning JWT tokens
   - Protected endpoints requiring authentication
   - Role-based access control (admin vs. regular users)

2. **File Operations**:
   - Image upload for TV shows (`POST /tvshows/:id/image`) - Admin only
   - Image download endpoint (`GET /tvshows/:id/image/download`)
   - Static file serving

## Prerequisites

- Node.js 18+ installed
- Basic understanding of REST APIs
- Familiarity with TypeScript and Playwright testing

## Objectives

- Set up Playwright for testing authenticated APIs
- Create reusable authentication patterns using fixtures
- Implement tests for file uploads and downloads
- Chain API responses for multi-step test workflows
- Test different authorization levels

## Getting Started

### Setting Up the Environment

1. Navigate to the lab directory and install dependencies:
   ```sh
   cd labs/playwright-patterns
   npm install
   ```

2. Review the project structure:
   - `src/`: Contains the API implementation
     - `server.ts`: Main server file with all endpoints
     - `auth.middleware.ts`: Authentication middleware
     - `tvshow.schema.ts`: Data schemas using Zod
     - `tvshow.data.ts`: Sample TV show data
   - `tests/`: Where you'll write your tests
     - `tvshow.patterns.spec.ts`: Starter test file with skeleton structure
     - `fixtures/`: Directory for test assets like image files

3. Start the server:
   ```sh
   npm run dev
   ```

4. The API will run on http://localhost:3000

5. In a separate terminal, you can run tests as you complete them:
   ```sh
   npm test
   ```

6. For convenience, you can also run the server and tests together:
   ```sh
   npm run test:ci
   ```
   
### Referencing the Solution

If you get stuck or want to compare your implementation:

1. The complete solution is available in the `solutions/playwright-patterns` directory
2. You can examine the solution files as you go:
   ```
   solutions/playwright-patterns/tests/tvshow.patterns.spec.ts  # Complete test implementation
   solutions/playwright-patterns/src/                          # API implementation
   ```

3. To run the solution and see expected behavior:
   ```sh
   cd solutions/playwright-patterns
   npm install
   npm run test:ci
   ```

## API Documentation

### Authentication

#### Login
```
POST /auth/login
Body: { "username": "string", "password": "string" }
Response: { "token": "string", "username": "string", "role": "string" }
```

### TV Shows Endpoints

| Method | Endpoint | Auth Required | Admin Only | Description |
|--------|----------|--------------|------------|-------------|
| GET    | /tvshows | No | No | Get all TV shows |
| GET    | /tvshows/:id | No | No | Get TV show by ID |
| POST   | /tvshows | Yes | No | Create a new TV show |
| PUT    | /tvshows/:id | Yes | No | Update a TV show |
| DELETE | /tvshows/:id | Yes | Yes | Delete a TV show |
| POST   | /tvshows/:id/image | Yes | Yes | Upload an image for a TV show |
| GET    | /tvshows/:id/image/download | No | No | Download a TV show image |

### Available Users

| Username | Password | Role |
|----------|----------|------|
| admin    | admin123 | admin |
| user1    | password123 | user |

## Lab Tasks

In the `tests` folder, you'll find a starter test file named `tvshow.patterns.spec.ts` with a skeleton structure to guide you. Complete each of the following tasks in this file.

### 1. Authentication Tests

**Task:** Create tests that authenticate users and verify access controls.

**Detailed Steps:**
1. Examine the `beforeAll` hook that's already set up to get authentication tokens
2. Complete the first test (`Authentication - Valid and invalid credentials`):
   - Send a POST request to `/auth/login` with valid admin credentials
   - Assert that the response status is 200
   - Assert that the response includes a token and the correct role
   - Send another POST request with invalid credentials
   - Assert that the response status is 401 (Unauthorized)
   - Assert that an error message is returned

3. Complete the test for creating a show with authentication:
   - Add the authorization header with the user token
   - Create a new show with valid data
   - Verify the response code and data

4. Complete the test for unauthorized access:
   - Attempt to create a show without an auth token
   - Verify you get a 401 status code

**Reference Solution:** 
See `solutions/playwright-patterns/tests/tvshow.patterns.spec.ts` (lines 53-108) for the complete implementation.

### 2. File Upload and Download Tests

**Task:** Create tests for file operations including uploads and downloads.

**Detailed Steps:**
1. In the "Upload an image for a TV show" test:
   - First create a new show to upload an image for
   - Set up the test image file in the fixtures directory
   - Send a POST request to `/tvshows/{id}/image` with:
     - Admin authentication token
     - Multipart form data with the image file
   - Verify the response includes the image URL

**Reference Solution:** 
See `solutions/playwright-patterns/tests/tvshow.patterns.spec.ts` (lines 152-192) for the upload implementation.

### 3. Response Chaining

**Task:** Create a multi-step test workflow that chains multiple API operations.

**Detailed Steps:**
1. Complete the "Create show, upload image, and verify in one workflow" test:
   - Step 1: Create a new show with valid data and admin auth token
   - Step 2: Upload an image for the show you just created (using its ID)
   - Step 3: Update the show with new details, including the image URL
   - Step 4: Get the show by ID and verify all changes were applied
   - Step 5: Delete the show to clean up

2. Make sure to pass data between steps (like the show ID and image URL)

**Key Implementation Detail:**
- When updating the show in step 3, be sure to include the imageUrl from the upload response

**Reference Solution:** 
See `solutions/playwright-patterns/tests/tvshow.patterns.spec.ts` (lines 202-265) for the complete workflow implementation.

### 4. Test Data Management

**Task:** Implement proper test data management using Playwright fixtures.

**Detailed Steps:**
1. Examine the fixture setup at the top of the test file:
   ```typescript
   // Setup: Get auth tokens before tests
   let adminToken: string;
   let userToken: string;
   let createdShowId: number;

   test.beforeAll(async ({ request }) => {
     // Authentication logic here
   });
   ```

2. Implement a proper cleanup process:
   - Store IDs of resources created during tests
   - Use `test.afterAll()` to clean up any remaining test data
   - Add code to delete created shows, ensuring the database stays clean

**Reference Solution:** 
See how the solution handles test data in `solutions/playwright-patterns/tests/tvshow.patterns.spec.ts` by maintaining state between test cases and cleaning up afterward.

### 5. Test Organization

**Task:** Structure your tests with proper organization patterns.

**Detailed Steps:**
1. Examine how the tests are grouped in a `test.describe` block
2. Add proper comments before each test explaining its purpose
3. Implement proper error handling for API requests:
   ```typescript
   try {
     // API request here
   } catch (error) {
     console.error('Error details:', error);
     throw error;  // Re-throw to fail the test
   }
   ```
4. Create shared utility functions for common operations:
   - Create a helper function for authentication
   - Create a helper function for show creation

**Reference Solution:** 
See the organization patterns in `solutions/playwright-patterns/tests/tvshow.patterns.spec.ts`, including test grouping, setup/teardown, and code reuse patterns.

## Bonus Tasks

If you finish the main tasks, try these advanced challenges:

### 1. Test Parameterization

**Task:** Implement test parameterization to run the same test with different data.

**Detailed Steps:**
1. Create a new test file named `tvshow.parameterized.spec.ts`
2. Define an array of test data:
   ```typescript
   const testShows = [
     { title: 'Broadchurch', genre: 'Crime', seasons: 3, rating: 8.7 },
     { title: 'Luther', genre: 'Crime', seasons: 5, rating: 8.5 },
     { title: 'Planet Earth', genre: 'Documentary', seasons: 2, rating: 9.5 }
   ];
   ```
3. Use `for` loop or `test.describe.parallel.each()` to run the same test for each data item
4. Verify that all shows can be created and retrieved correctly

**Example Implementation:**
```typescript
for (const showData of testShows) {
  test(`Create and verify show: ${showData.title}`, async ({ request }) => {
    // Test implementation using showData
  });
}
```

### 2. Global Test Setup

**Task:** Create a global setup that seeds the database with initial test data.

**Detailed Steps:**
1. Create a new file `global-setup.ts` in the tests folder
2. Implement the global setup function that:
   - Connects to the API
   - Creates a set of test shows
   - Stores their IDs for later use
3. Update `playwright.config.ts` to use this global setup
4. Create corresponding global teardown to clean up after all tests

**Reference Implementation:**
Look at Playwright's documentation on global setup at: 
https://playwright.dev/docs/test-global-setup-teardown

### 3. Parallel Test Execution

**Task:** Implement parallel test execution with data isolation.

**Detailed Steps:**
1. Update your `playwright.config.ts` to enable parallel execution:
   ```typescript
   export default defineConfig({
     // Other config
     fullyParallel: true,
     workers: 3,
   });
   ```
2. Ensure your tests use unique data when running in parallel
3. Create test-specific data identifiers using timestamps or UUIDs
4. Monitor test execution to ensure there are no race conditions

**Tips for Success:**
- Each parallel test should create its own unique data
- Use dynamic IDs (e.g., `Date.now()` or UUID) for resource creation
- Be careful with assertions on global resources

## Tips and Common Issues

See the [TIPS.md](./TIPS.md) file for detailed information on:
- Testing best practices
- Common issues and their solutions
- Debugging failed tests
- Troubleshooting TypeScript configuration problems
