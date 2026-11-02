import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { spacing } from '../../theme/tokens';

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
      <AppText style={styles.icon}>{icon}</AppText>
      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>
      <AppText variant="body" fontSize={14} style={styles.description}>
        {description}
      </AppText>
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
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    textAlign: 'center',
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

