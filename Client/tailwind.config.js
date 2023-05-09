/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      keyframes: {
        'shake': {
          '10%': {
            transform: 'rotate(15deg)'
          },
          '20%': {
            transform: 'rotate(-15deg)'
          },
          '30%': {
            transform: 'rotate(15deg)'
          },
          '40%': {
            transform: 'rotate(-15deg)'
          }
        },
        'spin': {
          '0': {
            transform: 'rotate(0deg)'
          },
          '100': {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'shake': 'shake 0.25s',
        'spin': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
}

