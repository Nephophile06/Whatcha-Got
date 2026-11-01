import { create } from 'zustand';

export const useFavoritesStore = create((set, get) => ({
  favorites: [
    {
      id: '1',
      title: 'Garlic Butter Egg Rice Bowl',
      timeMinutes: 15,
      budgetTier: '$',
      calories: 420,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    },
  ],

  addFavorite: (recipe) => {
    const { favorites } = get();
    if (!favorites.find((r) => r.id === recipe.id)) {
      set({ favorites: [recipe, ...favorites] });
    }
  },

  removeFavorite: (id) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((r) => r.id !== id) });
  },

  isFavorite: (id) => {
    const { favorites } = get();
    return favorites.some((r) => r.id === id);
  },

  toggleFavorite: (recipe) => {
    const { isFavorite, removeFavorite, addFavorite } = get();
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  },
}));

export default useFavoritesStore;

