/** @type {import('tailwindcss').Config} */                                     
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  scrollbarHide: {
    '::-webkit-scrollbar': { display: 'none' },
    '-ms-overflow-style': 'none',  // IE and Edge
    'scrollbar-width': 'none',    // Firefox
  },
  theme: {
    extend: {},
  },
  plugins: [],
}