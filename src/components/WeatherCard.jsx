export default function WeatherCard({ data, onRefresh }) {
    const { name, main, weather, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
    return (
      <div className="weather-card">
        <h2>{name}</h2>
        <img src={iconUrl} alt={weather[0].description} />
        <h3>{Math.round(main.temp)}°C</h3>
        <p>{weather[0].description}</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
        <button onClick={onRefresh}>Refresh</button>
      </div>
    );
  }