// Playwright API tests for SWAPI
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://swapi.py4e.com/api';

test.describe('SWAPI API Tests', () => {
  test('GET /people returns a list of people', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/people`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results[0]).toHaveProperty('name');
  });

  test('GET /people/1 returns details for Luke Skywalker', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/people/1`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.name).toBe('Luke Skywalker');
    expect(data).toHaveProperty('height');
    expect(data).toHaveProperty('mass');
  });

  test('GET /planets returns a list of planets', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/planets`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data.results)).toBe(true);
    expect(data.results[0]).toHaveProperty('name');
  });

  test('GET /people/9999 returns 404 for non-existent person', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/people/9999`);
    expect(response.status()).toBe(404);
  });
});
