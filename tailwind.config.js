
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#125570',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
      
  },
  plugins: [],
})