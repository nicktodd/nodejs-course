# Playwright with Nock Demo

A simple demonstration of using **Playwright** with **Nock** to test an API that makes external API calls.

## What This Demo Shows

This demo demonstrates a common real-world pattern: **an API that calls another API**. Specifically:

1. A **Fastify API** (our application) that fetches Star Wars character data from the **SWAPI** (Star Wars API - an external service)
2. **Playwright tests** that use **Nock** to intercept and mock the external SWAPI calls
3. How to verify that external APIs are being called correctly without actually making real HTTP requests

### The Problem This Solves

When your API depends on external services, testing becomes challenging:
- External APIs may be slow, unreliable, or have rate limits
- Tests become flaky when dependent on third-party services
- You can't easily test error scenarios from external services
- You need to verify your code makes the correct external calls

**Nock solves this** by intercepting outgoing HTTP requests and returning mock responses, while still allowing you to verify the requests were made correctly.

## Project Structure

```
├── server.ts              # Fastify server that calls SWAPI
├── tests/
│   └── character.spec.ts  # Playwright tests with Nock
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## How It Works

### The Application Architecture

```
┌─────────┐      HTTP GET       ┌──────────────┐      HTTP GET      ┌─────────┐
│ Client  │ ──────────────────► │    Fastify   │ ─────────────────► │  SWAPI  │
│         │  /character/:id     │    Server    │  /api/people/:id   │   API   │
└─────────┘                     │  (Our API)   │                    └─────────┘
                                └──────────────┘
                                       │
                                       │ Transforms data
                                       ▼
                                  Returns JSON:
                                  { id, name, 
                                    height, mass,
                                    hairColor, 
                                    birthYear }
```

This is a **proxy pattern** - our API acts as an intermediary that:
1. Receives requests from clients
2. Makes requests to external services (SWAPI)
3. Transforms/processes the response
4. Returns data to the client

### The API (server.ts)

The Fastify server provides a `/character/:id` endpoint that:
1. **Receives** a character ID from the client (e.g., `/character/1`)
2. **Calls** the external SWAPI API at `https://swapi.dev/api/people/{id}/`
3. **Transforms** the SWAPI response (converts `hair_color` → `hairColor`, etc.)
4. **Returns** the simplified data to the client

**Key features:**
- Uses `node-fetch` to make HTTP requests to SWAPI
- Handles errors (404 for not found, 500 for API failures)
- Returns transformed data in a cleaner format
- Includes a `/health` endpoint for monitoring

**Example request/response:**
```bash
GET /character/1

Response:
{
  "id": 1,
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hairColor": "blond",
  "birthYear": "19BBY"
}
```

### The Tests (tests/character.spec.ts)

The Playwright tests use **Nock** to intercept HTTP calls without hitting the real SWAPI:

```
┌─────────────┐                  ┌──────────────┐         ╔══════╗
│  Playwright │  HTTP Request    │    Fastify   │  ╔══════╣ Nock ╠═══╗
│    Test     │ ───────────────► │    Server    │  ║      ╚══════╝   ║
└─────────────┘                  │  (Our API)   │  ║   Intercepts!   ║
                                 └──────────────┘  ║   Returns Mock  ║
                                        │          ╚═════════════════╝
                                        │ Tries to call SWAPI
                                        ▼
                                    Never reaches real SWAPI
                                    Gets mocked response from Nock
```

**How Nock works:**
1. **Before the test:** Set up a Nock interceptor that matches the SWAPI URL
2. **During the test:** When Fastify tries to call SWAPI, Nock intercepts it
3. **Nock responds:** Returns the mock data instead of making a real HTTP call
4. **After the test:** Verify the interceptor was used (proves the call was made)

The tests verify:
1. **Successful API call** - Verifies that SWAPI is called and data is returned correctly
2. **Character not found** - Tests 404 handling when SWAPI returns not found
3. **API errors** - Tests error handling when SWAPI fails
4. **Different characters** - Shows testing with different mock data

**Why use Nock?**
-  **Fast** - No real network calls means tests run in milliseconds
-  **Reliable** - Tests don't fail due to network issues or external service downtime
-  **Controllable** - Can simulate any scenario (errors, timeouts, specific responses)
-  **Verifiable** - Can confirm your API makes the correct external API calls

### Key Testing Patterns

**1. Setting up a Nock interceptor:**
```typescript
// Define the mock data you want to return
const mockCharacterData = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  birth_year: '19BBY'
};

// Create an interceptor that matches the external API call
const scope = nock('https://swapi.dev')      // The domain to intercept
  .get('/api/people/1/')                      // The path to match
  .reply(200, mockCharacterData);             // The mock response
```

**2. Making the request to your API:**
```typescript
// This will trigger your Fastify server to try calling SWAPI
const response = await request.get('/character/1');

// Your server will receive the mock data from Nock instead
const data = await response.json();
```

**3. Verifying the external API was called:**
```typescript
// Confirm that Nock's interceptor was actually used
// This proves your code tried to call the external API
expect(scope.isDone()).toBeTruthy();
```

