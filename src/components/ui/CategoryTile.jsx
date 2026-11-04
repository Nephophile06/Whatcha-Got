/**
 * CategoryTile — image + label selection tile (multi-select handled by the parent).
 *
 * Props:
 * - image: expo-image source from the asset registry (optional)
 * - label: string
 * - selected: boolean
 * - onPress: () => void
 * - tint: pastel fallback behind the icon when no image is supplied
 *   ('blush' | 'mint' | 'butter' | 'periwinkle' | 'softBlue')
 * - art: { w, h } rendered size in 412-base units
 * - artBand / labelGap: tile geometry in 412-base units (dashboard layout)
 * - className / style
 *
 * Visual: the Figma dashboard tiles are transparent cards on the page wash with
 * a ~0.5dp black outline. The designer placed each category PNG at exactly 1/3
 * of its exported pixel size (the assets are 3x), so the art is rendered at
 * nativeSize / 3 — a uniform contain box made wide categories too small and
 * compact ones too large. The art band is bottom-anchored inside an 84-px tile
 * and the label sits at a fixed height, so every row lines up.
 */
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/tokens';
import { useStage } from '../../lib/stage';
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
  art = { w: 52, h: 42 },
  artBand = 50,
  labelGap = 5,
  labelSize = 14,
  className,
  style,
}) {
  const { s } = useStage();
  const [pressed, setPressed] = useState(false);
  const artW = art.w;
  const artH = art.h;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      className={cx('items-center bg-transparent', pressed && 'opacity-80', className)}
      style={[
        {
          borderRadius: s(8),
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.hairline,
        },
        style,
      ]}
    >
      <View
        className="items-center"
        style={{ height: s(artBand), width: '100%', justifyContent: 'flex-end' }}
        pointerEvents="none"
      >
        {image ? (
          <Image
            source={image}
            style={{
              width: s(artW),
              height: s(artH),
              transform: [{ translateY: s(art.dy || 0) }],
            }}
            contentFit="contain"
            transition={150}
            accessibilityIgnoresInvertColors
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          />
        ) : (
          <View
            className={cx('items-center justify-center rounded-sm', TINTS[tint] || TINTS.blush)}
            style={{ width: s(artW), height: s(artH) }}
          >
            <Ionicons name="restaurant-outline" size={22} color={colors.textSecondary} />
          </View>
        )}
      </View>

      <AppText
        variant="body"
        fontSize={labelSize}
        numberOfLines={1}
        className={cx('text-center', selected ? 'text-primary' : 'text-black')}
        style={{ marginTop: s(labelGap), paddingHorizontal: s(4) }}
      >
        {label}
      </AppText>

      {selected ? (
        <View
          className="absolute right-xs top-xs items-center justify-center rounded-full bg-primary"
          style={{ width: s(16), height: s(16) }}
        >
          <Ionicons name="checkmark" size={10} color={colors.textInverse} />
        </View>
      ) : null}
    </Pressable>
  );
}

export default CategoryTile;
