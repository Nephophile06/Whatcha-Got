import React, { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { useStage } from '../../src/lib/stage';
import L from '../../src/layouts/login';

/**
 * Login — bands from design/screens/login.png (title 150, copy 210, form 273,
 * forgot 441, CTA 497, divider 561, Google 594, create-account 634, duck 676).
 * The PNG labels the first field "your sweet username"; we use an Email label
 * because the future Supabase flow is email + password.
 */
export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { W, H, fx, fy, s } = useStage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const clearError = (field) =>
    setErrors((current) => (current[field] ? { ...current, [field]: null } : current));

  const validate = () => {
    const next = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      next.email = 'Enter a valid email address';
    }

    if (!password) next.password = 'Password is required';
    else if (password.length < 8) next.password = 'Use at least 8 characters';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (loading || !validate()) return;

    setLoading(true);
    const result = await login({ email: email.trim(), password });
    setLoading(false);

    if (!result.success) {
      setToast({ type: 'error', message: result.error });
      return;
    }

    router.replace('/home-loading');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen
        variant="mintPage"
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage>
          <View style={{ width: W, minHeight: H }}>
            <Image
              source={ASSETS.images.twoCherries}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.cherries.x),
                top: fy(L.cherries.y),
                width: s(L.cherries.w),
                height: s(L.cherries.h),
              }}
            />
            <Image
              source={ASSETS.images.peeledBanana}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                position: 'absolute',
                left: fx(L.banana.x),
                top: fy(L.banana.y),
                width: s(L.banana.w),
                height: s(L.banana.h),
              }}
            />

            <View style={{ paddingTop: fy(L.title.y), paddingLeft: fx(L.title.x) }}>
              <AppText
                variant="display"
                fontSize={L.title.size}
                numberOfLines={L.title.lines}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                style={{ width: fx(L.title.w) }}
              >
                Welcome Back!
              </AppText>
            </View>

            <AppText
              variant="body"
              fontSize={L.copy.size}
              className="text-text-primary"
              style={{
                marginTop: fy(L.copy.y - (L.title.y + L.title.h)),
                marginLeft: fx(L.copy.x),
                width: fx(L.copy.w),
              }}
            >
              {"We missed you :(\nLet's get back into your world of flavors."}
            </AppText>

            <View
              style={{
                marginTop: fy(L.form.y - (L.copy.y + L.copy.h)),
                marginLeft: fx(L.form.x),
                width: fx(L.form.w),
              }}
            >
              <Input
                compact
                label="Email"
                placeholder="your sweet email"
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
                label="Password"
                placeholder="secret password ^_^"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  clearError('password');
                }}
                error={errors.password}
                secure
                autoComplete="current-password"
                textContentType="password"
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

              <Pressable
                onPress={() => router.push('/(auth)/forgot-password')}
                accessibilityRole="link"
                accessibilityLabel="I forgot my password"
                className="justify-start"
                style={{ minHeight: Math.max(s(44), 44), alignItems: 'flex-end' }}
              >
                <AppText variant="label" fontSize={L.forgot.size} className="text-text-secondary underline">
                  I forgot my password T.T
                </AppText>
              </Pressable>

              <Button
                title="Hurryyy!"
                size="md"
                loading={loading}
                onPress={handleLogin}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(L.button.y - (L.forgot.y + 44)),
                  minWidth: s(L.button.w),
                  minHeight: Math.max(s(L.button.h), 44),
                }}
              />

              <View
                style={{
                  marginTop: fy(L.divider.y - (L.button.y + L.button.h)),
                  width: fx(L.divider.w),
                  minHeight: fy(L.divider.rowH),
                  alignSelf: 'center',
                }}
                className="flex-row items-center"
              >
                <View className="h-px flex-1 bg-text-muted opacity-40" />
                <AppText variant="body" className="mx-md text-text-muted">
                  or
                </AppText>
                <View className="h-px flex-1 bg-text-muted opacity-40" />
              </View>

              <Button
                title="login with google"
                variant="google"
                size="sm"
                onPress={() => setToast({ type: 'info', message: 'Coming soon' })}
                style={{
                  alignSelf: 'center',
                  marginTop: fy(L.google.y - (L.divider.y + L.divider.rowH)),
                  minWidth: s(L.google.w),
                  minHeight: Math.max(s(L.google.h), 44),
                }}
              />

              <Pressable
                onPress={() => router.push('/(auth)/create-account')}
                accessibilityRole="link"
                accessibilityLabel="New here? Create an account"
                className="items-center justify-center"
                style={{ marginTop: fy(L.createAccount.y - (L.google.y + 44)), minHeight: 44 }}
              >
                <AppText
                  variant="label"
                  fontSize={L.createAccount.size}
                  className="text-text-secondary underline"
                >
                  New here? Create an account
                </AppText>
              </Pressable>
            </View>

            <Image
              source={ASSETS.illustrations.loginChefCat}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                marginTop: fy(L.duck.y - (L.createAccount.y + 44)),
                marginLeft: fx(L.duck.x),
                width: s(L.duck.w),
                height: s(L.duck.h),
              }}
            />

            <View style={{ flexGrow: 1, minHeight: s(8) }} />
          </View>
        </Stage>
      </Screen>

      {toast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast
            type={toast.type}
            message={toast.message}
            onDismiss={() => setToast(null)}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}
