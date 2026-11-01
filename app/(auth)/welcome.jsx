import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, radius, shadows, spacing } from '../../src/theme/tokens';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Screen
      variant="plain"
      padded={false}
      edges={['top']}
      statusBarStyle="light-content"
      style={{ backgroundColor: colors.primary }}
    >
      <View className="flex-1">
        <Image
          source={ASSETS.images.chickenRoastPolao}
          contentFit="cover"
          accessibilityLabel="Chicken roast with rice and salad"
          style={{ width: '100%', aspectRatio: 1236 / 1770 }}
        />

        <View
          className="absolute bottom-0 left-0 right-0 min-h-[42.5%] rounded-t-xxl bg-primary px-lg pt-xxl"
          style={{ paddingBottom: Math.max(insets.bottom, spacing.lg) }}
        >
          <View
            className="absolute left-0 -top-[86px] w-[28%] aspect-square rounded-full bg-surface"
            style={shadows.lg}
          >
            <Image
              source={ASSETS.images.almonds}
              contentFit="cover"
              accessibilityLabel="Almonds"
              style={{ width: '100%', height: '100%', borderRadius: radius.full }}
            />
          </View>

          <View className="items-center">
            <Text className="mt-sm text-center font-sans text-lg leading-6 text-text-inverse">
              {'Yay, you made it!\n'}
              {'A huge welcome to our family ^_^\n'}
              {'Craving something?'}
            </Text>

            <Text className="mt-md text-center font-sans text-lg leading-6 text-text-inverse">
              {"Show us Whatcha Got, we'll do the math!"}
            </Text>

            <Button
              title="Signup"
              variant="light"
              size="md"
              onPress={() => router.push('/(auth)/create-account')}
              className="mt-xl w-[120px]"
              textStyle={{ color: colors.primary }}
            />

            <Pressable
              onPress={() => router.push('/(auth)/login')}
              accessibilityRole="link"
              accessibilityLabel="Already have an account? Login"
              className="mt-md min-h-[44px] items-center justify-center"
            >
              <Text className="text-center font-sans text-lg text-text-inverse">
                Already have an account?{' '}
                <Text className="font-sans-semibold underline">Login</Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}
