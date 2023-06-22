/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blueblack: "#555",
        rich: "#6967ED",
        light: "#8b89e9f6",
        slategray: "rgb(100, 110, 110)",
        accent: "#E9D314"
      },
      fontFamily: {
        cycle: ["var(--font-cycle)", "Bold"]
      }
    },
    screens: {
      xs: "480px",

      sm: "640px",
      md: "820px",
      // => @media (min-width: 640px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px"
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: []
};
