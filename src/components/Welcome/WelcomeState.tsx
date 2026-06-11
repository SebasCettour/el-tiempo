import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faKeyboard } from "@fortawesome/free-solid-svg-icons";

import styles from "../../App.module.css";

export default function WelcomeState() {
  return (
    <div className={styles.welcomeContainer}>
      <FontAwesomeIcon icon={faCloudSun} className={styles.welcomeIcon} />

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
  );
}
