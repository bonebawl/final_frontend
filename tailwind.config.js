/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        wave1: "animate1 30s linear infinite",
        wave2: "animate2 20s linear infinite",
        wave3: "animate3 15s linear infinite",
      },
      keyframes: {
        animate1: {
          "0%": { "background-position-x": "0 px" },
          "100%": { "background-position-x": "1000px" },
        },
        animate2: {
          "0%": { "background-position-x": "0 px" },
          "100%": { "background-position-x": "-1000px" },
        },
        animate3: {
          "0%": { "background-position-x": "0 px" },
          "100%": { "background-position-x": "1000px" },
        },
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(600px, 1fr))",
      },
    },
  },
  plugins: [],
};
