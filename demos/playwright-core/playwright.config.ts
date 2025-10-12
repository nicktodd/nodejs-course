import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
  timeout: 10000,
  retries: 0,
  reporter: [['html', { open: 'never' }]],
});
