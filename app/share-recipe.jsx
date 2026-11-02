import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, Input, Button, Card, Toast } from '../src/components/ui';
import { recipesService } from '../src/services/recipes';
import { colors, spacing, typography } from '../src/theme/tokens';

export default function ShareRecipeScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('20');
  const [budgetTier, setBudgetTier] = useState('$');
  const [ingredientsText, setIngredientsText] = useState('');
  const [instructionsText, setInstructionsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleShare = async () => {
    if (!title.trim()) {
      setError('Recipe title is required');
      return;
    }

    setLoading(true);
    setError('');

    const ingredients = ingredientsText
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    const instructions = instructionsText
      .split('\n')
      .map((i) => i.trim())
      .filter(Boolean);

    const recipeData = {
      title: title.trim(),
      description: description.trim() || 'A budget-friendly homemade dish.',
      timeMinutes: parseInt(timeMinutes, 10) || 20,
      budgetTier: budgetTier || '$',
      estimatedCost: budgetTier === '$$$' ? 10.0 : budgetTier === '$$' ? 5.0 : 2.5,
      mood: 'Comforting',
      calories: 450,
      servings: 2,
      category: 'Community',
      ingredients: ingredients.length > 0 ? ingredients : ['Staples', 'Seasoning'],
      instructions: instructions.length > 0 ? instructions : ['Cook ingredients and serve warm.'],
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    };

    const { data, error: shareErr } = await recipesService.createRecipe(recipeData);
    setLoading(false);

    if (shareErr) {
      setError(shareErr);
    } else {
      setFeedback('Recipe shared successfully! It is now live in community feeds.');
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  };

  return (
    <Screen scroll style={styles.container}>
      <Toast
        visible={!!error}
        type="error"
        message={error}
        onDismiss={() => setError('')}
      />
      <Toast
        visible={!!feedback}
        type="success"
        message={feedback}
        onDismiss={() => setFeedback('')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Publish a Meal</Text>
        <Text style={styles.subtitle}>
          Help others make the most of basic pantry items with your practical budget recipes.
        </Text>
      </View>

      <Card style={styles.card}>
        <Input
          label="Recipe Title"
          placeholder="e.g. 10-Minute Peanut Noodles"
          value={title}
          onChangeText={setTitle}
          required
        />

        <Input
          label="Short Description"
          placeholder="What makes this dish great for budget cooking?"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: spacing.sm }}>
            <Input
              label="Time (Minutes)"
              placeholder="e.g. 20"
              keyboardType="number-pad"
              value={timeMinutes}
              onChangeText={setTimeMinutes}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              label="Budget Tier ($ - $$$)"
              placeholder="$"
              value={budgetTier}
              onChangeText={setBudgetTier}
            />
          </View>
        </View>

        <Input
          label="Ingredients (One per line)"
          placeholder="Noodles&#10;Peanut Butter&#10;Soy Sauce&#10;Garlic"
          value={ingredientsText}
          onChangeText={setIngredientsText}
          multiline
          inputStyle={{ minHeight: 80 }}
        />

        <Input
          label="Instructions (One step per line)"
          placeholder="Boil noodles for 4 minutes.&#10;Whisk sauce ingredients.&#10;Toss and serve warm."
          value={instructionsText}
          onChangeText={setInstructionsText}
          multiline
          inputStyle={{ minHeight: 80 }}
        />

        {/* Clear CTA Button */}
        <Button
          title="Share Recipe"
          size="lg"
          variant="primary"
          loading={loading}
          onPress={handleShare}
          style={styles.submitBtn}
        />
      </Card>
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
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 20,
  },
  card: {
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
  },
  submitBtn: {
    marginTop: spacing.md,
  },
});

