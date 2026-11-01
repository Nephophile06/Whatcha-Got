import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Toast } from '../../src/components/ui';
import { authService } from '../../src/services/auth';
import { colors, spacing, typography } from '../../src/theme/tokens';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState('');

  const handleSend = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setFieldError('Please enter a valid email address');
      return;
    }
    setFieldError('');
    setError('');
    setLoading(true);

    const { error: resetErr } = await authService.resetPasswordForEmail(email.trim());
    setLoading(false);

    if (resetErr) {
      setError(resetErr);
    } else {
      router.push({
        pathname: '/(auth)/otp',
        params: { email: email.trim(), from: 'reset' },
      });
    }
  };

  return (
    <Screen scrollable style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your registered email and we will send a 6-digit verification code.
        </Text>
      </View>

      <Toast
        visible={!!error}
        type="error"
        message={error}
        onRetry={handleSend}
        onDismiss={() => setError('')}
      />

      <View style={styles.form}>
        <Input
          label="Email Address"
          placeholder="e.g. alex@example.com"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (fieldError) setFieldError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={fieldError}
          required
        />

        <Button
          title="Send Reset Code"
          size="lg"
          variant="primary"
          loading={loading}
          onPress={handleSend}
          style={styles.submitBtn}
        />

        <Button
          title="Back to Log In"
          variant="text"
          size="sm"
          onPress={() => router.back()}
          style={styles.backBtn}
          textStyle={styles.backText}
        />
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
    lineHeight: 20,
  },
  form: {
    marginTop: spacing.md,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  backBtn: {
    marginTop: spacing.md,
  },
  backText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

