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
 * Geometry comes from design/screens/profile.png: the panel starts at y 821
 * with 22 px rounded top corners, a 254,251,230 wash, icons whose ink is
 * ~29x27 (centres 62/134/206/278/350), and labels whose ink starts at y 878.
 * The active Profile glyph is the designer's person + burgundy smile.
 *
 * Labels never scale with the device font setting (A1 rule).
 * Icons resolve from the central asset registry (ASSETS.tabIcons).
 */
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ASSETS } from '../../constants/assets';
import { colors } from '../../theme/tokens';
import { useStage } from '../../lib/stage';
import { AppText } from './AppText';
import { cx } from './cx';

export const TABS = [
  { key: 'home', label: 'Home', icon: ASSETS.tabIcons.home },
  { key: 'calorie', label: 'Calorie', icon: ASSETS.tabIcons.calorie },
  { key: 'list', label: 'List', icon: ASSETS.tabIcons.list },
  { key: 'favorites', label: 'Favorites', icon: ASSETS.tabIcons.favorites },
  { key: 'profile', label: 'Profile', icon: ASSETS.tabIcons.profile },
];

// Design geometry in 412-base units (see the header note).
const TAB_BAR = {
  padTop: 18.5,
  padX: 27,
  padBottom: 25.2,
  icon: 33,
  labelGap: 2.5,
  radius: 22,
  labelSize: 12,
};

// Per-glyph vertical nudge so every icon's ink lands on the designed rows
// (icons share one 33 px box but their exported canvases have different padding).
const ICON_NUDGE = {
  home: -1,
  calorie: -1,
  list: -1,
  favorites: -1,
  profile: 3.7,
};

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
  const { s } = useStage();
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
    <View className={cx(className)} style={style}>
      {/* Page-coloured backdrop so the rounded corners do not expose the
          navigator's grey canvas; the designer's wash continues behind them. */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: cream ? colors.tabBarCreamBackdrop : colors.surface },
        ]}
      />

      <View
        accessibilityRole="tablist"
        className="flex-row"
        style={[
          {
            borderTopLeftRadius: s(TAB_BAR.radius),
            borderTopRightRadius: s(TAB_BAR.radius),
            overflow: 'hidden',
            paddingTop: s(TAB_BAR.padTop),
            paddingHorizontal: s(TAB_BAR.padX),
            paddingBottom: Math.max(bottomInset ?? insets.bottom, s(TAB_BAR.padBottom)),
          },
        ]}
      >
        <LinearGradient
          colors={
            cream
              ? [colors.tabBarCreamTop, colors.tabBarCreamBottom]
              : [colors.surface, colors.surface]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />

        {TABS.map((tab) => {
        const active = currentKey === tab.key;
        const activeProfile = active && tab.key === 'profile';

        return (
          <Pressable
            key={tab.key}
            onPress={() => handlePress(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: active }}
            className="flex-1 items-center"
            style={{ minHeight: s(TAB_BAR.icon + 18) }}
          >
            <View
              style={{
                height: s(TAB_BAR.icon),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {activeProfile ? (
                <Image
                  source={ASSETS.tabIcons.profileActive}
                  contentFit="contain"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    width: s(35),
                    height: s(28),
                    transform: [{ translateY: s(ICON_NUDGE.profile) }],
                  }}
                />
              ) : (
                <Image
                  source={tab.icon}
                  contentFit="contain"
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  style={{
                    width: s(TAB_BAR.icon),
                    height: s(TAB_BAR.icon),
                    tintColor: active ? colors.primary : colors.textPrimary,
                    transform: [{ translateY: s(ICON_NUDGE[tab.key] || 0) }],
                  }}
                />
              )}
            </View>

            <AppText
              variant="caption"
              fontSize={TAB_BAR.labelSize}
              allowFontScaling={false}
              className={cx(active ? 'font-sans-semibold text-primary' : 'text-text-primary')}
              style={{ marginTop: s(TAB_BAR.labelGap) }}
            >
              {tab.label}
            </AppText>
          </Pressable>
        );
      })}
      </View>
    </View>
  );
}

export default TabBar;
