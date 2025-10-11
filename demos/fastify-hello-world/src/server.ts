import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

// User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Request body interfaces
interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

// Route parameter interfaces
interface UserParams {
  id: string;
}

// Sample data for our API
let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

let nextId = 4;

// Create Fastify instance
const server: FastifyInstance = fastify({ 
  logger: true 
});

// Root route
server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return { 
    message: 'Welcome to Fastify Hello World API!',
    endpoints: {
      'GET /': 'This welcome message',
      'GET /users': 'Get all users',
      'GET /users/:id': 'Get user by ID',
      'POST /users': 'Create a new user',
      'PUT /users/:id': 'Update user by ID',
      'DELETE /users/:id': 'Delete user by ID'
    }
  };
});

// Get all users
server.get('/users', async (request: FastifyRequest, reply: FastifyReply): Promise<User[]> => {
  return users;
});

// Get user by ID
server.get<{ Params: UserParams }>('/users/:id', async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
  const { id } = request.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    reply.code(404);
    return { error: 'User not found' };
  }
  
  return user;
});

// Create a new user
server.post<{ Body: CreateUserRequest }>('/users', async (request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) => {
  const { name, email } = request.body;
  
  if (!name || !email) {
    reply.code(400);
    return { error: 'Name and email are required' };
  }
  
  const newUser: User = {
    id: nextId++,
    name,
    email
  };
  
  users.push(newUser);
  reply.code(201);
  return newUser;
});

// Update user by ID
server.put<{ Params: UserParams; Body: UpdateUserRequest }>('/users/:id', async (request: FastifyRequest<{ Params: UserParams; Body: UpdateUserRequest }>, reply: FastifyReply) => {
  const { id } = request.params;
  const { name, email } = request.body;
  
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex === -1) {
    reply.code(404);
    return { error: 'User not found' };
  }
  
  if (name) users[userIndex].name = name;
  if (email) users[userIndex].email = email;
  
  return users[userIndex];
});

// Delete user by ID
server.delete<{ Params: UserParams }>('/users/:id', async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
  const { id } = request.params;
  const userIndex = users.findIndex(u => u.id === parseInt(id));
  
  if (userIndex === -1) {
    reply.code(404);
    return { error: 'User not found' };
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  return { message: 'User deleted successfully', user: deletedUser };
});

// Health check endpoint
server.get('/health', async (request: FastifyRequest, reply: FastifyReply) => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

// Start the server
const start = async (): Promise<void> => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';
    
    await server.listen({ port, host });
    console.log(`🚀 Server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
