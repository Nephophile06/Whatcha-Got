import { create } from 'zustand';

export const useCalorieStore = create((set, get) => ({
  targetCalories: 2000,
  consumedCalories: 780,
  logs: [
    { id: '1', title: 'Garlic Butter Egg Rice', calories: 420, mealType: 'Breakfast', time: '8:30 AM' },
    { id: '2', title: 'Greek Yogurt & Honey', calories: 180, mealType: 'Snack', time: '11:00 AM' },
    { id: '3', title: 'Apple with Peanut Butter', calories: 180, mealType: 'Snack', time: '1:15 PM' },
  ],

  setTargetCalories: (target) => set({ targetCalories: Number(target) || 2000 }),

  addLog: (title, calories, mealType = 'Meal') => {
    const cal = Number(calories) || 0;
    const newLog = {
      id: Date.now().toString(),
      title,
      calories: cal,
      mealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    set({
      logs: [newLog, ...get().logs],
      consumedCalories: get().consumedCalories + cal,
    });
  },

  removeLog: (id) => {
    const logToRemove = get().logs.find((l) => l.id === id);
    if (!logToRemove) return;
    set({
      logs: get().logs.filter((l) => l.id !== id),
      consumedCalories: Math.max(0, get().consumedCalories - logToRemove.calories),
    });
  },
}));

export default useCalorieStore;

