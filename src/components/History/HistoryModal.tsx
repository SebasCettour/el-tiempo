import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./HistoryModal.module.css";
import { SearchHistory } from "../../types/SearchHistory";

interface HistoryModalProps {
  searchHistory: SearchHistory[];
  onClose: () => void;
  onSelectHistory: (item: SearchHistory) => void;
  onRemoveHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  formatTimestamp: (timestamp: number) => string;
}

export default function HistoryModal({
  searchHistory,
  onClose,
  onSelectHistory,
  onRemoveHistoryItem,
  onClearHistory,
  formatTimestamp,
}: HistoryModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Historial de Búsquedas</h3>

          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Cerrar historial"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className={styles.modalContent}>
          {searchHistory.length === 0 ? (
            <p className={styles.emptyHistory}>No hay búsquedas recientes</p>
          ) : (
            <>
              <div className={styles.historyList}>
                {searchHistory.map((item) => (
                  <div key={item.id} className={styles.historyItem}>
                    <button
                      onClick={() => onSelectHistory(item)}
                      className={styles.historyButton}
                    >
                      <FontAwesomeIcon icon={faLocationDot} />

                      <span>
                        {item.city}, {item.country}
                      </span>

                      <small>{formatTimestamp(item.timestamp)}</small>
                    </button>

                    <button
                      onClick={() => onRemoveHistoryItem(item.id)}
                      className={styles.removeHistoryButton}
                      aria-label="Eliminar búsqueda"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={onClearHistory}
                className={styles.clearHistoryButton}
              >
                Limpiar historial
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
