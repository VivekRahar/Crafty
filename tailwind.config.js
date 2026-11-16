/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          50: '#fdf8f4',
          100: '#faede3',
          200: '#f5d8c3',
          300: '#edbd9a',
          400: '#e1986a',
          500: '#d77641',
          600: '#c85e34',
          700: '#a64929',
          800: '#863b27',
          900: '#6e3323',
          950: '#3b1810',
        },
        heritage: {
          dark: '#12131a',
          navy: '#1a1f2c',
          gold: '#eab308',
          emerald: '#059669',
          crimson: '#be123c',
          saffron: '#f97316',
          ivory: '#fcfaf6'
        }
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      animation: {
        'scan': 'scan 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '96%' },
        }
      }
    },
  },
  plugins: [],
}
