import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Stage, AppText, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, shadows } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/forgot-password';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (error) {
  LottieView = null;
}

function MethodCard({ selected, disabled, title, description, icon, onPress, badge }) {
  const { s } = useStage();

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
          minHeight: s(90),
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
 * Forgot Password — bands from design/screens/forgot-password.png (title 97,
 * copy 162, prompt 245, cards 281 / 394, check 540, bunny 664).
 * "Send to Email" is selectable; "Send to Phone" stays visible but disabled
 * until a phone provider exists.
 */
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { W, H, fx, fy, s, offsetX } = useStage();
  const [method, setMethod] = useState('email');

  // Decorative blob lives in the clipped background layer: it must never add
  // scroll height or overflow the canvas.
  const background = (
    <View
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className="absolute rounded-full bg-rose"
      style={{
        left: offsetX + fx(L.roseBlob.x),
        top: fy(L.roseBlob.y),
        width: s(L.roseBlob.w),
        height: s(L.roseBlob.h),
        opacity: 0.5,
      }}
    />
  );

  return (
    <Screen
      variant="mintPage"
      padded={false}
      edges={[]}
      statusBarStyle="dark-content"
    >
      <Stage background={background}>
        <View style={{ width: W, minHeight: H }}>
          <Image
            source={ASSETS.images.forgotPasswordBadge}
            contentFit="contain"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              left: fx(L.broccoli.x),
              top: fy(L.broccoli.y),
              width: s(L.broccoli.w),
              height: s(L.broccoli.h),
            }}
          />

          <View
            style={{
              paddingTop: fy(L.title.y),
              paddingLeft: fx(L.title.x),
              width: fx(L.title.x + L.title.w),
            }}
          >
            <AppText
              variant="display"
              fontSize={L.title.size}
              numberOfLines={L.title.lines}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              style={{ lineHeight: s(24) }}
            >
              {"Need a little help\nGetting Back?"}
            </AppText>

            <AppText
              variant="body"
              fontSize={L.copy.size}
              className="text-text-primary"
              style={{
                marginTop: fy(L.copy.y - (L.title.y + L.title.h)),
                width: fx(L.copy.w),
              }}
            >
              {"It happens to all of us!\nDon't worry we'll send a magic ^_^"}
            </AppText>
          </View>

          <AppText
            variant="body"
            fontSize={L.choose.size}
            className="text-text-primary"
            style={{
              marginTop: fy(L.choose.y - (L.copy.y + L.copy.h)),
              marginLeft: fx(L.choose.x),
              width: fx(L.choose.w),
            }}
          >
            Choose where you'd like to receive:
          </AppText>

          <View
            style={{
              marginTop: fy(L.emailCard.y - (L.choose.y + L.choose.h)),
              marginLeft: fx(L.emailCard.x),
              width: fx(L.emailCard.w),
              rowGap: s(L.phoneCard.y - (L.emailCard.y + L.emailCard.h)),
            }}
          >
            <MethodCard
              selected={method === 'email'}
              title="Send to Email"
              description="Send a 6-digit magic OTP to your registered email."
              onPress={() => setMethod('email')}
              icon={<Ionicons name="mail-outline" size={s(38)} color={colors.primaryLight} />}
            />

            <MethodCard
              selected={false}
              disabled
              badge="Coming soon"
              title="Send to Phone"
              description="Send a quick SMS OTP right to your phone number."
              onPress={() => {}}
              icon={<Ionicons name="call" size={s(36)} color={colors.info} />}
            />
          </View>

          <Button
            title="check"
            size="md"
            onPress={() => router.push('/(auth)/otp')}
            style={{
              alignSelf: 'flex-start',
              marginTop: fy(L.check.y - (L.phoneCard.y + L.phoneCard.h)),
              marginLeft: fx(L.check.x),
              minWidth: s(L.check.w),
              minHeight: Math.max(s(L.check.h), 44),
            }}
          />

          <View
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              marginTop: fy(L.bunny.y - (L.check.y + L.check.h)),
              marginLeft: fx(L.bunny.x),
              width: s(L.bunny.w),
              height: s(L.bunny.h),
            }}
          >
            {LottieView ? (
              <LottieView
                source={ASSETS.animations.bunnyAndChicks}
                autoPlay
                loop
                style={{ width: '100%', height: '100%' }}
                accessibilityLabel="White bunny with chicks"
              />
            ) : null}
          </View>

          <View style={{ flexGrow: 1, minHeight: s(8) }} />
        </View>
      </Stage>
    </Screen>
  );
}
