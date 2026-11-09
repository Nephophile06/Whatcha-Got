import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useStage, clamp } from '../../src/lib/stage';
import { colors, radius, shadows, spacing } from '../../src/theme/tokens';
import L from '../../src/layouts/welcome';

/**
 * Welcome / Sign-up selection screen.
 * Responsive design:
 * - Photo extends behind the panel to avoid gaps on any aspect ratio.
 * - Panel position scales with fy(L.panel.y) maintaining exact 56% height ratio.
 * - Almond bowl is anchored to the panel top, moving dynamically with it.
 * - Text and buttons scale with stage factors while keeping flexible gaps.
 */
export default function WelcomeScreen() {
  const router = useRouter();
  const { W, H, fy, fx, s, u, offsetX } = useStage();

  const background = (
    <>
      <Image
        source={ASSETS.images.chickenRoastPolao}
        contentFit="cover"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: fy(L.panel.y) + s(16),
        }}
      />

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: fy(L.panel.y),
          bottom: 0,
          backgroundColor: colors.primary,
          borderTopLeftRadius: s(L.panel.radius),
          borderTopRightRadius: s(L.panel.radius),
        }}
      />

      <View
        style={[
          {
            position: 'absolute',
            left: offsetX + fx(L.almonds.x),
            top: fy(L.panel.y) + s(L.almonds.offsetFromPanelTop),
            width: s(L.almonds.w),
            height: s(L.almonds.h),
            borderRadius: radius.full,
            overflow: 'hidden',
          },
          shadows.lg,
        ]}
      >
        <Image
          source={ASSETS.images.almonds}
          contentFit="cover"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    </>
  );

  return (
    <Screen
      variant="plain"
      padded={false}
      edges={[]}
      statusBarStyle="light-content"
      style={{ backgroundColor: colors.primary }}
    >
      <Stage background={background}>
        <View style={{ width: W, minHeight: H, paddingTop: fy(L.copy.y) }}>
          <View style={{ marginHorizontal: fx(L.copy.x) }}>
            <AppText
              variant="body"
              fontSize={L.copy.size}
              className="text-center font-sans-semibold text-text-inverse"
              style={{ lineHeight: s(L.copy.lineHeight) }}
            >
              Yay, you made it!{'\n'}A huge welcome to our family ^_^{'\n'}
              Craving something?
            </AppText>
          </View>

          <View
            style={{
              marginTop: fy(18),
              marginHorizontal: fx(L.tagline.x),
            }}
          >
            <AppText
              variant="body"
              fontSize={L.tagline.size}
              className="text-center font-sans-semibold text-text-inverse"
              style={{ lineHeight: s(L.tagline.lineHeight) }}
            >
              Show us{' '}
              <AppText
                variant="display"
                fontSize={L.tagline.size + 2}
                className="font-display text-text-inverse"
                style={{ lineHeight: s(L.tagline.lineHeight) }}
              >
                Whatcha Got,
              </AppText>
              {' '}we'll do the math!
            </AppText>
          </View>

          <View
            style={{
              marginTop: fy(38),
              alignItems: 'center',
            }}
          >
            <Button
              title="Signup"
              variant="light"
              size="md"
              onPress={() => router.push('/(auth)/create-account')}
              style={{
                minWidth: s(L.button.w),
                minHeight: s(L.button.h),
                paddingHorizontal: s(28),
              }}
              textStyle={{
                color: colors.primary,
                fontSize: L.button.size * clamp(u, 0.85, 1.2),
                fontFamily: 'Assistant-SemiBold',
              }}
            />
          </View>

          <Pressable
            onPress={() => router.push('/(auth)/login')}
            accessibilityRole="link"
            accessibilityLabel="Already have an account? Login"
            style={{
              marginTop: fy(16),
              marginHorizontal: fx(L.login.x),
              minHeight: Math.max(s(L.login.h), 44),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText
              variant="body"
              fontSize={L.login.size}
              className="text-center font-sans-semibold text-text-inverse"
              style={{ lineHeight: s(L.login.lineHeight) }}
            >
              Already have an account?{' '}
              <AppText
                variant="body"
                fontSize={L.login.size}
                className="font-sans-semibold text-text-inverse underline"
                style={{ lineHeight: s(L.login.lineHeight) }}
              >
                Login
              </AppText>
            </AppText>
          </Pressable>

          <View style={{ flexGrow: 1, minHeight: spacing.sm }} />
        </View>
      </Stage>
    </Screen>
  );
}
