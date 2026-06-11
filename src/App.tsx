import { useEffect, useState, useCallback, useRef } from "react";
import styles from "./App.module.css";
import Form, { FormHandle } from "./components/Form";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import Toast from "./components/Toast/Toast";
import useWeather from "./hooks/useWeather";
import { SearchType } from "./types";
import Header from "./components/Header/Header";
import WeatherModal from "./components/WeatherModal/WeatherModal";
import HistoryModal from "./components/History/HistoryModal";
import HelpModal from "./components/Help/HelpModal";
import type { SearchHistory } from "./types/SearchHistory";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import WelcomeState from "./components/Welcome/WelcomeState";
import Footer from "./components/Footer/Footer";

function App() {
  const {
    weather,
    loading,
    notFound,
    error,
    fetchWeather,
    hasWeatherData,
    clearError,
    resetState,
  } = useWeather();

  const [lastSearch, setLastSearch] = useState<string>("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [lastSearchData, setLastSearchData] = useState<SearchType | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const formRef = useRef<FormHandle>(null);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherSearchHistory");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading search history:", error);
      }
    }
  }, []);

  // Save search history to localStorage
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem(
        "weatherSearchHistory",
        JSON.stringify(searchHistory),
      );
    }
  }, [searchHistory]);

  // Auto-hide alerts after 5 seconds
  useEffect(() => {
    if (notFound || error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notFound, error, clearError]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus form
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        const cityInput = document.getElementById("city") as HTMLInputElement;
        if (cityInput) {
          cityInput.focus();
        }
      }

      // Ctrl/Cmd + R to refresh current weather
      if ((event.ctrlKey || event.metaKey) && event.key === "r") {
        event.preventDefault();
        if (lastSearchData) {
          handleWeatherSearch(lastSearchData);
        }
      }

      // Escape to close modals
      if (event.key === "Escape") {
        setShowHistory(false);
        setShowHelp(false);
        setShowWeatherModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lastSearchData]);

  useEffect(() => {
    if (hasWeatherData && !loading) {
      setShowWeatherModal(true);
    }
  }, [hasWeatherData, loading]);

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
      return [newSearch, ...filtered.slice(0, 9)]; // Keep only last 10 searches
    });
  }, []);

  const handleWeatherSearch = useCallback(
    async (searchData: SearchType) => {
      setLastSearch(`${searchData.city}, ${searchData.country}`);
      setLastSearchData(searchData);
      setIsFirstLoad(false);
      addToHistory(searchData);
      await fetchWeather(searchData);
      if (!loading && hasWeatherData) {
        setToast({
          message: "Clima actualizado correctamente",
          type: "success",
        });
      }
    },
    [fetchWeather, addToHistory, loading, hasWeatherData],
  );

  const handleRefresh = useCallback(() => {
    if (lastSearchData) {
      handleWeatherSearch(lastSearchData);
    }
  }, [lastSearchData, handleWeatherSearch]);

  const handleHistoryItemClick = useCallback(
    (historyItem: SearchHistory) => {
      const searchData: SearchType = {
        city: historyItem.city,
        country: historyItem.country,
      };
      handleWeatherSearch(searchData);
      setShowHistory(false);
    },
    [handleWeatherSearch],
  );

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem("weatherSearchHistory");
  }, []);

  const removeHistoryItem = useCallback((id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Hace menos de 1 hora";
    } else if (diffInHours < 24) {
      return `Hace ${Math.floor(diffInHours)} horas`;
    } else {
      return date.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  const handleReset = useCallback(() => {
    resetState();
    setIsFirstLoad(true);
    setLastSearch("");
    setLastSearchData(null);
    setShowWeatherModal(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  }, [resetState]);

  const copyToClipboard = useCallback(async () => {
    if (!hasWeatherData || !lastSearch) return;

    const weatherText =
      `🌡️ Clima en ${weather.name}\n` +
      `Temperatura: ${Math.round(weather.main.temp - 273.15)}°C\n` +
      `Descripción: ${weather.weather[0].description}\n` +
      `Humedad: ${weather.main.humidity}%\n` +
      `Viento: ${Math.round(weather.wind.speed * 3.6)} km/h`;

    try {
      await navigator.clipboard.writeText(weatherText);
      setToast({
        message: "¡Datos copiados al portapapeles!",
        type: "success",
      });
    } catch (err) {
      setToast({ message: "Error al copiar al portapapeles", type: "error" });
    }
  }, [hasWeatherData, lastSearch, weather]);

  return (
    <div className={styles.app}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Header
        hasWeatherData={Boolean(hasWeatherData)}
        lastSearchData={lastSearchData}
        loading={loading}
        onRefresh={handleRefresh}
        onToggleHistory={() => setShowHistory(!showHistory)}
        onToggleHelp={() => setShowHelp(!showHelp)}
        onCopy={copyToClipboard}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <Form fetchWeather={handleWeatherSearch} ref={formRef} />

          {(notFound || error) && (
            <ErrorAlert message={error || "Ciudad no encontrada"} />
          )}

          {!isFirstLoad &&
            !loading &&
            !hasWeatherData &&
            !notFound &&
            !error && <WelcomeState />}
        </div>
      </main>

      {loading && <LoadingOverlay />}

      {/* Weather Modal */}
      {showWeatherModal && hasWeatherData && (
        <WeatherModal
          weather={weather}
          lastSearch={lastSearch}
          onClose={() => setShowWeatherModal(false)}
          onReset={handleReset}
        />
      )}

      {/* History Modal */}
      {showHistory && (
        <HistoryModal
          searchHistory={searchHistory}
          onClose={() => setShowHistory(false)}
          onSelectHistory={handleHistoryItemClick}
          onRemoveHistoryItem={removeHistoryItem}
          onClearHistory={clearHistory}
          formatTimestamp={formatTimestamp}
        />
      )}

      {/* Help Modal */}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      <Footer />
    </div>
  );
}

export default App;
