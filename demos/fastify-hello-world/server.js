const fastify = require('fastify')({ 
  logger: true 
});

// Sample data for our API
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

let nextId = 4;

// Root route
fastify.get('/', async (request, reply) => {
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
fastify.get('/users', async (request, reply) => {
  return users;
});

// Get user by ID
fastify.get('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const user = users.find(u => u.id === parseInt(id));
  
  if (!user) {
    reply.code(404);
    return { error: 'User not found' };
  }
  
  return user;
});

// Create a new user
fastify.post('/users', async (request, reply) => {
  const { name, email } = request.body;
  
  if (!name || !email) {
    reply.code(400);
    return { error: 'Name and email are required' };
  }
  
  const newUser = {
    id: nextId++,
    name,
    email
  };
  
  users.push(newUser);
  reply.code(201);
  return newUser;
});

// Update user by ID
fastify.put('/users/:id', async (request, reply) => {
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
fastify.delete('/users/:id', async (request, reply) => {
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
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`🚀 Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
