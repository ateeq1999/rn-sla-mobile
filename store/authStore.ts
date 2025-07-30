import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Partner } from '@/types/user';
import { Token } from '@/types/shared';

interface State {
  user: Partner | null
  token: Token | null
}

interface Actions {
  setUser: (user: State['user']) => void;
  setToken: (token: State['token']) => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user) => set(() => ({ user: user })),
      setToken: (token) => set(() => ({ token: token })),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
