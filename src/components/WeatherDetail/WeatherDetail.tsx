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
  faThermometerHalf,
  faTint,
  faTachometerAlt,
  faWind,
  faCloudRain,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface WeatherDetailProps {
  weather: WeatherSchema;
  className?: string;
}

interface WeatherInfoItemProps {
  icon: IconDefinition;
  label: string;
  value: string | number;
  unit?: string;
  className?: string;
}

const WeatherInfoItem = memo<WeatherInfoItemProps>(
  ({ icon, label, value, unit = "", className = "" }) => (
    <div className={`${styles.infoItem} ${className}`}>
      <FontAwesomeIcon icon={icon} className={styles.infoIcon} />
      <span className={styles.infoLabel}>{label}:</span>
      <span className={styles.infoValue}>
        {value}
        {unit}
      </span>
    </div>
  )
);

WeatherInfoItem.displayName = "WeatherInfoItem";

const WeatherDetail = memo<WeatherDetailProps>(
  ({ weather, className = "" }) => {
    const hasWeatherData = weather.weather.length > 0;
    const currentWeather = hasWeatherData ? weather.weather[0] : null;
    const rainAmount = weather.rain?.["1h"];

    if (!hasWeatherData) {
      return (
        <div className={`${styles.container} ${className}`}>
          <div className={styles.noData}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.noDataIcon}
            />
            <p>No hay datos meteorológicos disponibles</p>
          </div>
        </div>
      );
    }

    const getLocalTime = (timezoneOffset: number): string => {
      const nowUTC = new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60000
      );
      const localTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);
      return localTime.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return (
      <div
        className={`${styles.container} ${className}`}
        role="region"
        aria-label="Información del clima"
      >
        <header className={styles.header}>
          <h2 className={styles.title}>
            El tiempo en <span className={styles.cityName}>{weather.name}</span>
          </h2>
          <p className={styles.localTime}>
            Hora: {getLocalTime(weather.timezone)}
          </p>
        </header>

        <main className={styles.mainContent}>
          {/* Clima actual */}
          <section className={styles.currentWeather} aria-label="Clima actual">
            <div className={styles.weatherIconContainer}>
              <img
                className={styles.weatherIcon}
                src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@2x.png`}
                alt={`Icono de ${currentWeather?.description}`}
                loading="lazy"
              />
            </div>

            <div className={styles.temperatureContainer}>
              <p className={styles.currentTemp} aria-label="Temperatura actual">
                {formatTemperature(weather.main.temp)}°C
              </p>
              <p
                className={styles.description}
                aria-label="Descripción del clima"
              >
                {currentWeather?.description}
              </p>
            </div>
          </section>

          {/* Detalles del Tiempo */}
          <section className={styles.details} aria-label="Detalles del clima">
            <WeatherInfoItem
              icon={faThermometerHalf}
              label="Sensación Térmica"
              value={formatTemperature(weather.main.feels_like)}
              unit="°C"
              className={styles.feelsLike}
            />

            <WeatherInfoItem
              icon={faTint}
              label="Humedad"
              value={weather.main.humidity}
              unit="%"
              className={styles.humidity}
            />

            <WeatherInfoItem
              icon={faTachometerAlt}
              label="Presión"
              value={weather.main.pressure}
              unit=" hPa"
              className={styles.pressure}
            />

            <WeatherInfoItem
              icon={faWind}
              label="Viento"
              value={`${getWindDirection(weather.wind.deg)} (${windSpeedKmH(
                weather.wind.speed
              )} km/h)`}
              className={styles.wind}
            />

            <WeatherInfoItem
              icon={faCloudRain}
              label="Lluvias"
              value={rainAmount !== undefined ? `${rainAmount} mm` : "-"}
              className={styles.rain}
            />
          </section>

          {/* Temp max-min*/}
          <section
            className={styles.temperatureRange}
            aria-label="Rango de temperaturas"
          >
            <div className={styles.tempItem}>
              <FontAwesomeIcon
                icon={faTemperatureArrowUp}
                className={styles.tempIcon}
                aria-hidden="true"
              />
              <span className={styles.tempLabel}>Máx:</span>
              <span className={styles.tempMax}>
                {formatTemperature(weather.main.temp_max)}°C
              </span>
            </div>

            <div className={styles.tempItem}>
              <FontAwesomeIcon
                icon={faTemperatureArrowDown}
                className={styles.tempIcon}
                aria-hidden="true"
              />
              <span className={styles.tempLabel}>Mín:</span>
              <span className={styles.tempMin}>
                {formatTemperature(weather.main.temp_min)}°C
              </span>
            </div>
          </section>
        </main>
      </div>
    );
  }
);

WeatherDetail.displayName = "WeatherDetail";

export default WeatherDetail;
