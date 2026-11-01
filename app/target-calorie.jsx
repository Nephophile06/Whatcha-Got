import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Card, Toast } from '../src/components/ui';
import { useCalorieStore } from '../src/store/calorieStore';
import { colors, radius, spacing, typography } from '../src/theme/tokens';

export default function TargetCalorieScreen() {
  const router = useRouter();
  const { targetCalories, setTargetCalories } = useCalorieStore();
  const [calorieInput, setCalorieInput] = useState(targetCalories.toString());
  const [feedback, setFeedback] = useState('');

  const PRESETS = [
    { label: 'Gentle Deficit', value: '1800', desc: 'Weight loss without strict hunger' },
    { label: 'Maintenance', value: '2000', desc: 'Standard balanced daily energy' },
    { label: 'Active & Building', value: '2400', desc: 'Higher energy for workouts' },
  ];

  const handleSave = () => {
    const num = parseInt(calorieInput, 10);
    if (!num || num < 500 || num > 6000) {
      setFeedback('Please enter a realistic daily target (500 - 6,000 kcal).');
      return;
    }

    setTargetCalories(num);
    setFeedback('Target goal updated successfully!');
    setTimeout(() => {
      router.back();
    }, 1200);
  };

  return (
    <Screen scrollable style={styles.container}>
      {feedback ? (
        <Toast
          visible={!!feedback}
          type={feedback.includes('Please') ? 'error' : 'success'}
          message={feedback}
          onDismiss={() => setFeedback('')}
        />
      ) : null}

      <View style={styles.header}>
        <Text style={styles.title}>Calorie & Energy Goal</Text>
        <Text style={styles.subtitle}>
          Setting your daily energy target helps filter quick recipes that keep you on track.
        </Text>
      </View>

      <Card style={styles.card}>
        <Input
          label="Daily Calorie Target (kcal)"
          placeholder="e.g. 2000"
          keyboardType="number-pad"
          value={calorieInput}
          onChangeText={setCalorieInput}
          helperText="Standard recommended baseline is 2,000 kcal/day."
          required
        />

        <Text style={styles.presetsTitle}>Quick Goal Presets</Text>
        <View style={styles.presetsContainer}>
          {PRESETS.map((p) => {
            const isSelected = calorieInput === p.value;
            return (
              <TouchableOpacity
                key={p.value}
                onPress={() => setCalorieInput(p.value)}
                style={[styles.presetCard, isSelected && styles.presetCardActive]}
                accessibilityRole="button"
              >
                <View style={styles.presetLeft}>
                  <Text style={[styles.presetLabel, isSelected && styles.presetLabelActive]}>
                    {p.label}
                  </Text>
                  <Text style={styles.presetDesc}>{p.desc}</Text>
                </View>
                <Text style={[styles.presetValue, isSelected && styles.presetValueActive]}>
                  {p.value} kcal
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Clear CTA Button */}
        <Button
          title="Save Goal"
          size="lg"
          variant="primary"
          onPress={handleSave}
          style={styles.saveBtn}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 20,
  },
  card: {
    marginBottom: spacing.xl,
  },
  presetsTitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  presetsContainer: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  presetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSubtle,
  },
  presetCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  presetLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  presetLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  presetLabelActive: {
    color: colors.primaryDark,
  },
  presetDesc: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  presetValue: {
    fontSize: typography.fontSize.sm,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  presetValueActive: {
    color: colors.primaryDark,
  },
  saveBtn: {
    marginTop: spacing.sm,
  },
});

