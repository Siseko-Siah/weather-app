import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Gauge, 
  Sun, 
  Moon, 
  Cloud, 
  Navigation 
} from 'lucide-react';
import { getWeatherIconUrl } from '../api/weatherApi';

export const WeatherCard = ({ weatherData }) => {
  // Format time from timestamp
  const formatTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toUTCString().slice(-12, -7);
  };

  // Format coordinates
  const formatCoordinate = (value, isLat) => {
    const direction = isLat ? (value >= 0 ? 'N' : 'S') : (value >= 0 ? 'E' : 'W');
    return `${Math.abs(value).toFixed(4)}° ${direction}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 space-y-4">
      {/* Main Weather Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-gray-600" />
                {weatherData.location.city}, {weatherData.location.country}
              </h2>
              <p className="text-sm text-gray-600 capitalize">
                {weatherData.weather.description}
              </p>
            </div>
            <img
              src={getWeatherIconUrl(weatherData.weather.icon)}
              alt={weatherData.weather.description}
              className="w-16 h-16"
            />
          </div>
          
          <div className="text-4xl">
            {weatherData.temperature.current}°C
            <span className="text-xl text-gray-600 ml-3">
              Feels like {weatherData.temperature.feelsLike}°C
            </span>
          </div>
        </div>
      </div>

      {/* Weather Statistics */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {/* Min/Max Temperature */}
            <div className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Min / Max</p>
                <p className="text-gray-900">
                  {weatherData.temperature.min}° / {weatherData.temperature.max}°
                </p>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-gray-900">{weatherData.humidity}%</p>
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-gray-900">{weatherData.wind.speed} m/s</p>
              </div>
            </div>

            {/* Pressure */}
            <div className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="text-gray-900">{weatherData.pressure} hPa</p>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="h-[1px] w-full bg-gray-200 my-4" />

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sunrise */}
            <div className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Sunrise</p>
                <p className="text-gray-900">
                  {formatTime(weatherData.sunrise, weatherData.timezone)}
                </p>
              </div>
            </div>

            {/* Sunset */}
            <div className="flex items-start gap-3">
              <Moon className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Sunset</p>
                <p className="text-gray-900">
                  {formatTime(weatherData.sunset, weatherData.timezone)}
                </p>
              </div>
            </div>

            {/* Clouds */}
            <div className="flex items-start gap-3">
              <Cloud className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Cloudiness</p>
                <p className="text-gray-900">{weatherData.clouds}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6">
          <h3 className="mb-4">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coordinates */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Coordinates</p>
              <p className="text-gray-900">
                {formatCoordinate(weatherData.location.coordinates.lat, true)},{' '}
                {formatCoordinate(weatherData.location.coordinates.lon, false)}
              </p>
            </div>

            {/* Wind Direction */}
            <div className="flex items-start gap-3">
              <Navigation 
                className="w-5 h-5 text-gray-600 mt-0.5" 
                style={{ transform: `rotate(${weatherData.wind.direction}deg)` }}
              />
              <div>
                <p className="text-sm text-gray-600">Wind Direction</p>
                <p className="text-gray-900">{weatherData.wind.direction}°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
