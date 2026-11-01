import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/tokens';

export const OtpInput = ({ length = 6, value = '', onChange, hasError = false, errorMessage }) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);

  const digits = value.split('');
  while (digits.length < length) {
    digits.push('');
  }

  const handleChange = (text, index) => {
    // If user pasted multi-char code
    if (text.length > 1) {
      const sanitized = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange(sanitized);
      const nextIndex = Math.min(sanitized.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = text.replace(/[^0-9]/g, '');
    const combined = newDigits.join('');
    onChange(combined);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {Array.from({ length }).map((_, index) => {
          const isFocused = focusedIndex === index;
          return (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={digits[index] || ''}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={[
                styles.box,
                isFocused && styles.boxFocused,
                hasError && styles.boxError,
              ]}
              accessibilityLabel={`Verification digit ${index + 1}`}
            />
          );
        })}
      </View>
      {hasError && errorMessage ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: spacing.md,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    width: '100%',
  },
  box: {
    width: 44,
    height: 54,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    textAlign: 'center',
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  boxFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  boxError: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
    color: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

export default OtpInput;

