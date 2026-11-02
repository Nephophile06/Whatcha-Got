import React, { useState } from 'react';
import { View, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Screen, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { useAuthStore } from '../../src/store/authStore';
import { useScale } from '../../src/lib/scale';

/**
 * Login — proportions from design/screens/login.png. The PNG labels the first
 * field "your sweet username"; we use an Email label because the future
 * Supabase flow is email + password (reported as a deliberate mismatch).
 */
export default function LoginScreen() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const { width, height } = useScale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const formWidth = Math.min(width * 0.84, 360);

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
        scroll
        padded={false}
        contentContainerClassName="flex-grow"
        statusBarStyle="dark-content"
      >
        <View className="relative flex-1 px-xl">
          <Image
            source={ASSETS.images.twoCherries}
            contentFit="contain"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            className="absolute"
            style={{
              position: 'absolute',
              left: -8,
              top: 0,
              width: '30%',
              aspectRatio: 450 / 336,
            }}
          />
          <Image
            source={ASSETS.images.peeledBanana}
            contentFit="contain"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            className="absolute"
            style={{
              position: 'absolute',
              right: -14,
              top: -6,
              width: '26%',
              aspectRatio: 358 / 599,
            }}
          />

          <AppText
            variant="display"
            fontSize={38}
            style={{ marginTop: Math.round(height * 0.15) }}
          >
            Welcome Back!
          </AppText>

          <AppText
            variant="body"
            fontSize={17}
            className="mt-md text-text-primary"
            style={{ maxWidth: Math.min(width * 0.82, 340) }}
          >
            We missed you :( Let's get back into your world of flavors.
          </AppText>

          <View className="mt-lg w-full self-center" style={{ maxWidth: formWidth }}>
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
                  style={{ width: 34, height: 34 }}
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
                  style={{ width: 30, height: 30 }}
                />
              }
            />

            <Pressable
              onPress={() => router.push('/(auth)/forgot-password')}
              accessibilityRole="link"
              accessibilityLabel="I forgot my password"
              className="min-h-[44px] items-end justify-center"
            >
              <AppText variant="label" className="text-text-secondary underline">
                I forgot my password T.T
              </AppText>
            </Pressable>

            <Button
              title="Hurryyy!"
              size="md"
              loading={loading}
              onPress={handleLogin}
              className="mt-md"
            />

            <View className="mt-lg flex-row items-center">
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
              className="mt-md"
            />

            <Pressable
              onPress={() => router.push('/(auth)/create-account')}
              accessibilityRole="link"
              accessibilityLabel="New here? Create an account"
              className="mt-sm min-h-[44px] items-center justify-center"
            >
              <AppText variant="label" className="text-text-secondary underline">
                New here? Create an account
              </AppText>
            </Pressable>
          </View>

          {/* Chef cat sits below the form, like the PNG. */}
          <Image
            source={ASSETS.illustrations.loginChefCat}
            contentFit="contain"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            className="mt-md self-start"
            style={{ width: '34%', aspectRatio: 639 / 666 }}
          />
        </View>
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
