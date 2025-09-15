import { test, expect, request as pwRequest, APIRequestContext } from '@playwright/test';

const BASE_URL = 'http://localhost:4000';

test.describe('Throttling Behaviour', () => {
  test('should throttle every third request', async ({ request }) => {
    for (let i = 1; i <= 6; i++) {
      const res = await request.get(`${BASE_URL}/api/throttle`);
      if (i % 3 === 0) {
        expect(res.status()).toBe(429);
        const body: { error: string; message: string } = await res.json();
        expect(body.error).toBe('Too Many Requests');
        expect(body.message).toBe('Throttled');
      } else {
        expect(res.status()).toBe(200);
        const body: { message: string } = await res.json();
        expect(body.message).toBe('Request successful');
      }
    }
  });
});

test.describe('Error Handling & Negative Tests', () => {
  test('should return 401 for missing auth header', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/auth-required`);
    expect(res.status()).toBe(401);
    const body: { error: string; message: string } = await res.json();
    expect(body.error).toBe('Unauthorized');
    expect(body.message).toBe('Missing Authorization header');
  });

  test('should return 200 for valid auth header', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/auth-required`, {
      headers: { Authorization: 'Bearer test' }
    });
    expect(res.status()).toBe(200);
    const body: { message: string; user: string } = await res.json();
    expect(body.message).toBe('Authorized');
    expect(body.user).toBe('Bearer test');
  });

  test('should return 400 for invalid echo payload', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/api/echo`, { data: {} });
    expect(res.status()).toBe(400);
    const body: { error: string; message: string } = await res.json();
    expect(body.error).toBe('Bad Request');
    expect(body.message).toBe('Missing or invalid "text" field');
  });

  test('should return 500 for error endpoint', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/error`);
    expect(res.status()).toBe(500);
    const body: { error: string; message: string } = await res.json();
    expect(body.error).toBe('Internal Server Error');
    expect(body.message).toBe('This endpoint always fails');
  });
});

test.describe('API Versioning', () => {
  test('should return v1 and deprecation header', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/v1/resource`);
    expect(res.status()).toBe(200);
    expect(res.headers()['deprecation']).toBe('true');
    const body: { version: string; message: string } = await res.json();
    expect(body.version).toBe('v1');
  });

  test('should return v2 for v2 endpoint', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/v2/resource`);
    expect(res.status()).toBe(200);
    const body: { version: string; message: string } = await res.json();
    expect(body.version).toBe('v2');
  });

  test('should return v1 for header-based versioning', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/resource`, {
      headers: { 'x-api-version': '1' }
    });
    expect(res.status()).toBe(200);
    expect(res.headers()['deprecation']).toBe('true');
    const body: { version: string; message: string } = await res.json();
    expect(body.version).toBe('v1');
  });

  test('should return v2 for default versioning', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/api/resource`);
    expect(res.status()).toBe(200);
    const body: { version: string; message: string } = await res.json();
    expect(body.version).toBe('v2');
  });
});
