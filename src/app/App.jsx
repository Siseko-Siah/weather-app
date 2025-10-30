import { useEffect } from "react";
import { fetchWeather } from "../api/weatherApi";

const App = () => {
useEffect(() => {
    const testApi = async () => {
        const data = await fetchWeather(35.6895, 139.6917); 
        console.log("Weather data:", data);
    }
    testApi();
}, []);
    return <h1>Testing Weather API (check console)</h1>
}
export default App;