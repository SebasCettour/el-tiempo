import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSun,
  faHistory,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

import { SearchType } from "../../types";
import styles from "./Header.module.css";

interface HeaderProps {
  hasWeatherData: boolean;
  lastSearchData: SearchType | null;
  loading: boolean;
  onRefresh: () => void;
  onToggleHistory: () => void;
  onToggleHelp: () => void;
}
export default function Header({ onToggleHistory, onToggleHelp }: HeaderProps) {
  return (
   <header className={styles.header}>
  <div className={styles.logoContainer}>
    <FontAwesomeIcon
      icon={faCloudSun}
      className={styles.logo}
    />

    <div>
      <h1 className={styles.title}>SkyGlow</h1>

      <p className={styles.subtitle}>
        El tiempo en tiempo real
      </p>
    </div>
  </div>

  <div className={styles.headerActions}>
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
  </div>
</header>
  );
}
