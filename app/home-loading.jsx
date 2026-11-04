import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage } from '../src/components/ui';
import { ASSETS } from '../src/constants/assets';
import { useStage } from '../src/lib/stage';
import L from '../src/layouts/home-loading';

/**
 * Home Loading — shown for ~1.2s after login / account creation / OTP success.
 * The PNG has no tab bar, so this route lives outside app/(tabs).
 */
export default function HomeLoadingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { W, H, fx, fy, s } = useStage();

  // `?freeze=1` keeps the screen still for the dev fidelity capture.
  useEffect(() => {
    if (params.freeze === '1') return undefined;
    const timeout = setTimeout(() => router.replace('/home-dashboard'), 1200);
    return () => clearTimeout(timeout);
  }, [router, params.freeze]);

  return (
    <Screen variant="mintWash" padded={false} edges={[]} statusBarStyle="dark-content">
      <Stage>
        <View
          style={{ width: W, minHeight: H }}
          accessibilityRole="progressbar"
          accessibilityLabel="Loading your kitchen"
        >
          <Image
            source={ASSETS.images.loginBadge}
            contentFit="contain"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              marginTop: fy(L.cup.y),
              marginLeft: fx(L.cup.x),
              width: s(L.cup.w),
              height: s(L.cup.h),
            }}
          />
        </View>
      </Stage>
    </Screen>
  );
}
