/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        borderGray: "#7a7d7d",
        profileColor: "#2e2e2e"
      }
    },
  },
  plugins: [],
}

