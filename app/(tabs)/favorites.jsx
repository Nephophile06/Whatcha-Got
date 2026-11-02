import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Button, Card } from '../../src/components/ui';
import { EmptyState } from '../../src/components/feature';
import { useFavoritesStore } from '../../src/store/favoritesStore';
import { useGroceryStore } from '../../src/store/groceryStore';
import { colors, radius, spacing, typography } from '../../src/theme/tokens';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFavorite } = useFavoritesStore();
  const addItemToGrocery = useGroceryStore((s) => s.addItem);

  return (
    <Screen scroll style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Favorites</Text>
        <Text style={styles.subtitle}>{favorites.length} saved dishes</Text>
      </View>

      {favorites.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="No favorites yet"
          description="Explore quick meals on the home screen and tap the heart icon to save your favorites."
          actionLabel="Explore Meals"
          onAction={() => router.replace('/(tabs)/home')}
        />
      ) : (
        favorites.map((recipe) => (
          <Card key={recipe.id} style={styles.card}>
            {recipe.imageUrl ? (
              <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
            ) : null}
            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <TouchableOpacity
                  onPress={() => removeFavorite(recipe.id)}
                  style={styles.favBtn}
                  accessibilityLabel="Remove from favorites"
                >
                  <Text style={styles.favIcon}>❤️</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.badgeRow}>
                <Text style={styles.badge}>⏱️ {recipe.timeMinutes} mins</Text>
                <Text style={styles.badge}>💵 {recipe.budgetTier}</Text>
                <Text style={styles.badge}>🔥 {recipe.calories} kcal</Text>
              </View>

              <Button
                title="Add to Grocery List"
                size="sm"
                variant="secondary"
                onPress={() => {
                  addItemToGrocery(recipe.title, 'Favorite Recipe');
                }}
                style={styles.groceryBtn}
              />
            </View>
          </Card>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  card: {
    marginBottom: spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceSubtle,
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  recipeTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  favBtn: {
    padding: spacing.xs,
  },
  favIcon: {
    fontSize: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  groceryBtn: {
    width: '100%',
  },
});

