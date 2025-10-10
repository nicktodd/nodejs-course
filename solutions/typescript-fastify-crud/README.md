# Fastify CRUD API with TypeScript - Lab Solution

This is the complete solution for the Fastify CRUD API lab exercise. This implementation demonstrates a professional-grade REST API built with Fastify and TypeScript, featuring comprehensive CRUD operations for a book management system.

## Features Implemented

### Core Requirements
- **Complete CRUD Operations**: Create, Read, Update, Delete for books
- **TypeScript Integration**: Full type safety with interfaces and proper typing
- **Data Validation**: Comprehensive input validation with detailed error messages
- **Error Handling**: Proper HTTP status codes and error responses
- **Consistent API Responses**: Standardized JSON response format

### Bonus Features ✅
- **Search Functionality**: Search books by title, author, or genre
- **Pagination Support**: Limit and offset query parameters
- **Sorting Capabilities**: Sort by title, author, publishedYear, genre, or createdAt
- **ISBN Validation**: Proper ISBN-10 and ISBN-13 format validation
- **Duplicate Prevention**: Prevents creating books with existing ISBNs

## API Endpoints

### Basic CRUD Operations

| Method | Endpoint      | Description          | Success Code | Error Codes    |
|--------|---------------|----------------------|--------------|----------------|
| GET    | `/books`      | Get all books       | 200          | 500            |
| GET    | `/books/:id`  | Get book by ID      | 200          | 400, 404, 500  |
| POST   | `/books`      | Create a new book   | 201          | 400, 409, 500  |
| PUT    | `/books/:id`  | Update book by ID   | 200          | 400, 404, 409, 500  |
| DELETE | `/books/:id`  | Delete book by ID   | 200          | 400, 404, 500  |

### Advanced Features

| Feature | Endpoint | Example |
|---------|----------|---------|
| Search | `GET /books?search=query` | `/books?search=Orwell` |
| Pagination | `GET /books?limit=10&offset=0` | `/books?limit=5&offset=10` |
| Sorting | `GET /books?sortBy=title&order=asc` | `/books?sortBy=publishedYear&order=desc` |
| Combined | `GET /books?search=fiction&limit=5&sortBy=title` | Multiple features together |

## Data Model

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Sample Data

The solution includes 4 pre-loaded books:
1. To Kill a Mockingbird - Harper Lee (1960)
2. 1984 - George Orwell (1949)
3. Pride and Prejudice - Jane Austen (1813)
4. The Catcher in the Rye - J.D. Salinger (1951)

## Installation and Setup

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build

# Run in development mode (with auto-reload)
npm run dev

# Run the built application
npm start
```

## Testing the API

### Basic Operations

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

# Update a book (partial update supported)
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "genre": "Classic Literature"
  }'

# Delete a book
curl -X DELETE http://localhost:3000/books/1
```

### Advanced Features

```bash
# Search for books
curl "http://localhost:3000/books?search=Orwell"

# Get books with pagination
curl "http://localhost:3000/books?limit=2&offset=0"

# Get books sorted by publication year (newest first)
curl "http://localhost:3000/books?sortBy=publishedYear&order=desc"

# Combined: Search + Pagination + Sorting
curl "http://localhost:3000/books?search=fiction&limit=3&sortBy=title&order=asc"
```

## Validation Rules

### Title
- Required field
- 1-200 characters
- Cannot be empty or whitespace only

### Author  
- Required field
- 1-100 characters
- Cannot be empty or whitespace only

### ISBN
- Required field
- Must be valid ISBN-10 or ISBN-13 format
- Supports both hyphenated and non-hyphenated formats
- Must be unique across all books

### Published Year
- Required field
- Must be integer between 1000 and current year
- Cannot be in the future

### Genre
- Required field
- 1-50 characters
- Cannot be empty or whitespace only

## Project Structure

```
src/
├── app.ts                    # Main application entry point
├── models/
│   └── Book.ts              # TypeScript interfaces and types
├── routes/
│   └── books.ts            # Book CRUD route handlers
└── services/
    └── bookService.ts      # Business logic and data operations
```

## Response Format

All endpoints return a consistent JSON response format:

### Success Response
```json
{
  "success": true,
  "data": { /* book data or array of books */ },
  "message": "Operation completed successfully",
  "pagination": { /* included when using pagination */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed validation errors if applicable"]
}
```

## Key Learning Points Demonstrated

1. **TypeScript Best Practices**
   - Interface definitions for data models
   - Type-safe request/response handling
   - Proper generic typing with Fastify

2. **RESTful API Design**
   - Appropriate HTTP methods and status codes
   - Resource-based URL structure
   - Consistent response formatting

3. **Data Validation**
   - Input sanitization and validation
   - Business rule enforcement (e.g., ISBN uniqueness)
   - Meaningful error messages

4. **Error Handling**
   - Comprehensive try-catch blocks
   - Appropriate HTTP status codes
   - Graceful error responses

5. **Code Organization**
   - Separation of concerns (models, services, routes)
   - Modular architecture
   - Clean, maintainable code structure

## Comparison with Lab Requirements

This solution exceeds the basic lab requirements by including:
- All required CRUD operations
- Complete TypeScript typing
- Comprehensive data validation  
- Advanced ISBN validation (bonus)
- Search functionality (bonus)
- Pagination support (bonus)
- Sorting capabilities (bonus)
- Duplicate prevention (bonus)

## Next Steps

For further learning, consider extending this solution with:
- Database integration (PostgreSQL, MongoDB)
- Authentication and authorization
- Request rate limiting
- API documentation with Swagger
- Unit and integration tests
- Docker containerization
- Logging and monitoring