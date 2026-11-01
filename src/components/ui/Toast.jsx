/**
 * Toast — inline feedback banner (toast/banner in one component).
 *
 * Props:
 * - visible: boolean (default true; false renders nothing)
 * - type: 'success' | 'error' | 'offline' | 'warning' | 'info'
 * - message: string
 * - onRetry: optional () => void, renders a "Retry" action for failures
 * - onDismiss: optional () => void, renders a close button
 * - className / style
 *
 * Message copy uses textPrimary on pastel tints to stay above WCAG AA.
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../theme/tokens';
import { cx } from './cx';

const TYPES = {
  success: {
    container: 'border-success bg-success-light',
    accent: 'text-success',
    icon: 'checkmark-circle',
    iconColor: colors.success,
  },
  error: {
    container: 'border-error bg-error-light',
    accent: 'text-error',
    icon: 'alert-circle',
    iconColor: colors.error,
  },
  offline: {
    container: 'border-warning bg-warning-light',
    accent: 'text-warning',
    icon: 'cloud-offline-outline',
    iconColor: colors.warning,
  },
  warning: {
    container: 'border-warning bg-warning-light',
    accent: 'text-warning',
    icon: 'warning',
    iconColor: colors.warning,
  },
  info: {
    container: 'border-info bg-info-light',
    accent: 'text-info',
    icon: 'information-circle',
    iconColor: colors.info,
  },
};

export function Toast({
  visible = true,
  type = 'info',
  message,
  onRetry,
  onDismiss,
  className,
  style,
}) {
  if (!visible || !message) return null;

  const tone = TYPES[type] || TYPES.info;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      className={cx(
        'w-full flex-row items-start rounded-md border px-md py-sm',
        tone.container,
        className
      )}
      style={[shadows.sm, style]}
    >
      <View className="mr-sm pt-xs">
        <Ionicons name={tone.icon} size={20} color={tone.iconColor} />
      </View>

      <Text className="flex-1 py-xs font-sans-medium text-sm text-text-primary">
        {message}
      </Text>

      <View className="ml-sm flex-row items-center">
        {onRetry ? (
          <Pressable
            onPress={onRetry}
            accessibilityRole="button"
            accessibilityLabel="Retry"
            className="min-h-[44px] justify-center px-sm"
          >
            <Text className={cx('font-sans-semibold text-sm', tone.accent)}>Retry</Text>
          </Pressable>
        ) : null}

        {onDismiss ? (
          <Pressable
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
            hitSlop={4}
            className="h-11 w-11 items-center justify-center"
          >
            <Ionicons name="close" size={18} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export default Toast;
