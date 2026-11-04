import React, { useEffect, useRef, useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';
import { clamp, useStage } from '../../src/lib/stage';
import L from '../../src/layouts/create-account';

/**
 * Create Account — bands from the PNG: title 98, kaomoji 149.7, copy 226,
 * fields 363 / 446.5 / 530, CTA 614, divider 708.5, Google row 756. Fields are
 * transparent hairline boxes (the page wash shows through) with the artwork
 * sitting outside on the left. The first field opts out of Android autofill.
 */
export default function CreateAccountScreen() {
  const router = useRouter();
  const { W, H, fx, fy, s, u } = useStage();
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGoogleToast, setShowGoogleToast] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!showGoogleToast) return undefined;
    const timeout = setTimeout(() => setShowGoogleToast(false), 2400);
    return () => clearTimeout(timeout);
  }, [showGoogleToast]);

  const clearError = (field) =>
    setErrors((current) => (current[field] ? { ...current, [field]: null } : current));

  const validate = () => {
    const next = {};
    const trimmedUsername = username.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedUsername) {
      next.username = 'Username is required';
    } else if (!/^\w{3,20}$/.test(trimmedUsername)) {
      next.username = 'Use 3-20 letters, numbers or underscores';
    }

    if (!trimmedPhone) {
      next.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(trimmedPhone.replace(/[^\d]/g, ''))) {
      next.phone = 'Enter a valid phone number';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < 5) {
      next.password = 'Use at least 5 characters';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (loading || !validate()) return;

    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
      router.replace('/(auth)/account-created');
    }, 1000);
  };

  const fieldBox = {
    backgroundColor: 'transparent',
    borderRadius: s(6),
    borderWidth: 1,
    borderColor: colors.textMuted,
    paddingHorizontal: s(11.5),
  };
  const fieldSlot = (index) => (index ? s(L.form.step - L.form.fieldH) : 0);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen
        variant="blue"
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage>
          <View style={{ width: W, minHeight: H, paddingTop: fy(L.hello.y) }}>
            <View style={{ height: fy(L.headerH) }}>
              <View style={{ marginLeft: fx(L.hello.x) }}>
                <AppText
                  variant="display"
                  fontSize={L.hello.size}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                  style={{
                    lineHeight: s(L.hello.lineHeight),
                    letterSpacing: s(L.hello.letterSpacing),
                  }}
                >
                  Hello!!
                </AppText>
                <Image
                  source={ASSETS.illustrations.helloKaomoji}
                  contentFit="contain"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    width: s(L.kaomoji.w),
                    height: s(L.kaomoji.h),
                    marginLeft: fx(L.kaomoji.x - L.hello.x),
                    marginTop: fy(
                      L.kaomoji.y - (L.hello.y + L.hello.lineHeight)
                    ),
                  }}
                />
              </View>

              <Image
                source={ASSETS.illustrations.catChefWhisking}
                contentFit="contain"
                pointerEvents="none"
                accessibilityLabel="Cat chef whisking a bowl"
                style={{
                  position: 'absolute',
                  left: fx(L.cat.x),
                  top: fy(L.cat.y - L.hello.y),
                  width: s(L.cat.w),
                  height: s(L.cat.h),
                }}
              />
            </View>

            <View style={{ marginHorizontal: fx(L.copy.x) }}>
              <AppText
                variant="body"
                fontSize={L.copy.size}
                className="text-center text-text-primary"
                style={{
                  lineHeight: s(L.copy.lineHeight),
                  letterSpacing: s(L.copy.letterSpacing),
                }}
              >
                {"It's no fun eating alone!\nWe're whisking up something sweet...\nSign up so we can taste test together!"}
              </AppText>
            </View>

            <View
              style={{
                marginTop: fy(
                  L.form.y - (L.copy.y + 3 * L.copy.lineHeight)
                ),
                marginLeft: fx(L.form.x),
              }}
            >
              <View style={{ marginTop: fieldSlot(0) }}>
                <Image
                  source={ASSETS.illustrations.cuteBunny}
                  contentFit="contain"
                  pointerEvents="none"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    position: 'absolute',
                    left: s(L.fields[0].x),
                    top: s(L.fields[0].y),
                    width: s(L.fields[0].w),
                    height: s(L.fields[0].h),
                  }}
                />
                <Input
                  compact
                  flush
                  accessibilityLabel="Username"
                  placeholder="give yourself a unique username"
                  value={username}
                  onChangeText={(value) => {
                    setUsername(value);
                    clearError('username');
                  }}
                  error={errors.username}
                  autoCapitalize="none"
                  autoComplete="off"
                  importantForAutofill="no"
                  textContentType="none"
                  style={{
                    marginLeft: s(L.form.fieldX - L.form.x),
                    width: s(L.form.fieldW),
                  }}
                  boxStyle={fieldBox}
                />
              </View>

              <View style={{ marginTop: fieldSlot(1) }}>
                <Image
                  source={ASSETS.illustrations.thinkingCat}
                  contentFit="contain"
                  pointerEvents="none"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    position: 'absolute',
                    left: s(L.fields[1].x),
                    top: s(L.fields[1].y),
                    width: s(L.fields[1].w),
                    height: s(L.fields[1].h),
                  }}
                />
                <Input
                  compact
                  flush
                  accessibilityLabel="Password"
                  placeholder="password [minimum 5 char/letter]"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    clearError('password');
                  }}
                  error={errors.password}
                  secure
                  showPasswordToggle={false}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  style={{
                    marginLeft: s(L.form.fieldX - L.form.x),
                    width: s(L.form.fieldW),
                  }}
                  boxStyle={fieldBox}
                />
              </View>

              <View style={{ marginTop: fieldSlot(2) }}>
                <Image
                  source={ASSETS.icons.phone}
                  contentFit="contain"
                  pointerEvents="none"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    position: 'absolute',
                    left: s(L.fields[2].x),
                    top: s(L.fields[2].y),
                    width: s(L.fields[2].w),
                    height: s(L.fields[2].h),
                  }}
                />
                <Input
                  compact
                  flush
                  accessibilityLabel="Phone Number"
                  placeholder="phone number"
                  value={phone}
                  onChangeText={(value) => {
                    setPhone(value);
                    clearError('phone');
                  }}
                  error={errors.phone}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  style={{
                    marginLeft: s(L.form.fieldX - L.form.x),
                    width: s(L.form.fieldW),
                  }}
                  boxStyle={fieldBox}
                />
              </View>
            </View>

            <View
              style={{
                marginTop: fy(
                  L.button.y - (L.form.y + 2 * L.form.step + L.form.fieldH)
                ),
              }}
            >
              <Button
                title="Purr-fect!"
                size="md"
                loading={loading}
                onPress={handleSubmit}
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: fx(L.button.x),
                  width: s(L.button.w),
                  minHeight: s(L.button.h),
                  borderRadius: s(6),
                  paddingHorizontal: s(8),
                }}
                textStyle={{
                  fontSize: L.button.size * clamp(u, 0.85, 1.2),
                  letterSpacing: s(L.button.letterSpacing),
                }}
              />
            </View>

            <View
              style={{
                marginTop: fy(L.divider.y - (L.button.y + L.button.h)),
                marginLeft: fx(L.divider.x),
                width: fx(L.divider.w),
                height: s(L.divider.h),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: colors.textMuted }} />
              <AppText
                variant="body"
                fontSize={L.divider.size}
                className="text-text-muted"
                style={{ marginHorizontal: s(11) }}
              >
                or
              </AppText>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.textMuted }} />
            </View>

            <View
              style={{
                marginTop: fy(L.bowl.y - (L.divider.y + L.divider.h)),
                marginLeft: fx(L.bowl.x),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={ASSETS.illustrations.cookieDoughBowl}
                contentFit="contain"
                pointerEvents="none"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ width: s(L.bowl.w), height: s(L.bowl.h) }}
              />
              <Button
                title="continue with google"
                variant="google"
                size="sm"
                onPress={() => setShowGoogleToast(true)}
                style={{
                  marginLeft: s(L.google.x - (L.bowl.x + L.bowl.w)),
                  minHeight: s(L.google.h),
                  paddingHorizontal: s(15),
                  gap: s(15.4),
                  borderRadius: s(L.google.radius),
                }}
              />
            </View>

            <View style={{ flexGrow: 1, minHeight: s(8) }} />
          </View>
        </Stage>
      </Screen>

      {showGoogleToast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast
            type="info"
            message="Coming soon"
            onDismiss={() => setShowGoogleToast(false)}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}
