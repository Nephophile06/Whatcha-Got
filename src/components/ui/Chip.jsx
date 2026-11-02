/**
 * Chip — pill-shaped multi-select / filter control (selection is controlled by the parent).
 *
 * Props:
 * - label: string
 * - selected: boolean
 * - onPress: () => void
 * - icon: optional React node
 * - size: 'sm' | 'md'
 * - className / style / textClassName
 */
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { AppText } from './AppText';
import { cx } from './cx';

export function Chip({
  label,
  selected = false,
  onPress,
  icon,
  size = 'md',
  className,
  style,
  textClassName,
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      className={cx(
        'min-h-[44px] flex-row items-center justify-center gap-xs rounded-full border-[1.5px] py-xs',
        size === 'sm' ? 'px-sm' : 'px-md',
        selected
          ? pressed
            ? 'border-primary-dark bg-primary-dark'
            : 'border-primary bg-primary'
          : pressed
            ? 'border-primary-light bg-primary-blush'
            : 'border-border bg-surface',
        className
      )}
      style={style}
    >
      {icon}
      <AppText
        variant="label"
        fontSize={size === 'sm' ? 12 : 14}
        className={cx(
          selected ? 'text-text-inverse' : 'text-text-primary',
          textClassName
        )}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

export default Chip;
