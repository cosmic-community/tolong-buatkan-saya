/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1625',
          light: '#2d2640',
        },
        cream: '#fef9f3',
        rose: {
          soft: '#ff8fab',
        },
        sky: {
          soft: '#7dd3fc',
        },
        sun: {
          soft: '#fcd34d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        comic: ['"Comic Neue"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 8px 30px rgba(26, 22, 37, 0.12)',
        'panel-lg': '0 20px 60px rgba(26, 22, 37, 0.18)',
      },
    },
  },
  plugins: [],
}