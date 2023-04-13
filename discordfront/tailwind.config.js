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
          500:'#6366f1',
          600:'#4f46e5',
        },
        yellow:{
          300:'#fde047',
          400:'#facc15',
          500:'#eab308'
        },
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#9ca3af',
          300: '#d1d5db',
          200: '#e5e7eb',
          100: '#f3f4f6',
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

