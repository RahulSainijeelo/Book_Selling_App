import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserRole = 'user' | 'seller';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  // avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  loginUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isLoading: false,
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setIsLoading: (isLoading) => set({ isLoading }),
      
      loginUser: (user, token) => set({ 
        user, 
        token, 
        isLoggedIn: true,
        isLoading: false 
      }),
      
      logout: () => set({ 
        user: null, 
        token: null, 
        isLoggedIn: false,
        isLoading: false 
      }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
