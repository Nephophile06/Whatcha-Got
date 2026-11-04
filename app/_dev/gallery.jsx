/**
 * DEV ONLY — design gallery.
 *
 * Renders any designed screen (and its available states) from query params,
 * without navigating between routes, so the fidelity script and a browser can
 * capture the exact 412 x 917 frame.
 *
 *   /_dev/gallery?screen=otp&state=error
 *   /_dev/gallery?screen=home-dashboard&state=toast
 *   /_dev/gallery?screen=profile&state=toast
 *   /_dev/gallery?screen=account-settings
 *
 * Supported states:
 * - otp: `error` (the screen reads `state` from the same params)
 * - home-loading: frozen automatically because `screen` is present
 * - home-dashboard: `toast` overlay, `selected` (mock cravings selection)
 * - profile / account-settings: `toast` overlay
 * Tab screens get the controlled TabBar because the tab navigator is not used.
 * This folder is not part of the production UI.
 */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TabBar, Toast } from '../../src/components/ui';
import { usePreferencesStore } from '../../src/store/preferencesStore';
import { useAuthStore } from '../../src/store/authStore';
import OnboardingScreen from '../(auth)/onboarding';
import WelcomeScreen from '../(auth)/welcome';
import CreateAccountScreen from '../(auth)/create-account';
import AccountCreatedScreen from '../(auth)/account-created';
import LoginScreen from '../(auth)/login';
import ForgotPasswordScreen from '../(auth)/forgot-password';
import OtpScreen from '../(auth)/otp';
import HomeLoadingScreen from '../home-loading';
import HomeDashboardScreen from '../home-dashboard';
import ProfileScreen from '../(tabs)/profile';
import AccountSettingsScreen from '../(tabs)/account-settings';

const SCREENS = {
  onboarding: OnboardingScreen,
  welcome: WelcomeScreen,
  'create-account': CreateAccountScreen,
  'account-created': AccountCreatedScreen,
  login: LoginScreen,
  'forgot-password': ForgotPasswordScreen,
  otp: OtpScreen,
  'home-loading': HomeLoadingScreen,
  'home-dashboard': HomeDashboardScreen,
  profile: ProfileScreen,
  'account-settings': AccountSettingsScreen,
};

const TABBED = new Set(['profile', 'account-settings']);

export default function GalleryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const screen = params.screen || 'onboarding';
  const state = params.state || '';
  const Component = SCREENS[screen];

  useEffect(() => {
    useAuthStore.setState({
      user: { username: 'Nondiní', email: 'nondini@example.com', phone: '01xxxxxxxxx' },
    });
  }, []);

  useEffect(() => {
    if (screen !== 'home-dashboard') return;
    usePreferencesStore.setState({
      selectedCategories: state === 'selected' ? ['ramen', 'soup'] : [],
    });
  }, [screen, state]);

  useEffect(() => {
    if (!Component) router.replace('/_dev/ui-kit');
  }, [Component, router]);

  if (!Component) return null;

  const showToast = state === 'toast';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Component />
      </View>

      {TABBED.has(screen) ? (
        <TabBar activeKey="profile" cream bottomInset={0} />
      ) : null}

      {showToast ? (
        <View className="absolute left-md right-md top-xxl" pointerEvents="none">
          <Toast
            type="info"
            message={
              screen === 'profile' || screen === 'account-settings'
                ? 'Coming soon'
                : 'Suggestions coming soon'
            }
          />
        </View>
      ) : null}
    </View>
  );
}
