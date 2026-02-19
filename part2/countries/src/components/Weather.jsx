import { useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY;
const base_url = "http://api.weatherapi.com/v1/current.json";

const Weather = ({ countryData }) => {
  const [weatherData, setWeatherData] = useState(null);

  const capital = countryData.capital[0];

  if (weatherData === null || capital !== weatherData.location.name) {
    console.log("Downloading weather data for", capital);
    axios
      .get(`${base_url}?key=${api_key}&q=${capital}&aqi=no`)
      .then((response) => {
        setWeatherData(response.data);
      });
  } else {
    console.log("Showing Weather for", capital);
    console.log("Icon");
    return (
      <div>
        <h1>Weather in {capital}</h1>
        <p>Temperature {weatherData.current.temp_c} Celsius</p>
        <img src={weatherData.current.condition.icon} height="100" />
        <p>Wind {weatherData.current.wind_kph} k/h</p>
      </div>
    );
  }
};

export default Weather;
