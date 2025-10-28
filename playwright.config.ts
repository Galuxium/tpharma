import { defineConfig } from 'playwright';

export default defineConfig({
  use: ['expect'],
  projects: [
    {
      name: 'pharmacy-landing',
      baseURL: 'http://localhost:3000', // Adjust based on your Next.js dev server port
      testConfig: {
        use: ['globals'],
      },
    },
  ],
});