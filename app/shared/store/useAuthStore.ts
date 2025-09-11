import { create } from "zustand";

type UserRole = 'user' | 'seller' | null;

interface AuthState {
  role: UserRole;
  isLoggedIn: boolean;
  setRole: (role: UserRole) => void;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  isLoggedIn: false,
  setRole: (role) => set({ role }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  logout: () => set({ role: null, isLoggedIn: false }),
}));
