
# Playwright Advanced Features Lab

This lab covers advanced API testing concepts:
- Throttling behaviour
- Error handling and negative tests
- API versioning

## Lab Structure
- `server.ts`: Simple API to test
- `lab.spec.ts`: Playwright test suite (starter, incomplete)
- `solution/lab.spec.ts`: Completed solution

## Step-by-Step Tasks

### 1. Throttling Behaviour
- Write a test that sends multiple requests to `/api/throttle`.
- Check that every third request receives a 429 status and the others succeed.

### 2. Error Handling & Negative Tests
- Write a test for `/api/auth-required` with no `Authorization` header (expect 401).
- Write a test for `/api/auth-required` with a valid header (expect 200).
- Write a test for `/api/echo` with an invalid payload (expect 400).
- Write a test for `/api/error` (expect 500 and correct error message).

### 3. API Versioning
- Write a test for `/api/v1/resource` (expect deprecation header and v1 response).
- Write a test for `/api/v2/resource` (expect v2 response).
- Write a test for `/api/resource` with header and query string versioning.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the API server:
   ```bash
   npm start
   ```
3. Run Playwright tests:
   ```bash
   npm test
   ```

## Solution
See `solution/lab.spec.ts` for completed tests.
