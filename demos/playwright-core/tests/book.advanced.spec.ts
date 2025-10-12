import { test, expect } from '@playwright/test';
import { BookSchema } from '../src/book.schema';

const BASE_URL = 'http://localhost:3000';

test.describe('Book API - Advanced Patterns', () => {
  let testBookIds: number[] = [];

  // Setup: Create test books before each test
  test.beforeEach(async ({ request }) => {
    const testBooks = [
      {
        title: 'Test Setup Book 1',
        author: 'Setup Author 1',
        publicationYear: 2021,
        genre: 'Test Genre',
        pages: 150
      },
      {
        title: 'Test Setup Book 2', 
        author: 'Setup Author 2',
        publicationYear: 2022,
        genre: 'Test Genre',
        pages: 200
      }
    ];

    for (const book of testBooks) {
      const response = await request.post(`${BASE_URL}/books`, { data: book });
      const createdBook = await response.json();
      testBookIds.push(createdBook.id);
    }
  });

  // Teardown: Clean up test books after each test
  test.afterEach(async ({ request }) => {
    for (const id of testBookIds) {
      await request.delete(`${BASE_URL}/books/${id}`).catch(() => {
        // Ignore errors if book already deleted
      });
    }
    testBookIds = [];
  });

  test('Complete workflow: Create → Read → Update → Delete', async ({ request }) => {
    // Step 1: Create a new book
    const newBook = {
      title: 'Workflow Test Book',
      author: 'Workflow Author',
      isbn: '978-0-111-22233-4',
      publicationYear: 2023,
      genre: 'Workflow Genre',
      pages: 300,
      rating: 3.5,
      description: 'A book for testing complete workflow'
    };

    const createResponse = await request.post(`${BASE_URL}/books`, {
      data: newBook
    });
    expect(createResponse.status()).toBe(201);
    const createdBook = await createResponse.json();
    expect(createdBook.title).toBe(newBook.title);

    // Step 2: Read the created book
    const readResponse = await request.get(`${BASE_URL}/books/${createdBook.id}`);
    expect(readResponse.ok()).toBeTruthy();
    const readBook = await readResponse.json();
    expect(readBook.id).toBe(createdBook.id);
    expect(readBook.title).toBe(newBook.title);

    // Step 3: Update the book
    const updates = {
      title: 'Updated Workflow Book',
      rating: 4.5,
      description: 'Updated description for workflow test'
    };

    const updateResponse = await request.put(`${BASE_URL}/books/${createdBook.id}`, {
      data: updates
    });
    expect(updateResponse.ok()).toBeTruthy();
    const updatedBook = await updateResponse.json();
    expect(updatedBook.title).toBe(updates.title);
    expect(updatedBook.rating).toBe(updates.rating);
    expect(updatedBook.author).toBe(newBook.author); // Should remain unchanged

    // Step 4: Verify update in list
    const listResponse = await request.get(`${BASE_URL}/books`);
    const allBooks = await listResponse.json();
    const foundBook = allBooks.find((book: any) => book.id === createdBook.id);
    expect(foundBook).toBeDefined();
    expect(foundBook.title).toBe(updates.title);

    // Step 5: Delete the book
    const deleteResponse = await request.delete(`${BASE_URL}/books/${createdBook.id}`);
    expect(deleteResponse.status()).toBe(204);

    // Step 6: Verify deletion
    const deletedBookResponse = await request.get(`${BASE_URL}/books/${createdBook.id}`);
    expect(deletedBookResponse.status()).toBe(404);
  });

  test('Bulk operations: Create multiple books and verify list', async ({ request }) => {
    const newBooks = [
      {
        title: 'Bulk Book 1',
        author: 'Bulk Author 1',
        publicationYear: 2020,
        genre: 'Bulk Genre',
        pages: 250
      },
      {
        title: 'Bulk Book 2',
        author: 'Bulk Author 2', 
        publicationYear: 2021,
        genre: 'Bulk Genre',
        pages: 350
      },
      {
        title: 'Bulk Book 3',
        author: 'Bulk Author 3',
        publicationYear: 2022,
        genre: 'Bulk Genre',
        pages: 450
      }
    ];

    const createdBooks = [];

    // Create all books
    for (const book of newBooks) {
      const response = await request.post(`${BASE_URL}/books`, { data: book });
      expect(response.status()).toBe(201);
      const createdBook = await response.json();
      createdBooks.push(createdBook);
    }

    // Verify all books exist in the list
    const listResponse = await request.get(`${BASE_URL}/books`);
    const allBooks = await listResponse.json();

    for (const createdBook of createdBooks) {
      const foundBook = allBooks.find((book: any) => book.id === createdBook.id);
      expect(foundBook).toBeDefined();
      expect(foundBook.title).toBe(createdBook.title);
    }

    // Clean up
    for (const book of createdBooks) {
      await request.delete(`${BASE_URL}/books/${book.id}`);
    }
  });

  test('Data consistency: Ensure unique IDs and proper incrementing', async ({ request }) => {
    // Get current books to find the highest ID
    const initialResponse = await request.get(`${BASE_URL}/books`);
    const initialBooks = await initialResponse.json();
    const maxId = Math.max(...initialBooks.map((book: any) => book.id));

    // Create a new book
    const newBook = {
      title: 'ID Test Book',
      author: 'ID Test Author',
      publicationYear: 2023,
      genre: 'Test',
      pages: 100
    };

    const createResponse = await request.post(`${BASE_URL}/books`, { data: newBook });
    const createdBook = await createResponse.json();

    // Verify the new book has an ID greater than the previous maximum
    expect(createdBook.id).toBeGreaterThan(maxId);
    expect(typeof createdBook.id).toBe('number');

    // Clean up
    await request.delete(`${BASE_URL}/books/${createdBook.id}`);
  });

  test('Schema validation throughout complete CRUD cycle', async ({ request }) => {
    const bookData = {
      title: 'Schema Validation Book',
      author: 'Schema Author',
      isbn: '978-0-999-88877-6',
      publicationYear: 2023,
      genre: 'Validation',
      pages: 400,
      rating: 4.2,
      description: 'Testing schema validation through CRUD operations'
    };

    // Create and validate schema
    const createResponse = await request.post(`${BASE_URL}/books`, { data: bookData });
    const createdBook = await createResponse.json();
    expect(() => BookSchema.parse(createdBook)).not.toThrow();

    // Read and validate schema
    const readResponse = await request.get(`${BASE_URL}/books/${createdBook.id}`);
    const readBook = await readResponse.json();
    expect(() => BookSchema.parse(readBook)).not.toThrow();

    // Update and validate schema
    const updates = { rating: 5.0, description: 'Updated for validation test' };
    const updateResponse = await request.put(`${BASE_URL}/books/${createdBook.id}`, { data: updates });
    const updatedBook = await updateResponse.json();
    expect(() => BookSchema.parse(updatedBook)).not.toThrow();

    // Verify in list and validate schema
    const listResponse = await request.get(`${BASE_URL}/books`);
    const allBooks = await listResponse.json();
    allBooks.forEach((book: any) => {
      expect(() => BookSchema.parse(book)).not.toThrow();
    });

    // Clean up
    await request.delete(`${BASE_URL}/books/${createdBook.id}`);
  });
});
