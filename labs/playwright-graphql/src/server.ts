import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enable schema introspection for development
  });

  // Use a random port for testing to avoid conflicts
  const { url } = await startStandaloneServer(server, {
    listen: { port: 0 }, // Port 0 makes the OS assign a free port
  });

  console.log(`🚀 GraphQL server ready at: ${url}`);
  return { server, url };
}

// Export for testing purposes
export const serverPromise = startApolloServer();

// If this file is run directly (not imported), start the server
if (require.main === module) {
  startApolloServer();
}
