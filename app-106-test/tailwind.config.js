/** @type {import('tailwindcss').Config} */
const { join } = require('path');

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],

  corePlugins: {
    preflight: false // set preflight to false
  },
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  plugins: [],
}
