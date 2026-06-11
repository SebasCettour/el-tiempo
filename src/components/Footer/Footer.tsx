import styles from "../../App.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        © {new Date().getFullYear()} SkyGlow • Powered by OpenWeather
      </p>
    </footer>
  );
}
