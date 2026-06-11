import Spinner from "../Spinner/Spinner";
import styles from "../../App.module.css";

export default function LoadingOverlay() {
  return (
    <div className={styles.loadingOverlay} aria-live="polite" aria-busy="true">
      <div className={styles.loadingContainer}>
        <Spinner />
        <p className={styles.loadingText}>
          Consultando el clima...
          <br />
          <small>Conectando con OpenWeather API</small>
        </p>
      </div>
    </div>
  );
}
