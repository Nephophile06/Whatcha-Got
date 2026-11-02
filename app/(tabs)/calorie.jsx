import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Card, Input } from '../../src/components/ui';
import { useCalorieStore } from '../../src/store/calorieStore';
import { colors, radius, spacing, typography, shadows } from '../../src/theme/tokens';

export default function CalorieScreen() {
  const router = useRouter();
  const { targetCalories, consumedCalories, logs, addLog, removeLog } = useCalorieStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [mealTitle, setMealTitle] = useState('');
  const [mealCalories, setMealCalories] = useState('');
  const [mealType, setMealType] = useState('Lunch');

  const remaining = Math.max(0, targetCalories - consumedCalories);
  const percent = Math.min(100, Math.round((consumedCalories / targetCalories) * 100)) || 0;

  const handleAdd = () => {
    if (!mealTitle.trim() || !mealCalories) return;
    addLog(mealTitle.trim(), mealCalories, mealType);
    setMealTitle('');
    setMealCalories('');
    setShowAddForm(false);
  };

  return (
    <Screen scroll style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Calorie Goal</Text>
        <TouchableOpacity
          onPress={() => router.push('/target-calorie')}
          style={styles.editTargetBtn}
        >
          <Text style={styles.editTargetText}>Edit Goal</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Calorie Card */}
      <Card style={styles.progressCard} elevation="md">
        <View style={styles.calorieStatRow}>
          <View style={styles.statCol}>
            <Text style={styles.statNumber}>{consumedCalories}</Text>
            <Text style={styles.statLabel}>Consumed</Text>
          </View>
          <View style={styles.statColCenter}>
            <Text style={styles.remainingNumber}>{remaining}</Text>
            <Text style={styles.remainingLabel}>Remaining kcal</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statNumber}>{targetCalories}</Text>
            <Text style={styles.statLabel}>Goal</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${percent}%`,
                backgroundColor: percent > 100 ? colors.error : colors.primary,
              },
            ]}
          />
        </View>
        <Text style={styles.percentText}>{percent}% of daily goal achieved</Text>
      </Card>

      {/* Log Meal Section */}
      <View style={styles.logsSection}>
        <View style={styles.logsHeader}>
          <Text style={styles.sectionTitle}>Today's Logged Meals</Text>
          <Button
            title={showAddForm ? 'Close' : '+ Log Food'}
            size="sm"
            variant="secondary"
            onPress={() => setShowAddForm(!showAddForm)}
          />
        </View>

        {showAddForm ? (
          <Card style={styles.addFormCard}>
            <Text style={styles.formTitle}>Quick Log Meal</Text>
            <Input
              label="Meal / Item Name"
              placeholder="e.g. Scrambled eggs on toast"
              value={mealTitle}
              onChangeText={setMealTitle}
            />
            <Input
              label="Calories (kcal)"
              placeholder="e.g. 350"
              keyboardType="number-pad"
              value={mealCalories}
              onChangeText={setMealCalories}
            />
            <Button
              title="Save to Daily Log"
              size="md"
              variant="primary"
              onPress={handleAdd}
              disabled={!mealTitle.trim() || !mealCalories}
              style={styles.saveBtn}
            />
          </Card>
        ) : null}

        {logs.length === 0 ? (
          <Text style={styles.emptyText}>No meals logged yet today. Tap "+ Log Food" above.</Text>
        ) : (
          logs.map((item) => (
            <Card key={item.id} style={styles.logCard}>
              <View style={styles.logLeft}>
                <Text style={styles.logMealType}>{item.mealType} • {item.time}</Text>
                <Text style={styles.logTitle}>{item.title}</Text>
              </View>
              <View style={styles.logRight}>
                <Text style={styles.logCalories}>{item.calories} kcal</Text>
                <TouchableOpacity
                  onPress={() => removeLog(item.id)}
                  style={styles.deleteBtn}
                  accessibilityLabel="Remove meal log"
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  editTargetBtn: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
  },
  editTargetText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: typography.fontSize.xs,
  },
  progressCard: {
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  calorieStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: spacing.lg,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statColCenter: {
    alignItems: 'center',
    flex: 1.2,
  },
  statNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  remainingNumber: {
    fontSize: typography.fontSize.hero,
    fontWeight: '900',
    color: colors.primary,
  },
  remainingLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.textPrimary,
    textTransform: 'uppercase',
  },
  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  percentText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  logsSection: {
    marginTop: spacing.sm,
  },
  logsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  addFormCard: {
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  formTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  saveBtn: {
    marginTop: spacing.xs,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginVertical: spacing.lg,
  },
  logCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm + 4,
  },
  logLeft: {
    flex: 1,
  },
  logMealType: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    marginBottom: 2,
  },
  logTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  logRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logCalories: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
  },
  deleteBtn: {
    padding: spacing.xs,
  },
  deleteText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
});

