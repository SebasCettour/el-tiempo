import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faTimes } from "@fortawesome/free-solid-svg-icons";

import WeatherDetail from "../WeatherDetail/WeatherDetail";
import { WeatherSchema } from "../../hooks/useWeather";
import styles from "./WeatherModal.module.css";

interface WeatherModalProps {
  weather: WeatherSchema;
  lastSearch: string;
  onClose: () => void;
  onReset: () => void;
}

export default function WeatherModal({
  weather,
  lastSearch,
  onClose,
  onReset,
}: WeatherModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Clima actual</h2>

            {lastSearch && (
              <p className={styles.weatherModalLocation}>{lastSearch}</p>
            )}
          </div>

          <div className={styles.modalActions}>
            <button
              onClick={onReset}
              className={styles.resetButton}
              title="Limpiar resultados"
              aria-label="Limpiar resultados"
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>

            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Cerrar clima"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.weatherModalBody}>
            <WeatherDetail
              weather={weather}
              compact
              className={styles.weatherDetailCompact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
