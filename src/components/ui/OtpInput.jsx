/**
 * OtpInput — segmented one-time-code field.
 *
 * Props:
 * - length: number of boxes (default 5)
 * - value: current code string
 * - onChange: (code: string) => void
 * - error: boolean, applies the error border/background
 * - errorMessage: string shown below the boxes when error is true
 * - autoFocus: focuses the first box on mount
 * - className
 *
 * Behavior: auto-advances on entry, backspace clears the current box then
 * moves back once empty, and pasting a code fills all boxes at once.
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '../../theme/tokens';
import { AppText } from './AppText';
import { cx } from './cx';

function toDigits(text, length) {
  const clean = String(text ?? '').replace(/\D/g, '').slice(0, length);
  return Array.from({ length }, (_, index) => clean[index] ?? '');
}

export function OtpInput({
  length = 5,
  value = '',
  onChange,
  error = false,
  errorMessage,
  autoFocus = false,
  className,
}) {
  const [digits, setDigits] = useState(() => toDigits(value, length));
  const [focusedIndex, setFocusedIndex] = useState(autoFocus ? 0 : null);
  const inputRefs = useRef([]);
  const lastEmitted = useRef(value);

  useEffect(() => {
    if (value !== lastEmitted.current) {
      setDigits(toDigits(value, length));
      lastEmitted.current = value;
    }
  }, [value, length]);

  const focusBox = (index) => {
    inputRefs.current[index]?.focus();
  };

  const commit = (nextDigits) => {
    const code = nextDigits.join('');
    lastEmitted.current = code;
    setDigits(nextDigits);
    onChange?.(code);
  };

  const handleChange = (text, index) => {
    const clean = text.replace(/\D/g, '');

    // Paste / autofill: distribute the code across boxes.
    if (clean.length > 1) {
      const nextDigits = toDigits(clean, length);
      commit(nextDigits);
      focusBox(Math.min(clean.length, length - 1));
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = clean;
    commit(nextDigits);

    if (clean && index < length - 1) {
      focusBox(index + 1);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key !== 'Backspace') return;
    if (digits[index] || index === 0) return;

    const nextDigits = [...digits];
    nextDigits[index - 1] = '';
    commit(nextDigits);
    focusBox(index - 1);
  };

  return (
    <View className={cx('my-md w-full items-center', className)}>
      <View className="w-full flex-row justify-center gap-sm">
        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digits[index] || ''}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex((current) => (current === index ? null : current))}
            autoFocus={autoFocus && index === 0}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            maxLength={length}
            selectTextOnFocus
            selectionColor={colors.primary}
            allowFontScaling={false}
            accessibilityLabel={`Verification digit ${index + 1}`}
            className={cx(
              'min-h-[56px] max-w-[56px] flex-1 rounded-md border-[1.5px] py-0 text-center font-sans-semibold',
              error
                ? 'border-error bg-error-light text-error'
                : focusedIndex === index
                  ? 'border-primary bg-surface text-text-primary'
                  : 'border-text-muted bg-surface text-text-primary'
            )}
            style={{ fontSize: 22, lineHeight: 28 }}
          />
        ))}
      </View>

      {error && errorMessage ? (
        <AppText
          variant="caption"
          accessibilityRole="alert"
          className="mt-sm text-center font-sans-medium text-error"
        >
          {errorMessage}
        </AppText>
      ) : null}
    </View>
  );
}

export default OtpInput;
