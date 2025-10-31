import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getCurrentLocation, fetchWeatherData } from './weatherApi';

describe('weatherApi', () => {
  describe('getCurrentLocation', () => {
    let geolocationMock;

    beforeEach(() => {
      geolocationMock = {
        getCurrentPosition: vi.fn(),
      };
      global.navigator.geolocation = geolocationMock;
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should resolve with coordinates on success', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      };

      geolocationMock.getCurrentPosition.mockImplementation((success) => {
        success(mockPosition);
      });

      const result = await getCurrentLocation();

      expect(result).toEqual({
        latitude: 51.5074,
        longitude: -0.1278,
      });
      expect(geolocationMock.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('should reject with permission denied error', async () => {
      const mockError = {
        code: 1, // PERMISSION_DENIED
        PERMISSION_DENIED: 1,
      };

      geolocationMock.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError);
      });

      await expect(getCurrentLocation()).rejects.toThrow(
        'Location access denied. Please enable location permissions in your browser settings.'
      );
    });

    it('should reject with position unavailable error', async () => {
      const mockError = {
        code: 2, // POSITION_UNAVAILABLE
        POSITION_UNAVAILABLE: 2,
      };

      geolocationMock.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError);
      });

      await expect(getCurrentLocation()).rejects.toThrow(
        'Unable to retrieve your location. Please check your device settings.'
      );
    });

    it('should reject with timeout error', async () => {
      const mockError = {
        code: 3, // TIMEOUT
        TIMEOUT: 3,
      };

      geolocationMock.getCurrentPosition.mockImplementation((success, error) => {
        error(mockError);
      });

      await expect(getCurrentLocation()).rejects.toThrow(
        'Location request timed out. Please try again.'
      );
    });

    it('should reject when geolocation is not supported', async () => {
      global.navigator.geolocation = undefined;

      await expect(getCurrentLocation()).rejects.toThrow(
        'Geolocation is not supported by your browser'
      );
    });
  });

  describe('fetchWeatherData', () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should fetch and transform weather data successfully', async () => {
      const mockApiResponse = {
        name: 'London',
        sys: { country: 'GB', sunrise: 1609459200, sunset: 1609491600 },
        coord: { lat: 51.5074, lon: -0.1278 },
        main: {
          temp: 15.5,
          feels_like: 14.2,
          temp_min: 12.0,
          temp_max: 18.0,
          humidity: 75,
          pressure: 1013,
        },
        weather: [
          {
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d',
          },
        ],
        wind: { speed: 5.5, deg: 220 },
        clouds: { all: 75 },
        timezone: 0,
      };

      global.fetch.mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await fetchWeatherData(51.5074, -0.1278);

      expect(result).toEqual({
        location: {
          city: 'London',
          country: 'GB',
          coordinates: { lat: 51.5074, lon: -0.1278 },
        },
        temperature: {
          current: 16,
          feelsLike: 14,
          min: 12,
          max: 18,
        },
        weather: {
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d',
        },
        wind: { speed: 5.5, direction: 220 },
        humidity: 75,
        pressure: 1013,
        clouds: 75,
        sunrise: 1609459200,
        sunset: 1609491600,
        timezone: 0,
      });
    });

    it('should throw error when API request fails', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(fetchWeatherData(51.5074, -0.1278)).rejects.toThrow(
        'Unable to fetch weather data. Please check your connection and try again.'
      );
    });

    it('should throw error when network fails', async () => {
      global.fetch.mockRejectedValue(new Error('Network error'));

      await expect(fetchWeatherData(51.5074, -0.1278)).rejects.toThrow(
        'Unable to fetch weather data. Please check your connection and try again.'
      );
    });
  });
});