# Book Management API - Playwright Demo (TypeScript)

This demo showcases a complete CRUD API for managing books with comprehensive Playwright tests demonstrating advanced API testing patterns using TypeScript and Zod for schema validation.

## Features
- Complete REST API for book management (CRUD operations)
- TypeScript-based Playwright tests with comprehensive coverage
- Zod schema validation for all API requests/responses
- Error handling and edge case testing
- Setup/teardown patterns for clean test state

## Book Data Model
- `id`: number (auto-generated)
- `title`: string (required)
- `author`: string (required)
- `isbn`: string (optional)
- `publicationYear`: number (required)
- `genre`: string (required)
- `pages`: number (required)
- `rating`: number (1-5 stars, optional)
- `description`: string (optional)

## Quick Start

### 1. Install Dependencies
```powershell
cd demos/playwright-core
npm install
```

### 2. Start the API Server
```powershell
npm run dev
```
The API will run on `http://localhost:3000` by default.

### 3. Run the Tests
In a separate terminal:
```powershell
npx playwright test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/books` | Get all books |
| GET    | `/books/:id` | Get book by ID |
| POST   | `/books` | Create a new book |
| PUT    | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Test Coverage

The Playwright tests demonstrate:

### Core CRUD Operations
- ✅ Fetch all books with array validation
- ✅ Fetch single book by ID
- ✅ Create new books with validation
- ✅ Update existing books
- ✅ Delete books

### Advanced Patterns
- ✅ Zod schema validation for all responses
- ✅ Error handling (404, 400, validation errors)
- ✅ Negative test cases
- ✅ Setup/teardown hooks for clean test state
- ✅ Response chaining and data flow testing

### Test Structure
```
tests/
├── book.crud.spec.ts      # Main CRUD operation tests
├── book.validation.spec.ts # Validation and error tests
└── book.advanced.spec.ts   # Advanced patterns and workflows
```

## Running Specific Tests

```powershell
# Run only CRUD tests
npx playwright test book.crud.spec.ts

# Run only validation tests  
npx playwright test book.validation.spec.ts

# Run with HTML report
npx playwright test --reporter=html
npx playwright show-report
```

## Project Structure

```
src/
├── server.ts           # Express server with all endpoints
├── book.schema.ts      # Zod schemas for validation
├── book.data.ts        # Sample book data
└── types.ts           # TypeScript type definitions
tests/
├── book.crud.spec.ts      # Basic CRUD tests
├── book.validation.spec.ts # Validation tests
└── book.advanced.spec.ts   # Advanced test patterns
```

## Initial Sample Data

The API starts with a collection of popular books including classics and modern titles across various genres (Fiction, Non-Fiction, Sci-Fi, Fantasy, Mystery, etc.).

## Learning Objectives

This demo illustrates:
1. **API Testing Fundamentals**: Basic CRUD operations testing
2. **Schema Validation**: Using Zod for runtime type checking
3. **Error Handling**: Testing various error scenarios
4. **Test Organization**: Structuring tests for maintainability
5. **Advanced Patterns**: Setup/teardown, data chaining, negative testing

## Compare with Lab

This demo serves as a reference implementation showing the same concepts as `labs/playwright-core` but with a different domain (books vs TV shows), allowing students to:
- See the patterns applied to different data models
- Compare implementation approaches
- Practice with a familiar but distinct API structure

## Next Steps

Use this demo to understand the testing patterns, then apply similar techniques to the TV show API in the lab exercises.
