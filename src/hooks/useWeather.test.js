import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWeather } from './useWeather';
import * as weatherApi from '../api/weatherApi';

vi.mock('../api/weatherApi');

describe('useWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null weather data and no loading', () => {
    const { result } = renderHook(() => useWeather());

    expect(result.current.weatherData).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch weather data successfully', async () => {
    const mockWeatherData = {
      location: {
        city: 'London',
        country: 'GB',
      },
      temperature: {
        current: 15,
        feelsLike: 13,
      },
      weather: {
        main: 'Clouds',
        description: 'broken clouds',
      },
    };

    weatherApi.fetchWeatherData.mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useWeather());

    // Call fetchWeather
    result.current.fetchWeather(51.5074, -0.1278);

    // Wait for completion - loading state changes too fast to reliably test
    await waitFor(() => {
      expect(result.current.weatherData).toEqual(mockWeatherData);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(weatherApi.fetchWeatherData).toHaveBeenCalledWith(51.5074, -0.1278);
  });

  it('should handle weather fetch errors', async () => {
    const mockError = new Error('Failed to fetch weather');
    weatherApi.fetchWeatherData.mockRejectedValue(mockError);

    const { result } = renderHook(() => useWeather());

    result.current.fetchWeather(51.5074, -0.1278);

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch weather');
    });

    expect(result.current.weatherData).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should clear previous error on new fetch', async () => {
    const mockError = new Error('First error');
    weatherApi.fetchWeatherData.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useWeather());

    // First call - should fail
    result.current.fetchWeather(51.5074, -0.1278);

    await waitFor(() => {
      expect(result.current.error).toBe('First error');
    });

    // Second call - should succeed
    const mockWeatherData = {
      location: { city: 'London' },
      temperature: { current: 15 },
    };
    weatherApi.fetchWeatherData.mockResolvedValue(mockWeatherData);

    result.current.fetchWeather(51.5074, -0.1278);

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      expect(result.current.weatherData).toEqual(mockWeatherData);
    });
  });
});