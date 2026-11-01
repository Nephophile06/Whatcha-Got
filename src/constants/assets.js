/**
 * Whatcha Got? - Central Asset Registry
 * Provides unified access to all static images, icons, illustrations, and animations.
 */

export const ASSETS = {
  fonts: {
    'Assistant-Regular': require('../../assets/fonts/Assistant-Regular.ttf'),
    'Assistant-Medium': require('../../assets/fonts/Assistant-Medium.ttf'),
    'Assistant-SemiBold': require('../../assets/fonts/Assistant-SemiBold.ttf'),
    'Fondamento-Regular': require('../../assets/fonts/Fondamento-Regular.ttf'),
  },
  images: {
    logo: require('../../assets/icon.png'),
    splash: require('../../assets/splash-icon.png'),
    favicon: require('../../assets/favicon.png'),
    onboardingHero: require('../../assets/images/onboarding-hero.png'),
    chickenRoastPolao: require('../../assets/images/chicken-roast-polao.png'),
    almonds: require('../../assets/images/almonds.png'),
  },
  icons: {
    google: require('../../assets/icons/google-icon.png'),
    phone: require('../../assets/icons/phone-icon.png'),
  },
  // Ionicons glyph names used by the bottom TabBar.
  tabIcons: {
    home: { active: 'home', inactive: 'home-outline' },
    calorie: { active: 'flame', inactive: 'flame-outline' },
    list: { active: 'basket', inactive: 'basket-outline' },
    favorites: { active: 'heart', inactive: 'heart-outline' },
    profile: { active: 'person', inactive: 'person-outline' },
  },
  illustrations: {
    catChefWhisking: require('../../assets/illustrations/cat-chef-whisking.png'),
    cuteBunny: require('../../assets/illustrations/cute-bunny.png'),
    thinkingCat: require('../../assets/illustrations/thinking-cat.png'),
    cookieDoughBowl: require('../../assets/illustrations/cookie-dough-bowl.png'),
    helloKaomoji: require('../../assets/illustrations/hello-kaomoji.png'),
  },
  animations: {
    bunnyAndChicks: require('../../assets/illustrations/bunny-and-chicks-animation.json'),
  },
};

export default ASSETS;
