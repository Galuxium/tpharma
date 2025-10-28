// app/page.tsx
---
// Import necessary modules
import type { PageProps } from 'next/navigation'
import type { ThemeValue } from 'tailwindcss'
import { useEffect } from 'react'

// Interface for theme values if needed
interface MyTheme extends ThemeValue {
  // Add custom theme variables if needed
}

// Type for dynamic content (comment where to wire real data)
interface DynamicContent {
  heading: string
  subheading: string
  features: Array<{ title: string, description: string }>
  testimonials: Array<{ quote: string, name: string }>
  pricing: Array<{ plan: string, price: number, features: string[] }>
  ctaText: string
  ctaLink: string
}

// Dynamic data placeholder (wire real data here)
const dynamicData: DynamicContent = {
  heading: 'TPharma: Your Trusted Pharmacy Partner',
  subheading: 'Bringing Innovative Healthcare Solutions to Patients',
  features: [
    { title: 'Secure Prescription Management', description: 'Store and manage prescriptions securely with our system.' },
    { title: 'AI-Powered Health Advice', description: 'Get instant health recommendations from our AI assistant.' },
    { title: 'Realtime Medication Updates', description: 'Track your prescriptions and get real-time refill reminders.' }
  ],
  testimonials: [
    { quote: 'TPharma saved me hours with quick prescriptions!', name: 'Emily R.' },
    { quote: 'The AI assistant helped me manage my chronic condition better.', name: 'James T.' }
  ],
  pricing: [
    { plan: 'Basic', price: 9.99, features: ['Essential Medications', 'Basic AI Advice'] },
    { plan: 'Premium', price: 19.99, features: ['All Basic Features', '24/7 AI Support', 'Specialty Medications'] }
  ],
  ctaText: 'Start Your Free Trial',
  ctaLink: '/signup' // Wire to actual form
}

function Home({ theme }: { theme: MyTheme }) {
  // Use Tailwind classes for styling
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero max-w-7xl mx-auto py-24 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-600 mt-16">
            {dynamicData.heading} {/* Dynamic project name */}
          </h1>
          <p className="text-lg text-gray-700 mt-4">{dynamicData.subheading}</p>
          
          {/* CTA Button */}
          <button 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => window.location.href = dynamicData.ctaLink}
          >
            {dynamicData.ctaText} {/* Dynamic CTA text */}
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-2 gap-8">
          {dynamicData.features.map((feature, index) => (
            <div key={index} className="border p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
              
              {/* Wire real data: Connect to database/Supabase here */}
              <p className="text-sm text-gray-500 mt-4">
                {/* Dynamic feature details */}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-12">What Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dynamicData.testimonials.map((testimonial, index) => (
            <div key={index} className="max-w-sm bg-gray-50 p-6 rounded-lg shadow">
              <blockquote className="text-gray-800">
                "{testimonial.quote}" {/* Dynamic quote */}
              </blockquote>
              <p className="text-gray-600 mt-4">
                - {testimonial.name} {/* Dynamic name */}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing px-4 py-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dynamicData.pricing.map((plan, index) => (
            <div key={index} className="border p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">{plan.plan}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">${plan.price}</p>
              
              <div className="flex justify-center">
                {plan.features.map((feature, i) => (
                  <div key={i} className="bg-blue-50 w-5 h-5 rounded-full mr-2"></div>
                ))}
              </div>
              
              {/* Wire real data: Pricing details from database */}
              {plan.features.map((feature, i) => (
                <div key={i} className="text-gray-600 mt-2">
                  {feature} {/* Dynamic feature list */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA -->
      <section className="cta bg-blue-50 py-24 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Ready to Improve Your Health Journey?</h2>
          <p className="text-gray-700">
            TPharma combines cutting-edge technology with personalized care for patients
          </p>
          
          {/* CTA Button */}
          <button 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition"
            onClick={() => window.location.href = dynamicData.ctaLink}
          >
            Get Started with TPharma
          </button>
        </div>
      </section>
    </main>
  )
}

export async function getStaticProps() {
  // Optional: Add server-side data fetching here
  return {
    props: {}
  }
}