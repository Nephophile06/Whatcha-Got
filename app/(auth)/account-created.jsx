import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, AppText, Input, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useScale } from '../../src/lib/scale';
import { colors, spacing, DEV_FONT_SCALE } from '../../src/theme/tokens';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (error) {
  LottieView = null;
}

function BackdropRow({ icon, children }) {
  return (
    <View className="mb-lg flex-row items-center">
      <Image
        source={icon}
        contentFit="contain"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ width: 34, height: 34 }}
      />
      <View className="ml-md flex-1 pr-lg">{children}</View>
    </View>
  );
}

function SignupBackdrop() {
  return (
    <View
      className="flex-1 opacity-40"
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View className="flex-row items-start justify-between px-xl pt-md">
        <View className="mt-sm">
          <AppText variant="display" fontSize={34}>
            Hello!!
          </AppText>
          <Image
            source={ASSETS.illustrations.helloKaomoji}
            contentFit="contain"
            style={{ width: 112, height: 24, marginTop: 4 }}
          />
        </View>
        <Image
          source={ASSETS.illustrations.catChefWhisking}
          contentFit="contain"
          style={{ width: 78, height: 96 }}
        />
      </View>

      <AppText
        variant="body"
        className="mt-lg self-center px-lg text-center text-text-primary"
        style={{ maxWidth: 330 }}
      >
        {"It's no fun eating alone! We're whisking up something sweet... Sign up so we can taste test together!"}
      </AppText>

      <View className="mt-xl w-full self-center px-lg" style={{ maxWidth: 330 }}>
        <BackdropRow icon={ASSETS.illustrations.cuteBunny}>
          <Input
            compact
            placeholder="give yourself a unique username"
            value=""
            editable={false}
            inputStyle={{ fontSize: 12 }}
          />
        </BackdropRow>
        <BackdropRow icon={ASSETS.illustrations.thinkingCat}>
          <Input
            compact
            placeholder="password [minimum 5 char/letter]"
            value=""
            editable={false}
            inputStyle={{ fontSize: 12 }}
          />
        </BackdropRow>

        <View className="mt-md items-center">
          <View className="min-h-[48px] items-center justify-center rounded-md bg-primary px-lg">
            <AppText variant="button" className="text-text-inverse">
              Purr-fect!
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Account Created — the red ellipse starts at ~63% of the frame exactly as in
 * design/screens/account-created-successfully.png. The button now routes to the
 * home loading state before the dashboard.
 */
export default function AccountCreatedScreen() {
  const router = useRouter();
  const { isShort } = useScale();
  const { fontScale } = useWindowDimensions();
  // Larger text needs more of the frame: raise the success panel so the whole
  // message and button stay inside the viewport instead of being clipped.
  const bigText = Math.max(fontScale || 1, DEV_FONT_SCALE) > 1.2;
  const panelTop = bigText
    ? isShort
      ? '49%'
      : '58%'
    : isShort
      ? '58%'
      : '63%';

  return (
    <Screen
      variant="blue"
      padded={false}
      edges={['top']}
      contentContainerClassName="flex-grow"
      statusBarStyle="dark-content"
    >
      <SignupBackdrop />

      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden"
      >
        <View
          className="absolute rounded-full"
          style={{ top: panelTop, left: '-50%', width: '200%', aspectRatio: 1 }}
        >
          <LinearGradient
            colors={[colors.primaryGlow, colors.primary, colors.primaryDeep]}
            locations={[0, 0.22, 0.37]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      </View>

      <View
        className="absolute bottom-0 left-0 right-0 items-center px-lg"
        style={{ top: panelTop, paddingTop: bigText ? spacing.sm : spacing.md }}
      >
        {LottieView && ASSETS.animations.bunnyAndChicks ? (
          <View
            style={{ width: bigText ? 88 : 96, height: bigText ? 112 : 128 }}
            accessibilityElementsHidden
          >
            <LottieView
              source={ASSETS.animations.bunnyAndChicks}
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
              accessibilityLabel="White bunny with chicks"
            />
          </View>
        ) : null}

        <AppText
          variant="display"
          fontSize={20}
          className="mt-xs text-center text-text-inverse"
          style={{ marginTop: bigText ? 0 : spacing.xs }}
        >
          Whatcha Got? You! ✨
        </AppText>

        <AppText variant="body" className="text-center text-text-inverse">
          Your account is all set &amp; ready for some magic.
        </AppText>

        <Button
          title="take me home"
          variant="light"
          size="sm"
          onPress={() => router.replace('/home-loading')}
          className="mt-md"
          style={{ marginTop: bigText ? spacing.sm : spacing.md }}
        />
      </View>
    </Screen>
  );
}
