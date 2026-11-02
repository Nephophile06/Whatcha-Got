import React, { useEffect, useRef, useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Screen, AppText, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';
import { useScale } from '../../src/lib/scale';

/**
 * Create Account — proportions from design/screens/create-account.png.
 * The mascots are passed as `outsideIcon`, so Input centres each one on the
 * field box itself (not on label + field). Flexible spacers distribute the
 * surplus height on tall 20:9 devices instead of leaving it all at the bottom.
 */
export default function CreateAccountScreen() {
  const router = useRouter();
  const { width } = useScale();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showGoogleToast, setShowGoogleToast] = useState(false);
  const timerRef = useRef(null);
  const formWidth = Math.min(width * 0.84, 360);

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
        scroll
        padded={false}
        contentContainerClassName="flex-grow pb-xxl"
        statusBarStyle="dark-content"
      >
        <View className="flex-row items-start justify-between px-xl pt-md">
          <View className="mt-sm">
            <AppText variant="display" fontSize={34}>
              Hello!!
            </AppText>
            <Image
              source={ASSETS.illustrations.helloKaomoji}
              contentFit="contain"
              accessibilityLabel="Happy cat face"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ width: 112, height: 24, marginTop: 4 }}
            />
          </View>

          <Image
            source={ASSETS.illustrations.catChefWhisking}
            contentFit="contain"
            accessibilityLabel="Cat chef whisking a bowl"
            style={{ width: 78, height: 96 }}
          />
        </View>

        <AppText
          variant="body"
          className="mt-lg self-center px-lg text-center text-text-primary"
          style={{ maxWidth: Math.min(width * 0.84, 340) }}
        >
          {"It's no fun eating alone! We're whisking up something sweet... Sign up so we can taste test together!"}
        </AppText>

        <View className="flex-grow" style={{ minHeight: 16 }} />

        <View className="w-full self-center px-lg" style={{ maxWidth: formWidth }}>
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
            autoComplete="username"
            textContentType="username"
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
            outsideIcon={<Ionicons name="mail-outline" size={26} color={colors.info} />}
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
                style={{ width: 30, height: 30 }}
              />
            }
          />

          <Button
            title="Purr-fect!"
            size="md"
            loading={loading}
            onPress={handleSubmit}
            className="mt-sm"
          />
        </View>

        <View className="flex-grow" style={{ minHeight: 16 }} />

        <View className="mt-md flex-row items-center px-xl">
          <View className="h-px flex-1 bg-text-muted opacity-40" />
          <AppText variant="body" className="mx-md text-text-muted">
            or
          </AppText>
          <View className="h-px flex-1 bg-text-muted opacity-40" />
        </View>

        <View className="mt-md flex-row items-center justify-center px-md">
          <Image
            source={ASSETS.illustrations.cookieDoughBowl}
            contentFit="contain"
            accessibilityLabel="Bowl of cookie dough"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ width: 64, height: 58 }}
          />
          <Button
            title="continue with google"
            variant="google"
            size="sm"
            onPress={() => setShowGoogleToast(true)}
            className="ml-md"
          />
        </View>
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
