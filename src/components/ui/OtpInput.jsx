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
 * - boxRadius / boxBorderWidth: hairline box styling (default 14 / 1)
 * - inset: translucent white fill over a full-bleed page wash
 * - shadow: soft drop shadow under each box (design default)
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
  boxRadius = 14,
  boxBorderWidth = 0.33,
  gap = 8,
  bare = false,
  className,
}) {
  const { s } = useStage();
  const [digits, setDigits] = useState(() => toDigits(value, length));
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
              'py-0 text-center font-sans-semibold',
              error ? 'border-error text-error' : 'border-black text-text-primary'
            )}
            style={{
              width: s(boxSize),
              height: s(boxHeight),
              borderRadius: s(boxRadius),
              borderWidth: boxBorderWidth,
              backgroundColor: error ? colors.errorLight : 'transparent',
              fontSize: s(24),
              lineHeight: s(30),
              // The design boxes are not filled: the page wash shows through.
              shadowColor: colors.black,
              shadowOpacity: 0.33,
              shadowRadius: s(5),
              shadowOffset: { width: 0, height: s(2.5) },
              elevation: 2,
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
