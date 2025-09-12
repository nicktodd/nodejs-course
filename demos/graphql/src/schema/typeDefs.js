const { gql } = require('apollo-server-express');

// GraphQL type definitions
const typeDefs = gql`
  # TV Show type definition
  type TVShow {
    id: ID!
    title: String!
    channel: String!
    startTime: String!
    endTime: String!
    description: String!
    genre: String!
    createdAt: String!
    updatedAt: String!
  }

  # Input type for creating a new TV show
  input CreateTVShowInput {
    title: String!
    channel: String!
    startTime: String!
    endTime: String!
    description: String!
    genre: String = "General"
  }

  # Input type for updating an existing TV show
  input UpdateTVShowInput {
    title: String
    channel: String
    startTime: String
    endTime: String
    description: String
    genre: String
  }

  # Query type - defines all available read operations
  type Query {
    # Get all TV shows
    shows: [TVShow!]!
    
    # Get a specific TV show by ID
    show(id: ID!): TVShow
    
    # Get shows by channel
    showsByChannel(channel: String!): [TVShow!]!
    
    # Get shows by genre
    showsByGenre(genre: String!): [TVShow!]!
    
    # Get shows within a time range
    showsByTimeRange(startTime: String!, endTime: String!): [TVShow!]!
    
    # Get all available channels
    channels: [String!]!
    
    # Get all available genres
    genres: [String!]!
  }

  # Mutation type - defines all available write operations
  type Mutation {
    # Create a new TV show
    createShow(input: CreateTVShowInput!): TVShow!
    
    # Update an existing TV show
    updateShow(id: ID!, input: UpdateTVShowInput!): TVShow!
    
    # Delete a TV show
    deleteShow(id: ID!): TVShow!
    
    # Clear all shows (for testing purposes)
    clearAllShows: Boolean!
    
    # Reset to initial data (for testing purposes)
    resetToInitialData: Boolean!
  }

  # Subscription type - for real-time updates (optional, but good practice)
  type Subscription {
    # Subscribe to show updates
    showUpdated: TVShow!
    
    # Subscribe to new shows
    showCreated: TVShow!
    
    # Subscribe to deleted shows
    showDeleted: TVShow!
  }
`;

module.exports = typeDefs;