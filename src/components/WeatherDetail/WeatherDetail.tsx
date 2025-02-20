import { formatTemperature } from "../../helpers";
import { WeatherSchema } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureArrowUp, faTemperatureArrowDown } from "@fortawesome/free-solid-svg-icons";

type WeatherDetailProps = {
  weather: WeatherSchema;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>El tiempo en <span>{weather.name}</span></h2>

      {weather.weather.length > 0 && (
        <div>
          <p className={styles.description}>{weather.weather[0].description}</p>
          <img className={styles.image}
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}

      <p className={styles.current}>
        Temperatura Actual: {formatTemperature(weather.main.temp)}&deg; C
      </p>

      <div className={styles.temperatures}>
        <p className={styles.p_max}>
        <FontAwesomeIcon icon={faTemperatureArrowUp} /> Max:{" "}
          <span className={styles.span_max}>
            {formatTemperature(weather.main.temp_max)}&deg; C
          </span>
        </p>
        <p className={styles.p_min}>
        <FontAwesomeIcon icon={faTemperatureArrowDown} /> Min:{" "}
          <span className={styles.span_min}>
            {formatTemperature(weather.main.temp_min)}&deg; C
          </span>
        </p>
      </div>
    </div>
  );
}
