import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen } from '../src/components/ui';
import { ASSETS } from '../src/constants/assets';
import { useScale } from '../src/lib/scale';

/**
 * Home Loading — shown for ~1.2s after login / account creation / OTP success.
 * The PNG has no tab bar, so this route lives outside app/(tabs).
 */
export default function HomeLoadingScreen() {
  const router = useRouter();
  const { width, height } = useScale();

  useEffect(() => {
    const timeout = setTimeout(() => router.replace('/home-dashboard'), 1200);
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <Screen variant="mintPage" padded={false} statusBarStyle="dark-content">
      <View
        className="flex-1 items-center justify-center"
        style={{ paddingBottom: Math.round(height * 0.1) }}
        accessibilityRole="progressbar"
        accessibilityLabel="Loading your kitchen"
      >
        <Image
          source={ASSETS.images.loginBadge}
          contentFit="contain"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ width: Math.min(width * 0.55, 225), aspectRatio: 1 }}
        />
      </View>
    </Screen>
  );
}
