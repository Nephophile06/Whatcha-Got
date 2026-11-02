import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Stage, AppText, OtpInput, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/otp';

const RESEND_SECONDS = 30;

/**
 * OTP Verification — 5 digits, mock rule "12345" succeeds.
 * Error state can be opened directly with /(auth)/otp?state=error and is also
 * entered whenever the code is wrong. The burgundy error panel is a wide
 * ellipse (same construction as Account Created) so its top edge is curved.
 * Resend uses a 30s mock cooldown.
 */
export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { W, H, fx, fy, s, offsetX } = useStage();
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

  const panelWidth = s(L.errorPanel.w);
  const panelHeight = s(L.errorPanel.h);

  const background = error ? (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          left: offsetX + W / 2 - panelWidth / 2,
          top: fy(L.errorPanel.y),
          width: panelWidth,
          height: panelHeight,
          borderRadius: s(L.errorPanel.radius),
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={[colors.primaryGlow, colors.primary, colors.primaryDeep]}
          locations={[0, 0.18, 0.44]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  ) : null;

  return (
    <Screen
      variant="otp"
      padded={false}
      edges={[]}
      statusBarStyle="dark-content"
    >
      <Stage background={background}>
        <View style={{ width: W, minHeight: H }}>
          <Image
            source={ASSETS.illustrations.imposterDetective}
            contentFit="contain"
            accessibilityLabel="Bear holding a cookie"
            style={{
              marginTop: fy(L.bear.y),
              marginLeft: fx(L.bear.x),
              width: s(L.bear.w),
              height: s(L.bear.h),
            }}
          />

          <AppText
            variant="display"
            fontSize={L.title.size}
            numberOfLines={L.title.lines}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
            className={
              error
                ? 'text-center text-text-secondary'
                : 'text-center text-text-primary'
            }
            style={{
              marginTop: fy(L.title.y - (L.bear.y + L.bear.h)),
              alignSelf: 'center',
              paddingHorizontal: s(12),
            }}
          >
            Are you an Imposter?👀
          </AppText>

          <AppText
            variant="body"
            fontSize={L.copy.size}
            className="text-center text-text-secondary"
            style={{
              marginTop: fy(L.copy.y - (L.title.y + L.title.h)),
              marginLeft: fx(L.copy.x),
              width: fx(L.copy.w),
            }}
          >
            Just kidding! But let's be safe. Drop the magic and enter it below to verify.
          </AppText>

          <View style={{ marginTop: fy(L.boxes.y - (L.copy.y + L.copy.h)) }}>
            <OtpInput
              key={attempt}
              length={5}
              value={code}
              onChange={setCode}
              autoFocus
              error={false}
              bare
              boxSize={L.boxes.box}
              boxHeight={L.boxes.h}
              gap={L.boxes.gap}
            />
          </View>

          {!error ? (
            <>
              <Button
                title="confirm"
                size="md"
                onPress={handleConfirm}
                loading={verifying}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(L.confirm.y - (L.boxes.y + L.boxes.h)),
                  minWidth: s(L.confirm.w),
                  minHeight: Math.max(s(L.confirm.h), 44),
                }}
              />

              <Pressable
                onPress={handleResend}
                disabled={seconds > 0}
                accessibilityRole="button"
                accessibilityLabel="Resend verification code"
                accessibilityState={{ disabled: seconds > 0 }}
                className="items-center justify-center px-md"
                style={{ marginTop: fy(L.resend.y - (L.confirm.y + 44)), minHeight: 44 }}
              >
                <AppText
                  variant="label"
                  fontSize={L.resend.size}
                  className={seconds > 0 ? 'text-text-muted' : 'text-text-secondary'}
                >
                  Didn't get magic?{' '}
                  <AppText
                    variant="label"
                    fontSize={L.resend.size}
                    className={
                      seconds > 0 ? 'text-text-muted' : 'text-text-secondary underline'
                    }
                  >
                    {seconds > 0 ? `try again in ${seconds}s` : 'try again'}
                  </AppText>
                </AppText>
              </Pressable>

              <Image
                source={ASSETS.illustrations.catPawPrints}
                contentFit="contain"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{
                  marginTop: fy(L.paws.y - (L.resend.y + 44)),
                  marginLeft: fx(L.paws.x),
                  width: s(L.paws.w),
                  height: s(L.paws.h),
                }}
              />
            </>
          ) : (
            <>
              <AppText
                variant="body"
                fontSize={L.errorText.size}
                className="text-center text-text-inverse"
                style={{
                  marginTop: fy(L.errorText.y - (L.boxes.y + L.boxes.h)),
                  marginLeft: fx(L.errorText.x),
                  width: fx(L.errorText.w),
                }}
              >
                Uh-oh! Caught You! That's exactly what an imposter would say. Double-check
                your magic!
              </AppText>

              <Button
                title="Try again"
                variant="light"
                size="md"
                onPress={handleTryAgain}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(L.errorButton.y - (L.errorText.y + L.errorText.h)),
                  minWidth: s(L.errorButton.w),
                  minHeight: Math.max(s(L.errorButton.h), 44),
                }}
              />
            </>
          )}

          <View style={{ flexGrow: 1, minHeight: s(8) }} />
        </View>
      </Stage>
    </Screen>
  );
}
