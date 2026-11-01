/**
 * TabBar — custom bottom navigation with five app tabs.
 *
 * Props (two modes):
 * - Router mode (used by app/(tabs)/_layout.jsx): pass expo-router's
 *   `state` and `navigateToTab` props (expo-router takes a route key).
 * - Preview / controlled mode: pass `activeKey` and `onChange(key)`.
 * - bottomInset: optional override for the safe-area bottom padding (previews).
 * - className / style
 *
 * Icons resolve from the central asset registry (ASSETS.tabIcons).
 */
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ASSETS } from '../../constants/assets';
import { colors, shadows, spacing } from '../../theme/tokens';
import { cx } from './cx';

export const TABS = [
  { key: 'home', label: 'Home', icon: ASSETS.tabIcons.home },
  { key: 'calorie', label: 'Calorie', icon: ASSETS.tabIcons.calorie },
  { key: 'list', label: 'List', icon: ASSETS.tabIcons.list },
  { key: 'favorites', label: 'Favorites', icon: ASSETS.tabIcons.favorites },
  { key: 'profile', label: 'Profile', icon: ASSETS.tabIcons.profile },
];

export function TabBar({
  state,
  navigation,
  navigateToTab,
  activeKey,
  onChange,
  bottomInset,
  className,
  style,
}) {
  const insets = useSafeAreaInsets();
  const currentKey = state
    ? state.routes[state.index]?.name
    : activeKey || TABS[0].key;

  const handlePress = (key) => {
    onChange?.(key);
    if (!state) return;

    const route = state.routes.find((item) => item.name === key);
    if (!route) return;

    if (navigateToTab) {
      navigateToTab(route.key);
    } else {
      navigation?.navigate(route.name);
    }
  };

  return (
    <View
      accessibilityRole="tablist"
      className={cx(
        'flex-row border-t border-border bg-surface px-xs pt-xs',
        className
      )}
      style={[
        shadows.md,
        { paddingBottom: Math.max(bottomInset ?? insets.bottom, spacing.sm) },
        style,
      ]}
    >
      {TABS.map((tab) => {
        const active = currentKey === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => handlePress(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: active }}
            className="min-h-[48px] flex-1 items-center justify-center py-xs"
          >
            <View
              className={cx(
                'items-center justify-center rounded-full px-md py-xs',
                active ? 'bg-primary-blush' : 'bg-transparent'
              )}
            >
              <Ionicons
                name={active ? tab.icon.active : tab.icon.inactive}
                size={22}
                color={active ? colors.primary : colors.textMuted}
              />
            </View>

            <Text
              className={cx(
                'mt-xs text-xs',
                active
                  ? 'font-sans-semibold text-primary'
                  : 'font-sans text-text-muted'
              )}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default TabBar;
