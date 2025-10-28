// app/loading.tsx
'use client';

import { Link } from 'next/link';
import { Container } from 'shadcn-ui';

export default function Loading() {
  return (
    <div className="flex items-center min-h-screen bg-neutral-50">
      {/* Header Section */}
      <header className="bg-blue-700 text-white p-4">
        <Container maxW="container">
          <h1 className="text-3xl font-bold mb-4">PharmaCare 🏥</h1>
          <p className="text-lg mb-6">Your trusted local pharmacy with modern healthcare solutions</p>
          <div className="flex space-x-4">
            <Link href="/register" className="text-white hover:underline">
              Register
            </Link>
            <Link href="/login" className="text-white hover:underline">
              Login
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero Section Skeleton */}
      <main className="py-16">
        <Container maxW="container">
          {/* Skeleton Grid for Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pill Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Medication Management</h2>
              <div className="mt-4 bg-[#f5faf5] p-3 rounded-lg">Skeleton Pills Here</div>
            </div>

            {/* Appointment Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Online Consultation</h2>
              <div className="mt-4 bg-[#e8f0fe] p-3 rounded-lg">Skeleton Chat Interface</div>
            </div>

            {/* AI Assistant Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">AI Health Assistant</h2>
              <div className="mt-4 bg-[#fff5e0] p-3 rounded-lg">Skeleton AI Chatbot</div>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold">Start Your Healthcare Journey Today</h2>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              href="/register"
            >
              Get Started
            </button>
          </div>
        </Container>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-6">
        <Container maxW="container">
          <p>© 2024 PharmaCare | All rights reserved</p>
        </Container>
      </footer>
    </div>
  );
}