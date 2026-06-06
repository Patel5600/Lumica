/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eggshell: '#F1EDDC',
        sunshade: '#F69C40',
        dartmouth: '#097251',
        valentine: '#EF453F',
        ube: '#DD8CF1',
      },
    },
  },
  plugins: [],
}
