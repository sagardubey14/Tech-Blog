/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#0D3B66',
        lightGrey: '#E5E5E5',
        gold: '#F4D35E',
        coral: '#EE964B',
        coralDark: '#e55d50', 
        softWhite: '#F8F8F8',
        darkGrey: '#3A3A3A',
        grey: '#7D7D7D',
        lightBlue: '#1A4A80', 
      },
    },
  },
  plugins: [],
}

