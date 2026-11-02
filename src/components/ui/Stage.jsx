/**
 * Stage — scrollable 412 x 917 design surface.
 *
 * The content column is capped at 480 wide and centred. Background layers are
 * rendered full-bleed behind the column. The ScrollView has minHeight = H, so
 * normal phones never scroll; only a short screen with large OS text does.
 *
 * Props:
 * - background: full-bleed node rendered behind the stage (photo, gradient art)
 * - minHeight: override the content min-height (tab screens exclude the tab bar)
 * - scroll: set false to disable scrolling entirely
 * - className / style / contentContainerStyle
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useStage } from '../../lib/stage';
import { cx } from './cx';

export function Stage({
  children,
  background,
  minHeight,
  scroll = true,
  className,
  style,
  contentContainerStyle,
  ...props
}) {
  const { W, H } = useStage();
  const height = minHeight ?? H;

  const column = (
    <View style={{ width: W, minHeight: height }}>{children}</View>
  );

  return (
    <View className={cx('flex-1 w-full', className)} style={style}>
      {background ? (
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]}
        >
          {background}
        </View>
      ) : null}

      {scroll ? (
        <ScrollView
          className="flex-1 w-full"
          contentContainerStyle={[
            { minHeight: height, width: '100%', alignItems: 'center' },
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          {...props}
        >
          {column}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          {column}
        </View>
      )}
    </View>
  );
}

export default Stage;
