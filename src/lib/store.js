import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
  searchQuery: "",
  aiSearchQuery: "",
  isAuthenticated: false,
  currentSearch: "",
  aiCurrentSearch: "",
  showAiButton: false,
  subscriptionLevel: "basic",
};

export const useSearchStore = create(
  persist(
    (set) => ({
      ...initialState,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setAiSearchQuery: (query) => set({ aiSearchQuery: query }),
      setCurrentSearch: (search) => set({ currentSearch: search }),
      setAiCurrentSearch: (search) => set({ aiCurrentSearch: search }),
      setShowAiButton: (show) => set({ showAiButton: show }),
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
      reset: () => set(initialState),
      setSubscriptionLevel: (level) => set({ subscriptionLevel: level }),
    }),
    {
      name: "cobble-storage",
      storage: createJSONStorage(() => {
        // Only use localStorage on the client side
        if (typeof window !== "undefined") {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        };
      }),
    }
  )
);