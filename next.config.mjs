javascript
// next.config.mjs
// Configuration for Next.js 15 project with React Strict Mode, SWC optimization, and image handling guidance

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better error tracking
  reactStrictMode: true,

  // Enable SWC minimizer for production optimization
  swcMinify: true,

  // Image optimization configuration
  images: {
    // commented: Add remote patterns for external images (e.g., picsum.photos, via.placeholder.com)
    // Example pattern format:
    // remotePatterns: [
    //   { 
    //     protocol: 'https', 
    //     hostname: 'picsum.photos', 
    //     pathname: '.*' 
    //   }
    // ]
  },

  // Vercel deployment optimizations (add below if needed):
  // webpack: (config) => {
  //   // Custom Webpack plugins or loader configurations
  // },
  // SWC config (extend below if needed):
  // swcMinify: {
  //   minimizerOptions: {
  //     // Additional minimization settings
  //   }
  // }
};

export default nextConfig;