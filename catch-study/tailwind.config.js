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
        'kakao-login': 'url(/src/assets/kakao_login_medium_wide.png)',
        'send-plane': "url('/src/assets/send-plane.svg')",
        loading: "url('/src/assets/loading.svg')",
      },
    },
    colors: {
      'light-gray': '#CCCCCC',
      'dark-gray': '#9B9B9B',
      white: '#FFFFFF',
      red: '#FF0B0B',
      blue: '#1B68FF',
    },
    backgroundPosition: {
      right: 'right 10px center',
    },
    borderRadius: {
      default: '30px',
      full: '50%',
      sm: '10px',
    },
    boxShadow: {
      modal: '0px -4px 10px 0px #CCCCCC',
    },
  },
  plugins: [],
};
