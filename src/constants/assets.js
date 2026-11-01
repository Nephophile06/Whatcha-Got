/**
 * Whatcha Got? - Central Asset Registry
 * Provides unified access to all static images, icons, illustrations, and animations.
 */

export const ASSETS = {
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
  illustrations: {
    catChefWhisking: require('../../assets/illustrations/cat-chef-whisking.png'),
    cuteBunny: require('../../assets/illustrations/cute-bunny.png'),
    thinkingCat: require('../../assets/illustrations/thinking-cat.png'),
    cookieDoughBowl: require('../../assets/illustrations/cookie-dough-bowl.png'),
  },
  animations: {
    bunnyAndChicks: require('../../assets/illustrations/bunny-and-chicks-animation.json'),
  },
};

export default ASSETS;
