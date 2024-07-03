/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'up-2xl': '0 -10px 25px -10px rgba(0, 0, 0, 0.75)',
      },
      colors: {
        'light-gray': '#25262C',
        gray: '#2C2D35',
        'near-gray': '#262730',
        black: "#212020",
        'ease-gray': '#ababab',
        'dark-black': "#0f0f0f",
        'light-black': "#313338",
        midDark: '#2b2d31',
        coal: "#1e1f22",
        white: "#cdcfd2",
        frostWhite: '#FFFFFF',
        blue: '#5865f2',
        lightBlue: '#0798e2',
        'dark-purple': '#131217',
        'dark-blue' : '#1C1D23',
        'dark-near-blue' : '#202128',
        'white-gray': '#3B3D43',
      },
      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
      },
      animation: {
        'black-gray-pulse': 'black-gray-pulse 2.4s infinite',
        'light-gray-pulse': 'light-gray-pulse 1s infinite',
      },
      keyframes: {
        'black-gray-pulse': {
          '50%': { backgroundColor: '#1f1f1f' },
          '0%, 100%': { backgroundColor: '#2a2a2a' },
        },
        'light-gray-pulse': {
          '0%, 100%': { backgroundColor: '#e6e5e3' },
          '50%': { backgroundColor: '#9e9d9b' },
        },
      },
    },
  },
  plugins: [],
}
