import {
  formatTemperature,
  getWindDirection,
  windSpeedKmH,
} from "../../helpers";
import { WeatherSchema } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureArrowUp,
  faTemperatureArrowDown,
} from "@fortawesome/free-solid-svg-icons";

type WeatherDetailProps = {
  weather: WeatherSchema;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        El tiempo en <span>{weather.name}</span>
      </h2>

      {weather.weather.length > 0 && (
        <div className={styles.weatherInfo}>
          {/* Principal */}
          <div className={styles.currentWeather}>
            <img
              className={styles.image}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className={styles.current}>
              {formatTemperature(weather.main.temp)}&deg; C
            </p>
            <p className={styles.description}>
              {weather.weather[0].description}
            </p>
          </div>

          {/* Más detalles */}
          <div className={styles.details}>
            <p className={styles.feels_like}>
              Sensación Térmica: {formatTemperature(weather.main.feels_like)}&deg; C
            </p>
            <p className={styles.humidity}>Humedad: {weather.main.humidity}%</p>
            <p className={styles.pressure}>
              Presión atmosférica: {weather.main.pressure} hPa
            </p>
            <p className={styles.wind}>
              Viento: {getWindDirection(weather.wind.deg)} (
              {windSpeedKmH(weather.wind.speed)} km/h)
            </p>
            <p className={styles.rain}>
              Lluvias:{" "}
              {weather.rain?.["1h"] !== undefined
                ? `${weather.rain["1h"]} mm`
                : "-"}
            </p>
          </div>
        </div>
      )}

      {/* máximas y mínimas */}
      <div className={styles.temperatures}>
        <p className={styles.p_max}>
          <FontAwesomeIcon icon={faTemperatureArrowUp} /> Máx:{" "}
          <span className={styles.span_max}>
            {formatTemperature(weather.main.temp_max)}&deg; C
          </span>
        </p>
        <p className={styles.p_min}>
          <FontAwesomeIcon icon={faTemperatureArrowDown} /> Mín:{" "}
          <span className={styles.span_min}>
            {formatTemperature(weather.main.temp_min)}&deg; C
          </span>
        </p>
      </div>
    </div>
  );
}