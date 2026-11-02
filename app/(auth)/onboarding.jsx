import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { useScale } from '../../src/lib/scale';
import { spacing, DEV_FONT_SCALE } from '../../src/theme/tokens';

/**
 * Onboarding — proportions derived from design/screens/onboarding.png (412x917):
 * the diagonal hero occupies the top ~44.5%, the title starts at ~49%, the body
 * block sits at ~56-65% and the CTA at ~75%. No hard line breaks: the body wraps
 * naturally so it can never be clipped.
 */
export default function OnboardingScreen() {
  const router = useRouter();
  const { width, height } = useScale();
  const { fontScale } = useWindowDimensions();
  const setHasCompletedOnboarding = useAuthStore((s) => s.setHasCompletedOnboarding);
  const bigText = Math.max(fontScale || 1, DEV_FONT_SCALE) > 1.2;

  const handleGetStarted = () => {
    setHasCompletedOnboarding(true);
    router.push('/(auth)/welcome');
  };

  return (
    <Screen
      variant="onboarding"
      scroll
      padded={false}
      contentContainerClassName="flex-grow"
      statusBarStyle="dark-content"
    >
      <View style={{ height: '44.5%', width: '100%' }}>
        <Image
          source={ASSETS.images.onboardingHero}
          contentFit="cover"
          accessibilityLabel="Wraps served on a wooden board"
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <View
        className="flex-1 items-center px-lg"
        style={{ paddingTop: Math.round(height * 0.045) }}
      >
        <AppText variant="display" fontSize={38} className="text-center">
          Whatcha Got?
        </AppText>

        <AppText
          variant="body"
          className="mt-md text-center text-text-primary"
          style={{ maxWidth: Math.min(width * 0.62, 265) }}
        >
          Helps you cook smarter using the ingredients you already have. Get quick
          recipes, smart suggestions, and healthy calorie plans.
        </AppText>

        <Button
          title="Get Started"
          size="md"
          onPress={handleGetStarted}
          style={{ marginTop: bigText ? spacing.lg : Math.round(height * 0.07) }}
        />
      </View>
    </Screen>
  );
}
