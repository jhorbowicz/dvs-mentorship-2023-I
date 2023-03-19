/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      "sans": ["Montserrat", "sans-serif"],
      "mono": ["IBM Plex Mono", "monospace"]
    },
    extend: {},
  },
  plugins: [],
}
