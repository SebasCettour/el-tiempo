import { formatTemperature, windSpeedKmH } from "../../helpers";
import {getWindDirection } from "../../helpers"
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

      <p className={styles.feels_like}>Sensación Térmica: {formatTemperature(weather.main.feels_like)}&deg; C</p>
      <p className={styles.humidity}>Humedad: {weather.main.humidity}%</p>
      <p className={styles.pressure}>Presión atmosférica: {weather.main.pressure} hPa</p>
      <p className={styles.wind}>Viento: {getWindDirection(weather.wind.deg)} ({windSpeedKmH(weather.wind.speed)} km/h)</p>
      <p className={styles.rain}>Lluvias: {weather.rain?.["1h"] !== undefined ? `${weather.rain["1h"]} mm` : "-"}</p>
      <p className={styles.clouds}>Nubosidad: {weather.clouds.all}%</p>


    </div>
  )
}
