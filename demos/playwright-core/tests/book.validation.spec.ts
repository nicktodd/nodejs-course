import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Book API - Validation and Error Handling', () => {
  test('GET /books/:id returns 404 for non-existent book', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/books/99999`);
    expect(response.status()).toBe(404);
    
    const error = await response.json();
    expect(error.error).toBe('Book not found');
  });

  test('POST /books validates required fields', async ({ request }) => {
    const incompleteBook = {
      title: 'Incomplete Book'
      // Missing required fields: author, publicationYear, genre, pages
    };

    const response = await request.post(`${BASE_URL}/books`, {
      data: incompleteBook
    });
    
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toBe('Validation failed');
    expect(error.details).toBeDefined();
    expect(Array.isArray(error.details)).toBe(true);
  });

  test('POST /books validates data types and constraints', async ({ request }) => {
    const invalidBook = {
      title: '', // Empty title
      author: 'Test Author',
      publicationYear: 'not-a-number', // Should be number
      genre: '', // Empty genre
      pages: -5, // Negative pages
      rating: 10 // Rating too high (max 5)
    };

    const response = await request.post(`${BASE_URL}/books`, {
      data: invalidBook
    });
    
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toBe('Validation failed');
    expect(error.details.length).toBeGreaterThan(0);
  });

  test('POST /books validates publication year range', async ({ request }) => {
    const bookWithInvalidYear = {
      title: 'Time Traveler Book',
      author: 'Future Author',
      publicationYear: 3000, // Future year
      genre: 'Science Fiction',
      pages: 300
    };

    const response = await request.post(`${BASE_URL}/books`, {
      data: bookWithInvalidYear
    });
    
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toBe('Validation failed');
  });

  test('PUT /books/:id returns 404 for non-existent book', async ({ request }) => {
    const updates = {
      title: 'Updated Title'
    };

    const response = await request.put(`${BASE_URL}/books/99999`, {
      data: updates
    });
    
    expect(response.status()).toBe(404);
    const error = await response.json();
    expect(error.error).toBe('Book not found');
  });

  test('PUT /books/:id validates update data', async ({ request }) => {
    // Update an existing book with invalid data
    const invalidUpdates = {
      rating: 10, // Rating too high
      pages: -100 // Negative pages
    };

    const response = await request.put(`${BASE_URL}/books/1`, {
      data: invalidUpdates
    });
    
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toBe('Validation failed');
  });

  test('DELETE /books/:id returns 404 for non-existent book', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/books/99999`);
    expect(response.status()).toBe(404);
    
    const error = await response.json();
    expect(error.error).toBe('Book not found');
  });

  test('POST /books handles optional fields correctly', async ({ request }) => {
    const bookWithOptionalFields = {
      title: 'Minimal Book',
      author: 'Minimal Author',
      publicationYear: 2023,
      genre: 'Minimal Genre',
      pages: 100
      // isbn, rating, and description are optional
    };

    const response = await request.post(`${BASE_URL}/books`, {
      data: bookWithOptionalFields
    });
    
    expect(response.status()).toBe(201);
    const createdBook = await response.json();
    expect(createdBook.title).toBe(bookWithOptionalFields.title);
    expect(createdBook.isbn).toBeUndefined();
    expect(createdBook.rating).toBeUndefined();
    expect(createdBook.description).toBeUndefined();
  });
});
