import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import WeatherCard from "../components/WeatherCard";

export default function App() {
  const { weatherData, loading, error, getWeather } = useWeather();

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="app">
      <h1>Weather App</h1>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={getWeather} />}
      {weatherData && <WeatherCard data={weatherData} onRefresh={getWeather} />}
    </div>
  );
}