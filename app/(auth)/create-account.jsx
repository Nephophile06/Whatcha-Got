import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Toast } from '../../src/components/ui';
import { useAuthStore } from '../../src/store/authStore';
import { colors, spacing, typography } from '../../src/theme/tokens';

export default function CreateAccountScreen() {
  const router = useRouter();
  const signUp = useAuthStore((s) => s.signUp);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);
    setGeneralError('');

    const res = await signUp(email, password, fullName);
    setLoading(false);

    if (res.success) {
      router.push({
        pathname: '/(auth)/account-created',
        params: { email },
      });
    } else {
      setGeneralError(res.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <Screen scrollable style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join to customize your meal plans and ingredients.</Text>
      </View>

      <Toast
        visible={!!generalError}
        type="error"
        message={generalError}
        onRetry={handleSignUp}
        onDismiss={() => setGeneralError('')}
      />

      <View style={styles.form}>
        <Input
          label="Full Name"
          placeholder="e.g. Alex Morgan"
          value={fullName}
          onChangeText={(val) => {
            setFullName(val);
            if (errors.fullName) setErrors({ ...errors, fullName: null });
          }}
          error={errors.fullName}
          required
        />

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
          placeholder="At least 6 characters"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (errors.password) setErrors({ ...errors, password: null });
          }}
          secureTextEntry
          error={errors.password}
          required
        />

        <Input
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
          }}
          secureTextEntry
          error={errors.confirmPassword}
          required
        />

        <Button
          title="Create Account"
          size="lg"
          variant="primary"
          loading={loading}
          onPress={handleSignUp}
          style={styles.submitBtn}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Button
            title="Log In"
            variant="text"
            size="sm"
            onPress={() => router.push('/(auth)/login')}
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
  submitBtn: {
    marginTop: spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
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

