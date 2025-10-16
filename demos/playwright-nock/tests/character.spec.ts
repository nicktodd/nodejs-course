import { test, expect } from '@playwright/test';
import { fastify } from '../server';
import nock from 'nock';

test.describe('Star Wars Character API with Nock', () => {
  
  test.beforeAll(async () => {
    // Start the Fastify server before tests
    await fastify.listen({ port: 3000 });
  });

  test.afterAll(async () => {
    // Close the server after tests
    await fastify.close();
  });

  test.afterEach(() => {
    // Clean up all nock interceptors after each test
    nock.cleanAll();
  });

  test('should fetch character and verify SWAPI was called', async ({ request }) => {
    // Mock the SWAPI API response using Nock
    const mockCharacterData = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      birth_year: '19BBY',
      eye_color: 'blue',
      gender: 'male'
    };

    // Intercept the SWAPI API call
    const scope = nock('https://swapi.dev')
      .get('/api/people/1/')
      .reply(200, mockCharacterData);

    // Make request to our API
    const response = await request.get('/character/1');
    
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data).toEqual({
      id: 1,
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hairColor: 'blond',
      birthYear: '19BBY'
    });

    // Verify that the SWAPI API was actually called
    expect(scope.isDone()).toBeTruthy();
  });

  test('should handle character not found', async ({ request }) => {
    // Mock SWAPI to return 404
    nock('https://swapi.dev')
      .get('/api/people/999/')
      .reply(404);

    const response = await request.get('/character/999');
    
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('should handle SWAPI API errors', async ({ request }) => {
    // Mock SWAPI to return server error
    nock('https://swapi.dev')
      .get('/api/people/1/')
      .replyWithError('Network error');

    const response = await request.get('/character/1');
    
    expect(response.status()).toBe(500);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  test('should verify different character data', async ({ request }) => {
    // Mock data for Darth Vader
    const mockVaderData = {
      name: 'Darth Vader',
      height: '202',
      mass: '136',
      hair_color: 'none',
      birth_year: '41.9BBY',
      eye_color: 'yellow',
      gender: 'male'
    };

    const scope = nock('https://swapi.dev')
      .get('/api/people/4/')
      .reply(200, mockVaderData);

    const response = await request.get('/character/4');
    
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(data.name).toBe('Darth Vader');
    expect(data.height).toBe('202');
    
    // Verify the interceptor was used
    expect(scope.isDone()).toBeTruthy();
  });
});
