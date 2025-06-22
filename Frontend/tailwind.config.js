/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a5b4fc',
          DEFAULT: '#6366f1',  // Indigo-500
          dark: '#4338ca',
        },
        grayText: '#1f2937', // Stronger than gray-500
      },
    },
  },
  plugins: [],
}
