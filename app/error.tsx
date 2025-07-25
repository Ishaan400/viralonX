// app/error.tsx
'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Something went wrong</h1>
      <button
        onClick={reset}
        className="mt-6 px-4 py-2 rounded bg-blue-600 text-white"
      >
        Try again
      </button>
    </div>
  );
}
