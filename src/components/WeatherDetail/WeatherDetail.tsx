import { formatTemperature } from "../../helpers";
import { WeatherSchema } from "../../hooks/useWeather";

type WeatherDetailProps = {
  weather: WeatherSchema;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div>
      <h2> El tiempo en {weather.name}</h2>
      <p>Temperatura Actual: {formatTemperature(weather.main.temp)}&deg; C</p>
      <div>
        <p>Max: {formatTemperature(weather.main.temp_max)}&deg; C</p>
        <p>Min: {formatTemperature(weather.main.temp_min)}&deg; C</p>
      </div>
    </div>
  );
}
