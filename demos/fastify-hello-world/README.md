# Fastify Hello World API (TypeScript)

A minimalistic Fastify API example application demonstrating basic CRUD operations built with TypeScript.

## Features

- Simple REST API with CRUD operations for users
- Built-in request logging
- Health check endpoint
- Error handling
- Environment variable configuration
- Full TypeScript support with type safety
- Proper interface definitions for requests and responses

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode (with auto-restart and TypeScript compilation)
```bash
npm run dev
```

#### Production Mode (builds and runs)
```bash
npm start
```

#### Build only
```bash
npm run build
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Root
- **GET /** - Welcome message with available endpoints

### Users
- **GET /users** - Get all users
- **GET /users/:id** - Get user by ID
- **POST /users** - Create a new user
- **PUT /users/:id** - Update user by ID
- **DELETE /users/:id** - Delete user by ID

### Health
- **GET /health** - Health check endpoint

## Example Usage

### Get all users
```bash
curl http://localhost:3000/users
```

### Get user by ID
```bash
curl http://localhost:3000/users/1
```

### Create a new user
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Update a user
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

### Delete a user
```bash
curl -X DELETE http://localhost:3000/users/1
```

### Health check
```bash
curl http://localhost:3000/health
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)

## Sample Data

The application starts with 3 sample users:
1. Alice (alice@example.com)
2. Bob (bob@example.com)
3. Charlie (charlie@example.com)

## Key Fastify Features Demonstrated

- **Fast JSON Serialization**: Fastify automatically handles JSON responses
- **Built-in Logging**: Uses Pino logger for structured logging
- **Route Parameters**: Extracting ID from URL paths
- **Request Body Parsing**: Automatic JSON body parsing
- **Status Code Management**: Setting appropriate HTTP status codes
- **Error Handling**: Proper error responses with meaningful messages

## Next Steps

This is a basic example. In a real application, you might want to add:
- Input validation (using Fastify schemas)
- Database integration
- Authentication and authorization
- Rate limiting
- CORS support
- API documentation (using @fastify/swagger)
- Testing
