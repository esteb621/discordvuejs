/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",  ],
  theme: {
    extend: {
        keyframes: {
          'slide-in': {
            from: {
              opacity: '0%',
              transform: 'translateY(100%)',
            },
            to: {
              opacity: '100%',
              transform: 'translateY(0%)',
            },
          },
        },
        animation: {
          'slide-in': 'slide-in 1s forwards',
        },
      colors:{
        primary: '#202225',
        secondary: '#5865f2',
        colors: {
          'blue-custom': '#4752c4',
          'green-custom': '#0ba70b',
          'gray-form':'#40444b',
        },
        purple:{
          500:'#7289da',
          600:'#677bc4',
        },
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        green: {
          400:'#4ade80',
          500:'#22c55e',
          600:'#16a34a',
          700:'#15803d',
        },
        
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
};

