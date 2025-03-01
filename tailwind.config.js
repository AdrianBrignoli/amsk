const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2C3093',    // Blue
          secondary: '#EA5661',  // Red
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(to right, var(--brand-primary), var(--brand-secondary))',
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        // Reusable layout components
        '.page-container': {
          '@apply flex-1 flex flex-col max-w-[1300px] mx-auto justify-center items-center min-h-screen': {}
        },
        '.section-header': {
          '@apply text-2xl text-center text-gray-400 py-10': {}
        },
        '.content-wrapper': {
          '@apply flex-1 flex flex-col justify-center my-8': {}
        },

        // Calendar specific styles
        '.react-calendar': {
          '@apply w-full h-full bg-transparent border-none text-white': {}
        },
        '.react-calendar__navigation': {
          '@apply text-white flex justify-between mb-4': {}
        },
        '.react-calendar__navigation__arrow': {
          '@apply text-white px-6 py-2 hover:opacity-80 transition-opacity': {}
        },
        '.react-calendar__navigation__label': {
          '@apply font-bold text-lg text-white': {}
        },
        '.react-calendar__month-view__weekdays__weekday': {
          '@apply text-center my-4 text-white/80 uppercase text-sm': {},
          'abbr': {
            '@apply no-underline': {}
          }
        },
        '.react-calendar__month-view__days__day': {
          '@apply text-white/90 hover:bg-white/10 rounded-lg transition-colors': {}
        },
        '.react-calendar__tile': {
          '@apply p-2 text-center text-white': {},
          '&:enabled:hover': {
            '@apply bg-white/10 rounded-lg': {}
          },
          '&:disabled': {
            '@apply opacity-50 cursor-not-allowed': {}
          },
          '&--active': {
            '@apply bg-white/20 rounded-lg': {}
          },
          '&--now': {
            '@apply bg-white/5': {}
          }
        },
        '.react-calendar__month-view__days__day--weekend': {
          '@apply text-white/70': {}
        },
        // Calendar post type styles
        '.calendar-tile-news': {
          'background-color': 'var(--brand-primary)',
          'font-weight': 'bold',
          'border-radius': '0.5rem',
          '&:hover': {
            'opacity': '0.9'
          }
        },
        '.calendar-tile-competition': {
          'background-color': 'var(--brand-secondary)',
          'font-weight': 'bold',
          'border-radius': '0.5rem',
          '&:hover': {
            'opacity': '0.9'
          }
        },
        '.calendar-tile-combined': {
          'background': 'linear-gradient(to right, var(--brand-primary), var(--brand-primary) 40%, var(--brand-secondary) 60%, var(--brand-secondary))',
          'font-weight': 'bold',
          'border-radius': '0.5rem',
          '&:hover': {
            'opacity': '0.9'
          }
        }
      })
    })
  ],
}; 