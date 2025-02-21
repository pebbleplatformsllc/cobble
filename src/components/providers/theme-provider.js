"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => {},
  isLoading: false,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);

      // Get theme from localStorage or system preference
      const storedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const initialTheme = storedTheme || systemTheme;

      document.documentElement.classList.add(initialTheme);
      setThemeState(initialTheme);
      setMounted(true);

      // Add a slight delay before removing the loading screen
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      // Add transition class after initial render
      const transitionTimeout = setTimeout(() => {
        document.documentElement.classList.add("theme-transition");
      }, 0);

      return () => {
        clearTimeout(timeout);
        clearTimeout(transitionTimeout);
        document.documentElement.classList.remove("theme-transition");
      }
    } catch (error) {
      console.error("Error initializing theme:", error);
      setMounted(true);
      setIsLoading(false);
    }
  }, []);

  const setTheme = (newTheme) => {
    try {
      if (!newTheme) return;
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};