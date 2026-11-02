/**
 * Screen — app canvas with safe-area insets and optional pastel gradient.
 *
 * Props:
 * - variant: 'plain' | 'blue' | 'green' | 'pink' | 'yellow' | 'onboarding'
 *   (see theme/tokens.js gradients)
 * - scroll: boolean, wraps content in a ScrollView (default false)
 * - padded: boolean, applies horizontal screen padding (default true)
 * - statusBarStyle: 'dark-content' | 'light-content'
 * - edges: SafeAreaView edges (default top + bottom)
 * - footer: node rendered below the scroll area (e.g. sticky CTA)
 * - className / contentContainerClassName / style / contentContainerStyle
 * - scrollViewProps: extra props forwarded to ScrollView
 *
 * All colors and spacing come from design tokens.
 */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../../theme/tokens';
import { cx } from './cx';

export function Screen({
  children,
  variant = 'plain',
  scroll = false,
  padded = true,
  statusBarStyle = 'dark-content',
  edges = ['top', 'bottom'],
  footer,
  className,
  contentContainerClassName,
  style,
  contentContainerStyle,
  scrollViewProps,
}) {
  const gradient = gradients[variant];
  const barStyle = statusBarStyle === 'light-content' ? 'light' : 'dark';

  return (
    <View className={cx('flex-1 bg-background', className)} style={style}>
      {gradient ? (
        <LinearGradient
          colors={gradient.colors}
          locations={gradient.locations}
          start={gradient.start}
          end={gradient.end}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      ) : null}

      <StatusBar style={barStyle} translucent backgroundColor="transparent" />

      <SafeAreaView edges={edges} style={styles.safeArea}>
        {scroll ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName={cx(
              'w-full flex-grow',
              padded && 'px-md pt-sm pb-xxl',
              contentContainerClassName
            )}
            contentContainerStyle={contentContainerStyle}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            {...scrollViewProps}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            className={cx('w-full flex-1', padded && 'px-md', contentContainerClassName)}
            style={contentContainerStyle}
          >
            {children}
          </View>
        )}

        {footer}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default Screen;
