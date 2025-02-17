import { formatTemperature } from "../../helpers";
import { WeatherSchema } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: WeatherSchema;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2> El tiempo en {weather.name}</h2>
      <p className={styles.current}>
        Temperatura Actual: {formatTemperature(weather.main.temp)}&deg; C
      </p>
      <div className={styles.temperatures}>
        <p className={styles.p_max}>
          Max:{" "}
          <span className={styles.span_max}>
            {formatTemperature(weather.main.temp_max)}&deg; C{" "}
          </span>
        </p>
        <p className={styles.p_min}>
          Min:{" "}
          <span className={styles.span_min}>
            {formatTemperature(weather.main.temp_min)}&deg; C{" "}
          </span>
        </p>
      </div>
    </div>
  );
}
