// error.tsx
import React from 'react';
import { useRouter } from 'next/router';

interface ErrorPageProps {
  errorMessage?: string;
}

/**
 * Generic error page component with retry functionality
 */
const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage = 'Something went wrong!' }) => {
  const router = useRouter();

  const handleRetry = () => {
    // Redirect to homepage or previous page on retry
    router.push('/');
  };

  return (
    <div 
      className="flex items-center min-h-screen bg-gray-50 flex-col p-8 text-center">
      <div className="max-w-sm mx-auto text-center text-gray-900">
        <h2 className="text-4xl font-bold mb-4">🚨 Oops! Error Occurred</h2>
        {errorMessage && <p className="text-lg mb-6">{errorMessage}</p>}
        <button 
          onClick={handleRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Retry &rarr;
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;