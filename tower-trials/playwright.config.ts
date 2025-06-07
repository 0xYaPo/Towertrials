import { defineConfig } from '@playwright/test';
import { join } from 'path';

export default defineConfig({
  webServer: {
    command: 'vite preview --port 4173',
    port: 4173,
    reuseExistingServer: true,
  },
  testDir: 'tests',
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
  },
});
