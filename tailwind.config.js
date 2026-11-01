/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E65100',
          light: '#FFE0B2',
          dark: '#BF360C',
        },
        secondary: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        },
        accent: '#FFB300',
        background: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F1F5F9',
        },
        border: {
          DEFAULT: '#CBD5E1',
          focus: '#E65100',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          inverse: '#FFFFFF',
        },
        success: {
          DEFAULT: '#15803D',
          light: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#B45309',
          light: '#FEF3C7',
        },
        error: {
          DEFAULT: '#B91C1C',
          light: '#FEE2E2',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
      },
    },
  },
  plugins: [],
};
