/**
 * TabBar — custom bottom navigation with five app tabs.
 *
 * Props (two modes):
 * - Router mode (used by app/(tabs)/_layout.jsx): pass expo-router's
 *   `state` and `navigateToTab` props (expo-router takes a route key).
 * - Preview / controlled mode: pass `activeKey` and `onChange(key)`.
 * - fallbackKey: key highlighted when the active route is not a tab
 *   (e.g. the account-settings route lives inside the tabs group).
 * - cream: boolean, warm tab bar used by Profile / Account Settings.
 * - bottomInset: optional override for the safe-area bottom padding (previews).
 * - className / style
 *
 * Labels never scale with the device font setting (A1 rule).
 * Icons resolve from the central asset registry (ASSETS.tabIcons).
 */
import React from 'react';
import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ASSETS } from '../../constants/assets';
import { colors, shadows, spacing } from '../../theme/tokens';
import { AppText } from './AppText';
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
  fallbackKey,
  cream = false,
  bottomInset,
  className,
  style,
}) {
  const insets = useSafeAreaInsets();
  const routeKey = state ? state.routes[state.index]?.name : activeKey;
  const currentKey = TABS.some((tab) => tab.key === routeKey)
    ? routeKey
    : fallbackKey || TABS[0].key;

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
        'flex-row rounded-t-xxl border-t border-border px-xs pt-xs',
        cream ? 'bg-butter' : 'bg-surface',
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
            className="min-h-[48px] flex-1 items-center justify-center px-xs py-xs"
          >
            <Image
              source={tab.icon}
              contentFit="contain"
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                width: 26,
                height: 26,
                tintColor: active ? colors.primary : colors.textPrimary,
              }}
            />

            <AppText
              variant="caption"
              allowFontScaling={false}
              className={cx(
                'mt-xs',
                active
                  ? 'font-sans-semibold text-primary'
                  : 'text-text-primary'
              )}
            >
              {tab.label}
            </AppText>

            <View
              className={cx(
                'mt-xs h-[2px] w-lg rounded-full',
                active ? 'bg-primary' : 'bg-transparent'
              )}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default TabBar;
