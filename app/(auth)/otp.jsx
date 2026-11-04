import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Stage, AppText, OtpInput, Button } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';
import { clamp, useStage } from '../../src/lib/stage';
import L from '../../src/layouts/otp';

const RESEND_SECONDS = 30;

/**
 * OTP Verification — 5 digits, mock rule "12345" succeeds.
 * Error state can be opened directly with /(auth)/otp?state=error and is also
 * entered whenever the code is wrong.
 *
 * The page wash (pink with a white centre glow) is a radial gradient, so it is
 * a reconstructed background plate (otp-verification.png) rather than a linear
 * token gradient. The burgundy error dome is the same 824 circle construction
 * as Account Created: it starts at y545 and swallows the resend link and the
 * paw art, while the design keeps the confirm button peeking above/behind it.
 */
export default function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { W, H, fx, fy, s, u, offsetX } = useStage();
  const [code, setCode] = useState('');
  const [error, setError] = useState(params.state === 'error');
  const [attempt, setAttempt] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const scaled = (size) => Math.round(size * clamp(u, 0.85, 1.2) * 100) / 100;

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
  const confirmWidth = s(L.confirm.w);
  const confirmHeight = Math.max(44, s(L.confirm.h));

  // Full-bleed layer: the design wash everywhere, plus the error dome. The
  // design's error mock also shows the confirm button above the normal UI, so
  // it is redrawn behind the dome (a decorative copy; the real button is hidden
  // in this state).
  const background = (
    <View style={{ flex: 1 }}>
      <Image
        source={ASSETS.images.otpPageWash}
        contentFit="cover"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{ flex: 1 }}
      />

      {error ? (
        <>
          <View
            pointerEvents="none"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              position: 'absolute',
              left: offsetX + (W - s(L.ghost.w)) / 2,
              top: fy(L.ghost.y),
              width: s(L.ghost.w),
              height: s(L.ghost.h),
              borderRadius: s(L.ghost.r),
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AppText
              variant="button"
              fontSize={L.confirm.size}
              className="text-text-inverse"
              style={{ lineHeight: scaled(L.confirm.size) * 1.35 }}
            >
              confirm
            </AppText>
          </View>

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
              colors={[
                colors.otpDomeLip,
                colors.otpDomeTop,
                colors.otpDomeMid,
                colors.otpDomeDeep,
                colors.otpDomeBottom,
              ]}
              locations={[0, 0.017, 0.181, 0.358, 0.426]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ flex: 1 }}
            />
          </View>
        </>
      ) : null}
    </View>
  );

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
            className="text-center text-black"
            style={{
              marginTop: fy(L.title.y - (L.bear.y + L.bear.h)),
              alignSelf: 'center',
              paddingHorizontal: s(12),
              transform: [{ translateX: fx(L.title.dx) }],
            }}
          >
            Are you an Imposter?👀
          </AppText>

          <AppText
            variant="body"
            fontSize={L.copy.size}
            className="text-center text-black"
            style={{
              marginTop: fy(L.copy.y - (L.title.y + L.title.h)),
              marginLeft: fx(L.copy.x),
              width: fx(L.copy.w),
              lineHeight: scaled(L.copy.lineH),
            }}
          >
            Just kidding! But let's be safe. Drop the magic and enter it below to verify.
          </AppText>

          <View
            style={{
              marginTop: fy(L.boxes.y - (L.copy.y + L.copy.h)),
              marginLeft: fx(L.boxes.dx),
            }}
          >
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
                  width: confirmWidth,
                  minHeight: confirmHeight,
                  borderRadius: s(L.confirm.r),
                  paddingHorizontal: 0,
                }}
                textStyle={{
                  fontSize: scaled(L.confirm.size),
                  lineHeight: scaled(L.confirm.size) * 1.35,
                }}
              />

              <Pressable
                onPress={handleResend}
                disabled={seconds > 0}
                accessibilityRole="button"
                accessibilityLabel="Resend verification code"
                accessibilityState={{ disabled: seconds > 0 }}
                className="items-center justify-center"
                style={{
                  marginTop: fy(L.resend.y - (L.confirm.y + L.confirm.h)),
                  minHeight: 44,
                }}
              >
                <AppText
                  variant="body"
                  fontSize={L.resend.size}
                  style={{
                    lineHeight: scaled(L.resend.lineH),
                    color: colors.textWarmMuted,
                  }}
                >
                  Didn't get magic?{' '}
                  <AppText
                    variant="body"
                    fontSize={L.resend.size}
                    style={{
                      lineHeight: scaled(L.resend.lineH),
                      color: colors.textWarmMuted,
                      textDecorationLine: seconds > 0 ? 'none' : 'underline',
                    }}
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
                  marginTop: fy(L.paws.y - (L.resend.y + L.resend.h)),
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
                  lineHeight: scaled(L.errorText.lineH),
                }}
              >
                Uh-oh! Caught You! That's exactly what an imposter would say. Double-check
                your magic!
              </AppText>

              <Button
                title="try again :("
                variant="light"
                size="md"
                onPress={handleTryAgain}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(
                    L.errorButton.y - (L.errorText.y + L.errorText.h)
                  ),
                  width: s(L.errorButton.w),
                  minHeight: Math.max(44, s(L.errorButton.h)),
                  borderRadius: s(L.errorButton.r),
                  paddingHorizontal: 0,
                }}
                textStyle={{
                  fontSize: scaled(L.errorButton.size),
                  lineHeight: scaled(L.errorButton.size) * 1.35,
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
