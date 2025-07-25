// app/error.js
'use client';

export default function Error({ error, reset }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>500 – Application Error</h1>
      <p>Sorry, something went wrong.</p>
      <button onClick={() => reset && reset()}>Try Again</button>
    </div>
  );
}
