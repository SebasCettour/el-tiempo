import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Toast.module.css";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
    info: faInfoCircle,
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <FontAwesomeIcon icon={icons[type]} className={styles.icon} />
      <span className={styles.message}>{message}</span>
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Cerrar notificación"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}
