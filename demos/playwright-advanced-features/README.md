# Playwright Advanced Features Lab

This lab covers advanced API testing concepts:
- Throttling behaviour
- Error handling and negative tests
- Contract testing and versioning

## Lab Structure
- `server.js`: Simple API to test
- `lab.spec.js`: Playwright test suite (to be completed)
- `solution/lab.spec.js`: Completed solution

## Tasks

### 1. Throttling Behaviour
- Send multiple requests to `/api/throttle` and observe throttling (429 Too Many Requests).
- Check that non-throttled requests succeed.

### 2. Error Handling & Negative Tests
- Test `/api/auth-required` with and without `Authorization` header. Expect 401 for missing header.
- Test `/api/echo` with invalid payload (missing or wrong type for `text`). Expect 400 error.
- Test `/api/error` and check for 500 error and correct message.

### 3. Validating Error Responses
- For each error, check status code, error message, and response schema.

### 4. API Versioning
- Test `/api/v1/resource` and `/api/v2/resource` for correct version and deprecation header.
- Test `/api/resource` with header and query string versioning.

### 5. (Optional) Contract Testing
- Use [openapi-validator](https://www.npmjs.com/package/openapi-validator) to validate the API against an OpenAPI spec (if provided).

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
   npx playwright test lab.spec.js
   ```

## Solution
See `solution/lab.spec.js` for completed tests.
