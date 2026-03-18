import { create } from 'zustand';

interface UserState {
  isAuthenticated: boolean;
  points: number;
  isOpen: boolean;
  toggleAuthDrawer: () => void;
  login: () => void;
  logout: () => void;
  addPoints: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false, // Default unauthenticated for demo
  points: 120, // Default points
  isOpen: false,
  toggleAuthDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  addPoints: (amount) => set((state) => ({ points: state.points + amount }))
}));
