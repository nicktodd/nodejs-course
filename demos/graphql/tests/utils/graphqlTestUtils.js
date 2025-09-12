// Utility functions for GraphQL testing with Playwright

/**
 * Send a GraphQL query using fetch
 * @param {string} query - The GraphQL query string
 * @param {Object} variables - Variables for the query
 * @param {string} baseURL - Base URL for the GraphQL endpoint
 * @returns {Promise<Object>} - The response data
 */
async function graphqlQuery(query, variables = {}, baseURL = 'http://localhost:4000') {
  const response = await fetch(`${baseURL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(`GraphQL error: ${result.errors.map(e => e.message).join(', ')}`);
  }

  return result.data;
}

/**
 * Common GraphQL queries for TV schedule
 */
const queries = {
  // Get all shows
  getAllShows: `
    query GetAllShows {
      shows {
        id
        title
        channel
        startTime
        endTime
        description
        genre
        createdAt
        updatedAt
      }
    }
  `,

  // Get a specific show by ID
  getShowById: `
    query GetShowById($id: ID!) {
      show(id: $id) {
        id
        title
        channel
        startTime
        endTime
        description
        genre
        createdAt
        updatedAt
      }
    }
  `,

  // Get shows by channel
  getShowsByChannel: `
    query GetShowsByChannel($channel: String!) {
      showsByChannel(channel: $channel) {
        id
        title
        channel
        startTime
        endTime
        description
        genre
      }
    }
  `,

  // Get shows by genre
  getShowsByGenre: `
    query GetShowsByGenre($genre: String!) {
      showsByGenre(genre: $genre) {
        id
        title
        channel
        startTime
        endTime
        description
        genre
      }
    }
  `,

  // Get shows by time range
  getShowsByTimeRange: `
    query GetShowsByTimeRange($startTime: String!, $endTime: String!) {
      showsByTimeRange(startTime: $startTime, endTime: $endTime) {
        id
        title
        channel
        startTime
        endTime
        description
        genre
      }
    }
  `,

  // Get all channels
  getChannels: `
    query GetChannels {
      channels
    }
  `,

  // Get all genres
  getGenres: `
    query GetGenres {
      genres
    }
  `
};

/**
 * Common GraphQL mutations for TV schedule
 */
const mutations = {
  // Create a new show
  createShow: `
    mutation CreateShow($input: CreateTVShowInput!) {
      createShow(input: $input) {
        id
        title
        channel
        startTime
        endTime
        description
        genre
        createdAt
        updatedAt
      }
    }
  `,

  // Update an existing show
  updateShow: `
    mutation UpdateShow($id: ID!, $input: UpdateTVShowInput!) {
      updateShow(id: $id, input: $input) {
        id
        title
        channel
        startTime
        endTime
        description
        genre
        createdAt
        updatedAt
      }
    }
  `,

  // Delete a show
  deleteShow: `
    mutation DeleteShow($id: ID!) {
      deleteShow(id: $id) {
        id
        title
        channel
      }
    }
  `,

  // Clear all shows (for testing)
  clearAllShows: `
    mutation ClearAllShows {
      clearAllShows
    }
  `,

  // Reset to initial data (for testing)
  resetToInitialData: `
    mutation ResetToInitialData {
      resetToInitialData
    }
  `
};

/**
 * Test data generators
 */
const testData = {
  // Generate a sample TV show input
  sampleShow: {
    title: "Test Show",
    channel: "Test Channel",
    startTime: "2024-01-15T20:00:00Z",
    endTime: "2024-01-15T21:00:00Z",
    description: "A test show for automated testing",
    genre: "Testing"
  },

  // Generate multiple sample shows
  multipleSampleShows: [
    {
      title: "Morning Test News",
      channel: "Test News Network",
      startTime: "2024-01-16T06:00:00Z",
      endTime: "2024-01-16T07:00:00Z",
      description: "Morning news for testing",
      genre: "News"
    },
    {
      title: "Test Comedy Hour",
      channel: "Test Comedy Channel",
      startTime: "2024-01-16T21:00:00Z",
      endTime: "2024-01-16T22:00:00Z",
      description: "Comedy show for testing",
      genre: "Comedy"
    },
    {
      title: "Test Sports Update",
      channel: "Test Sports Network",
      startTime: "2024-01-16T18:00:00Z",
      endTime: "2024-01-16T19:00:00Z",
      description: "Sports update for testing",
      genre: "Sports"
    }
  ],

  // Updated show data
  updatedShow: {
    title: "Updated Test Show",
    description: "An updated test show description",
    genre: "Updated"
  }
};

/**
 * Validation helpers
 */
const validators = {
  // Validate TV show structure
  validateTVShow: (show) => {
    const requiredFields = ['id', 'title', 'channel', 'startTime', 'endTime', 'description', 'genre', 'createdAt', 'updatedAt'];
    
    for (const field of requiredFields) {
      if (!show.hasOwnProperty(field)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate ID is string
    if (typeof show.id !== 'string') {
      throw new Error('ID should be a string');
    }

    // Validate dates
    if (!Date.parse(show.startTime) || !Date.parse(show.endTime)) {
      throw new Error('Invalid date format for startTime or endTime');
    }

    // Validate start time is before end time
    if (new Date(show.startTime) >= new Date(show.endTime)) {
      throw new Error('Start time should be before end time');
    }

    return true;
  },

  // Validate array of TV shows
  validateTVShowArray: (shows) => {
    if (!Array.isArray(shows)) {
      throw new Error('Expected an array of shows');
    }

    shows.forEach((show, index) => {
      try {
        validators.validateTVShow(show);
      } catch (error) {
        throw new Error(`Validation failed for show at index ${index}: ${error.message}`);
      }
    });

    return true;
  }
};

module.exports = {
  graphqlQuery,
  queries,
  mutations,
  testData,
  validators
};