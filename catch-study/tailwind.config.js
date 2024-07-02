/** @type {import('tailwindcss').Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    extend: {
      spacing: px0_200,
      fontSize: px0_100,
      width: {
        ...px0_100,
        max: '393px',
      },
      height: {
        ...px0_100,
        topbar: '80px',
      },
      backgroundImage: {
        alarm: "url('/src/assets/alarm.svg')",
        menu: "url('/src/assets/menu.svg')",
        polygon: "url('/src/assets/polygon.svg')",
      },
      backgroundPosition: {
        right: 'right 10px center',
      },
      borderRadius: {
        default: '30px',
      },
    },
    colors: {
      'light-gray': '#CCCCCC',
      'dark-gray': '#9B9B9B',
    },
  },
  plugins: [],
};
