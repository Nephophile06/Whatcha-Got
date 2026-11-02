import React, { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Screen, AppText, Button, CategoryTile, Toast } from '../src/components/ui';
import { ASSETS } from '../src/constants/assets';
import { usePreferencesStore } from '../src/store/preferencesStore';
import { useScale } from '../src/lib/scale';
import { colors } from '../src/theme/tokens';

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
 * Home Dashboard — the PNG has no tab bar, so this route lives outside
 * app/(tabs). Selection is kept in preferencesStore; the suggestions screen
 * is not designed yet, so both actions show an info toast.
 */
export default function HomeDashboardScreen() {
  const { width, height } = useScale();
  const selectedCategories = usePreferencesStore((state) => state.selectedCategories);
  const toggleCategory = usePreferencesStore((state) => state.toggleCategory);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const showComingSoon = () => setToast({ type: 'info', message: 'Suggestions coming soon' });

  return (
    <View className="flex-1">
      <Screen
        variant="mintPage"
        scroll
        padded={false}
        contentContainerClassName="flex-grow"
        statusBarStyle="dark-content"
      >
        <View className="w-full self-center" style={{ maxWidth: 480 }}>
          <Image
            source={ASSETS.images.cravingsHeroBanner}
            contentFit="cover"
            accessibilityLabel="Kitchen table with baking ingredients"
            style={{ width: '100%', aspectRatio: 412 / 212 }}
          />

          <View className="px-lg pt-lg">
            <AppText variant="display" fontSize={34} className="text-center">
              Tell us what you crave
            </AppText>

            <AppText variant="body" className="mt-xs text-center text-text-primary">
              we will suggest that match your vibe
            </AppText>

            <View
              className="flex-row items-center rounded-md border-[1.5px] border-text-primary bg-transparent px-md"
              style={{ minHeight: 52, marginTop: Math.round(height * 0.05) }}
            >
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="find something different..."
                placeholderTextColor={colors.textMuted}
                selectionColor={colors.primary}
                accessibilityLabel="Search dishes"
                allowFontScaling
                maxFontSizeMultiplier={1.3}
                className="flex-1 bg-transparent py-sm font-sans text-md text-text-primary"
              />
              <Image
                source={ASSETS.icons.search}
                contentFit="contain"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ width: 24, height: 24, marginLeft: 8 }}
              />
            </View>

            <View
              className="flex-row flex-wrap justify-between"
              style={{ marginTop: Math.round(height * 0.033), rowGap: 12 }}
            >
              {CRAVINGS.map((item) => (
                <CategoryTile
                  key={item.id}
                  image={item.image}
                  label={item.label}
                  tint="mint"
                  selected={selectedCategories.includes(item.id)}
                  onPress={() => toggleCategory(item.id)}
                />
              ))}
            </View>

            <View className="mt-xl items-center">
              <Button title="continue" size="md" onPress={showComingSoon} />
              <Pressable
                onPress={showComingSoon}
                accessibilityRole="button"
                accessibilityLabel="Skip for now"
                className="mt-sm min-h-[44px] items-center justify-center px-md"
              >
                <AppText variant="label" fontSize={17} className="text-primary underline">
                  skip for now
                </AppText>
              </Pressable>
            </View>

            <View style={{ height: width * 0.08 }} />
          </View>
        </View>
      </Screen>

      {toast ? (
        <View className="absolute left-md right-md top-xxl">
          <Toast type={toast.type} message={toast.message} onDismiss={() => setToast(null)} />
        </View>
      ) : null}
    </View>
  );
}
