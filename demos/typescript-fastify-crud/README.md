# Fastify CRUD API with TypeScript - Demo

## Known Deployment Issue for First Run of cdk deploy to a fresh install
The current live deployment of this application is using an existing CodeBuild job.
This means that when the CodePipeline is created, the CodeBuild job will require
it's policy file to have permissions edited to be able to access the KMS key created by this CDK project. So on first deployment of this CDK project, a manual edit of the CodeBuild policy is required to be able to reference the KMS key created for the artifact bucket. The artifact bucket does not need to be edited as we have used a wildcard for the final part of the bucket name.




This demo showcases a complete CRUD (Create, Read, Update, Delete) API built with Fastify and TypeScript. This example demonstrates:

- Setting up a Fastify server with TypeScript
- Defining TypeScript interfaces for data models
- Implementing CRUD operations for a simple resource
- Using proper HTTP status codes
- Error handling and validation
- CORS configuration for frontend integration

## What's Included

- **User Management API**: Complete CRUD operations for managing users
- **TypeScript Interfaces**: Proper typing for request/response objects
- **In-Memory Storage**: Simple array-based storage for demonstration
- **Error Handling**: Proper error responses and validation
- **RESTful Routes**: Following REST conventions for API endpoints

## API Endpoints

| Method | Endpoint     | Description           |
|--------|-------------|-----------------------|
| GET    | `/users`     | Get all users        |
| GET    | `/users/:id` | Get user by ID       |
| POST   | `/users`     | Create a new user    |
| PUT    | `/users/:id` | Update user by ID    |
| DELETE | `/users/:id` | Delete user by ID    |

## Data Model

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}
```

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

## Docker: Build and Run

You can build and run the demo using Docker:

```bash
# Build the Docker image
# (run this from the project directory containing the Dockerfile)
docker build -t typescript-user-api .

# Run the Docker container (exposes port 3000)
docker run -p 3000:3000 -d typescript-user-api
```

The API will be available at `http://localhost:3000`.

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get all users
curl http://localhost:3000/users

# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'

# Get a specific user
curl http://localhost:3000/users/1

# Update a user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Smith", "email": "johnsmith@example.com", "age": 31}'

# Delete a user
curl -X DELETE http://localhost:3000/users/1
```

## Key Features Demonstrated

1. **TypeScript Integration**: Full type safety with interfaces and type checking
2. **Fastify Setup**: Proper server configuration with plugins
3. **CRUD Operations**: Complete Create, Read, Update, Delete functionality
4. **Error Handling**: Proper HTTP status codes and error messages
5. **Data Validation**: Basic validation for required fields
6. **CORS Support**: Cross-origin resource sharing configuration

## Project Structure

```
src/
├── app.ts          # Main application entry point
├── models/         # TypeScript interfaces and types
│   └── User.ts     # User model definition
├── routes/         # API route handlers
│   └── users.ts    # User CRUD routes
└── services/       # Business logic layer
    └── userService.ts  # User data operations
```