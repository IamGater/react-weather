import { useState } from "react";
import "./App.css";
import Form from "./components/form";
import Info from "./components/info";
import Weather from "./components/Weather";
import Loader from "./components/Loader";

const API_KEY = "4025d04af9d0fca48ca683b2b2874bf4";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    setLoading(true);
    try {
      const api_url = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      );

      if (api_url.ok) {
        const data = await api_url.json();
        setWeather(data);
        setError("");
      } else {
        setError("City ​​not found");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="card">
        <Info />
        <Form weather={getWeather} apiKey={API_KEY} loading={loading} />
        {loading ? <Loader /> : <Weather data={weather} error={error} />}
      </div>
    </div>
  );
}

export default App;
