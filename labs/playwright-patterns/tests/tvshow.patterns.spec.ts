import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { TVShowSchema } from '../src/tvshow.schema';

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Test fixtures
const adminCredentials = {
  username: 'admin',
  password: 'admin123'
};

const userCredentials = {
  username: 'user1',
  password: 'password123'
};

// New show data for creating tests
const newShowData = {
  title: 'Taskmaster',
  genre: 'Comedy',
  seasons: 15,
  rating: 9.0,
  description: 'Comedians compete in bizarre challenges.'
};

// Create test fixtures to reuse common setups
test.describe('TV Shows API with Authentication', () => {
  // Setup: Get auth tokens before tests
  let adminToken: string;
  let userToken: string;

  test.beforeAll(async ({ request }) => {
    // Get admin token
    const adminLoginResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: adminCredentials
    });
    const adminData = await adminLoginResponse.json();
    adminToken = adminData.token;

    // Get regular user token
    const userLoginResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: userCredentials
    });
    const userData = await userLoginResponse.json();
    userToken = userData.token;
  });

    // Test 1: Authentication tests
  test('Authentication - Valid and invalid credentials', async ({ request }) => {
    // TODO: Test authentication with valid credentials
    // 1. Send a POST request to /auth/login with adminCredentials
    // 2. Assert the response status is 200
    // 3. Assert the response includes a token and the role is 'admin'

    // TODO: Test authentication with invalid credentials
    // 1. Send a POST request with incorrect credentials
    // 2. Assert the response status is 401
    // 3. Assert an error message is returned
  });

  // Test 2: Create a new show (authenticated)
  test('Create a new TV show with authentication', async ({ request }) => {
    // TODO: Create a new show with user authentication
    // 1. Send a POST request to /tvshows with:
    //    - Authorization header using userToken
    //    - newShowData in the request body
    // 2. Assert the response status is 201
    // 3. Validate the response data against TVShowSchema
    // 4. Assert specific fields match what was sent
  });

  // Test 3: Unauthorized access is rejected
  test('Unauthorized access is rejected', async ({ request }) => {
    // TODO: Try to create a show without authentication
    // 1. Send a POST request to /tvshows without an auth token
    // 2. Assert the response status is 401
    // 3. Assert an error message is present in the response
  });

  // Test 4: Regular user cannot delete TV shows (403 Forbidden)
  test('Regular user cannot delete TV shows', async ({ request }) => {
    // TODO: Try to delete a show as regular user
    // 1. Send a DELETE request to /tvshows/1 with:
    //    - Authorization header using userToken
    // 2. Assert the response status is 403 (Forbidden)
    // 3. Assert an error message is present in the response
  });

  // Test 5: Admin can delete TV shows
  test('Admin can delete TV shows', async ({ request }) => {
    // TODO: Create and delete a show as admin
    // 1. Create a show to delete
    // 2. Delete it using the admin token
    // 3. Assert the response status is 204
  });

  // Test 6: Upload an image for a TV show (admin only)
  test('Upload an image for a TV show (admin only)', async ({ request }) => {
    // TODO: Upload an image for a TV show
    // 1. Create a new show
    // 2. Create or use a test image in the fixtures directory
    // 3. Send a multipart POST request to /tvshows/:id/image with:
    //    - Authorization header using adminToken
    //    - The image file as form data
    // 4. Assert the response status is 200
    // 5. Assert the response includes an imageUrl
  });

  // Test 7: Response chaining - create show, add image, update, verify, delete
  test('Create show, upload image, and verify in one workflow', async ({ request }) => {
    // TODO: Create a multi-step workflow
    // Step 1: Create a new show with admin token
    
    // Step 2: Upload an image for the show
    
    // Step 3: Update the show with new details, including the image URL
    
    // Step 4: Get the show by ID and verify all changes
    
    // Step 5: Clean up - delete the show
  });
});
