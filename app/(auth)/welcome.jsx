import React from 'react';
import { View, Pressable, ScrollView, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useScale } from '../../src/lib/scale';
import { colors, radius, shadows, spacing, DEV_FONT_SCALE } from '../../src/theme/tokens';

/**
 * Welcome — proportions from design/screens/sign-up-selection.png (412x917):
 * photo fills the top ~66%, the burgundy panel starts at ~56% with 56px top
 * corners, content starts at ~63%. Decorations live in a clipped layer so the
 * panel can bleed without creating horizontal scrolling; text is never clipped.
 */
export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isShort } = useScale();
  const { fontScale } = useWindowDimensions();
  // When text grows (device setting or DEV preview) the copy starts right below
  // the panel edge and the block scrolls instead of running past the viewport.
  const bigText = Math.max(fontScale || 1, DEV_FONT_SCALE) > 1.2;
  const contentTop = isShort
    ? bigText
      ? '49.5%'
      : '55%'
    : bigText
      ? '56.6%'
      : '62.6%';

  return (
    <Screen
      variant="plain"
      padded={false}
      edges={[]}
      statusBarStyle="light-content"
      style={{ backgroundColor: colors.primary }}
    >
      <View className="flex-1">
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden"
        >
          <Image
            source={ASSETS.images.chickenRoastPolao}
            contentFit="cover"
            style={{ width: '100%', height: isShort ? '59%' : '66%' }}
          />

          {/* Burgundy panel: flat top edge with large rounded corners like the PNG. */}
          <View
            className="absolute bg-primary"
            style={{
              left: 0,
              width: '100%',
              top: isShort ? '48.5%' : '55.8%',
              height: '55%',
              borderTopLeftRadius: radius.xxl,
              borderTopRightRadius: radius.xxl,
            }}
          />

          <View
            className="absolute aspect-square rounded-full bg-surface"
            style={[{ left: 0, top: isShort ? '38%' : '45.5%', width: '27%' }, shadows.lg]}
          >
            <Image
              source={ASSETS.images.almonds}
              contentFit="cover"
              style={{ width: '100%', height: '100%', borderRadius: radius.full }}
            />
          </View>
        </View>

        <ScrollView
          className="absolute left-0 right-0"
          style={{ top: contentTop, bottom: 0 }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: spacing.lg,
            paddingBottom: Math.max(insets.bottom, 8),
          }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <AppText
            variant="body"
            className="text-center text-text-inverse"
            style={{ maxWidth: 320 }}
          >
            Yay, you made it!{'\n'}A huge welcome to our family ^_^{'\n'}Craving something?
          </AppText>

          <AppText
            variant="body"
            className="mt-lg text-center text-text-inverse"
            style={{ maxWidth: 340, marginTop: bigText ? spacing.sm : spacing.lg }}
          >
            Show us Whatcha Got, we'll do the math!
          </AppText>

          <Button
            title="Signup"
            variant="light"
            size="md"
            onPress={() => router.push('/(auth)/create-account')}
            className="mt-xl"
            style={{ minWidth: '30%', marginTop: bigText ? spacing.md : spacing.xl }}
            textStyle={{ color: colors.primary }}
          />

          <Pressable
            onPress={() => router.push('/(auth)/login')}
            accessibilityRole="link"
            accessibilityLabel="Already have an account? Login"
            className="mt-md min-h-[44px] items-center justify-center"
            style={{ marginTop: bigText ? spacing.sm : spacing.md }}
          >
            <AppText variant="body" className="text-center text-text-inverse">
              Already have an account?{' '}
              <AppText
                variant="body"
                className="font-sans-semibold text-text-inverse underline"
              >
                Login
              </AppText>
            </AppText>
          </Pressable>
        </ScrollView>
      </View>
    </Screen>
  );
}
