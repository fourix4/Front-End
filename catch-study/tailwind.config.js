/** @type {import('tailwindcss').Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    extend: {
      spacing: px0_200,
      fontSize: px0_100,
      width: px0_1000,
      height: {
        ...px0_1000,
        topbar: '80px',
        modal: '500px',
      },
      backgroundImage: {
        alarm: "url('/src/assets/alarm.svg')",
        menu: "url('/src/assets/menu.svg')",
        polygon: "url('/src/assets/polygon.svg')",
        close: "url('/src/assets/close.svg')",
        'arrow-right': "url('/src/assets/arrow-right.svg')",        
      },
    },
    colors: {
      'light-gray': '#CCCCCC',
      'dark-gray': '#9B9B9B',
    },
    backgroundPosition: {
      right: 'right 10px center',
    },
    borderRadius: {
      default: '30px',
    },
    boxShadow: {
      modal: '0px -4px 10px 0px #CCCCCC',
    },
  },
  plugins: [],
};
