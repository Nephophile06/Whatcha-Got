import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../ui/Button';
import { colors, spacing, typography } from '../../theme/tokens';

export const EmptyState = ({
  icon = '🥣',
  title = 'No meals found',
  description = 'Try adjusting your ingredients or preferences to find matching dishes.',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actions}>
        {actionLabel && onAction ? (
          <Button
            title={actionLabel}
            onPress={onAction}
            size="md"
            variant="primary"
            style={styles.primaryBtn}
          />
        ) : null}
        {secondaryActionLabel && onSecondaryAction ? (
          <Button
            title={secondaryActionLabel}
            onPress={onSecondaryAction}
            size="md"
            variant="outline"
            style={styles.secondaryBtn}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  icon: {
    fontSize: 54,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
    maxWidth: 280,
  },
  actions: {
    width: '100%',
    maxWidth: 260,
    gap: spacing.sm,
  },
  primaryBtn: {
    width: '100%',
  },
  secondaryBtn: {
    width: '100%',
  },
});

export default EmptyState;

