/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/chat/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("prettier-plugin-tailwindcss"), require("flowbite/plugin")],
};
