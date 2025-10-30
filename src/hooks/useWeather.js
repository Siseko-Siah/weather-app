import { useState, useEffect, useCallback } from 'react';
import { getCurrentLocation, fetchWeatherData } from '../api/weatherApi';

/**
 * Custom hook to manage weather data and geolocation
 * @returns {Object} Weather state and control functions
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user location
      const location = await getCurrentLocation();

      // Fetch weather data
      const weather = await fetchWeatherData(location.latitude, location.longitude);
      
      setWeatherData(weather);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load weather on mount
  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  // Refresh function
  const refresh = useCallback(() => {
    loadWeather();
  }, [loadWeather]);

  return {
    weatherData,
    loading,
    error,
    refresh,
  };
};
