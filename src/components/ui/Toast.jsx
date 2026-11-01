import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme/tokens';

export const Toast = ({
  visible,
  type = 'info', // 'success' | 'error' | 'warning' | 'info'
  message,
  onRetry,
  onDismiss,
  style,
}) => {
  if (!visible || !message) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.successLight;
      case 'error':
        return colors.errorLight;
      case 'warning':
        return colors.warningLight;
      default:
        return colors.surfaceSubtle;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.border;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.textPrimary;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() },
        style,
      ]}
      accessibilityRole="alert"
    >
      <View style={styles.content}>
        <Text style={[styles.message, { color: getTextColor() }]}>{message}</Text>
      </View>

      <View style={styles.actions}>
        {onRetry ? (
          <TouchableOpacity onPress={onRetry} style={styles.actionButton}>
            <Text style={[styles.actionText, { color: getTextColor() }]}>Retry</Text>
          </TouchableOpacity>
        ) : null}
        {onDismiss ? (
          <TouchableOpacity onPress={onDismiss} style={styles.actionButton}>
            <Text style={[styles.dismissText, { color: getTextColor() }]}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderRadius: radius.md,
    borderWidth: 1,
    marginVertical: spacing.xs,
    width: '100%',
    ...shadows.sm,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  message: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actionButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  actionText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  dismissText: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
  },
});

export default Toast;

