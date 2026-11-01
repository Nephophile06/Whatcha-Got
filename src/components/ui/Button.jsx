import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/tokens';

export const Button = ({
  title,
  onPress,
  variant = 'primary', // primary | secondary | outline | text | danger
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  ...props
}) => {
  const getContainerStyle = () => {
    const base = [styles.button, styles[`size_${size}`]];
    if (variant === 'primary') base.push(styles.variant_primary);
    if (variant === 'secondary') base.push(styles.variant_secondary);
    if (variant === 'outline') base.push(styles.variant_outline);
    if (variant === 'text') base.push(styles.variant_text);
    if (variant === 'danger') base.push(styles.variant_danger);
    if (disabled || loading) base.push(styles.disabled);
    return base;
  };

  const getTextStyle = () => {
    const base = [styles.text, styles[`text_${size}`]];
    if (variant === 'primary') base.push(styles.text_primary);
    if (variant === 'secondary') base.push(styles.text_secondary);
    if (variant === 'outline') base.push(styles.text_outline);
    if (variant === 'text') base.push(styles.text_outline);
    if (variant === 'danger') base.push(styles.text_danger);
    if (disabled) base.push(styles.text_disabled);
    return base;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getContainerStyle(), style]}
      accessibilityRole="button"
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? colors.textInverse : colors.primary}
        />
      ) : (
        <>
          {icon ? icon : null}
          <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    gap: spacing.sm,
  },
  size_sm: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  size_md: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  size_lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  variant_primary: {
    backgroundColor: colors.primary,
  },
  variant_secondary: {
    backgroundColor: colors.secondaryLight,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  variant_text: {
    backgroundColor: 'transparent',
  },
  variant_danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  text_sm: {
    fontSize: typography.fontSize.sm,
  },
  text_md: {
    fontSize: typography.fontSize.md,
  },
  text_lg: {
    fontSize: typography.fontSize.lg,
  },
  text_primary: {
    color: colors.textInverse,
  },
  text_secondary: {
    color: colors.secondary,
  },
  text_outline: {
    color: colors.textPrimary,
  },
  text_danger: {
    color: colors.textInverse,
  },
  text_disabled: {
    color: colors.textMuted,
  },
});

export default Button;

