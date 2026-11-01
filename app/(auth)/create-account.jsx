import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Screen, Input, Button, Toast } from '../../src/components/ui';
import { ASSETS } from '../../src/constants/assets';
import { colors } from '../../src/theme/tokens';

function FormRow({ icon, iconNode, children }) {
  return (
    <View className="flex-row items-center">
      {iconNode ? (
        <View className="h-[34px] w-[34px] items-center justify-center">{iconNode}</View>
      ) : (
        <Image source={icon} contentFit="contain" style={{ width: 34, height: 34 }} />
      )}
      <View className="ml-md flex-1 pr-lg">{children}</View>
    </View>
  );
}

export default function CreateAccountScreen() {
  const router = useRouter();
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
        scroll
        padded={false}
        contentContainerClassName="pb-xxl"
        statusBarStyle="dark-content"
      >
        <View className="flex-row items-start justify-between px-xxl pt-xl">
          <View className="mt-md pl-lg">
            <Text className="font-display text-hero text-text-primary">Hello!!</Text>
            <Image
              source={ASSETS.illustrations.helloKaomoji}
              contentFit="contain"
              accessibilityLabel="Happy cat face"
              style={{ width: 118, height: 25, marginTop: 4 }}
            />
          </View>

          <Image
            source={ASSETS.illustrations.catChefWhisking}
            contentFit="contain"
            accessibilityLabel="Cat chef whisking a bowl"
            style={{ width: 84, height: 108 }}
          />
        </View>

        <Text className="mt-xl px-lg text-center font-sans text-lg leading-6 text-text-primary">
          {"It's no fun eating alone!\n"}
          {"We're whisking up something sweet...\n"}
          {'Sign up so we can taste test together!'}
        </Text>

        <View className="mt-xl pl-xxl pr-xxl">
          <FormRow icon={ASSETS.illustrations.cuteBunny}>
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
            />
          </FormRow>

          <FormRow
            iconNode={<Ionicons name="mail-outline" size={28} color={colors.info} />}
          >
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
            />
          </FormRow>

          <FormRow icon={ASSETS.illustrations.thinkingCat}>
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
            />
          </FormRow>

          <Button
            title="Purr-fect!"
            size="md"
            loading={loading}
            onPress={handleSubmit}
            className="mt-md"
          />
        </View>

        <View className="mt-lg flex-row items-center px-xl">
          <View className="h-px flex-1 bg-text-muted opacity-40" />
          <Text className="mx-md font-sans text-md text-text-muted">or</Text>
          <View className="h-px flex-1 bg-text-muted opacity-40" />
        </View>

        <View className="mt-lg flex-row items-center justify-center px-md">
          <Image
            source={ASSETS.illustrations.cookieDoughBowl}
            contentFit="contain"
            accessibilityLabel="Bowl of cookie dough"
            style={{ width: 68, height: 62 }}
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
