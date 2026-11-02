/**
 * Design frames for the dev overlay (EXPO_PUBLIC_DESIGN_OVERLAY=1).
 * Each entry is the matching Figma PNG for a route, drawn full-screen at 40%
 * opacity so the running UI can be compared with the 412 x 917 reference.
 */
export const DESIGN_FRAMES = {
  '/onboarding': require('../../design/screens/onboarding.png'),
  '/welcome': require('../../design/screens/sign-up-selection.png'),
  '/create-account': require('../../design/screens/create-account.png'),
  '/account-created': require('../../design/screens/account-created-successfully.png'),
  '/login': require('../../design/screens/login.png'),
  '/forgot-password': require('../../design/screens/forgot-password.png'),
  '/otp': require('../../design/screens/otp-verification.png'),
  '/otp?state=error': require('../../design/screens/otp-error-state.png'),
  '/home-loading': require('../../design/screens/home-loading-state.png'),
  '/home-dashboard': require('../../design/screens/home-dashboard.png'),
  '/profile': require('../../design/screens/profile.png'),
  '/account-settings': require('../../design/screens/account-settings.png'),
};

export function getDesignFrame(pathname, state) {
  if (pathname === '/otp' && state === 'error') return DESIGN_FRAMES['/otp?state=error'];
  return DESIGN_FRAMES[pathname] || null;
}

export default DESIGN_FRAMES;
