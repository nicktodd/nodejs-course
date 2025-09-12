# Example GraphQL Queries and Mutations for TV Schedule API

This file contains practical examples of GraphQL operations you can run against the TV Schedule API.

## Setting Up

1. Start the server: `npm start`
2. Open GraphQL Playground: `http://localhost:4000/graphql`
3. Copy and paste these queries/mutations to try them out

## Basic Queries

### 1. Get All TV Shows

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
    createdAt
    updatedAt
  }
}
```

### 2. Get a Specific Show by ID

```graphql
query GetShowById {
  show(id: "1") {
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

### 3. Get Shows by Channel (Case-insensitive search)

```graphql
query GetBBCShows {
  showsByChannel(channel: "BBC") {
    id
    title
    channel
    startTime
    endTime
    genre
  }
}
```

### 4. Get Shows by Genre

```graphql
query GetNewsShows {
  showsByGenre(genre: "News") {
    id
    title
    channel
    startTime
    endTime
    description
  }
}
```

### 5. Get Shows in a Time Range

```graphql
query GetEveningShows {
  showsByTimeRange(
    startTime: "2024-01-15T18:00:00Z", 
    endTime: "2024-01-15T23:00:00Z"
  ) {
    id
    title
    channel
    startTime
    endTime
    genre
  }
}
```

### 6. Get All Available Channels and Genres

```graphql
query GetChannelsAndGenres {
  channels
  genres
}
```

## Basic Mutations

### 1. Create a New TV Show

```graphql
mutation CreateNewShow {
  createShow(input: {
    title: "Late Night Talk Show"
    channel: "Comedy Central"
    startTime: "2024-01-15T23:00:00Z"
    endTime: "2024-01-16T00:00:00Z"
    description: "A hilarious late-night talk show with celebrity guests"
    genre: "Comedy"
  }) {
    id
    title
    channel
    startTime
    endTime
    description
    genre
    createdAt
  }
}
```

### 2. Update an Existing Show

```graphql
mutation UpdateShow {
  updateShow(
    id: "1"
    input: {
      title: "Updated Morning News"
      description: "Updated description with more details"
      genre: "Current Affairs"
    }
  ) {
    id
    title
    channel
    description
    genre
    updatedAt
  }
}
```

### 3. Delete a Show

```graphql
mutation DeleteShow {
  deleteShow(id: "2") {
    id
    title
    channel
  }
}
```

## Advanced Queries with Variables

### 1. Flexible Show Search by Channel

```graphql
query GetShowsByChannelVariable($channelName: String!) {
  showsByChannel(channel: $channelName) {
    id
    title
    channel
    startTime
    endTime
  }
}
```

**Variables:**
```json
{
  "channelName": "Discovery"
}
```

### 2. Create Show with Variables

```graphql
mutation CreateShowWithVariables($input: CreateTVShowInput!) {
  createShow(input: $input) {
    id
    title
    channel
    startTime
    endTime
    description
    genre
    createdAt
  }
}
```

**Variables:**
```json
{
  "input": {
    "title": "Sports Tonight",
    "channel": "ESPN",
    "startTime": "2024-01-15T22:00:00Z",
    "endTime": "2024-01-15T23:00:00Z",
    "description": "Daily sports news and highlights",
    "genre": "Sports"
  }
}
```

### 3. Update Show with Partial Data

```graphql
mutation UpdateShowPartial($showId: ID!, $updates: UpdateTVShowInput!) {
  updateShow(id: $showId, input: $updates) {
    id
    title
    description
    updatedAt
  }
}
```

**Variables:**
```json
{
  "showId": "1",
  "updates": {
    "description": "Updated show description only"
  }
}
```

## Complex Queries

### 1. Get Complete Show Information with Metadata

```graphql
query GetCompleteShowInfo {
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
  channels
  genres
}
```

### 2. Time-based Show Schedule

```graphql
query GetDaySchedule {
  morningShows: showsByTimeRange(
    startTime: "2024-01-15T06:00:00Z"
    endTime: "2024-01-15T12:00:00Z"
  ) {
    title
    channel
    startTime
    endTime
  }
  
  eveningShows: showsByTimeRange(
    startTime: "2024-01-15T18:00:00Z"
    endTime: "2024-01-15T23:59:59Z"
  ) {
    title
    channel
    startTime
    endTime
  }
}
```

## Subscription Examples

### 1. Subscribe to New Shows

```graphql
subscription OnNewShow {
  showCreated {
    id
    title
    channel
    startTime
    endTime
    genre
  }
}
```

### 2. Subscribe to Show Updates

```graphql
subscription OnShowUpdate {
  showUpdated {
    id
    title
    channel
    updatedAt
  }
}
```

### 3. Subscribe to Show Deletions

```graphql
subscription OnShowDeleted {
  showDeleted {
    id
    title
    channel
  }
}
```

## Error Handling Examples

### 1. Invalid Show ID

```graphql
query InvalidShowId {
  show(id: "999") {
    id
    title
  }
}
```

### 2. Invalid Date Format

```graphql
mutation InvalidDateFormat {
  createShow(input: {
    title: "Invalid Show"
    channel: "Test Channel"
    startTime: "invalid-date"
    endTime: "2024-01-15T21:00:00Z"
    description: "This will fail"
  }) {
    id
    title
  }
}
```

### 3. Missing Required Fields

```graphql
mutation MissingFields {
  createShow(input: {
    title: "Incomplete Show"
    # Missing required fields
  }) {
    id
    title
  }
}
```

## Testing Utilities (for Development)

### 1. Clear All Shows

```graphql
mutation ClearAllShows {
  clearAllShows
}
```

### 2. Reset to Initial Data

```graphql
mutation ResetData {
  resetToInitialData
}
```

### 3. Check Current State

```graphql
query CheckCurrentState {
  shows {
    id
    title
    channel
  }
  channels
  genres
}
```

## Fragment Examples (for Code Reuse)

### 1. Show Summary Fragment

```graphql
fragment ShowSummary on TVShow {
  id
  title
  channel
  startTime
  endTime
  genre
}

query GetShowsWithFragment {
  shows {
    ...ShowSummary
    description
  }
}
```

### 2. Show Details Fragment

```graphql
fragment ShowDetails on TVShow {
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

query GetShowWithDetails($id: ID!) {
  show(id: $id) {
    ...ShowDetails
  }
}
```

## Batch Operations Example

```graphql
# You can run multiple operations in a single request
query BatchOperations {
  allShows: shows {
    id
    title
    channel
  }
  
  newsShows: showsByGenre(genre: "News") {
    id
    title
    startTime
  }
  
  availableChannels: channels
  availableGenres: genres
}
```

## Performance Tips

1. **Request only needed fields**: Don't request `createdAt` and `updatedAt` unless necessary
2. **Use fragments**: Reuse common field selections
3. **Batch queries**: Combine multiple queries into one request when possible
4. **Use variables**: More efficient than string interpolation
5. **Limit time ranges**: Be specific with time range queries to avoid large result sets

## Common Use Cases

### 1. TV Guide Application

```graphql
query TVGuideData($date: String!) {
  todayShows: showsByTimeRange(
    startTime: "${date}T00:00:00Z"
    endTime: "${date}T23:59:59Z"
  ) {
    id
    title
    channel
    startTime
    endTime
    genre
  }
  
  channels
}
```

### 2. Channel Lineup

```graphql
query ChannelLineup($channel: String!) {
  showsByChannel(channel: $channel) {
    id
    title
    startTime
    endTime
    description
    genre
  }
}
```

### 3. Content Management

```graphql
mutation ManageShow($id: ID, $createInput: CreateTVShowInput, $updateInput: UpdateTVShowInput) {
  # Create new show if createInput provided
  createShow(input: $createInput) @include(if: $createInput) {
    id
    title
    channel
  }
  
  # Update existing show if updateInput provided
  updateShow(id: $id, input: $updateInput) @include(if: $updateInput) {
    id
    title
    updatedAt
  }
}
```