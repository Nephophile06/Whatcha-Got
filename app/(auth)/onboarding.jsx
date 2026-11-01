import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';

export default function OnboardingScreen() {
  const router = useRouter();
  const setHasCompletedOnboarding = useAuthStore((s) => s.setHasCompletedOnboarding);

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
      <Image
        source={ASSETS.images.onboardingHero}
        contentFit="cover"
        accessibilityLabel="Wraps served on a wooden board"
        style={{ width: '100%', aspectRatio: 1236 / 1181 }}
      />

      <View className="items-center px-lg pt-xxl">
        <Text className="mt-md text-center font-display text-display text-text-primary">
          Whatcha Got?
        </Text>

        <Text className="mt-xxl text-center font-sans text-lg leading-6 text-text-primary">
          {'Helps you cook smarter using the\n'}
          {'ingredients you already have. Get quick\n'}
          {'recipes, smart suggestions, and healthy\n'}
          {'calorie plans.'}
        </Text>

        <Button
          title="Get Started"
          size="md"
          onPress={handleGetStarted}
          className="mt-xxl"
        />
      </View>
    </Screen>
  );
}
