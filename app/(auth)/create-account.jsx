import React, { useEffect, useRef, useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Stage, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors, spacing } from '../../src/theme/tokens';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/create-account';

/**
 * Create Account — bands from the PNG: header 100, copy 226, fields 363 /
 * 447 / 531, CTA 615, divider 694, Google row 756. The first field opts out of
 * Android autofill; email and password keep their hints.
 */
export default function CreateAccountScreen() {
  const router = useRouter();
  const { W, H, fx, fy, s } = useStage();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
    const trimmedEmail = email.trim();

    if (!trimmedUsername) {
      next.username = 'Username is required';
    } else if (!/^\w{3,20}$/.test(trimmedUsername)) {
      next.username = 'Use 3-20 letters, numbers or underscores';
    }

    if (!trimmedEmail) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      next.email = 'Enter a valid email address';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < 8) {
      next.password = 'Use at least 8 characters';
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
            <View
              style={{
                height: s(L.cat.h),
                marginLeft: fx(L.hello.x),
                marginRight: fx(L.frame.w - L.cat.x - L.cat.w),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <View>
                <AppText
                  variant="display"
                  fontSize={L.hello.size}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                  style={{ lineHeight: s(L.hello.h) }}
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
                    marginTop: s(4),
                  }}
                />
              </View>

              <Image
                source={ASSETS.illustrations.catChefWhisking}
                contentFit="contain"
                accessibilityLabel="Cat chef whisking a bowl"
                style={{
                  width: s(L.cat.w),
                  height: s(L.cat.h),
                  marginTop: fy(L.cat.y - L.hello.y),
                }}
              />
            </View>

            <View
              style={{
                marginTop: fy(L.copy.y - (L.hello.y + L.headerH)),
                marginHorizontal: fx(L.copy.x),
              }}
            >
              <AppText
                variant="body"
                fontSize={L.copy.size}
                className="text-center text-text-primary"
              >
                {"It's no fun eating alone! We're whisking up something sweet... Sign up so we can taste test together!"}
              </AppText>
            </View>

            <View
              style={{
                marginTop: fy(L.form.y - (L.copy.y + L.copy.h)),
                marginLeft: fx(L.form.x),
                width: fx(L.form.w),
              }}
            >
              <Input
                compact
                label="Username"
                placeholder="unique username"
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
                outsideIcon={
                  <Image
                    source={ASSETS.illustrations.cuteBunny}
                    contentFit="contain"
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                    style={{ width: s(34), height: s(34) }}
                  />
                }
              />

              <Input
                compact
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  clearError('email');
                }}
                error={errors.email}
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                outsideIcon={
                  <Ionicons name="mail-outline" size={s(26)} color={colors.info} />
                }
              />

              <Input
                compact
                label="Password"
                placeholder="min 8 characters"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  clearError('password');
                }}
                error={errors.password}
                secure
                autoComplete="new-password"
                textContentType="newPassword"
                outsideIcon={
                  <Image
                    source={ASSETS.illustrations.thinkingCat}
                    contentFit="contain"
                    accessibilityElementsHidden
                    importantForAccessibility="no-hide-descendants"
                    style={{ width: s(30), height: s(30) }}
                  />
                }
              />

              <Button
                title="Purr-fect!"
                size="md"
                loading={loading}
                onPress={handleSubmit}
                style={{
                  alignSelf: 'center',
                  minWidth: s(L.button.w),
                  minHeight: s(L.button.h),
                  marginTop: fy(
                    L.button.y -
                      (L.fieldBox.y + 2 * L.fieldStep + L.fieldBox.h + spacing.md)
                  ),
                }}
              />
            </View>

            <View
              style={{
                marginTop: fy(L.divider.y - (L.button.y + L.button.h)),
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: fx(L.divider.x),
                height: s(L.divider.h),
              }}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
              <AppText variant="body" className="mx-md text-text-muted">
                or
              </AppText>
              <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            </View>

            <View
              style={{
                marginTop: fy(L.bowl.y - (L.divider.y + 1)),
                marginLeft: fx(L.bowl.x),
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={ASSETS.illustrations.cookieDoughBowl}
                contentFit="contain"
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
                  marginLeft: s(24),
                  minWidth: s(L.google.w),
                  minHeight: s(L.google.h),
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
