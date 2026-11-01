/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Figma Palette (8 Core Swatches)
        burgundy: '#80091B',
        rose: '#CC7E85',
        blush: '#FFE3E6',
        butter: '#FDF5BF',
        mint: '#EAF9D9',
        periwinkle: '#B4CDFF',
        softBlue: '#D9E6FF',
        black: '#000000',

        // Brand Semantic
        brand: {
          DEFAULT: '#80091B',
          dark: '#5B0613',
          rose: '#CC7E85',
          blush: '#FFE3E6',
        },
        primary: {
          DEFAULT: '#80091B', // Deep Burgundy (Figma brand CTA & hero)
          light: '#CC7E85',   // Muted Rose
          blush: '#FFE3E6',   // Soft Blush
          dark: '#5B0613',
        },
        secondary: {
          DEFAULT: '#2E7D32',
          light: '#E8F5E9',
        },

        // Category & Chip Pastels
        pastel: {
          blue: '#D9E6FF',
          yellow: '#FDF5BF',
          green: '#EAF9D9',
          periwinkle: '#B4CDFF',
          pink: '#FFE3E6',
        },

        // Neutrals & Surfaces
        background: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F1F5F9',
        },
        border: {
          DEFAULT: '#CBD5E1',
          focus: '#80091B',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          inverse: '#FFFFFF',
        },

        // Feedback & Status
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
        info: {
          DEFAULT: '#1D4ED8',
          light: '#DBEAFE',
        },
      },
      fontFamily: {
        sans: ['Assistant-Regular'],
        'sans-medium': ['Assistant-Medium'],
        'sans-semibold': ['Assistant-SemiBold'],
        display: ['Fondamento-Regular'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        md: ['16px', '24px'],
        lg: ['18px', '26px'],
        xl: ['22px', '28px'],
        xxl: ['28px', '34px'],
        hero: ['34px', '40px'],
        display: ['40px', '48px'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '56px',
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
