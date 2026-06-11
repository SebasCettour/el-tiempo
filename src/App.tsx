import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./App.module.css";

import Form, { FormHandle } from "./components/Form";
import Header from "./components/Header/Header";
import WeatherModal from "./components/WeatherModal/WeatherModal";
import HistoryModal from "./components/History/HistoryModal";
import HelpModal from "./components/Help/HelpModal";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import WelcomeState from "./components/Welcome/WelcomeState";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import Toast from "./components/Toast/Toast";
import Footer from "./components/Footer/Footer";

import useWeather from "./hooks/useWeather";
import useSearchHistory from "./hooks/useSearchHistory";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import useWeatherClipboard from "./hooks/useWeatherClipboard";

import { formatTimestamp } from "./utils/formatTimestamp";

import { SearchType } from "./types";
import type { SearchHistory } from "./types/SearchHistory";

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

  const { searchHistory, addToHistory, clearHistory, removeHistoryItem } =
    useSearchHistory();

  const [lastSearch, setLastSearch] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [showHistory, setShowHistory] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);

  const [lastSearchData, setLastSearchData] = useState<SearchType | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const formRef = useRef<FormHandle>(null);

  // Ocultar errores automáticamente
  useEffect(() => {
    if (!notFound && !error) return;

    const timer = setTimeout(clearError, 5000);

    return () => clearTimeout(timer);
  }, [notFound, error, clearError]);

  // Abrir modal al obtener clima
  useEffect(() => {
    if (hasWeatherData && !loading) {
      setShowWeatherModal(true);
    }
  }, [hasWeatherData, loading]);

  // Toast de actualización exitosa
  useEffect(() => {
    if (!isFirstLoad && hasWeatherData) {
      setToast({
        message: "Clima actualizado correctamente",
        type: "success",
      });
    }
  }, [hasWeatherData, isFirstLoad]);

  const handleWeatherSearch = useCallback(
    async (searchData: SearchType) => {
      setLastSearch(`${searchData.city}, ${searchData.country}`);
      setLastSearchData(searchData);
      setIsFirstLoad(false);

      addToHistory(searchData);

      await fetchWeather(searchData);
    },
    [fetchWeather, addToHistory],
  );

  const handleRefresh = useCallback(() => {
    if (!lastSearchData) return;

    handleWeatherSearch(lastSearchData);
  }, [lastSearchData, handleWeatherSearch]);

  const handleHistoryItemClick = useCallback(
    (historyItem: SearchHistory) => {
      handleWeatherSearch({
        city: historyItem.city,
        country: historyItem.country,
      });

      setShowHistory(false);
    },
    [handleWeatherSearch],
  );

  useKeyboardShortcuts({
    lastSearchData,
    onRefresh: handleWeatherSearch,
    onCloseHistory: () => setShowHistory(false),
    onCloseHelp: () => setShowHelp(false),
    onCloseWeather: () => setShowWeatherModal(false),
  });

  const handleReset = useCallback(() => {
    resetState();

    setIsFirstLoad(true);
    setLastSearch("");
    setLastSearchData(null);
    setShowWeatherModal(false);

    formRef.current?.reset();
  }, [resetState]);

  const { copyToClipboard } = useWeatherClipboard({
    weather,
    hasWeatherData: !!hasWeatherData,
    lastSearch,
    onSuccess: () =>
      setToast({
        message: "¡Datos copiados al portapapeles!",
        type: "success",
      }),
    onError: () =>
      setToast({
        message: "Error al copiar al portapapeles",
        type: "error",
      }),
  });

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
        hasWeatherData={!!hasWeatherData}
        lastSearchData={lastSearchData}
        loading={loading}
        onRefresh={handleRefresh}
        onToggleHistory={() => setShowHistory((prev) => !prev)}
        onToggleHelp={() => setShowHelp((prev) => !prev)}
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

      {showWeatherModal && hasWeatherData && (
        <WeatherModal
          weather={weather}
          lastSearch={lastSearch}
          onClose={() => setShowWeatherModal(false)}
          onReset={handleReset}
        />
      )}

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

      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      <Footer />
    </div>
  );
}

export default App;
