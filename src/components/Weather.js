import React from "react";

const Weather = ({ temp, city, country }) => {
  return (
    <>
      {city ? (
        <div className="weather__wrapper">
          <p className="weather">Location: {city}, {country}</p>
          <p className="weather">Temperature: {Math.round(temp)} degrees</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Weather;
