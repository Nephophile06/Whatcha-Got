import React from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Input, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (error) {
  LottieView = null;
}

function BackdropRow({ icon, children }) {
  return (
    <View className="mb-lg flex-row items-center">
      <Image source={icon} contentFit="contain" style={{ width: 34, height: 34 }} />
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
      <View className="flex-row items-start justify-between px-xxl pt-xl">
        <View className="mt-md pl-lg">
          <Text className="font-display text-hero text-text-primary">Hello!!</Text>
          <Image
            source={ASSETS.illustrations.helloKaomoji}
            contentFit="contain"
            style={{ width: 118, height: 25, marginTop: 4 }}
          />
        </View>
        <Image
          source={ASSETS.illustrations.catChefWhisking}
          contentFit="contain"
          style={{ width: 84, height: 108 }}
        />
      </View>

      <Text className="mt-xxl px-lg text-center font-sans text-lg leading-6 text-text-primary">
        {"It's no fun eating alone!\n"}
        {"We're whisking up something sweet...\n"}
        {'Sign up so we can taste test together!'}
      </Text>

      <View className="mt-xl pl-xxl pr-xxl">
        <BackdropRow icon={ASSETS.illustrations.cuteBunny}>
          <Input compact placeholder="give yourself a unique username" value="" editable={false} />
        </BackdropRow>
        <BackdropRow icon={ASSETS.illustrations.thinkingCat}>
          <Input compact placeholder="password [minimum 5 char/letter]" value="" editable={false} />
        </BackdropRow>

        <View className="mt-md items-center">
          <View className="min-h-[48px] items-center justify-center rounded-md bg-primary px-lg">
            <Text className="font-sans-medium text-md text-text-inverse">Purr-fect!</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function AccountCreatedScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const compact = height < 700;

  const bunnySize = compact ? { width: 74, height: 98 } : { width: 96, height: 128 };

  return (
    <Screen
      variant="blue"
      padded={false}
      edges={['top']}
      contentContainerClassName="overflow-hidden"
      statusBarStyle="dark-content"
    >
      <SignupBackdrop />

      <View
        pointerEvents="none"
        className="absolute overflow-hidden rounded-full"
        style={{ top: '63%', left: '-50%', width: '200%', aspectRatio: 1 }}
      >
        <LinearGradient
          colors={[colors.primaryGlow, colors.primary, colors.primaryDeep]}
          locations={[0, 0.22, 0.37]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <View
        pointerEvents="box-none"
        className="absolute bottom-0 left-0 right-0 items-center px-lg pt-xs"
        style={{ top: '63%' }}
      >
        {LottieView && ASSETS.animations.bunnyAndChicks ? (
          <View style={bunnySize}>
            <LottieView
              source={ASSETS.animations.bunnyAndChicks}
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
              accessibilityLabel="White bunny with chicks"
            />
          </View>
        ) : null}

        <Text className="mt-xs text-center font-display text-lg text-text-inverse">
          Whatcha Got? You! ✨
        </Text>

        <Text className="text-center font-sans text-md text-text-inverse">
          Your account is all set &amp; ready for some magic.
        </Text>

        <Button
          title="take me home"
          variant="light"
          size="sm"
          onPress={() => router.replace('/(tabs)/home')}
          className="mt-md"
        />
      </View>
    </Screen>
  );
}
