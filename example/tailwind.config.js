/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.vue"],
  theme: {
    extend: {
      // https://coolors.co/palette/ffa69e-faf3dd-b8f2e6-aed9e0-5e6471
      colors: {
        "v-orange": {
          100: "#ffedec",
          200: "#ffdbd8",
          300: "#ffcac5",
          400: "#ffb8b1",
          500: "#ffa69e",
          600: "#cc857e",
          700: "#99645f",
          800: "#66423f",
          900: "#332120",
        },
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
