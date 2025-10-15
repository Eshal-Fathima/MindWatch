/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1E2D24', // Main Background
        },
        rose: {
          DEFAULT: '#D88C9A', // Primary Accent
        },
        sage: {
          DEFAULT: '#52796F', // Secondary Accent
        },
        highlight: {
          DEFAULT: '#84A98C', // Highlight
        },
        section: {
          DEFAULT: '#354F42', // Subtle Section BG
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}




