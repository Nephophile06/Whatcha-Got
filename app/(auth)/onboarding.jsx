import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button } from '../../src/components/ui';
import { useAuthStore } from '../../src/store/authStore';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    emoji: '🥘',
    title: 'Got random ingredients?',
    subtitle: 'Tell us what is in your fridge. We turn leftover staples into delicious, wholesome meals in minutes.',
  },
  {
    id: '2',
    emoji: '⏱️',
    title: 'Filtered by time & budget',
    subtitle: 'Whether you have 15 minutes or need dinner under $3, we eliminate decision fatigue without the hassle.',
  },
  {
    id: '3',
    emoji: '🥗',
    title: 'Plan meals & track goals',
    subtitle: 'Build smart grocery lists, monitor daily calories, and save your all-time favorite budget recipes.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setHasCompletedOnboarding = useAuthStore((s) => s.setHasCompletedOnboarding);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    setHasCompletedOnboarding(true);
    router.replace('/(auth)/welcome');
  };

  const active = SLIDES[currentSlide];

  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Skip"
          variant="text"
          size="sm"
          onPress={finishOnboarding}
          style={styles.skipBtn}
          textStyle={styles.skipText}
        />
      </View>

      <View style={styles.slideContent}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{active.emoji}</Text>
        </View>
        <Text style={styles.title}>{active.title}</Text>
        <Text style={styles.subtitle}>{active.subtitle}</Text>
      </View>

      {/* Slide indicators */}
      <View style={styles.dotsRow}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentSlide === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          size="lg"
          variant="primary"
          onPress={handleNext}
          style={styles.actionBtn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  skipBtn: {
    paddingHorizontal: spacing.sm,
  },
  skipText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  emojiContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 56,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  footer: {
    marginBottom: spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});

