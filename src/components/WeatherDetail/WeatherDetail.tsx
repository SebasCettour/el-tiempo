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
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { memo, useMemo } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface WeatherDetailProps {
  weather: WeatherSchema;
  className?: string;
  compact?: boolean;
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
  ),
);

WeatherInfoItem.displayName = "WeatherInfoItem";

const WeatherDetail = memo<WeatherDetailProps>(
  ({ weather, className = "", compact = false }) => {
    const hasWeatherData = weather.weather.length > 0;
    const currentWeather = hasWeatherData ? weather.weather[0] : null;
    const rainAmount = weather.rain?.["1h"];

    const weatherQuality = useMemo(() => {
      if (!hasWeatherData) return "";
      const temp = weather.main.temp - 273.15;
      const humidity = weather.main.humidity;

      if (temp >= 18 && temp <= 25 && humidity >= 40 && humidity <= 60) {
        return "Condiciones ideales 😊";
      } else if (temp < 10 || temp > 30) {
        return "Condiciones extremas ⚠️";
      }
      return "Condiciones normales ☁️";
    }, [hasWeatherData, weather.main.temp, weather.main.humidity]);

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
        new Date().getTime() + new Date().getTimezoneOffset() * 60000,
      );
      const localTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);
      return localTime.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return (
      <div
        className={`${styles.container} ${compact ? styles.compact : ""} ${className}`}
        role="region"
        aria-label="Información del clima"
      >
        <header className={styles.hero}>
          <h2 className={styles.cityName}>{weather.name}</h2>

          <p className={styles.localTime}>{getLocalTime(weather.timezone)}</p>

          <div className={styles.weatherIconContainer}>
            <img
              className={styles.weatherIcon}
              src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`}
              alt={`Icono de ${currentWeather?.description}`}
              loading="lazy"
            />
          </div>

          <p className={styles.currentTemp}>
            {formatTemperature(weather.main.temp)}°
          </p>

          <p className={styles.description}>{currentWeather?.description}</p>

          <p className={styles.weatherQuality}>{weatherQuality}</p>

          <div className={styles.temperatureRange}>
            <div className={styles.tempChip}>
              <FontAwesomeIcon icon={faTemperatureArrowUp} />
              {formatTemperature(weather.main.temp_max)}°
            </div>

            <div className={styles.tempChip}>
              <FontAwesomeIcon icon={faTemperatureArrowDown} />
              {formatTemperature(weather.main.temp_min)}°
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>
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
                weather.wind.speed,
              )} km/h)`}
              className={styles.wind}
            />

            <WeatherInfoItem
              icon={faCloudRain}
              label="Lluvias"
              value={rainAmount !== undefined ? `${rainAmount} mm` : "-"}
              className={styles.rain}
            />

            <WeatherInfoItem
              icon={faCloud}
              label="Nubosidad"
              value={weather.clouds.all}
              unit="%"
              className={styles.clouds}
            />
          </section>
        </main>
      </div>
    );
  },
);

WeatherDetail.displayName = "WeatherDetail";

export default WeatherDetail;
