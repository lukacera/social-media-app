/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        backgroundDark: "#1a1919",
        borderGray: "#7a7d7d",
        profileColor: "#26282b",
        linearGradientStart: "#65ade3",
        linearGradientEnd: "#000000"
      }
    },
  },
  plugins: [],
}

