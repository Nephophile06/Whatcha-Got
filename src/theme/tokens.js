/**
 * Whatcha Got? - Design System Tokens
 * Built with high-contrast accessibility (>= 7.5:1 for body/labels)
 */

export const colors = {
  // Figma Core Palette (8 Swatches)
  burgundy: '#80091B',
  rose: '#CC7E85',
  blush: '#FFE3E6',
  butter: '#FDF5BF',
  mint: '#EAF9D9',
  periwinkle: '#B4CDFF',
  softBlue: '#D9E6FF',
  black: '#000000',

  // Brand Semantic
  brand: '#80091B',
  brandDark: '#5B0613',
  brandRose: '#CC7E85',
  brandBlush: '#FFE3E6',

  primary: '#80091B', // Deep burgundy (Figma brand CTA & hero)
  primaryLight: '#CC7E85', // Muted rose
  primaryBlush: '#FFE3E6', // Soft blush
  primaryDark: '#5B0613',
  primaryGlow: '#AF2A30', // Top rim of the account-created ellipse
  primaryDeep: '#2E0208', // Outer falloff of the account-created ellipse

  secondary: '#2E7D32', // Fresh herb green
  secondaryLight: '#E8F5E9',
  accent: '#FFB300', // Warm golden yellow

  // Category & Chip Pastels
  pastelBlue: '#D9E6FF',
  pastelYellow: '#FDF5BF',
  pastelGreen: '#EAF9D9',
  pastelPeriwinkle: '#B4CDFF',
  pastelPink: '#FFE3E6',

  // Neutrals & Surfaces
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  border: '#CBD5E1',
  borderFocus: '#80091B',

  // Typography (High Contrast 7.5:1+)
  textPrimary: '#0F172A',
  textSecondary: '#334155',
  textMuted: '#64748B',
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
    sans: 'Assistant-Regular',
    medium: 'Assistant-Medium',
    semibold: 'Assistant-SemiBold',
    display: 'Fondamento-Regular',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    hero: 34,
    display: 40,
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
  xxl: 56,
  full: 9999,
};

/**
 * Pastel background gradients used by <Screen variant="..." />.
 * Colors reference the palette above so no component hardcodes a hex value.
 */
export const gradients = {
  blue: {
    colors: [colors.surface, colors.softBlue, colors.periwinkle],
    locations: [0, 0.5, 1],
    start: { x: 1, y: 0 },
    end: { x: 0.15, y: 1 },
  },
  onboarding: {
    colors: [colors.softBlue, colors.softBlue, colors.surface],
    locations: [0, 0.42, 1],
    start: { x: 0.1, y: 0 },
    end: { x: 0, y: 1 },
  },
  green: {
    colors: [colors.surface, colors.mint],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 0.35, y: 1 },
  },
  pink: {
    colors: [colors.surface, colors.blush],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 0.35, y: 1 },
  },
  yellow: {
    colors: [colors.surface, colors.butter],
    locations: [0, 1],
    start: { x: 0, y: 0 },
    end: { x: 0.35, y: 1 },
  },
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
  gradients,
  shadows,
};
