# Advanced API Testing Patterns with Playwright - Solution

This is the solution for the Advanced API Testing Patterns with Playwright lab. It demonstrates how to implement advanced API testing techniques using Playwright, TypeScript, and Zod.

## Solution Overview

This solution demonstrates:

1. **Authentication Testing**
   - Login with valid and invalid credentials
   - Authorization headers for protected endpoints
   - Role-based access control (admin vs regular user)

2. **File Upload and Download Testing**
   - Image file uploads with multipart/form-data
   - File validation and handling
   - File download verification

3. **Response Chaining**
   - Multi-step API workflows
   - Data persistence across requests
   - Complete CRUD operations in sequence

4. **Test Organization Best Practices**
   - Using test fixtures for authentication
   - Proper test grouping with `test.describe`
   - Setup and teardown with `test.beforeAll` and `test.afterAll`

## Running the Solution

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the API server:
   ```sh
   npm run dev
   ```

3. In a separate terminal, run the tests:
   ```sh
   npm test
   ```

4. For running the server and tests in a single command:
   ```sh
   npm run test:ci
   ```
   Note: Make sure no other processes are using port 3000 before running this command.

5. For debugging tests:
   ```sh
   npm run test:debug
   ```

6. For viewing tests in a headed browser:
   ```sh
   npm run test:headed
   ```

## Key Test Patterns Demonstrated

### 1. Authentication and Authorization Testing

- Token acquisition before tests
- Testing different permission levels
- Testing request rejection for unauthorized access

### 2. Test Data Management

- Creating test data during test execution
- Sharing data between test steps
- Proper cleanup after tests

### 3. Multi-step Test Workflows

- Complete CRUD operations in sequence
- Verifying state changes after each step
- Error handling and assertions

## Test Structure

The main test file, `tvshow.patterns.spec.ts`, is organized as follows:

1. **Setup and Authentication**
   - Obtaining tokens in beforeAll hooks
   - Testing authentication endpoints

2. **Basic CRUD with Authentication**
   - Creating, reading, updating, and deleting with proper auth

3. **Permission Testing**
   - Testing role-based access controls
   - Verifying admin-only operations

4. **File Operations**
   - Testing file uploads with proper auth
   - Verifying file storage and URLs

5. **End-to-End Workflows**
   - Complete chained workflows that combine all operations
