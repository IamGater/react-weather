import React from "react";

const Weather = ({ data, error }) => {
  if (error) return <div className="info-card"><p className="error">{error}</p></div>;
  if (!data) return <div className="info-card"><p className="weather">Enter a city and press the button to see the weather</p></div>;

  const main = data.main || {};
  const wind = data.wind || {};
  const weatherArr = data.weather || [];
  const w = weatherArr[0] || {};

  const temp = main.temp;
  const feels_like = main.feels_like;
  const temp_min = main.temp_min;
  const temp_max = main.temp_max;
  const description = w.description || "";
  const icon = w.icon || null;
  const humidity = main.humidity;
  const pressure = main.pressure;
  const windSpeed = wind.speed;
  const city = data.name;
  const country = data.sys ? data.sys.country : "";

  return (
    <div className="info-card">
      <div>
        <div className="weather__top">
          <div className="weather-main">
            <h3 className="weather-city">{city}, {country}</h3>
            <p className="weather-desc">{description}</p>
          </div>
          {icon && (
            <div className="weather-icon">
              <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
            </div>
          )}
        </div>

        <div className="weather-grid">
          <div className="detail-item">
            <div className="detail-label">Temperature</div>
            <div className="detail-value">{typeof temp === 'number' ? Math.round(temp) + "°C" : "—"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Feels like</div>
            <div className="detail-value">{typeof feels_like === 'number' ? Math.round(feels_like) + "°C" : "—"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Low / High</div>
            <div className="detail-value">{typeof temp_min === 'number' ? Math.round(temp_min) + "° / " + Math.round(temp_max) + "°C" : "—"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{typeof humidity === 'number' ? humidity + "%" : "—"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Pressure</div>
            <div className="detail-value">{typeof pressure === 'number' ? pressure + " hPa" : "—"}</div>
          </div>
          <div className="detail-item">
            <div className="detail-label">Wind</div>
            <div className="detail-value">{typeof windSpeed === 'number' ? windSpeed + " m/s" : "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