**Complete test example:**
```typescript
test('should fetch character and verify SWAPI was called', async ({ request }) => {
  // 1. Set up the mock
  const scope = nock('https://swapi.dev')
    .get('/api/people/1/')
    .reply(200, { name: 'Luke Skywalker', /* ... */ });

  // 2. Call your API
  const response = await request.get('/character/1');
  
  // 3. Verify the response
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.name).toBe('Luke Skywalker');

  // 4. Verify SWAPI was called
  expect(scope.isDone()).toBeTruthy();
});
```

## Setup

Install dependencies:

```bash
npm install
```

## Running the Server

To start the Fastify server:

```bash
npm start
```

The server will be available at `http://localhost:3000`

### Testing the API manually

```bash
# Get Luke Skywalker (ID 1)
curl http://localhost:3000/character/1

# Health check
curl http://localhost:3000/health
```

## Running the Tests

Run the Playwright tests:

```bash
npm test
```

View the test report:

```bash
npx playwright show-report
```

## Test Scenarios

The demo includes comprehensive test coverage:

### 1. Successful API Call
Tests the happy path where everything works correctly:
- Nock intercepts the SWAPI call
- Returns mock character data
- Verifies the data is transformed correctly
- Confirms the external API was actually called

### 2. Character Not Found (404)
Tests error handling when the character doesn't exist:
- Nock returns a 404 status
- Verifies your API correctly handles and forwards the 404
- Ensures proper error messages are returned

### 3. API Errors (500)
Tests handling of external service failures:
- Nock simulates a network error
- Verifies your API catches the error
- Confirms a 500 status is returned to the client

### 4. Different Characters
Demonstrates testing with various data:
- Tests with different character IDs
- Shows how to test multiple scenarios
- Verifies each interceptor is used correctly

## Key Concepts

### Understanding the Flow

**Without Nock (production):**
```
Test → Your API → Real SWAPI → Response → Your API → Test
        (slow, unreliable, can't test errors easily)
```

**With Nock (testing):**
```
Test → Your API → Nock (intercepts) → Mock Response → Your API → Test
        (fast, reliable, can simulate any scenario)
```

### Nock Interceptors

An interceptor tells Nock what to watch for and how to respond:

```typescript
nock('https://swapi.dev')      // Match this domain
  .get('/api/people/1/')        // Match this HTTP method and path
  .reply(200, mockData);        // Return this status and data

// You can also test different status codes:
nock('https://swapi.dev')
  .get('/api/people/999/')
  .reply(404);                  // Not found

// Or simulate errors:
nock('https://swapi.dev')
  .get('/api/people/1/')
  .replyWithError('Network error');
```

### Verifying Calls Were Made

The `scope.isDone()` check is crucial - it verifies your code actually tried to call the external API:

```typescript
const scope = nock('https://swapi.dev')
  .get('/api/people/1/')
  .reply(200, mockData);

await request.get('/character/1');

// This will be TRUE if your code called https://swapi.dev/api/people/1/
// This will be FALSE if your code didn't make the external call
expect(scope.isDone()).toBeTruthy();
```

This proves your application logic is working correctly, not just that it returns the right data.

### Cleanup

Always clean up Nock interceptors after each test to prevent interference:

```typescript
test.afterEach(() => {
  nock.cleanAll(); // Remove all interceptors after each test
});
```

Without cleanup, interceptors from one test might affect other tests.

## Real-World Use Cases

This pattern is valuable when your application:

- **Integrates with third-party APIs** (payment gateways, weather services, etc.)
- **Acts as a microservice** calling other internal services
- **Aggregates data** from multiple external sources
- **Proxies authenticated requests** to external APIs
- **Translates between API formats** (like we transform SWAPI's snake_case to camelCase)

### Example Real-World Scenarios

1. **E-commerce:** Your API calls Stripe for payment processing
2. **Weather App:** Your API calls OpenWeather API and caches results
3. **Social Media:** Your API calls Twitter/Facebook APIs for user data
4. **Microservices:** Your user service calls an authentication service

In all these cases, Nock lets you test your code without depending on external services.

## Benefits of This Approach

1. **Fast tests** - No actual network calls, tests complete in milliseconds
2. **Reliable** - Not dependent on external service availability or network conditions
3. **Controllable** - Can test error scenarios that are hard to reproduce with real APIs
4. **Verification** - Can confirm external APIs are called correctly with the right parameters
5. **Cost-effective** - Don't rack up API usage charges during testing
6. **Secure** - No need to expose real API keys in test environments
7. **CI/CD friendly** - Tests run quickly and reliably in pipelines

## When to Use This Pattern

**Use Nock when:**
- Testing code that makes HTTP requests to external services
- You need to verify your code calls external APIs correctly
- You want to test error handling without breaking real services
- You need fast, reliable tests for CI/CD pipelines

**Don't use Nock for:**
- Integration tests where you want to verify the real external API works
- End-to-end tests that need to test the full production flow
- Contract testing where you verify API compatibility

## Summary

This demo shows how to:
1. Build an API that calls another API (common microservices pattern)
2. Test external API calls without making real HTTP requests
3. Verify your code makes the correct external calls
4. Handle errors from external services gracefully
5. Write fast, reliable tests for APIs with external dependencies

## Learn More

- [Playwright Documentation](https://playwright.dev/)
- [Nock Documentation](https://github.com/nock/nock)
- [Fastify Documentation](https://fastify.dev/)
- [SWAPI Documentation](https://swapi.dev/)
