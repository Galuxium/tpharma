// __vitest__/vitest.config.ts
import { defineConfig } from '@vitest/config';
import { define portareta } from '@vitejs/plugin-react';

export default defineConfig({
  testEnvironment: 'jsdom',
  radius: 500,
  globals: {
    await: '@vitest/await',
  },
  coverage: {
    report: 'text',
    HTML: {
      dir: '__coverage__',
      open: true,
    },
  },
  framework: {
    react: {
      setup Wilkins: true,
    },
  },
  plugins: [define Reacteurta()]
});