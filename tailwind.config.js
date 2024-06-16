/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#383a40',
        gray: '#2a2a2a',
        black: "#313338",
        midDark: '#2b2d31',
        coal: "#1e1f22",
        white: "#cdcfd2",
        frostWhite: '#FFFFFF',
        blue: '#5865f2',
        lightBlue: '#0798e2',
      },
      fontFamily: {
        mukta: ['Mukta', 'sans-serif'],
      },
      animation: {
        'black-gray-pulse': 'black-gray-pulse 2s infinite',
      },
      keyframes: {
        'black-gray-pulse': {
          '50%': { backgroundColor: '#1e1f22' },
          '0%, 100%': { backgroundColor: '#2a2a2a' },
        },
      },
    },
  },
  plugins: [],
}
