// import plugin from 'tailwindcss'

/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: true
  },
  theme: {
    extend: {
      colors: {
        orange: '#16d9d9'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container2': {
          maxWidth: theme('colums.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
    // require('@tailwindcss/line-clamp')
  ]
}
