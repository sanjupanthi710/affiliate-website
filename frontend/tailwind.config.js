/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#12181B',
        paper: '#F7F5F1',
        brand: {
          50: '#EAF6F3',
          100: '#D2ECE5',
          200: '#A6D9CC',
          300: '#79C5B2',
          400: '#3FA890',
          500: '#1F8B73',
          600: '#166E5C',
          700: '#125A4B',
          800: '#0F473C',
          900: '#0B342C'
        },
        clay: '#C4602E'
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,24,27,0.06), 0 6px 16px rgba(18,24,27,0.06)'
      }
    }
  },
  plugins: []
};
