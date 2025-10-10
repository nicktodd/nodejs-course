import Fastify from 'fastify';
import cors from '@fastify/cors';
import { userRoutes } from './routes/users';

const fastify = Fastify({
  logger: true
});

// Register CORS plugin
fastify.register(cors, {
  origin: true // Allow all origins in development
});

// Register user routes
fastify.register(userRoutes);

// Add a health check endpoint
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Fastify CRUD API with TypeScript'
  };
});

// Add a root endpoint with API information
fastify.get('/', async (request, reply) => {
  return {
    message: 'Welcome to Fastify CRUD API with TypeScript',
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
    documentation: 'See README.md for detailed API usage examples'
  };
});

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`🚀 Server is running at http://${host}:${port}`);
    console.log(`📚 API Documentation available at http://${host}:${port}`);
    console.log(`❤️ Health check available at http://${host}:${port}/health`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  try {
    await fastify.close();
    console.log('✅ Server closed successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
});

start();