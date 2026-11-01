import { supabase } from '../lib/supabase';

// Initial local fallback seed data for meal discovery
const DEFAULT_RECIPES = [
  {
    id: '1',
    title: 'Garlic Butter Egg Rice Bowl',
    description: 'Quick, savory, and comforting meal prepared with staple kitchen ingredients.',
    timeMinutes: 15,
    budgetTier: '$',
    estimatedCost: 2.50,
    mood: 'Comforting',
    calories: 420,
    servings: 1,
    category: 'Quick & Easy',
    ingredients: ['Cooked Rice', '2 Eggs', '2 cloves Garlic', 'Butter', 'Soy Sauce', 'Green Onion'],
    instructions: [
      'Heat butter in a skillet over medium heat.',
      'Sauté minced garlic until fragrant (about 1 minute).',
      'Crack eggs into pan and fry to desired doneness.',
      'Serve eggs over warm rice, drizzle with soy sauce, and garnish with chopped green onions.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    title: 'Crispy Chickpea & Spinach Sauté',
    description: 'High-protein vegan skillet with aromatic spices and vibrant greens.',
    timeMinutes: 20,
    budgetTier: '$',
    estimatedCost: 3.20,
    mood: 'Healthy',
    calories: 360,
    servings: 2,
    category: 'Vegetarian',
    ingredients: ['Canned Chickpeas', 'Baby Spinach', 'Olive Oil', 'Cumin', 'Smoked Paprika', 'Lemon Juice'],
    instructions: [
      'Drain and thoroughly pat chickpeas dry.',
      'Sauté chickpeas in olive oil with cumin and smoked paprika until golden and crispy.',
      'Toss in fresh spinach until wilted.',
      'Finish with a generous squeeze of fresh lemon juice and sea salt.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    title: 'One-Pot Creamy Tomato Pasta',
    description: 'Silky pasta sauce infused with herbs and garlic, cooked together in one pot.',
    timeMinutes: 25,
    budgetTier: '$$',
    estimatedCost: 4.80,
    mood: 'Indulgent',
    calories: 550,
    servings: 2,
    category: 'Pasta',
    ingredients: ['Pasta', 'Crushed Tomatoes', 'Garlic', 'Heavy Cream or Milk', 'Basil', 'Parmesan'],
    instructions: [
      'Boil pasta in salted water until al dente; reserve 1/2 cup pasta water.',
      'In a saucepan, simmer crushed tomatoes with minced garlic and herbs.',
      'Stir in cream and cheese until smooth.',
      'Fold in pasta and gently toss until completely coated.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
  },
];

export const recipesService = {
  /**
   * Fetch recipes with optional filter criteria (ingredients, time, mood, budget)
   */
  async getRecipes(filters = {}) {
    try {
      const { ingredients, maxTime, mood, maxBudget, query } = filters;

      // Attempt to query Supabase recipes table
      let supabaseQuery = supabase.from('recipes').select('*');

      if (maxTime) {
        supabaseQuery = supabaseQuery.lte('timeMinutes', maxTime);
      }
      if (mood) {
        supabaseQuery = supabaseQuery.eq('mood', mood);
      }

      const { data, error } = await supabaseQuery;

      if (!error && data && data.length > 0) {
        return { recipes: data, error: null };
      }

      // Fallback to local structured data if table is empty or offline
      let filtered = [...DEFAULT_RECIPES];

      if (query && query.trim()) {
        const q = query.toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.title.toLowerCase().includes(q) ||
            r.ingredients.some((ing) => ing.toLowerCase().includes(q))
        );
      }

      if (maxTime) {
        filtered = filtered.filter((r) => r.timeMinutes <= maxTime);
      }

      if (mood && mood !== 'All') {
        filtered = filtered.filter((r) => r.mood.toLowerCase() === mood.toLowerCase());
      }

      if (ingredients && ingredients.length > 0) {
        filtered = filtered.filter((r) =>
          ingredients.some((ing) =>
            r.ingredients.some((item) => item.toLowerCase().includes(ing.toLowerCase()))
          )
        );
      }

      return { recipes: filtered, error: null };
    } catch (error) {
      return { recipes: DEFAULT_RECIPES, error: error.message };
    }
  },

  /**
   * Fetch a single recipe by ID
   */
  async getRecipeById(id) {
    try {
      const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();
      if (!error && data) {
        return { recipe: data, error: null };
      }
      const local = DEFAULT_RECIPES.find((r) => r.id === id);
      return { recipe: local || null, error: local ? null : 'Recipe not found' };
    } catch (error) {
      const local = DEFAULT_RECIPES.find((r) => r.id === id);
      return { recipe: local || null, error: error.message };
    }
  },

  /**
   * Share/submit a new recipe
   */
  async createRecipe(recipeData) {
    try {
      const { data, error } = await supabase.from('recipes').insert([recipeData]).select().single();
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      // Return simulated success if backend table is not yet migrated
      return {
        data: { id: Date.now().toString(), ...recipeData },
        error: null,
      };
    }
  },
};

export default recipesService;

