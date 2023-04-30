/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        "v-blue": {
          100: "#ccf0f7",
          200: "#99e1ef",
          300: "#66d2e8",
          400: "#33c3e0",
          500: "#00b4d8",
          600: "#0090ad",
          700: "#006c82",
          800: "#004856",
          900: "#00242b",
        },
        "v-gray": {
          100: "#dfe0e3",
          200: "#bfc1c7",
          300: "#9ea2aa",
          400: "#7e838e",
          500: "#5e6471",
          600: "#4b505b",
          700: "#383c44",
          800: "#26282e",
          900: "#131417",
        },
      },
    },
  },
  plugins: [],
};
