import { useWeatherData } from '../hooks/useWeatherData';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { WeatherCard } from '../components/WeatherCard';
import { RefreshCw } from 'lucide-react';

export const WeatherPage = () => {
  const { weatherData, loading, error, refresh } = useWeatherData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-300 py-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-4">
          <h1 className="text-gray-900">Weather App</h1>
          <button
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md h-10 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Content */}
        {error && <ErrorMessage message={error} />}
        {loading && !error && <Loader />}
        {weatherData && !loading && !error && <WeatherCard weatherData={weatherData} />}
      </div>
    </div>
  );
};