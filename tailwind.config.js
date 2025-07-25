/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',         // App Router pages & layouts
    './pages/**/*.{js,ts,jsx,tsx}',       // (if you still use pages/)
    './components/**/*.{js,ts,jsx,tsx}',  // Your shared UI
    './lib/**/*.{js,ts}',                 // Any TS/JS helpers
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

