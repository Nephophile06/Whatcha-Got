import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Button } from '../../src/components/ui';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';

export default function AccountCreatedScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🎉</Text>
        </View>
        <Text style={styles.title}>Account Created!</Text>
        <Text style={styles.description}>
          Welcome to Whatcha Got! We've sent a 6-digit verification code to{' '}
          <Text style={styles.emailHighlight}>{email || 'your email'}</Text>.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Verify Code"
          size="lg"
          variant="primary"
          onPress={() =>
            router.push({
              pathname: '/(auth)/otp',
              params: { email, from: 'signup' },
            })
          }
          style={styles.btn}
        />
        <Button
          title="Continue to Home"
          size="md"
          variant="outline"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.btn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  emailHighlight: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  footer: {
    width: '100%',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  btn: {
    width: '100%',
  },
});

