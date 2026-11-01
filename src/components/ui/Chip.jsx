import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme/tokens';

export const Chip = ({
  label,
  selected = false,
  onPress,
  icon,
  style,
  textStyle,
  size = 'md', // 'sm' | 'md'
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.chip,
        styles[`size_${size}`],
        selected ? styles.selectedChip : styles.unselectedChip,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
    >
      {icon ? icon : null}
      <Text
        style={[
          styles.text,
          styles[`text_${size}`],
          selected ? styles.selectedText : styles.unselectedText,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    borderWidth: 1.5,
    marginRight: spacing.xs + 2,
    marginBottom: spacing.xs + 2,
  },
  size_sm: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
  },
  size_md: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 4,
  },
  unselectedChip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  selectedChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontWeight: '600',
  },
  size_sm_text: {
    fontSize: typography.fontSize.xs,
  },
  size_md_text: {
    fontSize: typography.fontSize.sm,
  },
  unselectedText: {
    color: colors.textPrimary,
  },
  selectedText: {
    color: colors.textInverse,
  },
});

export default Chip;

