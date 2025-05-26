/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        handwriting: ['"Nanum Pen Script"', 'cursive'],
      },
      colors: {
        textDefault: "#38342c"
      },
    },
  },
  plugins: [],
}