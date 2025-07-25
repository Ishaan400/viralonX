'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">404 – Page Not Found</h1>
      <p className="mt-4 text-lg">Sorry, we couldn’t find that page.</p>
      <Link href="/" className="mt-6 underline">
        Go back home
      </Link>
    </div>
  );
}
