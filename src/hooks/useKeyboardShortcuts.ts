import { useEffect } from "react";
import { SearchType } from "../types";

interface UseKeyboardShortcutsProps {
  lastSearchData: SearchType | null;
  onRefresh: (searchData: SearchType) => void;
  onCloseHistory: () => void;
  onCloseHelp: () => void;
  onCloseWeather: () => void;
}

export default function useKeyboardShortcuts({
  lastSearchData,
  onRefresh,
  onCloseHistory,
  onCloseHelp,
  onCloseWeather,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();

        const cityInput = document.getElementById(
          "city",
        ) as HTMLInputElement | null;

        cityInput?.focus();
      }

      // Ctrl/Cmd + R
      if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();

        if (lastSearchData) {
          onRefresh(lastSearchData);
        }
      }

      // Escape
      if (event.key === "Escape") {
        onCloseHistory();
        onCloseHelp();
        onCloseWeather();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [lastSearchData, onRefresh, onCloseHistory, onCloseHelp, onCloseWeather]);
}
