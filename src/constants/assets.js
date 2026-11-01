/**
 * Whatcha Got? - Central Asset Registry
 * Provides unified access to all static images, icons, and illustrations.
 */

export const ASSETS = {
  images: {
    logo: require('../../assets/images/icon.png'),
    splash: require('../../assets/images/splash-icon.png'),
    favicon: require('../../assets/images/favicon.png'),
    emptyPlate: null, // Placeholder or remote fallback
    chefAvatar: null,
  },
  illustrations: {
    onboarding1: null,
    onboarding2: null,
    onboarding3: null,
    emptySearch: null,
    offline: null,
  },
  icons: {
    // Registered custom icon mappings or glyph identifiers
  },
};

export default ASSETS;

