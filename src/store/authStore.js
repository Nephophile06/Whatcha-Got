import { create } from 'zustand';
import { authService } from '../services/auth';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  hasCompletedOnboarding: false,
  error: null,

  setHasCompletedOnboarding: (status) => set({ hasCompletedOnboarding: status }),

  checkSession: async () => {
    set({ isLoading: true });
    const { session, error } = await authService.getSession();
    if (session) {
      set({ session, user: session.user, isLoading: false, error: null });
    } else {
      set({ session: null, user: null, isLoading: false, error });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authService.signIn({ email, password });
    if (error) {
      set({ isLoading: false, error });
      return { success: false, error };
    }
    set({ user: data.user, session: data.session, isLoading: false, error: null });
    return { success: true };
  },

  signUp: async (email, password, fullName) => {
    set({ isLoading: true, error: null });
    const { data, error } = await authService.signUp({ email, password, fullName });
    if (error) {
      set({ isLoading: false, error });
      return { success: false, error };
    }
    set({ isLoading: false, error: null });
    return { success: true, data };
  },

  signOut: async () => {
    set({ isLoading: true });
    await authService.signOut();
    set({ user: null, session: null, isLoading: false, error: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;

