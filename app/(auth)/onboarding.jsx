import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/onboarding';

/**
 * Onboarding — vertical bands from the 412 x 917 PNG:
 * hero 0-405, title 462, body 552, CTA 708. The title is a single line with
 * adjustsFontSizeToFit so "Whatcha Got?" can never lose its second word.
 */
export default function OnboardingScreen() {
  const router = useRouter();
  const stage = useStage();
  const { W, H, fx, fy, s } = stage;
  const setHasCompletedOnboarding = useAuthStore((s) => s.setHasCompletedOnboarding);

  const handleGetStarted = () => {
    setHasCompletedOnboarding(true);
    router.push('/(auth)/welcome');
  };

  return (
    <Screen
      variant="onboarding"
      padded={false}
      edges={[]}
      statusBarStyle="dark-content"
    >
      <Stage>
        <View style={{ width: W, minHeight: H }}>
          <View style={{ width: '100%', height: fy(L.hero.h), overflow: 'hidden' }}>
            <Image
              source={ASSETS.images.onboardingHero}
              contentFit="cover"
              accessibilityLabel="Wraps served on a wooden board"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <View
            style={{
              marginTop: fy(L.title.y - L.hero.h),
              paddingHorizontal: fx(L.title.x),
            }}
          >
            <AppText
              variant="display"
              fontSize={L.title.size}
              numberOfLines={L.title.lines}
              adjustsFontSizeToFit
              minimumFontScale={L.title.minScale ?? 0.85}
              className="text-center"
            >
              Whatcha Got?
            </AppText>
          </View>

          <View
            style={{
              marginTop: fy(L.body.y - (L.title.y + L.title.h)),
              marginHorizontal: fx(L.body.x),
            }}
          >
            <AppText
              variant="body"
              fontSize={L.body.size}
              className="text-center text-text-primary"
            >
              Helps you cook smarter using the ingredients you already have. Get quick
              recipes, smart suggestions, and healthy calorie plans.
            </AppText>
          </View>

          <View style={{ marginTop: fy(L.cta.y - (L.body.y + L.body.h)) }}>
            <Button
              title="Get Started"
              size="md"
              onPress={handleGetStarted}
              style={{
                alignSelf: 'center',
                minWidth: s(L.cta.w),
                minHeight: s(L.cta.h),
              }}
            />
          </View>

          <View style={{ flexGrow: 1, minHeight: s(8) }} />
        </View>
      </Stage>
    </Screen>
  );
}
