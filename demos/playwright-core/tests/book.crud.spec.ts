import { test, expect } from '@playwright/test';
import { BookSchema } from '../src/book.schema';

const BASE_URL = 'http://localhost:3000';

test.describe('Book API - CRUD Operations', () => {
  test('GET /books returns an array of books', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/books`);
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    
    // Validate each book against the schema
    data.forEach((book: any) => {
      expect(() => BookSchema.parse(book)).not.toThrow();
    });
  });

  test('GET /books/:id returns a single book', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/books/1`);
    expect(response.ok()).toBeTruthy();
    
    const book = await response.json();
    expect(() => BookSchema.parse(book)).not.toThrow();
    expect(book.id).toBe(1);
    expect(book.title).toBe('To Kill a Mockingbird');
    expect(book.author).toBe('Harper Lee');
  });

  test('POST /books creates a new book', async ({ request }) => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: '978-0-123-45678-9',
      publicationYear: 2023,
      genre: 'Test Genre',
      pages: 200,
      rating: 4.0,
      description: 'A test book for API testing'
    };

    const response = await request.post(`${BASE_URL}/books`, {
      data: newBook
    });
    
    expect(response.status()).toBe(201);
    const createdBook = await response.json();
    
    expect(() => BookSchema.parse(createdBook)).not.toThrow();
    expect(createdBook.title).toBe(newBook.title);
    expect(createdBook.author).toBe(newBook.author);
    expect(createdBook.id).toBeDefined();
    expect(typeof createdBook.id).toBe('number');
  });

  test('PUT /books/:id updates an existing book', async ({ request }) => {
    // First, create a book to update
    const newBook = {
      title: 'Book to Update',
      author: 'Original Author',
      publicationYear: 2020,
      genre: 'Original Genre',
      pages: 150
    };

    const createResponse = await request.post(`${BASE_URL}/books`, {
      data: newBook
    });
    const createdBook = await createResponse.json();

    // Now update it
    const updates = {
      title: 'Updated Book Title',
      author: 'Updated Author',
      rating: 5.0
    };

    const updateResponse = await request.put(`${BASE_URL}/books/${createdBook.id}`, {
      data: updates
    });

    expect(updateResponse.ok()).toBeTruthy();
    const updatedBook = await updateResponse.json();
    
    expect(() => BookSchema.parse(updatedBook)).not.toThrow();
    expect(updatedBook.id).toBe(createdBook.id);
    expect(updatedBook.title).toBe(updates.title);
    expect(updatedBook.author).toBe(updates.author);
    expect(updatedBook.rating).toBe(updates.rating);
    expect(updatedBook.publicationYear).toBe(newBook.publicationYear); // Should remain unchanged
  });

  test('DELETE /books/:id removes a book', async ({ request }) => {
    // First, create a book to delete
    const newBook = {
      title: 'Book to Delete',
      author: 'Doomed Author',
      publicationYear: 2021,
      genre: 'Temporary Genre',
      pages: 100
    };

    const createResponse = await request.post(`${BASE_URL}/books`, {
      data: newBook
    });
    const createdBook = await createResponse.json();

    // Delete the book
    const deleteResponse = await request.delete(`${BASE_URL}/books/${createdBook.id}`);
    expect(deleteResponse.status()).toBe(204);

    // Verify it's gone
    const getResponse = await request.get(`${BASE_URL}/books/${createdBook.id}`);
    expect(getResponse.status()).toBe(404);
  });
});
