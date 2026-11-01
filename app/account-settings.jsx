import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Card, Toast } from '../src/components/ui';
import { useAuthStore } from '../src/store/authStore';
import { colors, radius, spacing, typography } from '../src/theme/tokens';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || 'Alex Morgan');
  const [email, setEmail] = useState(user?.email || 'alex@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [budgetAlertsEnabled, setBudgetAlertsEnabled] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setFeedback('Account settings updated successfully!');
      setTimeout(() => setFeedback(''), 3000);
    }, 600);
  };

  return (
    <Screen scrollable style={styles.container}>
      {feedback ? (
        <Toast
          visible={!!feedback}
          type="success"
          message={feedback}
          onDismiss={() => setFeedback('')}
        />
      ) : null}

      <Text style={styles.sectionHeader}>Personal Information</Text>
      <Card style={styles.card}>
        <Input
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your full name"
        />
        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="your.email@example.com"
          keyboardType="email-address"
        />
      </Card>

      <Text style={styles.sectionHeader}>Notification Preferences</Text>
      <Card style={styles.card}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextCol}>
            <Text style={styles.toggleTitle}>Meal Reminders</Text>
            <Text style={styles.toggleDesc}>Receive daily recipe ideas based on fridge ingredients</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>

        <View style={[styles.toggleRow, { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md }]}>
          <View style={styles.toggleTextCol}>
            <Text style={styles.toggleTitle}>Budget Tracker Alerts</Text>
            <Text style={styles.toggleDesc}>Alert me when meal cost exceeds targeted weekly budget</Text>
          </View>
          <Switch
            value={budgetAlertsEnabled}
            onValueChange={setBudgetAlertsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
          />
        </View>
      </Card>

      <Button
        title="Save Changes"
        size="lg"
        variant="primary"
        loading={saving}
        onPress={handleSave}
        style={styles.saveBtn}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  sectionHeader: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs + 2,
    marginTop: spacing.sm,
    marginLeft: spacing.xs,
  },
  card: {
    marginBottom: spacing.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  toggleTextCol: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  toggleDesc: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  saveBtn: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
});

