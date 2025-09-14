import { test as base } from '@playwright/test';
import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch';
import { serverPromise } from '../../src/server';

// Define the GraphQL client interface
export interface GraphQLClient {
  query: <T = any>(query: string, variables?: Record<string, any>) => Promise<{ data: T }>;
  mutate: <T = any>(mutation: string, variables?: Record<string, any>) => Promise<{ data: T }>;
}

// Create a new test fixture with GraphQL client
const test = base.extend<{
  graphqlClient: GraphQLClient;
}>({
  graphqlClient: async ({}, use) => {
    // Start the GraphQL server if it's not already running
    const { url } = await serverPromise;
    
    // Create an Apollo client with HttpLink instead of directly using uri
    const client = new ApolloClient({
      link: new HttpLink({ uri: url, fetch }),
      cache: new InMemoryCache(),
    });

    // Create a simplified client interface
    const graphqlClient: GraphQLClient = {
      query: async <T = any>(query: string, variables?: Record<string, any>) => {
        const result = await client.query<T>({
          query: gql(query),
          variables,
          fetchPolicy: 'no-cache', // Always get fresh data for tests
        });
        return { data: result.data };
      },
      mutate: async <T = any>(mutation: string, variables?: Record<string, any>) => {
        const result = await client.mutate<T>({
          mutation: gql(mutation),
          variables,
        });
        return { data: result.data as T };
      },
    };

    // Use the GraphQL client in the test
    await use(graphqlClient);
  },
});

// Add describe method to test
test.describe = base.describe;

export { expect } from '@playwright/test';
export default test;
