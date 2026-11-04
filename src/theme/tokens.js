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
  // Onboarding page wash measured from design/screens/onboarding.png.
  onboardingBlue: '#C5D8FF',
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
  // Account-created dome sampled from the PNG at x 60/300 (y 592 -> 917):
  // a light rim, a mid burgundy at y 740 and near-black at the bottom edge.
  domeTop: '#C13939',
  domeMid: '#780819',
  domeBottom: '#170205',
  // OTP error dome sampled from otp-error-state.png at y 548/560/700/850/910
  // (the ellipse starts at y 545 and runs 824 high). The rim holds #BA3133
  // until y560, then ramps linearly to #820B1C at y700.
  otpDomeLip: '#BE383B',
  otpDomeTop: '#BA3133',
  otpDomeMid: '#820B1C',
  otpDomeDeep: '#36030B',
  otpDomeBottom: '#180104',

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

  // Warm grays measured on login.png: field hairlines, placeholders and links
  // are #787D73, and the divider rule is #BCBEBA on the mint wash.
  fieldLine: '#787D73',
  lineSoft: '#BCBEBA',
  // Hairline used by the dashboard search field and category tiles. The Figma
  // stroke is ~0.5dp black; painting 1px at 50% alpha keeps the same weight at
  // DPR1 (web fidelity) and on DPR3 devices (1.5 device px of ink).
  hairline: 'rgba(0, 0, 0, 0.5)',
  // Settings-card row rule: a 10% black line over the card's mint wash
  // (measured 247,252,242 -> 222,226,216 on profile.png).
  cardSeparator: 'rgba(0, 0, 0, 0.1)',
  // Cream tab bar panel on Profile / Account Settings (254,251,230 at the top
  // edge fading to 254,250,223 at the bottom of the frame).
  tabBarCreamTop: '#FEFBE6',
  tabBarCreamBottom: '#FEFADF',
  // Page colour behind the tab bar's rounded top corners (the wash at y 821).
  tabBarCreamBackdrop: '#FDF6CC',
  // Forgot-password cards sampled from the PNG: a milky white veil over the
  // wash, with burgundy hairlines at 26% (Email) and 67% (Phone) strength,
  // plus the warm gray of the two-line descriptions.
  cardVeil: 'rgba(255, 255, 255, 0.47)',
  cardLineSoft: 'rgba(128, 9, 27, 0.26)',
  cardLineStrong: 'rgba(128, 9, 27, 0.67)',
  textWarmMuted: '#7B7E78',

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

/**
 * Dev-only body-text multiplier (1 = device setting only).
 * Change to 1.3 / 1.5 while previewing in Chrome, then leave at 1.
 */
export const DEV_FONT_SCALE = 1;

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
    // Diagonal wash measured on create-account.png: pure white until ~34% of
    // the top-right -> bottom-left axis, then a linear fade to periwinkle.
    colors: [colors.surface, colors.surface, colors.periwinkle],
    locations: [0, 0.34, 1],
    start: { x: 1, y: 0 },
    end: { x: 0.15, y: 1 },
  },
  onboarding: {
    colors: [colors.onboardingBlue, colors.onboardingBlue, colors.surface],
    locations: [0, 0.42, 1],
    start: { x: 0.1, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Pale mint page used by Login, Forgot Password and Home Loading.
  // Login wash measured from login.png: mint holds to ~12% of the height,
  // then eases to pure white by ~90% (the PNG also tilts the wash ~4px across
  // the width; a vertical multi-stop ramp is visually equivalent here).
  mintPage: {
    colors: [
      colors.mint,
      colors.mint,
      '#EDFADE',
      '#F2FBE8',
      '#F7FDEF',
      '#FBFEF5',
      '#FEFFFC',
      colors.surface,
    ],
    locations: [0, 0.12, 0.3, 0.44, 0.55, 0.66, 0.76, 0.9],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Taller mint wash used by Home Loading and Home Dashboard. The design holds
  // mint through the hero and grid (to ~46% of 917) and reaches white only below
  // the frame, so the bottom of the screen keeps a hint of green.
  mintWash: {
    colors: [
      colors.mint,
      colors.mint,
      '#EDF9DE',
      '#F1FAE6',
      '#F6FCEF',
      '#F9FDF5',
      '#FDFEFB',
      colors.surface,
    ],
    locations: [0, 0.46, 0.58, 0.68, 0.8, 0.87, 0.96, 1],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Warm cream page used by Profile and Account Settings.
  cream: {
    colors: [colors.butter, colors.butter, colors.surface],
    locations: [0, 0.42, 1],
    start: { x: 0.3, y: 0 },
    end: { x: 0.3, y: 1 },
  },
  // Profile / Account Settings wash sampled from profile.png and
  // account-settings.png: butter behind the header, white through the middle
  // of the card list, then butter again behind the cream tab bar.
  creamBand: {
    colors: ['#FCF5C4', '#FDF7CC', '#FDFAE2', '#FEFEFA', '#FEFDF9', '#FDF7D2', '#FDF6CC'],
    locations: [0, 0.12, 0.3, 0.47, 0.55, 0.86, 1],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
  // Blush page with a white centre glow, used by OTP verification.
  otp: {
    colors: [colors.blush, colors.surface, colors.blush],
    locations: [0, 0.42, 1],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
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
