import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faRefresh,
  faHistory,
  faInfoCircle,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";

import { SearchType } from "../../types";

import styles from "../../App.module.css";

interface HeaderProps {
  hasWeatherData: boolean;
  lastSearchData: SearchType | null;
  loading: boolean;
  onRefresh: () => void;
  onToggleHistory: () => void;
  onToggleHelp: () => void;
  onCopy: () => void;
}
export default function Header({
  hasWeatherData,
  lastSearchData,
  loading,
  onRefresh,
  onToggleHistory,
  onToggleHelp,
  onCopy,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <FontAwesomeIcon icon={faCloudSun} className={styles.logo} />
        <h1 className={styles.title}>SkyGlow</h1>
      </div>

      <div className={styles.headerActions}>
        {hasWeatherData && lastSearchData && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className={styles.actionButton}
            title="Actualizar clima (Ctrl+R)"
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        )}

        <button
          onClick={onToggleHistory}
          className={styles.actionButton}
          title="Historial de búsquedas"
        >
          <FontAwesomeIcon icon={faHistory} />
        </button>

        <button
          onClick={onToggleHelp}
          className={styles.actionButton}
          title="Ayuda y atajos"
        >
          <FontAwesomeIcon icon={faInfoCircle} />
        </button>

        {hasWeatherData && (
          <button
            onClick={onCopy}
            className={styles.actionButton}
            title="Copiar datos del clima"
          >
            <FontAwesomeIcon icon={faKeyboard} />
          </button>
        )}
      </div>
    </header>
  );
}
