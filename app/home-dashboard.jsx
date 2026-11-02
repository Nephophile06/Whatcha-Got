import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Screen, Stage, AppText, Button, CategoryTile, Toast } from '../src/components/ui';
import { ASSETS } from '../src/constants/assets';
import { usePreferencesStore } from '../src/store/preferencesStore';
import { useStage } from '../src/lib/stage';
import { colors } from '../src/theme/tokens';
import L from '../src/layouts/home-dashboard';

const CRAVINGS = [
  { id: 'smoothies', label: 'smoothies', image: ASSETS.images.categories.smoothies },
  { id: 'dessert', label: 'dessert', image: ASSETS.images.categories.dessert },
  { id: 'salad', label: 'salad', image: ASSETS.images.categories.salad },
  { id: 'pancake', label: 'pancake', image: ASSETS.images.categories.pancake },
  { id: 'burger', label: 'burger', image: ASSETS.images.categories.burger },
  { id: 'fried-rice', label: 'fried rice', image: ASSETS.images.categories.friedRice },
  { id: 'ramen', label: 'ramen', image: ASSETS.images.categories.ramen },
  { id: 'drinks', label: 'drinks', image: ASSETS.images.categories.drinks },
  { id: 'soup', label: 'soup', image: ASSETS.images.categories.soup },
  { id: 'pasta', label: 'pasta', image: ASSETS.images.categories.pasta },
  { id: 'pudding', label: 'pudding', image: ASSETS.images.categories.pudding },
  { id: 'fries', label: 'fries', image: ASSETS.images.categories.fries },
];

/**
 * Home Dashboard — bands from design/screens/home-dashboard.png (hero 44,
 * title 258, subtitle 300, search 359, grid 443, continue 745, skip 805).
 * The PNG has no tab bar, so this route lives outside app/(tabs). Selection is
 * kept in preferencesStore; the suggestions screen is not designed yet, so
 * both actions show an info toast.
 */
export default function HomeDashboardScreen() {
  const { W, H, fx, fy, s } = useStage();
  const selectedCategories = usePreferencesStore((state) => state.selectedCategories);
  const toggleCategory = usePreferencesStore((state) => state.toggleCategory);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const showComingSoon = () => setToast({ type: 'info', message: 'Suggestions coming soon' });

  return (
    <View className="flex-1">
      <Screen
        variant="mintPage"
        padded={false}
        edges={[]}
        statusBarStyle="dark-content"
      >
        <Stage>
          <View style={{ width: W, minHeight: H }}>
            <Image
              source={ASSETS.images.cravingsHeroBanner}
              contentFit="cover"
              accessibilityLabel="Kitchen table with baking ingredients"
              style={{
                marginTop: fy(L.hero.y),
                width: W,
                height: s(L.hero.h),
              }}
            />

            <AppText
              variant="display"
              fontSize={L.title.size}
              numberOfLines={L.title.lines}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              className="text-center"
              style={{
                marginTop: fy(L.title.y - (L.hero.y + L.hero.h)),
                marginLeft: fx(L.title.x),
                width: fx(L.title.w),
              }}
            >
              Tell us what you crave
            </AppText>

            <AppText
              variant="body"
              fontSize={L.subtitle.size}
              className="text-center text-text-primary"
              style={{
                marginTop: fy(L.subtitle.y - (L.title.y + L.title.h)),
                marginLeft: fx(L.subtitle.x),
                width: fx(L.subtitle.w),
              }}
            >
              we will suggest that match your vibe
            </AppText>

            <View
              className="flex-row items-center rounded-md border-[1.5px] border-text-primary bg-transparent px-md"
              style={{
                marginTop: fy(L.search.y - (L.subtitle.y + L.subtitle.h)),
                marginLeft: fx(L.search.x),
                width: fx(L.search.w),
                minHeight: Math.max(s(L.search.h), 44),
              }}
            >
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="find something different..."
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.primary}
                accessibilityLabel="Search ingredients"
                allowFontScaling
                maxFontSizeMultiplier={1.3}
                className="flex-1 bg-transparent py-sm font-sans text-md text-text-primary"
                style={{ minWidth: 0 }}
              />
              <Image
                source={ASSETS.icons.search}
                contentFit="contain"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ width: s(24), height: s(24), marginLeft: s(8) }}
              />
            </View>

            <View
              className="flex-row flex-wrap justify-between"
              style={{
                marginTop: fy(L.grid.y - (L.search.y + L.search.h)),
                marginLeft: fx(L.grid.x),
                width: fx(L.grid.w),
                rowGap: s(12),
              }}
            >
              {CRAVINGS.map((item) => (
                <CategoryTile
                  key={item.id}
                  image={item.image}
                  label={item.label}
                  tint="mint"
                  selected={selectedCategories.includes(item.id)}
                  onPress={() => toggleCategory(item.id)}
                  style={{ width: s(L.tile.w), minHeight: s(L.tile.h) }}
                />
              ))}
            </View>

            <Button
              title="continue"
              size="md"
              onPress={showComingSoon}
              style={{
                alignSelf: 'center',
                marginTop: fy(L.continue.y - (L.grid.y + L.grid.h)),
                minWidth: s(L.continue.w),
                minHeight: Math.max(s(L.continue.h), 44),
              }}
            />

            <Pressable
              onPress={showComingSoon}
              accessibilityRole="button"
              accessibilityLabel="Skip for now"
              className="items-center justify-center px-md"
              style={{ alignSelf: 'center', marginTop: fy(L.skip.y - (L.continue.y + L.continue.h)), minHeight: 44 }}
            >
              <AppText variant="label" fontSize={L.skip.size} className="text-primary underline">
                skip for now
              </AppText>
            </Pressable>

            <View style={{ flexGrow: 1, minHeight: s(8) }} />
          </View>
        </Stage>
      </Screen>

      {toast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
        </View>
      ) : null}
    </View>
  );
}
