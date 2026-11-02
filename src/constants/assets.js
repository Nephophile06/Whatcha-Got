/**
 * Whatcha Got? - Central Asset Registry
 * Provides unified access to all static images, icons, illustrations, and animations.
 * Strictly adheres to the rule: All assets must be registered here.
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
    cravingsHeroBanner: require('../../assets/images/cravings-hero-banner.png'),
    loginBadge: require('../../assets/images/login-badge.png'),
    forgotPasswordBadge: require('../../assets/images/forgot-password-badge.png'),
    peeledBanana: require('../../assets/images/peeled-banana.png'),
    twoCherries: require('../../assets/images/two-cherries.png'),

    // Home Category Grid Icons
    categories: {
      smoothies: require('../../assets/images/category-smoothies.png'),
      dessert: require('../../assets/images/category-dessert.png'),
      salad: require('../../assets/images/category-salad.png'),
      pancake: require('../../assets/images/category-pancake.png'),
      burger: require('../../assets/images/category-burger.png'),
      friedRice: require('../../assets/images/category-fried-rice.png'),
      ramen: require('../../assets/images/category-ramen.png'),
      drinks: require('../../assets/images/category-drinks.png'),
      soup: require('../../assets/images/category-soup.png'),
      pasta: require('../../assets/images/category-pasta.png'),
      pudding: require('../../assets/images/category-pudding.png'),
      fries: require('../../assets/images/category-fries.png'),
    },
  },
  icons: {
    google: require('../../assets/icons/google-icon.png'),
    phone: require('../../assets/icons/phone-icon.png'),
    search: require('../../assets/icons/search.png'),
    bulletedList: require('../../assets/icons/bulleted-list.png'),
    customerProfile: require('../../assets/icons/customer-profile.png'),
    fidoHome: require('../../assets/icons/fido-home.png'),
    forwardArrow: require('../../assets/icons/forward-arrow.png'),
    chevronForward: require('../../assets/icons/chevron-forward.png'),
    targetGoal: require('../../assets/icons/target-goal.png'),
    calorieCalculator: require('../../assets/icons/calorie-calculator.png'),
    heartFavorites: require('../../assets/icons/heart-favorites.png'),
    recipeChefHat: require('../../assets/icons/recipe-chef-hat.png'),
    language: require('../../assets/icons/language.png'),
    logout: require('../../assets/icons/logout.png'),
    nightMode: require('../../assets/icons/night-mode.png'),
    editPencil: require('../../assets/icons/edit-pencil.png'),
    settingsSlider: require('../../assets/icons/settings-slider.png'),
    termsAndConditions: require('../../assets/icons/terms-and-conditions.png'),
    undoBack: require('../../assets/icons/undo-back.png'),
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
    loginChefCat: require('../../assets/illustrations/login-chef-cat.png'),
    imposterDetective: require('../../assets/illustrations/imposter-detective.png'),
    catPawPrints: require('../../assets/illustrations/cat-paw-prints.png'),
    userAvatar: require('../../assets/illustrations/user-avatar.png'),
  },
  animations: {
    bunnyAndChicks: require('../../assets/illustrations/bunny-and-chicks-animation.json'),
  },
};

export default ASSETS;
