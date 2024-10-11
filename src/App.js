import { useState } from "react";
import "./App.css";
import Form from "./components/form";
import Info from "./components/info";
import Weather from "./components/Weather";

const API_KEY = "4025d04af9d0fca48ca683b2b2874bf4";

function App() {
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    country: null,
  });
  const [error, setError] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (api_url.ok) {
      const data = await api_url.json();
      setWeather({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
      });
      setError("");
    } else {
      setError("City ​​not found");
    }
  };

  return (
    <div className="App">
      <Info />
      <Form weather={getWeather} />
      {error && <p className="error">{error}</p>} {}
      <Weather
        temp={weather.temp}
        city={weather.city}
        country={weather.country}
      />
    </div>
  );
}

export default App;
