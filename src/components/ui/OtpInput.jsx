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
 * - boxSize / boxHeight: box width and height (default 56)
 * - gap: space between boxes (default 8)
 * - bare: removes the outer vertical margin (for Figma-placed rows)
 * - className
 *
 * Behavior: auto-advances on entry, backspace clears the current box then
 * moves back once empty, and pasting a code fills all boxes at once.
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { colors } from '../../theme/tokens';
import { useStage } from '../../lib/stage';
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
  boxSize = 56,
  boxHeight = 56,
  gap = 8,
  bare = false,
  className,
}) {
  const { s } = useStage();
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
    <View className={cx('w-full items-center', bare ? null : 'my-md', className)}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: s(gap),
        }}
      >
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
              'rounded-lg border-[1.5px] py-0 text-center font-sans-semibold',
              error
                ? 'border-error bg-error-light text-error'
                : focusedIndex === index
                  ? 'border-primary bg-surface text-text-primary'
                  : 'border-text-muted bg-surface text-text-primary'
            )}
            style={{
              width: s(boxSize),
              height: s(boxHeight),
              fontSize: s(24),
              lineHeight: s(30),
            }}
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
