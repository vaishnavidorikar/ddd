module.exports = {
  darkMode: 'class', // <== Important for toggling dark mode via class
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#a5b4fc',
          DEFAULT: '#6366f1',
          dark: '#4338ca',
        },
        grayText: '#1f2937',
      },
    },
  },
  plugins: [],
}
