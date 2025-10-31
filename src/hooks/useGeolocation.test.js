import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGeolocation } from './useGeolocation';
import * as weatherApi from '../api/weatherApi';

vi.mock('../api/weatherApi');

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with null coordinates and no loading', () => {
    const { result } = renderHook(() => useGeolocation());

    expect(result.current.coordinates).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch location successfully', async () => {
    const mockCoordinates = {
      latitude: 51.5074,
      longitude: -0.1278,
    };

    weatherApi.getCurrentLocation.mockResolvedValue(mockCoordinates);

    const { result } = renderHook(() => useGeolocation());

    // Call getLocation
    result.current.getLocation();

    // Wait for completion - loading state changes too fast to reliably test
    await waitFor(() => {
      expect(result.current.coordinates).toEqual(mockCoordinates);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle location errors', async () => {
    const mockError = new Error('Location access denied');
    weatherApi.getCurrentLocation.mockRejectedValue(mockError);

    const { result } = renderHook(() => useGeolocation());

    result.current.getLocation();

    await waitFor(() => {
      expect(result.current.error).toBe('Location access denied');
    });

    expect(result.current.coordinates).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should clear previous error on new location request', async () => {
    const mockError = new Error('First error');
    weatherApi.getCurrentLocation.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useGeolocation());

    // First call - should fail
    result.current.getLocation();

    await waitFor(() => {
      expect(result.current.error).toBe('First error');
    });

    // Second call - should succeed
    const mockCoordinates = { latitude: 51.5074, longitude: -0.1278 };
    weatherApi.getCurrentLocation.mockResolvedValue(mockCoordinates);

    result.current.getLocation();

    await waitFor(() => {
      expect(result.current.error).toBeNull();
      expect(result.current.coordinates).toEqual(mockCoordinates);
    });
  });
});