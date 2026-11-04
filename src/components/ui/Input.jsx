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
 * - flush: boolean, removes the default bottom margin (fields placed by rect)
 * - boxStyle: overrides for the field box (radius, border, fill) when a design
 *   uses a transparent hairline field instead of the default filled box
 * - outline: 1px hairline box on a transparent fill (Account Settings). The
 *   border darkens on focus and turns error red when validation fails.
 * - floatingLabel: the label sits at the placeholder position while the field
 *   is empty and shrinks inside the box once focused or filled. Designs that
 *   only show a placeholder keep a persistent label without a second line.
 * - secure / secureTextEntry: password mode (adds a show/hide toggle)
 * - showPasswordToggle: override the automatic password toggle
 * - required: boolean, adds a required asterisk
 * - leftIcon / rightIcon: optional React nodes
 * - className / style / inputClassName / inputStyle
 *
 * Contrast: textPrimary on surface exceeds WCAG AAA; muted placeholders meet AA.
 */
import React, { useState } from 'react';
import { View, TextInput, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/tokens';
import { useStage } from '../../lib/stage';
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
  flush = false,
  outline = false,
  floatingLabel = false,
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
  boxStyle,
  inputClassName,
  inputStyle,
  onFocus,
  onBlur,
  ...props
}) {
  const { s } = useStage();
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = secure || secureTextEntry;
  const canTogglePassword = showPasswordToggle ?? isPassword;
  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : null;
  const isFilled = value !== undefined && value !== null && String(value).length > 0;
  // The label sits at the placeholder position until the field is in use.
  const labelFloating = floatingLabel && (focused || isFilled || hasError);

  return (
    <View className={cx(flush ? 'w-full' : 'mb-md w-full', className)} style={style}>
      {label && !floatingLabel ? (
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
          style={[
            outline
              ? {
                  borderRadius: s(5),
                  borderWidth: 1,
                  borderColor: hasError
                    ? colors.error
                    : focused
                      ? colors.textPrimary
                      : colors.hairline,
                  backgroundColor: 'transparent',
                  paddingHorizontal: s(11),
                }
              : null,
            boxStyle,
          ]}
        >
          {leftIcon ? <View className="mr-sm">{leftIcon}</View> : null}

          <View
            style={{
              flex: 1,
              minWidth: 0,
              alignSelf: 'stretch',
              justifyContent: labelFloating ? 'flex-end' : 'center',
            }}
          >
            {floatingLabel ? (
              <View
                pointerEvents="none"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={
                  labelFloating
                    ? { position: 'absolute', left: 0, right: 0, top: s(3) }
                    : { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }
                }
              >
                <AppText
                  variant="caption"
                  fontSize={labelFloating ? 10 : compact ? 14 : 16}
                  numberOfLines={1}
                  style={{
                    color: hasError
                      ? colors.error
                      : labelFloating
                        ? colors.textMuted
                        : colors.fieldLine,
                  }}
                >
                  {label}
                  {required ? ' *' : ''}
                </AppText>
              </View>
            ) : null}

            <TextInput
              value={value}
              onChangeText={onChangeText}
              placeholder={floatingLabel ? undefined : placeholder}
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
                'min-w-0 w-full bg-transparent py-sm font-sans outline-none',
                compact ? 'text-sm' : 'text-md',
                disabled ? 'text-text-muted' : 'text-text-primary',
                inputClassName
              )}
              style={[
                Platform.OS === 'web' ? { outlineStyle: 'none' } : null,
                floatingLabel && labelFloating
                  ? {
                      height: s(20),
                      paddingTop: 0,
                      paddingBottom: 0,
                      marginBottom: s(6),
                    }
                  : null,
                inputStyle,
              ]}
              {...props}
            />
          </View>

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
