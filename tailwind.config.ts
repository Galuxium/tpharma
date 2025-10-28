module.exports = {
  content: [
    // Scan all JSX files in app and components directories
    '**/app/**/*.{js,ts,jsx,tsx}',
    '**/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary pharmacy brand colors (blue for trust, green for health)
        primary: '#4F90E2', // Trust blue
        secondary: '#3EB489', // Health green
        accent: '#FFA726', // Action orange
        warning: '#E57373', // Gentle warning
        danger: '#E34B4B', // Critical alerts
        info: '#64B5F6', // Informational blue
        // Neutral palette for readability
        neutral: '#FFFFFF', // Clean white
        background: '#F9FAFB', // Light background
        text: '#1A202C', // Dark text for contrast
        border: '#E5E7EB', // Subtle borders
        highlight: '#D1E7FF' // Subtle highlight
      },
      fonts: {
        // Custom font family stack
        'heading': "'Inter', sans-serif", // Modern sans-serif
        'body': "'Roboto', sans-serif", // Web-safe clear font
        'mono': "'Fira Code', monospace" // Optional for code areas
      }
    }
  },
  plugins: [], // Add plugins if needed (e.g. daisy UI, HCG2 for gradients)
  jit: true, // Enable JIT mode for performance
};