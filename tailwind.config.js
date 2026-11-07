/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3d9ec',
          300: '#94bfe0',
          400: '#5e9ed0',
          500: '#3880be',
          600: '#2766a2',
          700: '#1e4e7e',
          800: '#1b436a',
          900: '#0b2545', // Jayarams primary navy
          950: '#07182f',
        },
        solar: {
          amber: '#d97706',
          orange: '#ea580c',
          warm: '#f59e0b',
          glow: '#fbbf24',
          subtle: '#fffbeb',
          border: '#fde68a',
        },
        neutral: {
          surface: '#f8fafc',
          card: '#ffffff',
          subtle: '#f1f5f9',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'float': '0 10px 25px -3px rgba(15, 23, 42, 0.07), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
        'a4': '0 20px 40px -15px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}

