/**
 * CategoryTile — image + label selection tile (multi-select handled by the parent).
 *
 * Props:
 * - image: expo-image source from the asset registry (optional)
 * - label: string
 * - selected: boolean
 * - onPress: () => void
 * - tint: pastel fallback when no image is supplied
 *   ('blush' | 'mint' | 'butter' | 'periwinkle' | 'softBlue')
 * - className / style
 */
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../theme/tokens';
import { AppText } from './AppText';
import { cx } from './cx';

const TINTS = {
  blush: 'bg-blush',
  mint: 'bg-mint',
  butter: 'bg-butter',
  periwinkle: 'bg-periwinkle',
  softBlue: 'bg-softBlue',
};

export function CategoryTile({
  image,
  label,
  selected = false,
  onPress,
  tint = 'blush',
  className,
  style,
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
        'w-[23%] flex-grow-0 rounded-md border bg-surface',
        selected ? 'border-primary' : 'border-border',
        pressed && 'opacity-90',
        className
      )}
      style={[shadows.sm, style]}
    >
      <View
        className={cx('w-full overflow-hidden rounded-t-md', TINTS[tint] || TINTS.blush)}
        style={{ aspectRatio: 1.55 }}
      >
        {image ? (
          <Image
            source={image}
            style={{ width: '100%', height: '100%' }}
            contentFit="contain"
            transition={150}
            accessibilityIgnoresInvertColors
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
        ) : (
          <View className="h-full w-full items-center justify-center">
            <Ionicons name="restaurant-outline" size={24} color={colors.textSecondary} />
          </View>
        )}

        {selected ? (
          <View className="absolute right-xs top-xs h-lg w-lg items-center justify-center rounded-full bg-primary">
            <Ionicons name="checkmark" size={14} color={colors.textInverse} />
          </View>
        ) : null}
      </View>

      <AppText
        variant="label"
        fontSize={13}
        className={cx(
          'px-xs py-xs text-center',
          selected ? 'text-primary' : 'text-text-primary'
        )}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

export default CategoryTile;
