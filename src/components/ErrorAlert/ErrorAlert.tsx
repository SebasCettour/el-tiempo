import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import styles from "../../App.module.css";

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorAlert}>
        <FontAwesomeIcon icon={faLocationDot} className={styles.errorIcon} />
        <span>{message}</span>
      </div>
    </div>
  );
}
