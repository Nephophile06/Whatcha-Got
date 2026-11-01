/**
 * Skeleton — pulsing loading placeholder.
 *
 * Props:
 * - width: number | string (default '100%')
 * - height: number (default 16)
 * - rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * - className / style
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { colors } from '../../theme/tokens';
import { cx } from './cx';

const ROUNDED = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
};

export function Skeleton({
  width = '100%',
  height = 16,
  rounded = 'md',
  className,
  style,
}) {
  const opacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      className={cx('overflow-hidden bg-surface-subtle', ROUNDED[rounded], className)}
      style={[{ width, height }, style]}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: colors.surface,
          opacity,
        }}
      />
    </View>
  );
}

export default Skeleton;
