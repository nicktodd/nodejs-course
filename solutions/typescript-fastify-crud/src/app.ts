import Fastify from 'fastify';
import cors from '@fastify/cors';
import { bookRoutes } from './routes/books';

const fastify = Fastify({
  logger: true
});

// Register CORS plugin
fastify.register(cors, {
  origin: true // Allow all origins in development
});

// Register book routes
fastify.register(bookRoutes);

// Add a health check endpoint
fastify.get('/health', async (request, reply) => {
  return { 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Fastify Book CRUD API with TypeScript'
  };
});

// Add a root endpoint with API information
fastify.get('/', async (request, reply) => {
  return {
    message: 'Welcome to Fastify Book CRUD API with TypeScript',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      books: {
        getAll: 'GET /books',
        getAllWithSearch: 'GET /books?search=query',
        getAllPaginated: 'GET /books?limit=10&offset=0',
        getAllSorted: 'GET /books?sortBy=title&order=asc',
        getById: 'GET /books/:id',
        create: 'POST /books',
        update: 'PUT /books/:id',
        delete: 'DELETE /books/:id'
      }
    },
    sampleRequests: {
      createBook: {
        method: 'POST',
        url: '/books',
        body: {
          title: 'Sample Book Title',
          author: 'Sample Author',
          isbn: '978-0-123456-78-9',
          publishedYear: 2024,
          genre: 'Fiction'
        }
      },
      updateBook: {
        method: 'PUT',
        url: '/books/1',
        body: {
          title: 'Updated Title',
          genre: 'Updated Genre'
        }
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
    console.log(`📖 Book API endpoints available at http://${host}:${port}/books`);
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