import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography, shadows } from '../../theme/tokens';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🍽️' },
  { id: 'quick', label: 'Under 20m', icon: '⏱️' },
  { id: 'budget', label: 'Budget ($)', icon: '💰' },
  { id: 'healthy', label: 'Healthy', icon: '🥗' },
  { id: 'comfort', label: 'Comfort', icon: '🍲' },
  { id: 'veg', label: 'Veggie', icon: '🥑' },
];

export const CategoryGrid = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>What are you craving?</Text>
      <View style={styles.grid}>
        {CATEGORIES.map((item) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => onSelectCategory(item.id)}
              style={[
                styles.card,
                isSelected && styles.cardSelected,
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text style={styles.emoji}>{item.icon}</Text>
              <Text
                style={[
                  styles.label,
                  isSelected && styles.labelSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    flexBasis: '30%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...shadows.sm,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  emoji: {
    fontSize: 26,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
});

export default CategoryGrid;

