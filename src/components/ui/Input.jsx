/**
 * Input — labelled text field with persistent label above the field.
 *
 * Props:
 * - label: string, always visible above the field (never placeholder-only)
 * - value / onChangeText
 * - placeholder, helperText
 * - error: string | boolean; shows the error message and error styling
 * - disabled: boolean, dims the field and blocks editing
 * - compact: boolean, 44px field height and 14px value text (dense forms)
 * - secure / secureTextEntry: password mode (adds a show/hide toggle)
 * - showPasswordToggle: override the automatic password toggle
 * - required: boolean, adds a required asterisk
 * - leftIcon / rightIcon: optional React nodes
 * - className / style / inputClassName / inputStyle
 *
 * Contrast: textPrimary on surface exceeds WCAG AAA; muted placeholders meet AA.
 */
import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/tokens';
import { AppText } from './AppText';
import { cx } from './cx';

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  disabled = false,
  compact = false,
  secure = false,
  secureTextEntry = false,
  showPasswordToggle,
  required = false,
  leftIcon,
  rightIcon,
  outsideIcon,
  outsideIconClassName,
  className,
  style,
  inputClassName,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = secure || secureTextEntry;
  const canTogglePassword = showPasswordToggle ?? isPassword;
  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : null;
  const isFilled = value !== undefined && value !== null && String(value).length > 0;

  return (
    <View className={cx('mb-md w-full', className)} style={style}>
      {label ? (
        <AppText
          variant="label"
          className={cx(
            'mb-xs',
            hasError
              ? 'text-error'
              : disabled
                ? 'text-text-muted'
                : focused
                  ? 'text-primary'
                  : 'text-text-primary'
          )}
        >
          {label}
          {required ? (
            <AppText variant="label" className="text-error">
              {' '}
              *
            </AppText>
          ) : null}
        </AppText>
      ) : null}

      {/* The outside icon is centred on the field box only, never on the label. */}
      <View className="flex-row items-center">
        {outsideIcon ? (
          <View
            className={cx(
              'mr-md w-[34px] shrink-0 items-center justify-center',
              outsideIconClassName
            )}
          >
            {outsideIcon}
          </View>
        ) : null}

        <View
          className={cx(
            compact ? 'min-h-[44px]' : 'min-h-[52px]',
            'flex-1 flex-row items-center rounded-md border-[1.5px] px-md',
            hasError
              ? 'border-error bg-error-light'
              : disabled
                ? 'border-border bg-surface-subtle opacity-60'
                : focused
                  ? 'border-primary bg-surface'
                  : isFilled
                    ? 'border-text-muted bg-surface'
                    : 'border-text-muted bg-surface-subtle'
          )}
        >
          {leftIcon ? <View className="mr-sm">{leftIcon}</View> : null}

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            selectionColor={colors.primary}
            editable={!disabled}
            secureTextEntry={isPassword && !passwordVisible}
            accessibilityLabel={label}
            accessibilityState={{ disabled }}
            allowFontScaling
            maxFontSizeMultiplier={1.3}
            onFocus={(event) => {
              setFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setFocused(false);
              onBlur?.(event);
            }}
            autoCapitalize="none"
            className={cx(
              'min-w-0 flex-1 bg-transparent py-sm font-sans',
              compact ? 'text-sm' : 'text-md',
              disabled ? 'text-text-muted' : 'text-text-primary',
              inputClassName
            )}
            style={inputStyle}
            {...props}
          />

          {canTogglePassword ? (
            <Pressable
              onPress={() => setPasswordVisible((visible) => !visible)}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
              className="ml-sm h-11 w-11 items-center justify-center"
            >
              <Ionicons
                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.textMuted}
              />
            </Pressable>
          ) : rightIcon ? (
            <View className="ml-sm">{rightIcon}</View>
          ) : null}
        </View>
      </View>

      {hasError && errorMessage ? (
        <AppText
          variant="caption"
          accessibilityRole="alert"
          className="mt-xs font-sans-medium text-error"
        >
          {errorMessage}
        </AppText>
      ) : helperText ? (
        <AppText variant="caption" className="mt-xs text-text-secondary">
          {helperText}
        </AppText>
      ) : null}
    </View>
  );
}

export default Input;
