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
  let createdShowId: number;

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
    // Test valid credentials
    const validResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: adminCredentials
    });
    expect(validResponse.status()).toBe(200);
    const validData = await validResponse.json();
    expect(validData.token).toBeDefined();
    expect(validData.role).toBe('admin');

    // Test invalid credentials
    const invalidResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: { username: 'wrong', password: 'incorrect' }
    });
    expect(invalidResponse.status()).toBe(401);
    const invalidData = await invalidResponse.json();
    expect(invalidData.error).toBeDefined();
  });

  // Test 2: Create a new show (authenticated)
  test('Create a new TV show with authentication', async ({ request }) => {
    // Create a show with user authentication
    const response = await request.post(`${BASE_URL}/tvshows`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      },
      data: newShowData
    });
    
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(() => TVShowSchema.parse(data)).not.toThrow();
    expect(data.title).toBe('Taskmaster');
    
    // Save ID for later tests
    createdShowId = data.id;
  });

  // Test 3: Unauthorized access is rejected
  test('Unauthorized access is rejected', async ({ request }) => {
    // Try to create a show without auth
    const response = await request.post(`${BASE_URL}/tvshows`, {
      data: {
        title: 'Unauthorized Show',
        genre: 'Drama',
        seasons: 1,
        rating: 5.0
      }
    });
    
    expect(response.status()).toBe(401);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });

  // Test 4: Regular user cannot delete TV shows (403 Forbidden)
  test('Regular user cannot delete TV shows', async ({ request }) => {
    // Try to delete as regular user
    const response = await request.delete(`${BASE_URL}/tvshows/1`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    
    expect(response.status()).toBe(403);
    const data = await response.json();
    expect(data.error).toBeDefined();
  });

  // Test 5: Admin can delete TV shows
  test('Admin can delete TV shows', async ({ request }) => {
    // Make sure we have a show to delete
    if (!createdShowId) {
      const createResponse = await request.post(`${BASE_URL}/tvshows`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        },
        data: {
          title: 'Show to Delete',
          genre: 'Test',
          seasons: 1,
          rating: 5.0
        }
      });
      const createData = await createResponse.json();
      createdShowId = createData.id;
    }
    
    // Delete as admin
    const response = await request.delete(`${BASE_URL}/tvshows/${createdShowId}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    
    expect(response.status()).toBe(204);
  });

  // Test 6: Upload an image for a TV show (admin only)
  test('Upload an image for a TV show (admin only)', async ({ request }) => {
    // Create a new show first
    const createResponse = await request.post(`${BASE_URL}/tvshows`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
      data: {
        title: 'Show with Image',
        genre: 'Drama',
        seasons: 2,
        rating: 8.5
      }
    });
    const show = await createResponse.json();
    
    // Create a simple test image file if it doesn't exist
    const fixturesDir = path.join(__dirname, 'fixtures');
    const imagePath = path.join(fixturesDir, 'test-image.jpg');
    
    if (!fs.existsSync(imagePath)) {
      // For testing purposes, create a text file that mentions this should be replaced
      if (!fs.existsSync(fixturesDir)) {
        fs.mkdirSync(fixturesDir, { recursive: true });
      }
      fs.writeFileSync(imagePath, 'This is a placeholder for a real JPG file');
    }
    
    // Upload image
    const formData = new FormData();
    formData.append('image', new Blob([fs.readFileSync(imagePath)]), 'test-image.jpg');
    
    const response = await request.post(`${BASE_URL}/tvshows/${show.id}/image`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
      multipart: {
        image: {
          name: 'test-image.jpg',
          mimeType: 'image/jpeg',
          buffer: fs.readFileSync(imagePath)
        }
      }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.imageUrl).toBeDefined();
  });

  // Test 7: Response chaining - create show, add image, update, verify, delete
  test('Create show, upload image, and verify in one workflow', async ({ request }) => {
    // Step 1: Create a new show
    const createResponse = await request.post(`${BASE_URL}/tvshows`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
      data: {
        title: 'Line of Duty',
        genre: 'Crime Drama',
        seasons: 6,
        rating: 8.7,
        description: 'Police corruption drama'
      }
    });
    expect(createResponse.status()).toBe(201);
    const newShow = await createResponse.json();
    const newShowId = newShow.id;
    
    // Step 2: Upload an image for the show
    const fixturesDir = path.join(__dirname, 'fixtures');
    const imagePath = path.join(fixturesDir, 'test-image.jpg');
    
    if (!fs.existsSync(imagePath)) {
      if (!fs.existsSync(fixturesDir)) {
        fs.mkdirSync(fixturesDir, { recursive: true });
      }
      fs.writeFileSync(imagePath, 'This is a placeholder for a real JPG file');
    }
    
    const uploadResponse = await request.post(`${BASE_URL}/tvshows/${newShowId}/image`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
      multipart: {
        image: {
          name: 'test-image.jpg',
          mimeType: 'image/jpeg',
          buffer: fs.readFileSync(imagePath)
        }
      }
    });
    expect(uploadResponse.status()).toBe(200);
    const uploadData = await uploadResponse.json();
      // Step 3: Update the show with new details
    const updateResponse = await request.put(`${BASE_URL}/tvshows/${newShowId}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
      data: {
        ...newShow,
        imageUrl: uploadData.imageUrl, // Include the imageUrl from the upload response
        rating: 9.2,
        description: 'Gripping police corruption drama series'
      }
    });
    expect(updateResponse.status()).toBe(200);
    const updatedShow = await updateResponse.json();
    
    // Step 4: Verify all changes
    const getResponse = await request.get(`${BASE_URL}/tvshows/${newShowId}`);
    expect(getResponse.status()).toBe(200);
    const finalShow = await getResponse.json();
    
    expect(finalShow.title).toBe('Line of Duty');
    expect(finalShow.rating).toBe(9.2);
    expect(finalShow.imageUrl).toBe(uploadData.imageUrl);
    expect(finalShow.description).toBe('Gripping police corruption drama series');
    
    // Step 5: Clean up - delete the show
    const deleteResponse = await request.delete(`${BASE_URL}/tvshows/${newShowId}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    expect(deleteResponse.status()).toBe(204);
  });
});
