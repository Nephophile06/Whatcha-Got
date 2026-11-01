/**
 * Card — base surface container with token radius, border and shadow.
 *
 * Props:
 * - variant: 'surface' | 'blush' | 'mint' | 'butter' | 'periwinkle' | 'plain'
 * - padding: 'none' | 'sm' | 'md' | 'lg'
 * - elevation: 'none' | 'sm' | 'md' | 'lg' (token shadows)
 * - bordered: boolean (default true)
 * - onPress: optional; renders a pressable card
 * - className / style
 */
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { shadows } from '../../theme/tokens';
import { cx } from './cx';

const VARIANTS = {
  surface: 'bg-surface',
  plain: 'bg-transparent',
  blush: 'bg-blush',
  mint: 'bg-mint',
  butter: 'bg-butter',
  periwinkle: 'bg-periwinkle',
};

const PADDING = {
  none: '',
  sm: 'p-sm',
  md: 'p-md',
  lg: 'p-lg',
};

export function Card({
  children,
  variant = 'surface',
  padding = 'md',
  elevation = 'sm',
  bordered = true,
  onPress,
  className,
  style,
  ...props
}) {
  const [pressed, setPressed] = useState(false);

  const cardClassName = cx(
    'rounded-lg',
    VARIANTS[variant] || VARIANTS.surface,
    PADDING[padding],
    bordered && 'border border-border',
    pressed && 'opacity-90',
    className
  );

  const cardStyle = [elevation !== 'none' ? shadows[elevation] : null, style];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        accessibilityRole="button"
        className={cardClassName}
        style={cardStyle}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={cardClassName} style={cardStyle} {...props}>
      {children}
    </View>
  );
}

export default Card;
