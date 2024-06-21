const { interval } = require('rxjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}',"./node_modules/flowbite/**/*.js"],
  theme: {

     fontFamily:{
      inter: ['Inter'],
     },
     colors: {
      darkGray: '#252422',
      lightGray: '#868179',
      palidGray: '#D9D9D9',
      anaranjado: '#EB5E28',
      neutralGray:'#33312E',
      white: '#FFFFFF',
     },
     
     
     
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/line-clamp')
,require('@tailwindcss/typography')
,require('flowbite/plugin')
],
};
