/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          purple: '#2D1B69',
          turquoise: '#00CED1',
        },
        dark: '#1a1a2e',
        light: '#ffffff',
      },
    },
  },
  plugins: [],
}