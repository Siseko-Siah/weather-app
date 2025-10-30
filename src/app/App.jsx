import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";

export default function App() {
  const { weatherData, loading, error, getWeather } = useWeather();

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div>
      <h1>Weather Hook Test</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      )}
    </div>
  );
}