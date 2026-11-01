import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Screen, Button } from '../../src/components/ui';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';
import ASSETS from '../../src/constants/assets';

let LottieView;
try {
  LottieView = require('lottie-react-native').default || require('lottie-react-native');
} catch (e) {
  LottieView = null;
}

export default function AccountCreatedScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        {LottieView && ASSETS.animations.bunnyAndChicks ? (
          <View style={styles.animationContainer}>
            <LottieView
              source={ASSETS.animations.bunnyAndChicks}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
        ) : (
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🐰</Text>
          </View>
        )}
        <Text style={styles.title}>Whatcha Got? You! ✨</Text>
        <Text style={styles.subtitle}>Your account is all set & ready for some magic.</Text>
        <Text style={styles.description}>
          We've sent a confirmation code to{' '}
          <Text style={styles.emailHighlight}>{email || 'your email'}</Text>.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="take me home"
          size="lg"
          variant="primary"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.btn}
        />
        <Button
          title="Verify Code"
          size="md"
          variant="outline"
          onPress={() =>
            router.push({
              pathname: '/(auth)/otp',
              params: { email, from: 'signup' },
            })
          }
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
  animationContainer: {
    width: 180,
    height: 180,
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primaryLight,
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
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
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
