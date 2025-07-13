import { useEffect, useState, useCallback, useRef } from "react";
import Alert from "./Alert/Alert";
import styles from "./App.module.css";
import Form from "./components/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faLocationDot,
  faRefresh,
  faHistory,
  faTimes,
  faInfoCircle,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { SearchType } from "./types";

interface SearchHistory {
  id: string;
  city: string;
  country: string;
  timestamp: number;
}

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
  const [lastSearchData, setLastSearchData] = useState<SearchType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

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
        JSON.stringify(searchHistory)
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
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lastSearchData]);

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
          )
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
    },
    [fetchWeather, addToHistory]
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
    [handleWeatherSearch]
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
  }, [resetState]);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <FontAwesomeIcon icon={faCloudSun} className={styles.logo} />
          <h1 className={styles.title}>El Tiempo</h1>
        </div>
        <p className={styles.subtitle}>Consulta el clima en tiempo real</p>

        {/* Header Actions */}
        <div className={styles.headerActions}>
          {hasWeatherData && lastSearchData && (
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={styles.actionButton}
              title="Actualizar clima (Ctrl+R)"
              aria-label="Actualizar clima"
            >
              <FontAwesomeIcon
                icon={faRefresh}
                className={loading ? styles.spinning : ""}
              />
            </button>
          )}

          <button
            onClick={() => setShowHistory(!showHistory)}
            className={styles.actionButton}
            title="Historial de búsquedas"
            aria-label="Historial de búsquedas"
          >
            <FontAwesomeIcon icon={faHistory} />
          </button>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className={styles.actionButton}
            title="Ayuda y atajos"
            aria-label="Ayuda y atajos"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Form fetchWeather={handleWeatherSearch} ref={formRef} />

          {loading && (
            <div className={styles.loadingContainer}>
              <Spinner />
              <p className={styles.loadingText}>Consultando el clima...</p>
            </div>
          )}

          {hasWeatherData && (
            <div className={styles.weatherContainer}>
              {lastSearch && (
                <div className={styles.locationInfo}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.locationIcon}
                  />
                  <span>{lastSearch}</span>
                  <button
                    onClick={handleReset}
                    className={styles.resetButton}
                    title="Limpiar resultados"
                    aria-label="Limpiar resultados"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              )}
              <WeatherDetail weather={weather} />
            </div>
          )}

          {(notFound || error) && (
            <div className={styles.errorContainer}>
              <Alert type="error">
                <div className={styles.errorContent}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.errorIcon}
                  />
                  <span>{error || "Ciudad no encontrada"}</span>
                </div>
              </Alert>
            </div>
          )}

          {!isFirstLoad &&
            !loading &&
            !hasWeatherData &&
            !notFound &&
            !error && (
              <div className={styles.welcomeContainer}>
                <FontAwesomeIcon
                  icon={faCloudSun}
                  className={styles.welcomeIcon}
                />
                <p className={styles.welcomeText}>
                  Ingresa una ciudad y país para consultar el clima
                </p>
                <div className={styles.shortcuts}>
                  <p className={styles.shortcutText}>
                    <FontAwesomeIcon icon={faKeyboard} />
                    Atajos: Ctrl+K (enfoque) | Ctrl+R (actualizar)
                  </p>
                </div>
              </div>
            )}
        </div>
      </main>

      {/* History Modal */}
      {showHistory && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowHistory(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Historial de Búsquedas</h3>
              <button
                onClick={() => setShowHistory(false)}
                className={styles.closeButton}
                aria-label="Cerrar historial"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={styles.modalContent}>
              {searchHistory.length === 0 ? (
                <p className={styles.emptyHistory}>
                  No hay búsquedas recientes
                </p>
              ) : (
                <>
                  <div className={styles.historyList}>
                    {searchHistory.map((item) => (
                      <div key={item.id} className={styles.historyItem}>
                        <button
                          onClick={() => handleHistoryItemClick(item)}
                          className={styles.historyButton}
                        >
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span>
                            {item.city}, {item.country}
                          </span>
                          <small>{formatTimestamp(item.timestamp)}</small>
                        </button>
                        <button
                          onClick={() => removeHistoryItem(item.id)}
                          className={styles.removeHistoryButton}
                          aria-label="Eliminar del historial"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={clearHistory}
                    className={styles.clearHistoryButton}
                  >
                    Limpiar Historial
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className={styles.modalOverlay} onClick={() => setShowHelp(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Ayuda y Atajos</h3>
              <button
                onClick={() => setShowHelp(false)}
                className={styles.closeButton}
                aria-label="Cerrar ayuda"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.helpSection}>
                <h4>Atajos de Teclado</h4>
                <ul className={styles.shortcutsList}>
                  <li>
                    <kbd>Ctrl</kbd> + <kbd>K</kbd> - Enfocar campo de ciudad
                  </li>
                  <li>
                    <kbd>Ctrl</kbd> + <kbd>R</kbd> - Actualizar clima actual
                  </li>
                  <li>
                    <kbd>Escape</kbd> - Cerrar modales
                  </li>
                </ul>
              </div>
              <div className={styles.helpSection}>
                <h4>Funcionalidades</h4>
                <ul className={styles.featuresList}>
                  <li>Consulta el clima en tiempo real</li>
                  <li>Historial de búsquedas recientes</li>
                  <li>Información detallada del clima</li>
                  <li>Diseño responsivo para todos los dispositivos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} El Tiempo - Clima en tiempo real
        </p>
      </footer>
    </div>
  );
}

export default App;
