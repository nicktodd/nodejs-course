# GraphQL API Testing with Playwright

This lab focuses on testing a GraphQL API using Playwright's testing capabilities. You'll learn how to make GraphQL queries and mutations, test the responses, and handle errors.

## Background

GraphQL is a query language for APIs that gives clients the power to ask for exactly what they need. Unlike REST APIs, GraphQL APIs have a single endpoint that handles all operations. Clients define the structure of the response they want, making GraphQL a flexible alternative to REST.

This lab builds on your knowledge of API testing from the REST lab, applying similar testing principles to GraphQL.

## Lab Overview

In this lab, you'll work with a GraphQL API for TV shows. The API lets you:

1. Query TV shows (by ID, genre, channel, etc.)
2. Create new TV shows
3. Update existing TV shows
4. Delete TV shows

You'll write tests for these GraphQL operations using Playwright.

## Getting Started

1. Navigate to the lab directory
2. Install dependencies with `npm install`
3. Start the GraphQL server in a separate terminal with `npm start`
4. Complete the tests in the `tests` directory

## GraphQL Schema

The API provides the following GraphQL types and operations:

### Types

- `TVShow`: Represents a TV show with fields for id, title, channel, genre, etc.
- `CreateTVShowInput`: Used to create new TV shows
- `UpdateTVShowInput`: Used to update existing TV shows

### Queries

- `tvshows`: Get all TV shows
- `tvshow(id: ID!)`: Get a specific TV show by ID
- `tvshowsByGenre(genre: String!)`: Get TV shows by genre
- `tvshowsByChannel(channel: String!)`: Get TV shows by channel
- `genres`: Get a list of all unique genres
- `channels`: Get a list of all unique channels

### Mutations

- `createTvShow(input: CreateTVShowInput!)`: Create a new TV show
- `updateTvShow(id: ID!, input: UpdateTVShowInput!)`: Update an existing TV show
- `deleteTvShow(id: ID!)`: Delete a TV show

## Your Tasks

1. Complete the tests in `queries.spec.ts` to test the GraphQL query operations
2. Complete the tests in `mutations.spec.ts` to test the GraphQL mutation operations

Each test file contains skipped tests with TODO comments explaining what each test should do. To complete each test:

1. Remove the `.skip` to enable the test
2. Delete the `test.fail()` line
3. Implement the test logic according to the TODO comments

## Testing GraphQL with Playwright

To help you with the testing, we've provided a custom `graphqlClient` fixture that simplifies making GraphQL requests. This fixture provides two methods:

1. `query`: For making GraphQL query operations
2. `mutate`: For making GraphQL mutation operations

Here's an example of how to use these methods:

```typescript
// Query example
const query = `
  query GetAllTvShows {
    tvshows {
      id
      title
    }
  }
`;
const { data } = await graphqlClient.query(query);

// Query with variables example
const query = `
  query GetTvShowById($id: ID!) {
    tvshow(id: $id) {
      title
      channel
    }
  }
`;
const variables = { id: "1" };
const { data } = await graphqlClient.query(query, variables);

// Mutation example
const mutation = `
  mutation CreateTvShow($input: CreateTVShowInput!) {
    createTvShow(input: $input) {
      id
      title
    }
  }
`;
const variables = {
  input: {
    title: "New Show",
    channel: "BBC One",
    genre: "Comedy",
    description: "A new comedy show",
    startTime: "2025-09-20T20:00:00Z",
    endTime: "2025-09-20T21:00:00Z"
  }
};
const { data } = await graphqlClient.mutate(mutation, variables);
```

## Testing Tips

1. Remember that GraphQL returns data in the exact shape you request in your query
2. Use variables for dynamic values in your queries and mutations
3. Test both success cases and error cases
4. Check for proper error codes and messages when testing error scenarios
5. Verify mutations by fetching the data again after the mutation

## Running the Tests

Run all tests with:
```
npm test
```

Run tests in headed mode (with browser UI visible):
```
npm run test:headed
```

## Submission

Complete all the test cases in `queries.spec.ts` and `mutations.spec.ts`. Your tests should cover all the GraphQL operations and handle both success and error cases.
