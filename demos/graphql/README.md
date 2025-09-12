# TV Schedule GraphQL API

A complete GraphQL CRUD API for managing TV schedule data with comprehensive Playwright tests.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete TV shows
- **Advanced Querying**: Filter by channel, genre, time range
- **GraphQL Subscriptions**: Real-time updates for show changes
- **Comprehensive Testing**: Playwright tests covering all API endpoints
- **In-Memory Storage**: Simple JavaScript object storage for demo purposes
- **Type Safety**: Full GraphQL schema with input validation
- **Apollo Server**: Industry-standard GraphQL server implementation

## Quick Start

### Installation

```bash
npm install
```

### Running the Server

```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

The server will start at `http://localhost:4000`

### GraphQL Playground

Visit `http://localhost:4000/graphql` to access the GraphQL Playground for interactive API exploration.

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Debug tests
npm run test:debug
```

## API Documentation

### GraphQL Schema

#### TV Show Type

```graphql
type TVShow {
  id: ID!
  title: String!
  channel: String!
  startTime: String!      # ISO 8601 format
  endTime: String!        # ISO 8601 format
  description: String!
  genre: String!
  createdAt: String!
  updatedAt: String!
}
```

### Queries

#### Get All Shows

```graphql
query GetAllShows {
  shows {
    id
    title
    channel
    startTime
    endTime
    description
    genre
  }
}
```

#### Get Show by ID

```graphql
query GetShow($id: ID!) {
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
```

#### Get Shows by Channel

```graphql
query GetShowsByChannel($channel: String!) {
  showsByChannel(channel: $channel) {
    id
    title
    channel
    startTime
    endTime
  }
}
```

#### Get Shows by Genre

```graphql
query GetShowsByGenre($genre: String!) {
  showsByGenre(genre: $genre) {
    id
    title
    genre
    startTime
    endTime
  }
}
```

#### Get Shows by Time Range

```graphql
query GetShowsByTimeRange($startTime: String!, $endTime: String!) {
  showsByTimeRange(startTime: $startTime, endTime: $endTime) {
    id
    title
    channel
    startTime
    endTime
  }
}
```

#### Get Available Channels

```graphql
query GetChannels {
  channels
}
```

#### Get Available Genres

```graphql
query GetGenres {
  genres
}
```

### Mutations

#### Create Show

```graphql
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
```

**Variables:**
```json
{
  "input": {
    "title": "New Show",
    "channel": "BBC One",
    "startTime": "2024-01-15T20:00:00Z",
    "endTime": "2024-01-15T21:00:00Z",
    "description": "A new exciting show",
    "genre": "Entertainment"
  }
}
```

#### Update Show

```graphql
mutation UpdateShow($id: ID!, $input: UpdateTVShowInput!) {
  updateShow(id: $id, input: $input) {
    id
    title
    channel
    startTime
    endTime
    description
    genre
    updatedAt
  }
}
```

**Variables:**
```json
{
  "id": "1",
  "input": {
    "title": "Updated Show Title",
    "description": "Updated description"
  }
}
```

#### Delete Show

```graphql
mutation DeleteShow($id: ID!) {
  deleteShow(id: $id) {
    id
    title
    channel
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

### Subscriptions

#### Subscribe to New Shows

```graphql
subscription OnShowCreated {
  showCreated {
    id
    title
    channel
    startTime
    endTime
  }
}
```

#### Subscribe to Show Updates

```graphql
subscription OnShowUpdated {
  showUpdated {
    id
    title
    channel
    startTime
    endTime
  }
}
```

#### Subscribe to Show Deletions

```graphql
subscription OnShowDeleted {
  showDeleted {
    id
    title
    channel
  }
}
```

## Example Usage

### Using cURL

#### Query All Shows
```bash
curl -X POST http://localhost:4000/graphql \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "{ shows { id title channel startTime endTime } }"
  }'
```

#### Create a New Show
```bash
curl -X POST http://localhost:4000/graphql \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "mutation CreateShow($input: CreateTVShowInput!) { createShow(input: $input) { id title channel } }",
    "variables": {
      "input": {
        "title": "Evening News",
        "channel": "CNN",
        "startTime": "2024-01-15T18:00:00Z",
        "endTime": "2024-01-15T19:00:00Z",
        "description": "Daily evening news broadcast",
        "genre": "News"
      }
    }
  }'
```

### Using JavaScript/Fetch

```javascript
// Query shows by channel
async function getShowsByChannel(channel) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetShowsByChannel($channel: String!) {
          showsByChannel(channel: $channel) {
            id
            title
            channel
            startTime
            endTime
          }
        }
      `,
      variables: { channel }
    }),
  });
  
  const { data } = await response.json();
  return data.showsByChannel;
}

