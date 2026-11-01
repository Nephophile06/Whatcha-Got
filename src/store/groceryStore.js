import { create } from 'zustand';

export const useGroceryStore = create((set, get) => ({
  items: [
    { id: '1', name: 'Eggs (dozen)', checked: false, category: 'Dairy & Eggs', quantity: '1 pack' },
    { id: '2', name: 'Garlic cloves', checked: true, category: 'Produce', quantity: '1 bulb' },
    { id: '3', name: 'Jasmine rice', checked: false, category: 'Grains & Pantry', quantity: '1 kg' },
    { id: '4', name: 'Butter', checked: false, category: 'Dairy & Eggs', quantity: '200g' },
  ],

  addItem: (name, category = 'General', quantity = '1') => {
    if (!name || !name.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      checked: false,
      category,
      quantity,
    };
    set({ items: [newItem, ...get().items] });
  },

  toggleItem: (id) => {
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  },

  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },

  clearCompleted: () => {
    set({ items: get().items.filter((item) => !item.checked) });
  },
}));

export default useGroceryStore;

