/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'work': ["Work Sans", "sans"],
        'source': ["Source Sans 3", "sans"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

