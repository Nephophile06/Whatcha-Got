import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Toast } from '../../src/components/ui';
import { useAuthStore } from '../../src/store/authStore';
import { colors, spacing, typography } from '../../src/theme/tokens';

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    setAuthError('');

    const res = await signIn(email, password);
    setLoading(false);

    if (res.success) {
      router.replace('/(tabs)/home');
    } else {
      setAuthError(res.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <Screen scrollable style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to discover meals and manage your pantry.</Text>
      </View>

      <Toast
        visible={!!authError}
        type="error"
        message={authError}
        onRetry={handleLogin}
        onDismiss={() => setAuthError('')}
      />

      <View style={styles.form}>
        <Input
          label="Email Address"
          placeholder="e.g. alex@example.com"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (errors.email) setErrors({ ...errors, email: null });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          required
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (errors.password) setErrors({ ...errors, password: null });
          }}
          secureTextEntry
          error={errors.password}
          required
        />

        <View style={styles.forgotRow}>
          <Button
            title="Forgot Password?"
            variant="text"
            size="sm"
            onPress={() => router.push('/(auth)/forgot-password')}
            textStyle={styles.forgotText}
          />
        </View>

        <Button
          title="Log In"
          size="lg"
          variant="primary"
          loading={loading}
          onPress={handleLogin}
          style={styles.submitBtn}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Button
            title="Sign Up"
            variant="text"
            size="sm"
            onPress={() => router.push('/(auth)/create-account')}
            textStyle={styles.linkText}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  form: {
    marginTop: spacing.sm,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  forgotText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
  },
});