// Create a new show
async function createShow(showData) {
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation CreateShow($input: CreateTVShowInput!) {
          createShow(input: $input) {
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
      variables: { input: showData }
    }),
  });
  
  const { data } = await response.json();
  return data.createShow;
}
```

## Initial Data

The API comes with sample TV shows:

1. **Morning News** (BBC One) - 06:00-07:00 UTC - News
2. **Cooking Masters** (Channel 4) - 19:00-20:00 UTC - Reality
3. **Science Documentary** (Discovery) - 21:00-22:30 UTC - Documentary

## Testing

The project includes comprehensive Playwright tests covering:

- **CRUD Operations**: Create, Read, Update, Delete shows
- **Data Validation**: Input validation and error handling
- **Server Health**: Endpoint availability and schema validation
- **Edge Cases**: Complex scenarios and time range handling
- **Error Handling**: Graceful error responses

### Test Structure

```
tests/
├── utils/
│   └── graphqlTestUtils.js    # Test utilities and helpers
├── tvScheduleCrud.spec.js     # Main CRUD operation tests
└── serverHealth.spec.js       # Server health and schema tests
```

### Running Specific Tests

```bash
# Run only CRUD tests
npx playwright test tvScheduleCrud.spec.js

# Run only health check tests
npx playwright test serverHealth.spec.js

# Run tests in specific browser
npx playwright test --project=chromium
```

## Project Structure

```
.
├── src/
│   ├── data/
│   │   └── tvScheduleData.js    # Data model and in-memory storage
│   ├── schema/
│   │   ├── typeDefs.js          # GraphQL type definitions
│   │   └── resolvers.js         # GraphQL resolvers
│   └── server.js                # Apollo Server setup
├── tests/
│   ├── utils/
│   │   └── graphqlTestUtils.js  # Test utilities
│   ├── tvScheduleCrud.spec.js   # CRUD tests
│   └── serverHealth.spec.js     # Health tests
├── package.json
├── playwright.config.js
└── README.md
```

## Error Handling

The API provides detailed error messages for common issues:

- **Missing required fields**: Clear indication of which fields are required
- **Invalid date formats**: Validation for ISO 8601 datetime strings
- **Time range validation**: Start time must be before end time
- **Non-existent resources**: Appropriate 404-style errors for missing shows

## Development Notes

- **In-Memory Storage**: Data is stored in JavaScript objects and will be lost on server restart
- **GraphQL Subscriptions**: Available but require WebSocket support for real-time updates
- **CORS**: Configured for development; adjust for production use
- **Date Format**: All timestamps use ISO 8601 format (e.g., "2024-01-15T20:00:00Z")

## Future Enhancements

- **Database Integration**: Replace in-memory storage with persistent database
- **Authentication**: Add user authentication and authorization
- **Pagination**: Implement cursor-based pagination for large datasets
- **Full-text Search**: Add search capabilities for show titles and descriptions
- **Caching**: Add Redis or in-memory caching for improved performance
- **Rate Limiting**: Implement API rate limiting for production use

## License

MIT License - See LICENSE file for details.