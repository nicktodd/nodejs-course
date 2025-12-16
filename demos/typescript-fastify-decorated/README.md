# TypeScript Fastify CRUD API with Decorators

This is a demonstration of building a CRUD API using Fastify, TypeScript, and the `fastify-decorators` library. This version showcases how to use decorators for controllers, services, and dependency injection.

## Features

- **Decorator-based Controllers**: Use `@Controller`, `@GET`, `@POST`, `@PUT`, `@DELETE` decorators
- **Dependency Injection**: Use `@Service` and `@Inject` decorators for service management
- **JSON Schema Validation**: Automatic request/response validation
- **TypeScript**: Full type safety with interfaces and generics
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Global error handler with consistent JSON responses
- **Health Check**: Built-in health monitoring endpoint

## Key Differences from Function-based Approach

### Controllers vs Route Functions
Instead of:
```typescript
export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', async (request, reply) => {
    // handler logic
  });
}
```

We use:
```typescript
@Controller('/users')
export class UsersController {
  @GET('/')
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    // handler logic
  }
}
```

### Service Dependencies
Instead of importing a service instance:
```typescript
import { userService } from '../services/userService';
```

We use dependency injection:
```typescript
@Controller('/users')
export class UsersController {
  @Inject(UserService)
  private userService!: UserService;
}
```

### Service Declaration
Services are decorated classes:
```typescript
@Service()
export class UserService {
  // service methods
}
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This will start the development server with hot reloading on http://localhost:3000

## Build

```bash
npm run build
```

## Production

```bash
npm start
```

## API Endpoints

### Users CRUD

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

### System Endpoints

- `GET /` - API information and documentation
- `GET /health` - Health check endpoint

## Request/Response Examples

### Create User
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}'
```

### Get All Users
```bash
curl http://localhost:3000/users
```

### Update User
```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "age": 31}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3000/users/1
```

## Benefits of Decorator Approach

1. **Better Organization**: Controllers group related endpoints together
2. **Dependency Injection**: Cleaner service management and testing
3. **Declarative**: Route definitions are more readable and maintainable
4. **Modular**: Easier to extend and modify individual controllers
5. **Enterprise-ready**: Follows patterns common in frameworks like NestJS

## Project Structure

```
src/
├── app.ts                    # Application entry point with decorator bootstrap
├── controllers/
│   └── UsersController.ts    # User CRUD operations controller
├── services/
│   └── UserService.ts        # User business logic service
├── models/
│   └── User.ts              # TypeScript interfaces
└── schemas/
    └── userSchemas.ts       # JSON validation schemas
```

## Dependencies

- **fastify**: Fast and low overhead web framework
- **fastify-decorators**: Decorator support for controllers and services
- **@fastify/cors**: CORS plugin
- **typescript**: TypeScript compiler and type definitions