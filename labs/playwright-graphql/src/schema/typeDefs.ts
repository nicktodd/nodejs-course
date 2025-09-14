export const typeDefs = `#graphql
  type TVShow {
    id: ID!
    title: String!
    channel: String!
    genre: String!
    description: String!
    startTime: String!
    endTime: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTVShowInput {
    title: String!
    channel: String!
    genre: String!
    description: String!
    startTime: String!
    endTime: String!
  }

  input UpdateTVShowInput {
    title: String
    channel: String
    genre: String
    description: String
    startTime: String
    endTime: String
  }

  type Query {
    tvshows: [TVShow!]!
    tvshow(id: ID!): TVShow
    tvshowsByGenre(genre: String!): [TVShow!]!
    tvshowsByChannel(channel: String!): [TVShow!]!
    genres: [String!]!
    channels: [String!]!
  }

  type Mutation {
    createTvShow(input: CreateTVShowInput!): TVShow!
    updateTvShow(id: ID!, input: UpdateTVShowInput!): TVShow!
    deleteTvShow(id: ID!): TVShow!
  }
`;
