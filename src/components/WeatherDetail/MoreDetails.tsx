import { formatTemperature } from "../../helpers";
import { WeatherSchema } from "../../hooks/useWeather";
import styles from "./MoreDetails.module.css"

type WeatherDetailProps = {
  weather: WeatherSchema;
};

export default function MoreDetails({ weather }: WeatherDetailProps) {
  if (!weather) return null;
  console.log(weather);

  return (
    <div className={styles.container}>

      <p className={styles.st}>Sensación Térmica: {formatTemperature(weather.main.feels_like)}&deg; C</p>
      <p className={styles.humedad}>Humedad: {weather.main.humidity}%</p>
      <p className={styles.presion}>Presión atmosférica: {weather.main.pressure} hPa</p>

    </div>
  )
}
