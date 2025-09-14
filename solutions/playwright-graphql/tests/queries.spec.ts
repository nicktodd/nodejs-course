import test, { expect } from './fixtures/graphql.fixture';

test.describe('GraphQL Queries', () => {
  test('should get all TV shows', async ({ graphqlClient }) => {
    const query = `
      query GetAllTvShows {
        tvshows {
          id
          title
          channel
          genre
          description
          startTime
          endTime
        }
      }
    `;

    const { data } = await graphqlClient.query(query);
    
    expect(data.tvshows).toBeDefined();
    expect(Array.isArray(data.tvshows)).toBeTruthy();
    expect(data.tvshows.length).toBeGreaterThan(0);
    
    // Verify structure of a TV show
    const firstShow = data.tvshows[0];
    expect(firstShow).toHaveProperty('id');
    expect(firstShow).toHaveProperty('title');
    expect(firstShow).toHaveProperty('channel');
    expect(firstShow).toHaveProperty('genre');
    expect(firstShow).toHaveProperty('description');
    expect(firstShow).toHaveProperty('startTime');
    expect(firstShow).toHaveProperty('endTime');
  });

  test('should get a TV show by ID', async ({ graphqlClient }) => {
    const query = `
      query GetTvShowById($id: ID!) {
        tvshow(id: $id) {
          id
          title
          channel
          genre
          description
        }
      }
    `;
    
    const variables = { id: "1" };
    const { data } = await graphqlClient.query(query, variables);
    
    expect(data.tvshow).toBeDefined();
    expect(data.tvshow.id).toBe("1");
    expect(data.tvshow.title).toBeDefined();
    expect(data.tvshow.channel).toBeDefined();
    expect(data.tvshow.genre).toBeDefined();
    expect(data.tvshow.description).toBeDefined();
  });

  test('should handle error for non-existent TV show ID', async ({ graphqlClient }) => {
    const query = `
      query GetTvShowById($id: ID!) {
        tvshow(id: $id) {
          id
          title
        }
      }
    `;
    
    const variables = { id: "999" }; // Non-existent ID
    
    try {
      await graphqlClient.query(query, variables);
      // If we reach here, the test should fail as we expect an error
      expect(false).toBeTruthy('Expected query to throw an error');
    } catch (error) {
      expect(error.message).toContain('TV show with ID 999 not found');
      expect(error.graphQLErrors[0].extensions.code).toBe('NOT_FOUND');
    }
  });

  test('should get TV shows by genre', async ({ graphqlClient }) => {
    const query = `
      query GetTvShowsByGenre($genre: String!) {
        tvshowsByGenre(genre: $genre) {
          id
          title
          genre
        }
      }
    `;
    
    const variables = { genre: "Crime" };
    const { data } = await graphqlClient.query(query, variables);
    
    expect(data.tvshowsByGenre).toBeDefined();
    expect(Array.isArray(data.tvshowsByGenre)).toBeTruthy();
    expect(data.tvshowsByGenre.length).toBeGreaterThan(0);
    
    // All shows should have the specified genre
    data.tvshowsByGenre.forEach(show => {
      expect(show.genre).toBe("Crime");
    });
  });

  test('should get TV shows by channel', async ({ graphqlClient }) => {
    const query = `
      query GetTvShowsByChannel($channel: String!) {
        tvshowsByChannel(channel: $channel) {
          id
          title
          channel
        }
      }
    `;
    
    const variables = { channel: "BBC One" };
    const { data } = await graphqlClient.query(query, variables);
    
    expect(data.tvshowsByChannel).toBeDefined();
    expect(Array.isArray(data.tvshowsByChannel)).toBeTruthy();
    expect(data.tvshowsByChannel.length).toBeGreaterThan(0);
    
    // All shows should have the specified channel
    data.tvshowsByChannel.forEach(show => {
      expect(show.channel).toBe("BBC One");
    });
  });

  test('should get all unique genres', async ({ graphqlClient }) => {
    const query = `
      query GetAllGenres {
        genres
      }
    `;
    
    const { data } = await graphqlClient.query(query);
    
    expect(data.genres).toBeDefined();
    expect(Array.isArray(data.genres)).toBeTruthy();
    expect(data.genres.length).toBeGreaterThan(0);
    
    // Genres should be unique
    const uniqueGenres = [...new Set(data.genres)];
    expect(uniqueGenres.length).toBe(data.genres.length);
    
    // Check for expected genres
    expect(data.genres).toContain('Crime');
    expect(data.genres).toContain('Sci-Fi');
  });

  test('should get all unique channels', async ({ graphqlClient }) => {
    const query = `
      query GetAllChannels {
        channels
      }
    `;
    
    const { data } = await graphqlClient.query(query);
    
    expect(data.channels).toBeDefined();
    expect(Array.isArray(data.channels)).toBeTruthy();
    expect(data.channels.length).toBeGreaterThan(0);
    
    // Channels should be unique
    const uniqueChannels = [...new Set(data.channels)];
    expect(uniqueChannels.length).toBe(data.channels.length);
    
    // Check for expected channels
    expect(data.channels).toContain('BBC One');
    expect(data.channels).toContain('Channel 4');
  });
});
