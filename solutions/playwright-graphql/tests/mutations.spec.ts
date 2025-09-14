import test, { expect } from './fixtures/graphql.fixture';

test.describe('GraphQL Mutations', () => {
  test('should create a new TV show', async ({ graphqlClient }) => {
    const mutation = `
      mutation CreateTvShow($input: CreateTVShowInput!) {
        createTvShow(input: $input) {
          id
          title
          channel
          genre
          description
          startTime
          endTime
          createdAt
          updatedAt
        }
      }
    `;
    
    const variables = {
      input: {
        title: "Taskmaster",
        channel: "Channel 4",
        genre: "Comedy",
        description: "Comedians compete in absurd challenges",
        startTime: "2025-09-20T20:00:00Z",
        endTime: "2025-09-20T21:00:00Z"
      }
    };
    
    const { data } = await graphqlClient.mutate(mutation, variables);
    
    expect(data.createTvShow).toBeDefined();
    expect(data.createTvShow.id).toBeDefined();
    expect(data.createTvShow.title).toBe("Taskmaster");
    expect(data.createTvShow.channel).toBe("Channel 4");
    expect(data.createTvShow.genre).toBe("Comedy");
    expect(data.createTvShow.description).toBe("Comedians compete in absurd challenges");
    expect(data.createTvShow.startTime).toBe("2025-09-20T20:00:00Z");
    expect(data.createTvShow.endTime).toBe("2025-09-20T21:00:00Z");
    expect(data.createTvShow.createdAt).toBeDefined();
    expect(data.createTvShow.updatedAt).toBeDefined();
    
    // Verify the TV show was added by querying it
    const query = `
      query GetTvShow($id: ID!) {
        tvshow(id: $id) {
          title
        }
      }
    `;
    
    const result = await graphqlClient.query(query, { id: data.createTvShow.id });
    expect(result.data.tvshow.title).toBe("Taskmaster");
  });

  test('should handle validation errors when creating a TV show', async ({ graphqlClient }) => {
    const mutation = `
      mutation CreateTvShow($input: CreateTVShowInput!) {
        createTvShow(input: $input) {
          id
          title
        }
      }
    `;
    
    // Invalid input: startTime is after endTime
    const variables = {
      input: {
        title: "Invalid Show",
        channel: "BBC Two",
        genre: "Drama",
        description: "A show with invalid time range",
        startTime: "2025-09-20T22:00:00Z",  // Later than endTime
        endTime: "2025-09-20T21:00:00Z"     // Earlier than startTime
      }
    };
    
    try {
      await graphqlClient.mutate(mutation, variables);
      // If we reach here, the test should fail as we expect an error
      expect(false).toBeTruthy('Expected mutation to throw a validation error');
    } catch (error) {
      expect(error.message).toContain('Start time must be before end time');
      expect(error.graphQLErrors[0].extensions.code).toBe('BAD_USER_INPUT');
    }
  });

  test('should update an existing TV show', async ({ graphqlClient }) => {
    // First, query to get an existing show
    const getShowQuery = `
      query GetFirstShow {
        tvshows {
          id
          title
        }
      }
    `;
    
    const showsResult = await graphqlClient.query(getShowQuery);
    const showId = showsResult.data.tvshows[0].id;
    
    const mutation = `
      mutation UpdateTvShow($id: ID!, $input: UpdateTVShowInput!) {
        updateTvShow(id: $id, input: $input) {
          id
          title
          channel
          description
          updatedAt
        }
      }
    `;
    
    const variables = {
      id: showId,
      input: {
        title: "Updated Show Title",
        description: "This description has been updated"
      }
    };
    
    const { data } = await graphqlClient.mutate(mutation, variables);
    
    expect(data.updateTvShow).toBeDefined();
    expect(data.updateTvShow.id).toBe(showId);
    expect(data.updateTvShow.title).toBe("Updated Show Title");
    expect(data.updateTvShow.description).toBe("This description has been updated");
    
    // Verify the update by querying the show again
    const verifyQuery = `
      query VerifyUpdatedShow($id: ID!) {
        tvshow(id: $id) {
          title
          description
        }
      }
    `;
    
    const verifyResult = await graphqlClient.query(verifyQuery, { id: showId });
    expect(verifyResult.data.tvshow.title).toBe("Updated Show Title");
    expect(verifyResult.data.tvshow.description).toBe("This description has been updated");
  });

  test('should handle errors when updating a non-existent TV show', async ({ graphqlClient }) => {
    const mutation = `
      mutation UpdateTvShow($id: ID!, $input: UpdateTVShowInput!) {
        updateTvShow(id: $id, input: $input) {
          id
          title
        }
      }
    `;
    
    const variables = {
      id: "999",  // Non-existent ID
      input: {
        title: "This Should Fail"
      }
    };
    
    try {
      await graphqlClient.mutate(mutation, variables);
      // If we reach here, the test should fail as we expect an error
      expect(false).toBeTruthy('Expected mutation to throw an error');
    } catch (error) {
      expect(error.message).toContain('TV show with ID 999 not found');
      expect(error.graphQLErrors[0].extensions.code).toBe('NOT_FOUND');
    }
  });

  test('should delete a TV show', async ({ graphqlClient }) => {
    // First, create a new show to delete
    const createMutation = `
      mutation CreateTvShowToDelete($input: CreateTVShowInput!) {
        createTvShow(input: $input) {
          id
          title
        }
      }
    `;
    
    const createVariables = {
      input: {
        title: "Show to Delete",
        channel: "BBC Three",
        genre: "Reality",
        description: "This show will be deleted",
        startTime: "2025-09-21T20:00:00Z",
        endTime: "2025-09-21T21:00:00Z"
      }
    };
    
    const createResult = await graphqlClient.mutate(createMutation, createVariables);
    const showId = createResult.data.createTvShow.id;
    
    // Now delete the show
    const deleteMutation = `
      mutation DeleteTvShow($id: ID!) {
        deleteTvShow(id: $id) {
          id
          title
        }
      }
    `;
    
    const deleteVariables = { id: showId };
    const { data } = await graphqlClient.mutate(deleteMutation, deleteVariables);
    
    expect(data.deleteTvShow).toBeDefined();
    expect(data.deleteTvShow.id).toBe(showId);
    expect(data.deleteTvShow.title).toBe("Show to Delete");
    
    // Verify the show was deleted by trying to query it
    const verifyQuery = `
      query VerifyDeletedShow($id: ID!) {
        tvshow(id: $id) {
          title
        }
      }
    `;
    
    try {
      await graphqlClient.query(verifyQuery, { id: showId });
      // If we reach here, the test should fail as we expect an error
      expect(false).toBeTruthy('Expected query to throw an error for deleted show');
    } catch (error) {
      expect(error.message).toContain(`TV show with ID ${showId} not found`);
    }
  });

  test('should handle errors when deleting a non-existent TV show', async ({ graphqlClient }) => {
    const mutation = `
      mutation DeleteTvShow($id: ID!) {
        deleteTvShow(id: $id) {
          id
        }
      }
    `;
    
    const variables = { id: "999" };  // Non-existent ID
    
    try {
      await graphqlClient.mutate(mutation, variables);
      // If we reach here, the test should fail as we expect an error
      expect(false).toBeTruthy('Expected mutation to throw an error');
    } catch (error) {
      expect(error.message).toContain('TV show with ID 999 not found');
      expect(error.graphQLErrors[0].extensions.code).toBe('NOT_FOUND');
    }
  });
});
