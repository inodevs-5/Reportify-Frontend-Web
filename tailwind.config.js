/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    backgroundColor: theme => ({
     ...theme('colors'),
     'primary': '#2B3467',
     'secondary': '#26284c',
     'danger': '#e3342f',
    }),
  },
  plugins: [],
}

