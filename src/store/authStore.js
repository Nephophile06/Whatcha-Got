/**
 * Auth store — mock user state for the static phases.
 * No Supabase calls: Phase 5 will replace these handlers with services/auth.js.
 */
import { create } from 'zustand';

const MOCK_USER = {
  username: 'Nondiní',
  email: 'nondini@example.com',
  phone: '01xxxxxxxxx',
};

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  hasCompletedOnboarding: false,
  error: null,

  setHasCompletedOnboarding: (status) => set({ hasCompletedOnboarding: status }),

  /** Kept async so switching to Supabase later does not change call sites. */
  checkSession: async () => {
    set({ isLoading: false });
  },

  login: async ({ email } = {}) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 600));
    set({
      user: { ...MOCK_USER, email: email || MOCK_USER.email },
      isLoading: false,
    });
    return { success: true };
  },

  signUp: async ({ username, email } = {}) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 600));
    set({
      user: {
        ...MOCK_USER,
        username: username || MOCK_USER.username,
        email: email || MOCK_USER.email,
      },
      isLoading: false,
    });
    return { success: true };
  },

  updatePhone: (phone) =>
    set((state) => ({
      user: state.user ? { ...state.user, phone } : state.user,
    })),

  logout: () => set({ user: null, error: null }),

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
