import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8', // Use 'v8' instead of 'c8'
      reporter: ['text', 'html', 'json'],
      all: true, // Include all files even if not tested
      exclude: ['node_modules/', 'dist/', 'coverage/', 'src/setupTests.ts'], // Exclude unnecessary files
    },
  },
});
