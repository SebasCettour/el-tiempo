import { useCallback } from "react";
import { WeatherSchema } from "./useWeather";

interface UseWeatherClipboardProps {
  weather: WeatherSchema;
  hasWeatherData: boolean;
  lastSearch: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useWeatherClipboard({
  weather,
  hasWeatherData,
  lastSearch,
  onSuccess,
  onError,
}: UseWeatherClipboardProps) {
  const copyToClipboard = useCallback(async () => {
    if (!hasWeatherData || !lastSearch) return;

    const weatherText =
      `🌡️ Clima en ${weather.name}\n` +
      `Temperatura: ${Math.round(weather.main.temp - 273.15)}°C\n` +
      `Descripción: ${weather.weather[0].description}\n` +
      `Humedad: ${weather.main.humidity}%\n` +
      `Viento: ${Math.round(weather.wind.speed * 3.6)} km/h`;

    try {
      await navigator.clipboard.writeText(weatherText);
      onSuccess?.();
    } catch {
      onError?.();
    }
  }, [weather, hasWeatherData, lastSearch, onSuccess, onError]);

  return {
    copyToClipboard,
  };
}
