import Fastify from 'fastify';
import cors from '@fastify/cors';
import { bootstrap } from 'fastify-decorators';
import path from 'path';

const fastify = Fastify({
  logger: true
});

// Register CORS plugin
fastify.register(cors, {
  origin: true // Allow all origins in development
});

// Register fastify-decorators and auto-load controllers and services
fastify.register(bootstrap, {
  // Directory to automatically load controllers and services from
  directory: path.join(__dirname, 'controllers'),
  mask: /\.ts$/
});

// Add a global error handler
// handles all errors thrown in routes and plugins and returns a JSON response
fastify.setErrorHandler((error, request, reply) => {
  // Customize error response structure here
  reply.status(error.statusCode || 500).send({
    success: false,
    error: error.message,
  });
});

// Add a health check endpoint
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Fastify CRUD API with TypeScript and Decorators'
  };
});

// Add a root endpoint with API information
fastify.get('/', async (request, reply) => {
  return {
    message: 'Welcome to Fastify CRUD API with TypeScript and Decorators',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: {
        getAll: 'GET /users',
        getById: 'GET /users/:id',
        create: 'POST /users',
        update: 'PUT /users/:id',
        delete: 'DELETE /users/:id'
      }
    },
    documentation: 'See README.md for detailed API usage examples',
    decorators: 'This version uses fastify-decorators for controllers and services'
  };
});

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`Server is running at http://${host}:${port}`);
    console.log(`API Documentation available at http://${host}:${port}`);
    console.log(`Health check available at http://${host}:${port}/health`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n Received SIGINT, shutting down gracefully...');
  try {
    await fastify.close();
    console.log('Server closed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

start();