import { useState, useEffect, useCallback } from "react";
import type { SearchType } from "../types";
import type { SearchHistory } from "../types/SearchHistory";

const STORAGE_KEY = "weatherSearchHistory";

export default function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  // Cargar historial
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);

    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading search history:", error);
      }
    }
  }, []);

  // Guardar historial
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = useCallback((searchData: SearchType) => {
    const newSearch: SearchHistory = {
      id: `${searchData.city}-${searchData.country}-${Date.now()}`,
      city: searchData.city,
      country: searchData.country,
      timestamp: Date.now(),
    };

    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) =>
          !(
            item.city === searchData.city && item.country === searchData.country
          ),
      );

      return [newSearch, ...filtered].slice(0, 10);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const removeHistoryItem = useCallback((id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    searchHistory,
    addToHistory,
    clearHistory,
    removeHistoryItem,
  };
}
