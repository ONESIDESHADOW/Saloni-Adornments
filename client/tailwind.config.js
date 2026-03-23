/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#f6e27a',
          500: '#d4af37',
          700: '#caa133',
          900: '#0b0f18',
        },
        dark: '#0b0f18',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Cinzel', 'sans-serif'],
      },
    },
  },
  plugins: [],
};