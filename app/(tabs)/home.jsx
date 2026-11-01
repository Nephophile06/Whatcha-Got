import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Card, Chip, Toast } from '../../src/components/ui';
import { CategoryGrid, EmptyState } from '../../src/components/feature';
import { recipesService } from '../../src/services/recipes';
import { useFavoritesStore } from '../../src/store/favoritesStore';
import { useGroceryStore } from '../../src/store/groceryStore';
import { colors, radius, spacing, typography, shadows } from '../../src/theme/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addItemToGrocery = useGroceryStore((s) => s.addItem);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMood, setSelectedMood] = useState('All');
  const [feedback, setFeedback] = useState('');

  const MOODS = ['All', 'Comforting', 'Healthy', 'Indulgent'];

  const fetchRecipes = async () => {
    setLoading(true);
    const { recipes: data } = await recipesService.getRecipes({
      query: searchQuery,
      mood: selectedMood !== 'All' ? selectedMood : null,
    });
    setRecipes(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, selectedMood]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecipes();
    setRefreshing(false);
  };

  const handleAddGrocery = (recipe) => {
    recipe.ingredients?.forEach((ing) => {
      addItemToGrocery(ing, 'Recipe: ' + recipe.title);
    });
    setFeedback(`Ingredients for "${recipe.title}" added to your grocery list!`);
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>What's in your pantry?</Text>
            <Text style={styles.tagline}>Discover delicious meals in under 30 minutes</Text>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => router.push('/share-recipe')}
            accessibilityRole="button"
            accessibilityLabel="Share a new recipe"
          >
            <Text style={styles.shareText}>+ Share</Text>
          </TouchableOpacity>
        </View>

        {feedback ? (
          <Toast
            visible={!!feedback}
            type="success"
            message={feedback}
            onDismiss={() => setFeedback('')}
          />
        ) : null}

        {/* Persistent Search Input */}
        <Input
          label="Search by Ingredient or Dish"
          placeholder="e.g. Eggs, Rice, Chickpeas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        {/* Mood filter chips */}
        <View style={styles.chipsSection}>
          <Text style={styles.filterLabel}>Mood & Vibe</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
            {MOODS.map((mood) => (
              <Chip
                key={mood}
                label={mood}
                selected={selectedMood === mood}
                onPress={() => setSelectedMood(mood)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Category Grid */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat === 'quick') setSearchQuery('15');
            else if (cat === 'veg') setSearchQuery('spinach');
            else if (cat === 'all') setSearchQuery('');
          }}
        />

        {/* Recipe Cards List */}
        <View style={styles.recipeListSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Meals</Text>
            <Text style={styles.countText}>{recipes.length} results</Text>
          </View>

          {recipes.length === 0 && !loading ? (
            <EmptyState
              icon="🥣"
              title="No matching meals"
              description="We couldn't find any meals with those exact ingredients. Try loosening your search filters."
              actionLabel="Clear Search"
              onAction={() => {
                setSearchQuery('');
                setSelectedMood('All');
                setSelectedCategory('all');
              }}
            />
          ) : (
            recipes.map((item) => {
              const favorited = isFavorite(item.id);
              return (
                <Card key={item.id} style={styles.recipeCard}>
                  {item.imageUrl ? (
                    <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
                  ) : null}
                  <View style={styles.cardBody}>
                    <View style={styles.cardTopRow}>
                      <Text style={styles.recipeTitle}>{item.title}</Text>
                      <TouchableOpacity
                        onPress={() => toggleFavorite(item)}
                        style={styles.favIconBtn}
                        accessibilityLabel={favorited ? 'Remove favorite' : 'Add favorite'}
                      >
                        <Text style={styles.favIcon}>{favorited ? '❤️' : '🤍'}</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.recipeDesc} numberOfLines={2}>
                      {item.description}
                    </Text>

                    <View style={styles.metaRow}>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>⏱️ {item.timeMinutes} mins</Text>
                      </View>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>💵 {item.budgetTier} (~${item.estimatedCost?.toFixed(2)})</Text>
                      </View>
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>🔥 {item.calories} kcal</Text>
                      </View>
                    </View>

                    <View style={styles.cardActions}>
                      <Button
                        title="Add to Grocery List"
                        size="sm"
                        variant="secondary"
                        onPress={() => handleAddGrocery(item)}
                        style={styles.cardActionBtn}
                      />
                    </View>
                  </View>
                </Card>
              );
            })
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: typography.fontSize.xl,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  tagline: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  shareButton: {
    backgroundColor: colors.primaryLight,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  shareText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: typography.fontSize.sm,
  },
  searchInput: {
    marginBottom: spacing.sm,
  },
  chipsSection: {
    marginBottom: spacing.sm,
  },
  filterLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chipsRow: {
    flexDirection: 'row',
  },
  recipeListSection: {
    marginTop: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  countText: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  recipeCard: {
    marginBottom: spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: colors.surfaceSubtle,
  },
  cardBody: {
    padding: spacing.md,
  },
  cardTopRow: {
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
  favIconBtn: {
    padding: spacing.xs,
  },
  favIcon: {
    fontSize: 20,
  },
  recipeDesc: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  cardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cardActionBtn: {
    flex: 1,
  },
});

