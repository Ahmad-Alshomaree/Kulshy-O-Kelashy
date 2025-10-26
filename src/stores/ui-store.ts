import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  toggleSidebar: () => void;
  toggleCart: () => void;
  toggleSearch: () => void;
  closeSidebar: () => void;
  closeCart: () => void;
  closeSearch: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  
  closeSidebar: () => set({ isSidebarOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
}));
