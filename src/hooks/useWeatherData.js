import { useEffect, useCallback, useState } from "react";
import { useGeolocation } from "./useGeolocation";
import { useWeather } from "./useWeather";

// this hook handles getting the location and weather together

export const useWeatherData = () => {
  const geolocation = useGeolocation();
  const weather = useWeather();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch weather when coordinates are available
  useEffect(() => {
    if (geolocation.coordinates) {
      weather.fetchWeather(
        geolocation.coordinates.latitude,
        geolocation.coordinates.longitude
      );
    }
  }, [geolocation.coordinates, weather.fetchWeather]);

  // Get location on mount
  useEffect(() => {
    geolocation.getLocation();
  }, [geolocation.getLocation]);

  // Refresh function to get new location and weather
  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await geolocation.getLocation();
    setIsRefreshing(false);
  }, [geolocation.getLocation]);

  const loading = geolocation.loading || weather.loading;

  const error = geolocation.error || weather.error;

  return {
    weatherData: weather.weatherData,
    loading,
    isRefreshing,
    error,
    refresh,
  };
};
