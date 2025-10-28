javascript
// postcss.config.cjs

module.exports = {
  plugins: {
    tailwindcss: {
      // Point to your Tailwind config (will be auto-detected if exists)
      // You might need to adjust content paths based on your project structure
      content: [
        "./app/**/*.{js,ts,jsx,tsx}",  // Main app content
        "./components/**/*.{js,ts,jsx,tsx}",  // Custom components
      ],
      // Optional: Add your theme or schema if you have a custom tailwind.config.ts
    },
    autoprefixer: {
      // Browserslist config for autoprefixing
      browsers: ['last 2 versions', 'Safari >= 15', 'Edge >= 18', 'Android >= 11'],
    },
  },
};