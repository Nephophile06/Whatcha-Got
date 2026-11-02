/**
 * Preferences store — home dashboard cravings selection (mock phase).
 */
import { create } from 'zustand';

export const usePreferencesStore = create((set, get) => ({
  selectedCategories: [],

  toggleCategory: (id) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(id)
        ? state.selectedCategories.filter((item) => item !== id)
        : [...state.selectedCategories, id],
    })),

  clearCategories: () => set({ selectedCategories: [] }),

  isSelected: (id) => get().selectedCategories.includes(id),
}));

export default usePreferencesStore;
