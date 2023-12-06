const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line import/no-anonymous-default-export
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        orange: "#f97316",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          paddingTop: "2rem",
          paddingBottom: "2rem",
          marginTop: "0",
          marginBottom: "0",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          "@media (min-width: 640px)": {},
          "@media (min-width: 768px)": {
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "3rem",
            paddingBottom: "3rem",
            maxWidth: "56rem",
            margin: "0 auto",
          },
          "@media (min-width: 1024px)": { maxWidth: "56rem" },
          "@media (min-width: 1280px)": {},
        },
        ".line-break": {
          display: "block",
          borderBottom: "6px solid #f4f4f4",
          transform: "matrix(1,0,0,-1,0,0)",
        },
      });
    }),
    require("flowbite/plugin"),
  ],
});
