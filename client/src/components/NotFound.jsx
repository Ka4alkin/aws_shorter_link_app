import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">404 - Not Found</h2>
        <p className="text-gray-600 mb-4">The page you&apos;re looking for does not exist.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
