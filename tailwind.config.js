
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#125570',
        purple: {
          950: '#4c1d95', // Add a custom purple-950 color (example hex)
        },
        violet: {
          950: '#2e1065', // Add the custom violet-950 color (example hex)
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
      
  },
  plugins: [],
})