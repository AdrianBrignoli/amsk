'use client';
import { useState } from 'react';

export default function ErrorTest() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error!');
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <h2 className="text-2xl text-white">Error Boundary Test</h2>
      <button
        onClick={() => setShouldError(true)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        Trigger Error
      </button>
    </div>
  );
}
