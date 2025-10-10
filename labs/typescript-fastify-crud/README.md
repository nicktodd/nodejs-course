# Fastify CRUD API with TypeScript - Lab Exercise

## Objectives
By the end of this lab, you will:
- Set up a Fastify server with TypeScript
- Create TypeScript interfaces for data models
- Implement CRUD operations (Create, Read, Update, Delete)
- Handle HTTP requests and responses properly
- Implement basic data validation
- Use proper HTTP status codes and error handling

## Prerequisites
- Basic understanding of TypeScript
- Familiarity with REST API concepts
- Node.js installed on your machine

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Project Structure**
   Create the following folder structure in the `src` directory:
   ```
   src/
   ├── app.ts          # Main application entry point
   ├── models/         # TypeScript interfaces and types
   │   └── Book.ts     # Book model definition (you'll create this)
   ├── routes/         # API route handlers  
   │   └── books.ts    # Book CRUD routes (you'll create this)
   └── services/       # Business logic layer
       └── bookService.ts  # Book data operations (you'll create this)
   ```

## Exercise 1: Setting Up the Basic Server

### Task 1.1: Create the Book Model
Create `src/models/Book.ts` with the following requirements:
- Define a `Book` interface with these properties:
  - `id` (number)
  - `title` (string)
  - `author` (string)
  - `isbn` (string)
  - `publishedYear` (number)
  - `genre` (string)
  - `createdAt` (Date)
  - `updatedAt` (Date)

- Also create these supporting interfaces:
  - `CreateBookRequest` - for creating new books (exclude id, createdAt, updatedAt)
  - `UpdateBookRequest` - for updating books (all fields optional except for validation)

### Task 1.2: Create the Book Service
Create `src/services/bookService.ts` with the following requirements:
- Create a `BookService` class that manages an in-memory array of books
- Add sample books to start with (at least 3 books)
- Implement these methods:
  - `getAllBooks(): Book[]`
  - `getBookById(id: number): Book | undefined`
  - `createBook(bookData: CreateBookRequest): Book`
  - `updateBook(id: number, bookData: UpdateBookRequest): Book | null`
  - `deleteBook(id: number): boolean`
  - `validateBookData(bookData: CreateBookRequest | UpdateBookRequest): string[]`

### Task 1.3: Create the Routes
Create `src/routes/books.ts` with the following API endpoints:

| Method | Endpoint      | Description          | Success Code | Error Codes    |
|--------|---------------|----------------------|--------------|----------------|
| GET    | `/books`      | Get all books       | 200          | 500            |
| GET    | `/books/:id`  | Get book by ID      | 200          | 400, 404, 500  |
| POST   | `/books`      | Create a new book   | 201          | 400, 409, 500  |
| PUT    | `/books/:id`  | Update book by ID   | 200          | 400, 404, 500  |
| DELETE | `/books/:id`  | Delete book by ID   | 200          | 400, 404, 500  |

**Requirements for each endpoint:**
- Proper TypeScript typing for request parameters and body
- Input validation using the service validation method
- Appropriate HTTP status codes
- Consistent JSON response format with `success`, `data`, and `message` fields
- Error handling with try-catch blocks

### Task 1.4: Create the Main Application
Create `src/app.ts` with:
- Fastify server setup with TypeScript
- CORS plugin registration
- Route registration for books
- A health check endpoint at `/health`
- A root endpoint at `/` with API information
- Proper server startup and graceful shutdown handling

## Exercise 2: Testing Your API

### Task 2.1: Build and Run
```bash
# Build the TypeScript code
npm run build

# Run in development mode (with auto-reload)
npm run dev
```

### Task 2.2: Test the Endpoints
Test your API using curl commands or a tool like Postman:

```bash
# Get all books
curl http://localhost:3000/books

# Get a specific book
curl http://localhost:3000/books/1

# Create a new book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby", 
    "author": "F. Scott Fitzgerald",
    "isbn": "978-0-7432-7356-5",
    "publishedYear": 1925,
    "genre": "Fiction"
  }'

# Update a book
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "genre": "Updated Genre"
  }'

# Delete a book
curl -X DELETE http://localhost:3000/books/1
```

## Exercise 3: Data Validation (Bonus)

Add validation rules to your `validateBookData` method:
- **title**: Required, 1-200 characters
- **author**: Required, 1-100 characters  
- **isbn**: Required, must match ISBN-10 or ISBN-13 format
- **publishedYear**: Required, between 1000 and current year
- **genre**: Required, 1-50 characters

## Exercise 4: Advanced Features (Bonus)

If you finish early, try implementing:
1. **Search functionality**: Add a query parameter to filter books by title or author
2. **Pagination**: Add `limit` and `offset` query parameters to `/books`
3. **Sorting**: Add a `sortBy` query parameter to sort by different fields
4. **Duplicate checking**: Prevent creating books with the same ISBN

## Success Criteria

Your solution should:
-  Compile without TypeScript errors  
-  Start the server on port 3000  
-  Handle all CRUD operations correctly  
-  Return appropriate HTTP status codes  
-  Validate input data properly  
-  Handle errors gracefully  
-  Use consistent response format  
-  Follow TypeScript best practices  

## Need Help?

- Check the demo folder for a complete working example
- Review the TypeScript documentation for interface syntax
- Refer to the Fastify documentation for route handling
- Look at the solution folder if you get stuck

## Hints

1. **TypeScript Interfaces**: Remember to export your interfaces so they can be imported in other files
2. **Fastify Types**: Use `FastifyRequest<{ Params: YourParamsType; Body: YourBodyType }>` for proper typing
3. **Error Handling**: Always wrap your route handlers in try-catch blocks
4. **Validation**: Validate data before using it, and return meaningful error messages
5. **HTTP Status Codes**: 
   - 200: Success
   - 201: Created
   - 400: Bad Request (validation errors)
   - 404: Not Found
   - 409: Conflict (duplicate data)
   - 500: Internal Server Error