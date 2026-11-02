import React, { useState } from 'react';
import { View, Pressable, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Screen, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, shadows, spacing, DEV_FONT_SCALE } from '../../src/theme/tokens';
import { useScale } from '../../src/lib/scale';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (error) {
  LottieView = null;
}

function MethodCard({ selected, disabled, title, description, icon, onPress, badge }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={`${title}. ${description}`}
      className="w-full flex-row items-center rounded-md border-[1.5px] px-md py-sm"
      style={[
        shadows.sm,
        {
          minHeight: 84,
          borderColor: selected ? colors.primary : colors.rose,
          backgroundColor: selected ? colors.primaryBlush : colors.surface,
          opacity: disabled ? 0.55 : 1,
        },
      ]}
    >
      <View className="mr-md w-10 items-center justify-center">{icon}</View>

      <View className="flex-1">
        <View className="flex-row flex-wrap items-center">
          <AppText variant="title" fontSize={16}>
            {title}
          </AppText>
          {badge ? (
            <View className="ml-sm rounded-full bg-surface-subtle px-sm py-xs">
              <AppText variant="caption" className="text-text-muted">
                {badge}
              </AppText>
            </View>
          ) : null}
        </View>
        <AppText variant="caption" fontSize={13} className="mt-xs text-text-secondary">
          {description}
        </AppText>
      </View>

      {selected ? (
        <View className="ml-sm h-6 w-6 items-center justify-center rounded-full bg-primary">
          <Ionicons name="checkmark" size={14} color={colors.textInverse} />
        </View>
      ) : null}
    </Pressable>
  );
}

/**
 * Forgot Password — proportions from design/screens/forgot-password.png.
 * "Send to Email" is selectable; "Send to Phone" stays visible but disabled
 * until a phone provider exists.
 */
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { width, height } = useScale();
  const { fontScale } = useWindowDimensions();
  const bigText = Math.max(fontScale || 1, DEV_FONT_SCALE) > 1.2;
  const [method, setMethod] = useState('email');

  return (
    <Screen
      variant="mintPage"
      scroll
      padded={false}
      contentContainerClassName="flex-grow"
      statusBarStyle="dark-content"
    >
      <View className="relative flex-1">
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="absolute rounded-full bg-rose"
          style={{ left: '-12%', top: '66%', width: '120%', aspectRatio: 1, opacity: 0.5 }}
        />

        <Image
          source={ASSETS.images.forgotPasswordBadge}
          contentFit="contain"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="absolute"
          style={{
            position: 'absolute',
            left: '-4%',
            top: '1%',
            width: '33%',
            aspectRatio: 142 / 163,
          }}
        />

        <View
          className="px-xl"
          style={{ paddingTop: width * (bigText ? 0.13 : 0.19) }}
        >
          <View style={{ paddingLeft: '35%' }}>
            <AppText variant="display" fontSize={26}>
              Need a little help
            </AppText>
            <AppText variant="display" fontSize={26}>
              Getting Back?
            </AppText>

            <AppText variant="body" fontSize={16} className="mt-md text-text-primary">
              It happens to all of us! Don't worry we'll send a magic ^_^
            </AppText>
          </View>

          <AppText variant="body" fontSize={17} className="mt-xl text-text-primary">
            Choose where you'd like to receive:
          </AppText>

          <View style={{ marginTop: spacing.md, rowGap: bigText ? spacing.md : spacing.lg }}>
            <MethodCard
              selected={method === 'email'}
              title="Send to Email"
              description="Send a 6-digit magic OTP to your registered email."
              onPress={() => setMethod('email')}
              icon={<Ionicons name="mail-outline" size={38} color={colors.primaryLight} />}
            />

            <MethodCard
              selected={false}
              disabled
              badge="Coming soon"
              title="Send to Phone"
              description="Send a quick SMS OTP right to your phone number."
              onPress={() => {}}
              icon={<Ionicons name="call" size={36} color={colors.info} />}
            />
          </View>

          <View
            className="items-start"
            style={{ marginTop: bigText ? spacing.md : Math.round(height * 0.045) }}
          >
            <Button
              title="check"
              size="md"
              onPress={() => router.push('/(auth)/otp')}
              style={{ alignSelf: 'flex-start' }}
            />
          </View>

          <View
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ height: width * 0.58 }}
          />
        </View>

        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className="absolute items-center"
          style={{ bottom: '8%', right: '2%', width: '56%', aspectRatio: 1 }}
        >
          {LottieView && ASSETS.animations.bunnyAndChicks ? (
            <LottieView
              source={ASSETS.animations.bunnyAndChicks}
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
            />
          ) : null}
        </View>
      </View>
    </Screen>
  );
}
