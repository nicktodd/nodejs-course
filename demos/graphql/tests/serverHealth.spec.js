const { test, expect } = require('@playwright/test');
const { graphqlQuery, queries } = require('./utils/graphqlTestUtils');

test.describe('TV Schedule GraphQL API - Server Health and Schema', () => {
  
  test('should have server running and healthy', async ({ request }) => {
    const response = await request.get('/health');
    expect(response.ok()).toBeTruthy();
    
    const healthData = await response.json();
    expect(healthData.status).toBe('ok');
    expect(healthData.message).toContain('TV Schedule GraphQL API is running');
    expect(healthData.timestamp).toBeDefined();
  });

  test('should serve GraphQL endpoint', async ({ request }) => {
    const response = await request.post('/graphql', {
      data: {
        query: `
          query {
            __schema {
              types {
                name
              }
            }
          }
        `
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.data).toBeDefined();
    expect(data.data.__schema).toBeDefined();
  });

  test('should have correct GraphQL schema types', async () => {
    const introspectionQuery = `
      query IntrospectionQuery {
        __schema {
          types {
            name
            kind
            fields {
              name
              type {
                name
                kind
              }
            }
          }
        }
      }
    `;

    const result = await graphqlQuery(introspectionQuery);
    const types = result.__schema.types;
    
    // Check for our custom types
    const tvShowType = types.find(type => type.name === 'TVShow');
    expect(tvShowType).toBeDefined();
    expect(tvShowType.kind).toBe('OBJECT');
    
    // Check TVShow fields
    const expectedFields = ['id', 'title', 'channel', 'startTime', 'endTime', 'description', 'genre', 'createdAt', 'updatedAt'];
    expectedFields.forEach(fieldName => {
      const field = tvShowType.fields.find(f => f.name === fieldName);
      expect(field).toBeDefined();
    });

    // Check for Query type
    const queryType = types.find(type => type.name === 'Query');
    expect(queryType).toBeDefined();
    
    // Check for Mutation type
    const mutationType = types.find(type => type.name === 'Mutation');
    expect(mutationType).toBeDefined();
  });

  test('should handle GraphQL errors gracefully', async ({ request }) => {
    const response = await request.post('/graphql', {
      data: {
        query: `
          query InvalidQuery {
            invalidField
          }
        `
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.errors).toBeDefined();
    expect(data.errors.length).toBeGreaterThan(0);
    expect(data.errors[0].message).toContain('Cannot query field "invalidField"');
  });

  test('should support GraphQL variables', async () => {
    const query = `
      query GetShowsByChannel($channelName: String!) {
        showsByChannel(channel: $channelName) {
          id
          title
          channel
        }
      }
    `;

    const variables = {
      channelName: "BBC"
    };

    const result = await graphqlQuery(query, variables);
    expect(result.showsByChannel).toBeDefined();
    expect(Array.isArray(result.showsByChannel)).toBeTruthy();
  });

  test('should handle empty results gracefully', async () => {
    const result = await graphqlQuery(queries.getShowsByChannel, {
      channel: "NonExistentChannel"
    });

    expect(result.showsByChannel).toBeDefined();
    expect(Array.isArray(result.showsByChannel)).toBeTruthy();
    expect(result.showsByChannel.length).toBe(0);
  });
});