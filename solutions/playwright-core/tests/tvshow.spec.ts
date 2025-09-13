import { test, expect } from '@playwright/test';
import { TVShowSchema } from '../src/tvshow.schema';

const BASE_URL = 'http://localhost:3000';

// Test 1: Fetch all TV shows
// --------------------------
test('GET /tvshows returns an array of TV shows', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/tvshows`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  data.forEach((item: any) => {
    expect(() => TVShowSchema.parse(item)).not.toThrow();
  });
});

// Test 2: Fetch a TV show by ID
// -----------------------------
test('GET /tvshows/:id returns a single TV show', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/tvshows/1`);
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(() => TVShowSchema.parse(data)).not.toThrow();
  expect(data.title).toBe('Doctor Who');
  expect(data.genre).toBe('Sci-Fi');
});

// Test 3: Add a new TV show
// -------------------------
test('POST /tvshows adds a new TV show', async ({ request }) => {
  const newShow = {
    title: 'Taskmaster',
    genre: 'Comedy',
    seasons: 15,
    rating: 9.0,
    description: 'Comedians compete in bizarre challenges.'
  };
  const response = await request.post(`${BASE_URL}/tvshows`, { data: newShow });
  expect(response.status()).toBe(201);
  const data = await response.json();
  expect(() => TVShowSchema.parse(data)).not.toThrow();
  expect(data.title).toBe('Taskmaster');
});

// Test 4: Update a TV show
// ------------------------
test('PUT /tvshows/:id updates an existing TV show', async ({ request }) => {
  // Update Doctor Who's rating
  const updatedShow = {
    title: 'Doctor Who',
    genre: 'Sci-Fi',
    seasons: 13,
    rating: 9.5,
    description: 'A time-traveling alien explores the universe.'
  };
  const response = await request.put(`${BASE_URL}/tvshows/1`, { data: updatedShow });
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(() => TVShowSchema.parse(data)).not.toThrow();
  expect(data.rating).toBe(9.5);
});

// Test 5: Delete a TV show
// ------------------------
test('DELETE /tvshows/:id deletes a TV show', async ({ request }) => {
  // Add a show to delete
  const newShow = {
    title: 'Mock Show',
    genre: 'Drama',
    seasons: 1,
    rating: 7.0,
    description: 'Temporary show for deletion.'
  };
  const addResponse = await request.post(`${BASE_URL}/tvshows`, { data: newShow });
  const added = await addResponse.json();
  const delResponse = await request.delete(`${BASE_URL}/tvshows/${added.id}`);
  expect(delResponse.status()).toBe(204);
  // Confirm deletion
  const getResponse = await request.get(`${BASE_URL}/tvshows/${added.id}`);
  expect(getResponse.status()).toBe(404);
});

// Bonus: Negative test for invalid data
// -------------------------------------
test('POST /tvshows with invalid data returns 400', async ({ request }) => {
  const invalidShow = {
    title: '', // Invalid: empty title
    genre: 'Comedy',
    seasons: -1, // Invalid: negative seasons
    rating: 15 // Invalid: rating out of range
  };
  const response = await request.post(`${BASE_URL}/tvshows`, { data: invalidShow });
  expect(response.status()).toBe(400);
  const data = await response.json();
  expect(data.error).toBeDefined();
});

// Bonus: Test error response for missing TV show
// ----------------------------------------------
test('GET /tvshows/:id returns 404 for missing TV show', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/tvshows/99999`);
  expect(response.status()).toBe(404);
  const data = await response.json();
  expect(data.error).toBe('TV show not found');
});

// Bonus: Setup and Teardown Example
// ---------------------------------
test.beforeEach(async ({ request }) => {
  await request.post(`${BASE_URL}/tvshows`, {
    data: {
      title: 'Test Show',
      genre: 'Test Genre',
      seasons: 1,
      rating: 5,
      description: 'Setup test show.'
    }
  });
});

test.afterEach(async ({ request }) => {
  const response = await request.get(`${BASE_URL}/tvshows`);
  const shows = await response.json();
  const testShow = shows.find((s: any) => s.title === 'Test Show');
  if (testShow) {
    await request.delete(`${BASE_URL}/tvshows/${testShow.id}`);
  }
});
