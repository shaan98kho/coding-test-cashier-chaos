/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/gamez/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        // triggers when viewport height is "tall"
        tall: { raw: "(min-height: 800px)" },
      },
    },
  },
  plugins: [],
};
