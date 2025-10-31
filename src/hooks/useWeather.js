import { useState, useCallback } from "react";
import { fetchWeatherData } from "../api/weatherApi";

// custom hook to manage weather data fetching

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (latitude, longitude) => {
    if (!latitude || !longitude) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchWeatherData(latitude, longitude);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
  };
};
