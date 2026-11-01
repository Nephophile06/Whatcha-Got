import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button } from '../../src/components/ui';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.iconCircle}>
          <Text style={styles.heroEmoji}>🍳</Text>
        </View>
        <Text style={styles.brandTitle}>Whatcha Got?</Text>
        <Text style={styles.tagline}>
          Smart, budget-friendly meal discovery without the decision fatigue.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Log In"
          size="lg"
          variant="primary"
          onPress={() => router.push('/(auth)/login')}
          style={styles.btn}
        />
        <Button
          title="Create an Account"
          size="lg"
          variant="outline"
          onPress={() => router.push('/(auth)/create-account')}
          style={styles.btn}
        />
        <Button
          title="Explore as Guest"
          variant="text"
          size="sm"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.guestBtn}
          textStyle={styles.guestText}
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
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  heroEmoji: {
    fontSize: 50,
  },
  brandTitle: {
    fontSize: typography.fontSize.hero,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: -0.5,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  btn: {
    width: '100%',
  },
  guestBtn: {
    marginTop: spacing.xs,
  },
  guestText: {
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
});

