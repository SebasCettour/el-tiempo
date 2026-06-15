import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./HelpModal.module.css";

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Ayuda y Atajos</h3>

          <button
            onClick={onClose}
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
                <kbd>Esc</kbd> - Cerrar modales
              </li>
            </ul>
          </div>

          <div className={styles.helpSection}>
            <h4>Funcionalidades</h4>

            <ul className={styles.featuresList}>
              <li>Consulta el tiempo en tiempo real</li>
              <li>Historial de búsquedas recientes</li>
              <li>Información meteorológica detallada</li>
              <li>Copiar datos al portapapeles</li>
              <li>Diseño responsivo para móviles y escritorio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
