/**
 * Button — primary action control with token-only styling.
 *
 * Props:
 * - title: string label (use a direct verb, e.g. "Save Goal")
 * - onPress: () => void
 * - variant: 'primary' | 'secondary' | 'ghost' | 'google' | 'light' | 'danger'
 *   Legacy aliases: 'outline' -> secondary, 'text' -> ghost
 * - size: 'sm' | 'md' | 'lg' (all >= 44px touch target)
 * - loading: boolean, swaps the label for a spinner
 * - disabled: boolean, dims and blocks presses
 * - icon: optional React node shown before the label
 * - fullWidth: boolean, stretches to the parent width (default false)
 * - className / style / textStyle
 */
import React, { useState } from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { ASSETS } from '../../constants/assets';
import { colors } from '../../theme/tokens';
import { AppText } from './AppText';
import { cx } from './cx';

const VARIANT_ALIASES = {
  outline: 'secondary',
  text: 'ghost',
};

const CONTAINER = {
  primary: 'bg-primary border-primary',
  secondary: 'bg-transparent border-primary',
  ghost: 'bg-transparent border-transparent',
  google: 'bg-surface border-surface',
  light: 'bg-surface border-surface',
  danger: 'bg-error border-error',
};

const CONTAINER_PRESSED = {
  primary: 'bg-primary-dark border-primary-dark',
  secondary: 'bg-primary-blush border-primary',
  ghost: 'bg-surface-subtle border-transparent',
  google: 'bg-surface-subtle border-surface',
  light: 'bg-primary-blush border-primary-blush',
  danger: 'bg-error border-error',
};

const LABEL = {
  primary: 'text-text-inverse',
  secondary: 'text-primary',
  ghost: 'text-primary',
  google: 'text-text-primary',
  light: 'text-text-primary',
  danger: 'text-text-inverse',
};

const SIZE = {
  sm: 'min-h-[44px] px-md',
  md: 'min-h-[48px] px-lg',
  lg: 'min-h-[56px] px-xl',
};

const TEXT_SIZE = {
  sm: 14,
  md: 16,
  lg: 18,
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className,
  style,
  textStyle,
  onPressIn,
  onPressOut,
  ...props
}) {
  const [pressed, setPressed] = useState(false);
  const requestedVariant = VARIANT_ALIASES[variant] || variant;
  const resolvedVariant = CONTAINER[requestedVariant] ? requestedVariant : 'primary';
  const isDisabled = disabled || loading;
  const textClassName = typeof textStyle === 'string' ? textStyle : undefined;
  const textStyleObject = textStyle && typeof textStyle === 'object' ? textStyle : undefined;

  const defaultIcon =
    resolvedVariant === 'google' ? (
      <Image
        source={ASSETS.icons.google}
        style={{ width: 20, height: 20 }}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
    ) : null;

  const resolvedIcon = icon || defaultIcon;
  const spinnerColor =
    resolvedVariant === 'primary' || resolvedVariant === 'danger'
      ? colors.textInverse
      : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPressIn={(event) => {
        setPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        onPressOut?.(event);
      }}
      className={cx(
        'max-w-full flex-row items-center justify-center gap-sm rounded-md border-[1.5px]',
        SIZE[size],
        CONTAINER[resolvedVariant],
        pressed && !isDisabled && CONTAINER_PRESSED[resolvedVariant],
        isDisabled && 'opacity-50',
        fullWidth ? 'self-stretch' : 'self-center',
        className
      )}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          {resolvedIcon}
          {title ? (
            <AppText
              variant="button"
              fontSize={TEXT_SIZE[size]}
              className={cx('shrink text-center', LABEL[resolvedVariant], textClassName)}
              style={textStyleObject}
            >
              {title}
            </AppText>
          ) : null}
        </>
      )}
    </Pressable>
  );
}

export default Button;
