import { test, expect } from '@playwright/test';

const BASE_URL = 'https://swapi.dev/api';

test('GET /people/1 returns Luke Skywalker', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/people/1`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.name).toBe('Luke Skywalker');
  expect(data.height).toBeDefined();
  expect(data.mass).toBeDefined();
});

test('GET /planets/1 returns Tatooine', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/planets/1`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.name).toBe('Tatooine');
  expect(data.climate).toContain('arid');
});

test('GET /starships/9 returns Death Star', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/starships/9`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data.name).toBe('Death Star');
  expect(data.crew).toBeDefined();
});
