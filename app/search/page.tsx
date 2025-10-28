// app/search/page.tsx
import { useState } from 'react'
import type { NextPage } from 'next'
import { createExpander } from '@shadcn/ui'

export default function SearchPage(): NextPage {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock Algolia/Typesense data structure for demonstration
  const mockSearchData = [
    {
      id: 1,
      name: 'Acetaminophen 500mg',
      brand: 'Tylenol',
      dosage: '500mg',
      description: 'Pain reliever and fever reducer',
      imageUrl: '/assets/acetaminophen.jpg',
      categories: ['analgesics', 'fever reducers']
    },
    {
      id: 2,
      name: 'Ibuprofen 400mg',
      brand: 'Advil',
      dosage: '400mg',
      description: 'NSAID for inflammation and pain',
      imageUrl: '/assets/ibuprofen.jpg',
      categories: ['pain relievers', 'anti-inflammatories']
    },
    // ... more mock data
  ]

  // Filter data based on search query (mock Algolia/Typesense API)
  const filteredResults = mockSearchData.filter(item =>
    Object.values(item).some(value =>
      typeof value === 'string' && 
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-white text-center p-8">
      {/* Search Component */}
      <div className="max-w-md mx-auto mt-10">
        {/* Search Input */}
        <div className="flex items-center p-4 border rounded shadow-md">
          <input
            type="text"
            placeholder="Search medications..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring Indigo-500"
          />
          <button
            className="px-4 py-2 rounded-r-lg bg-Indigo-500 text-white hover:bg-Indigo-600"
            onClick={() => {}}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M15.5 14.2L14.2 15.5l2.8 2.8l-2.8 2.8z M14 2.5L14.5 2l-2.3 2.3L14 4.5l-3.5 3.5L14 12H4l6-6 6 6h10" />
            </svg>
          </button>
        </div>

        {/* Search Filters (mocked) */}
        <div className="mt-4 max-w-md mx-auto">
          <h3 className="text-2xl mb-4 text-Indigo-600">Filter by:</h3>
          <div className="flex flex-wrap gap-2">
            {/* Category filters would connect to Algolia/Typesense filters in real app */}
            <div className="p-2 border rounded text-Indigo-500 hover:bg-Indigo-100">
              <span>Pain Relievers</span>
            </div>
            <div className="p-2 border rounded text-Indigo-500 hover:bg-Indigo-100">
              <span>Fever Reducers</span>
            </div>
          </div>
        </div>

        {/* Search Results List */}
        <div className="mt-6 text-sm">
          <h3 className="text-2xl text-Indigo-600 mb-4">Search Results</h3>
          {filteredResults.length === 0 ? (
            <p className="text-gray-500">No results found. Try different keywords.</p>
          ) : filteredResults.map(item => (
            <div 
              key={item.id}
              className="bg-white p-4 rounded shadow-md mb-6 hover:bg-Indigo-50"
              onClick={() => { /* In real app: navigate to product page */ }}
            >
              <img 
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover mx-auto mb-2"
              />
              
              <div className="text-Indigo-700 font-semibold">{item.name}</div>
              <div className="text-gray-600">{item.brand} {item.dosage}</div>
              <div className="text-gray-700">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}