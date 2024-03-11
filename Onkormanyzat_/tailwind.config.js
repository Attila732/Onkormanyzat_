/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      keyframes: {
        toRightTop: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(500px) translateY(-250px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
        toTopRight: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(250px) translateY(-500px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
        toTopLeft: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(-270px) translateY(-500px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
        toTop: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(-220px) translateY(-250px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
        toTopSlightlyRight: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(150px) translateY(-250px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
        toRight: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(350px) translateY(140px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
        toLeft: {
          '0%': { 
            transform: 'translateX(0) translateY(0)'},
          '50%': { 
            transform: 'translateX(-450px) translateY(-100px)'},
          '100%': { 
            transform: 'translateX(0) translateY(0)'},
        },
      },
      animation: {
        toRightTop: 'toRightTop 32s ease-in-out infinite',
        toTopRight: 'toTopRight 30s ease-in-out infinite',
        toTopLeft: 'toTopLeft 26s ease-in-out infinite',
        toTop: 'toTop 15s ease-in-out infinite',
        toTopSlightlyRight: 'toTopSlightlyRight 15s ease-in-out infinite',
        toLeft: 'toLeft 20s ease-in-out infinite',
        toRight: 'toRight 22s ease-in-out infinite',
      },
      colors: {
        'cstm-blue': '#3A98B9',
        'cstm-skin': '#FFF1DC',
        'cstm-brown': '#E8D5C4',
        'cstm-gray': '#EEEEEE',
        'cstm-dark_gray': '#3D3B40',
        'cstm-purple': '#9900F0',
        'cstm-dark-purple': '#610094',
        'cstm-lokalhir': '#CD5C08',
        'cstm-orszagos': '#863A6F',
        'cstm-programok(teal)': '#016A70',
      },
      fontFamily: {
        'outfit': ['outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}

