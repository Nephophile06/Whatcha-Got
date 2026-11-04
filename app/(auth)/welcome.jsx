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
 * Welcome — the photo fills the top 605px, the burgundy panel starts at 514px
 * and the content follows the PNG bands (copy 576, tagline 661, Signup 734,
 * Login 804). Art layers are full-bleed; text sits in the capped stage column.
 */
export default function WelcomeScreen() {
  const router = useRouter();
  const { W, H, fy, fx, s, u, offsetX } = useStage();

  const background = (
    <>
      <Image
        source={ASSETS.images.chickenRoastPolao}
        contentFit="cover"
        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: s(L.photo.imgH) }}
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
            top: fy(L.almonds.y),
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
          style={{
            position: 'absolute',
            left: s(L.almonds.imgX),
            top: s(L.almonds.imgY),
            width: s(L.almonds.imgW),
            height: s(L.almonds.imgH),
          }}
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
              className="text-center text-text-inverse"
              style={{ lineHeight: s(L.copy.lineHeight) }}
            >
              Yay, you made it!{'\n'}A huge welcome to our family ^_^{'\n'}
              Craving something?
            </AppText>
          </View>

          <View
            style={{
              marginTop: fy(L.tagline.y - (L.copy.y + L.copy.h)),
              marginHorizontal: fx(L.tagline.x),
            }}
          >
            <AppText
              variant="body"
              fontSize={L.tagline.size}
              className="text-center text-text-inverse"
              style={{ lineHeight: s(L.tagline.lineHeight) }}
            >
              Show us Whatcha Got, we'll do the math!
            </AppText>
          </View>

          <View
            style={{
              marginTop: fy(L.button.y - (L.tagline.y + L.tagline.h)),
            }}
          >
            <Button
              title="Signup"
              variant="light"
              size="md"
              onPress={() => router.push('/(auth)/create-account')}
              style={{
                alignSelf: 'flex-start',
                marginLeft: fx(L.button.x),
                minWidth: s(L.button.w),
                minHeight: s(L.button.h),
              }}
              textStyle={{
                color: colors.primary,
                fontSize: L.button.size * clamp(u, 0.85, 1.2),
              }}
            />
          </View>

          <Pressable
            onPress={() => router.push('/(auth)/login')}
            accessibilityRole="link"
            accessibilityLabel="Already have an account? Login"
            style={{
              marginTop: fy(L.login.y - (L.button.y + L.button.h)),
              marginLeft: fx(L.login.x),
              marginRight: fx(L.frame.w - L.login.x - L.login.w),
              minHeight: Math.max(s(L.login.h), 44),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText
              variant="body"
              fontSize={L.login.size}
              className="text-center text-text-inverse"
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
