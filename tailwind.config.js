/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '639px', min: '475px' },
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
