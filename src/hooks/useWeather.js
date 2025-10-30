import { useState } from 'react';
import { fetchWeather } from '../api/weatherApi';

export const useWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // This function refreshes the current weather data for given coordinates
    const getWeather = () => {
        setLoading(true);
        setError("");
        setWeatherData(null);

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, logitude} = position.coords;

                try {
                    const data = await fetchWeather(latitude, logitude);
                    setWeatherData(data);
                } catch (error) {
                    setError("Failed to fetch weather data.");
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setError("Unable to retrieve your location. Please allow location access.");
                setLoading(false);
            }
        )
    };

    return { weatherData, loading, error, getWeather };


}