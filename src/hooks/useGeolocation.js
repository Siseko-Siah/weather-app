import { useState, useCallback } from "react";
import { getCurrentLocation } from "../api/weatherApi";

// Custom hook to manage geolocation

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const location = await getCurrentLocation();
      setCoordinates({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (err) {
      setError(err.message);
      setCoordinates(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    coordinates,
    loading,
    error,
    getLocation,
  };
};
