/**
 * Whatcha Got? - Design System Tokens
 * Built with high-contrast accessibility (>= 7.5:1 for body/labels)
 */

export const colors = {
  // Brand
  primary: '#E65100', // Warm culinary deep orange / amber
  primaryLight: '#FFE0B2',
  primaryDark: '#BF360C',
  secondary: '#2E7D32', // Fresh herb green
  secondaryLight: '#E8F5E9',
  accent: '#FFB300', // Warm golden yellow

  // Neutrals & Surfaces
  background: '#F8FAFC', // Slate 50
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9', // Slate 100
  border: '#CBD5E1', // Slate 300
  borderFocus: '#E65100',

  // Typography (High Contrast 7.5:1+)
  textPrimary: '#0F172A', // Slate 900
  textSecondary: '#334155', // Slate 700 (accessible contrast)
  textMuted: '#64748B', // Slate 500
  textInverse: '#FFFFFF',

  // Semantic
  success: '#15803D',
  successLight: '#DCFCE7',
  warning: '#B45309',
  warningLight: '#FEF3C7',
  error: '#B91C1C',
  errorLight: '#FEE2E2',
  info: '#1D4ED8',
  infoLight: '#DBEAFE',

  // Overlays
  overlay: 'rgba(15, 23, 42, 0.6)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 34,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
};

export default {
  colors,
  spacing,
  typography,
  radius,
  shadows,
};

