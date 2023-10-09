/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'koulen': ['Koulen', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        yellow: '#FFD369',
        white: '#EEEEEE',
        gray: '#333333',
        dark: '#151515',
      },
    },
    plugins: [],
  }
}
