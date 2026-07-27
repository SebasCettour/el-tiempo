import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faKeyboard } from "@fortawesome/free-solid-svg-icons";

import styles from "../../App.module.css";

interface Shortcut {
  keys: string[];
  label: string;
}

const SHORTCUTS: Shortcut[] = [
  { keys: ["Ctrl", "K"], label: "enfoque" },
  { keys: ["Ctrl", "R"], label: "actualizar" },
];

interface WelcomeStateProps {
  message?: string;
}

export default function WelcomeState({
  message = "Ingresa una ciudad y país para consultar el clima",
}: WelcomeStateProps) {
  return (
    <div className={styles.welcomeContainer} role="status">
      <FontAwesomeIcon
        icon={faCloudSun}
        className={styles.welcomeIcon}
        aria-hidden="true"
      />

      <p className={styles.welcomeText}>{message}</p>

      <div className={styles.shortcuts}>
        <p className={styles.shortcutText}>
          <FontAwesomeIcon icon={faKeyboard} aria-hidden="true" />
          {" Atajos: "}
          {SHORTCUTS.map(({ keys, label }, i) => (
            <span key={label}>
              {keys.map((key, j) => (
                <span key={key}>
                  <kbd>{key}</kbd>
                  {j < keys.length - 1 && "+"}
                </span>
              ))}
              {` (${label})`}
              {i < SHORTCUTS.length - 1 && " | "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
