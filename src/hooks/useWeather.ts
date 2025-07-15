import axios from "axios";
import { z } from "zod";
import { SearchType } from "../types";
import { useMemo, useState, useCallback } from "react";

//Zod
const WeatherSchema = z.object({
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),

  name: z.string(),
  timezone: z.number(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    pressure: z.number(),
  }),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),

  rain: z
    .object({
      "1h": z.number(),
    })
    .optional(),
  clouds: z.object({
    all: z.number(),
  }),
});

export type WeatherSchema = z.infer<typeof WeatherSchema>;

const initialState = {
  name: "",
  timezone: 0,
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
  },
  rain: {
    "1h": 0,
  },
  clouds: {
    all: 0,
  },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
};

export default function useWeather() {
  const [weather, setWeather] = useState<WeatherSchema>(initialState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setNotFound(false);
  }, []);

  const fetchWeather = useCallback(async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY;

    if (!appId) {
      setError("API key no configurada");
      return;
    }

    setLoading(true);
    setWeather(initialState);
    setError(null);
    setNotFound(false);

    try {
      // Obtener coordenadas
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        search.city
      )},${encodeURIComponent(search.country)}&appid=${appId}`;

      const { data: geoData } = await axios.get(geoUrl);

      // Chequear si la ciudad existe
      if (!geoData || geoData.length === 0) {
        setNotFound(true);
        return;
      }

      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      // Obtener info del tiempo
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&appid=${appId}`;
      const { data: weatherResult } = await axios.get(weatherUrl);

      const result = WeatherSchema.safeParse(weatherResult);

      if (result.success) {
        setWeather(result.data);
      } else {
        setError("Error al procesar los datos del clima");
        console.error("Weather data validation error:", result.error);
      }
    } catch (error) {
      console.error("Weather fetch error:", error);

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          setError("Error de autenticación con la API");
        } else if (status === 404) {
          setNotFound(true);
        } else if (status && status >= 500) {
          setError("Error del servidor. Intenta más tarde");
        } else {
          setError("Error de conexión. Verifica tu internet");
        }
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const hasWeatherData = useMemo(() => {
    return (
      weather.name && weather.weather.length > 0 && weather.weather[0].id !== 0
    );
  }, [weather]);

  const resetState = useCallback(() => {
    setWeather(initialState);
    setLoading(false);
    setNotFound(false);
    setError(null);
  }, []);

  return {
    weather,
    loading,
    notFound,
    error,
    fetchWeather,
    hasWeatherData,
    clearError,
    resetState,
  };
}
