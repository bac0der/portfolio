/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: {
          950: '#06060A',
          900: '#0B0B12',
          800: '#12121D',
          700: '#1A1A2B',
        },
        accent: {
          primary: '#6366F1',
          secondary: '#06B6D4',
          glow: '#818CF8'
        }
      },
    },
  },
  plugins: [],
}
