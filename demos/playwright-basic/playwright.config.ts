import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'https://swapi.dev/api',
  },
  timeout: 10000,
  retries: 0,
  reporter: [['html', { open: 'never' }]]
});
