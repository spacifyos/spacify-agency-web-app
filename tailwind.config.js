/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Noto Sans"],
      },
      fontSize: {
        xxs: "10px",
      },
      spacing: {
        125: "500px",
      },
      colors: {
        primary: "#d71440",
        "primary-background": "#f5f8fd",
        secondary: "#F05A22",
        "secondary-background": "#FFF4E0",
        available: "#03b78c",
        "available-light": "#E2FFFF",
        error: "#ff2e2e",
        "error-light": "#FFE6E6",
        tertiary: "#0379b7",
        warning: "#ff8a00",
        disable: "#D9D9D9",
        "disable-background": "#ECECEC",
        black: "#2c2c2c",
        white: "#FFFFFF",
        aqua: "#41c0be",
        female: "#FF9ACB",
        male: "#72B3FF",
        mixed: "#BF9AFF",
        "female-background": "#FFEEF6",
        "male-background": "#D6E9FF",
        "mixed-background": "#E8DBFF",
        "owner-background":
          "linear-gradient(88.34deg, #d71440 33.59%, #f9a533 131.55%)",
        active: "#41C0BE",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderColor: {
        DEFAULT: "#D9D9D9",
        primary: "#d71440",
        warning: "#ff8a00",
        available: "#03b78c",
        tertiary: "#0379b7",
        disable: "#D9D9D9",
        white: "#FFFFFF",
        "primary-background": "#f5f8fd",
        "secondary-background": "#FFF4E0",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".btn-primary-background": {
          "background-color": "#f5f8fd",
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#d71440",
          "primary-background": "#f5f8fd",
          secondary: "#F05A22",
          black: "#2c2c2c",
          disable: "#D9D9D9",
        },
      },
    ],
  },
};
