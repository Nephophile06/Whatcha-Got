import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, AppText, OtpInput, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, radius } from '../../src/theme/tokens';
import { useScale } from '../../src/lib/scale';

const RESEND_SECONDS = 30;

/**
 * OTP Verification — 5 digits, mock rule "12345" succeeds.
 * Error state can be opened directly with /(auth)/otp?state=error and is also
 * entered whenever the code is wrong. Resend uses a 30s mock cooldown.
 */
export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useScale();
  const [code, setCode] = useState('');
  const [error, setError] = useState(params.state === 'error');
  const [attempt, setAttempt] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return undefined;
    const timeout = setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => clearTimeout(timeout);
  }, [seconds]);

  const handleConfirm = () => {
    if (code.length < 5 || verifying) return;

    if (code === '12345') {
      setVerifying(true);
      setError(false);
      setTimeout(() => {
        // TODO: reset password screen (not designed yet)
        router.replace('/home-loading');
      }, 600);
      return;
    }

    setError(true);
  };

  const handleTryAgain = () => {
    setError(false);
    setCode('');
    setVerifying(false);
    setAttempt((value) => value + 1);
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setSeconds(RESEND_SECONDS);
    handleTryAgain();
  };

  return (
    <Screen
      variant="otp"
      scroll
      padded={false}
      contentContainerClassName="flex-grow"
      statusBarStyle="dark-content"
    >
      <View className="relative flex-1 px-xl">
        <View className="items-center" style={{ paddingTop: Math.round(height * 0.075) }}>
          <Image
            source={ASSETS.illustrations.imposterDetective}
            contentFit="contain"
            accessibilityLabel="Bear holding a cookie"
            style={{ width: Math.round(width * 0.31), aspectRatio: 143 / 153 }}
          />

          <AppText
            variant="display"
            fontSize={26}
            className={error ? 'mt-lg text-center text-text-secondary' : 'mt-lg text-center'}
          >
            Are you an Imposter?👀
          </AppText>

          <AppText
            variant="body"
            className="mt-xs text-center text-text-secondary"
            style={{ maxWidth: Math.min(width * 0.86, 360) }}
          >
            Just kidding! But let's be safe. Drop the magic and enter it below to verify.
          </AppText>
        </View>

        <View className="mt-xl items-center">
          <OtpInput
            key={attempt}
            length={5}
            value={code}
            onChange={setCode}
            autoFocus
            error={false}
          />
        </View>

        {!error ? (
          <View className="items-center">
            <Button
              title="confirm"
              size="md"
              onPress={handleConfirm}
              loading={verifying}
              style={{ marginTop: Math.round(height * 0.07) }}
            />

            <Pressable
              onPress={handleResend}
              disabled={seconds > 0}
              accessibilityRole="button"
              accessibilityLabel="Resend verification code"
              accessibilityState={{ disabled: seconds > 0 }}
              className="mt-md min-h-[44px] items-center justify-center px-md"
            >
              <AppText
                variant="label"
                className={seconds > 0 ? 'text-text-muted' : 'text-text-secondary'}
              >
                Didn't get magic?{' '}
                <AppText
                  variant="label"
                  className={
                    seconds > 0 ? 'text-text-muted' : 'text-text-secondary underline'
                  }
                >
                  {seconds > 0 ? `try again in ${seconds}s` : 'try again'}
                </AppText>
              </AppText>
            </Pressable>
          </View>
        ) : null}

        <View className="flex-1" />

        {!error ? (
          <View
            className="items-center"
            style={{ marginBottom: Math.round(height * 0.11) }}
          >
            <Image
              source={ASSETS.illustrations.catPawPrints}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ width: '30%', aspectRatio: 148 / 250 }}
            />
          </View>
        ) : null}
      </View>

      {error ? (
        <View
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          style={{ top: '57%', borderTopLeftRadius: radius.xxl, borderTopRightRadius: radius.xxl }}
        >
          <LinearGradient
            colors={[colors.primaryGlow, colors.primary, colors.primaryDeep]}
            locations={[0, 0.3, 0.85]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingHorizontal: 32,
              paddingBottom: Math.round(height * 0.055),
            }}
          >
            <AppText variant="body" fontSize={17} className="text-center text-text-inverse">
              Uh-oh! Caught You! That's exactly what an imposter would say. Double-check your
              magic!
            </AppText>

            <Button
              title="try again :("
              variant="light"
              size="md"
              onPress={handleTryAgain}
              className="mt-xl"
            />
          </LinearGradient>
        </View>
      ) : null}
    </Screen>
  );
}
