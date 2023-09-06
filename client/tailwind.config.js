/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#1aac83',
      error: '#e7195a',
      white: '#fff',
      black: '#000',
      gray: '#f1f1f1',
    },
    borderWidth: {
      DEFAULT: '1px',
    },
    extend: {},
  },
  plugins: [],
}