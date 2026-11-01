-- Whatcha Got? Seed Data

INSERT INTO public.recipes (title, description, time_minutes, budget_tier, estimated_cost, mood, calories, servings, category, ingredients, instructions, image_url)
VALUES
(
  'Garlic Butter Egg Rice Bowl',
  'Quick, savory, and comforting meal prepared with staple kitchen ingredients.',
  15,
  '$',
  2.50,
  'Comforting',
  420,
  1,
  'Quick & Easy',
  '["Cooked Rice", "2 Eggs", "2 cloves Garlic", "Butter", "Soy Sauce", "Green Onion"]'::jsonb,
  '["Heat butter in skillet over medium heat.", "Sauté minced garlic until fragrant.", "Fry eggs to desired doneness.", "Serve over warm rice and garnish with green onion."]'::jsonb,
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
),
(
  'Crispy Chickpea & Spinach Sauté',
  'High-protein vegan skillet with aromatic spices and vibrant greens.',
  20,
  '$',
  3.20,
  'Healthy',
  360,
  2,
  'Vegetarian',
  '["Canned Chickpeas", "Baby Spinach", "Olive Oil", "Cumin", "Smoked Paprika", "Lemon Juice"]'::jsonb,
  '["Drain and pat chickpeas dry.", "Sauté in olive oil with cumin and paprika until crispy.", "Toss in fresh spinach until wilted.", "Finish with fresh lemon juice."]'::jsonb,
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
),
(
  'One-Pot Creamy Tomato Pasta',
  'Silky pasta sauce infused with herbs and garlic, cooked together in one pot.',
  25,
  '$$',
  4.80,
  'Indulgent',
  550,
  2,
  'Pasta',
  '["Pasta", "Crushed Tomatoes", "Garlic", "Heavy Cream or Milk", "Basil", "Parmesan"]'::jsonb,
  '["Boil pasta in salted water until al dente.", "Simmer tomatoes with minced garlic and herbs.", "Stir in cream and cheese until smooth.", "Fold in pasta and serve warm."]'::jsonb,
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
)
ON CONFLICT DO NOTHING;

