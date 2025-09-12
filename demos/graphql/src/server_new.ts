import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';

import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

async function startServer(): Promise<any> {
  try {
    // Create Express app
    const app: express.Application = express();

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => {
        // You can add context here (auth, database connections, etc.)
        return {
          req,
          res,
        };
      },
      // Enable GraphQL Playground in production for demo purposes
      introspection: true,
      formatError: (error: any) => {
        console.error('GraphQL Error:', error);
        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: error.extensions,
        };
      },
    });

    // Start the server
    await server.start();

    // Apply middleware
    server.applyMiddleware({ app: app as any, path: '/graphql' });

    // Create HTTP server
    const httpServer = createServer(app);

    // Add basic health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ 
        status: 'ok', 
        message: 'TV Schedule GraphQL API is running',
        timestamp: new Date().toISOString()
      });
    });

    // Add basic info endpoint
    app.get('/', (req, res) => {
      res.json({
        message: 'TV Schedule GraphQL API',
        graphqlEndpoint: '/graphql',
        graphqlPlayground: '/graphql',
        healthCheck: '/health',
        documentation: 'See README.md for API documentation and examples'
      });
    });

    const PORT = process.env.PORT || 4000;

    // Start HTTP server with proper error handling
    await new Promise<void>((resolve, reject) => {
      httpServer.on('error', (err) => {
        reject(err);
      });
      
      httpServer.listen(PORT, () => {
        console.log(`🚀 TV Schedule GraphQL API Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`🚀 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
        console.log(`❤️  Health check available at http://localhost:${PORT}/health`);
        resolve();
      });
    });

    // Graceful shutdown handling
    process.on('SIGINT', () => {
      console.log('Received SIGINT, shutting down gracefully...');
      httpServer.close(() => {
        console.log('Server shut down successfully');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('Received SIGTERM, shutting down gracefully...');
      httpServer.close(() => {
        console.log('Server shut down successfully');
        process.exit(0);
      });
    });

    return { server, app, httpServer };
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start server if this file is run directly
if (require.main === module) {
  startServer();
}

export default startServer;
