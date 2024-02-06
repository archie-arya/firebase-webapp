import React, { useEffect, useState } from "react";
import UserTable from './UserTable';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import axios from "axios";
import "../App.css"

const HomePage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const weatherApiUrl =
      "https://api.weatherapi.com/v1/current.json?key=a2afc013aec84fa6ae781621230511&q=California&aqi=no";

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(weatherApiUrl);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="home-page-container">
        <div className="weather-container">
        <h2 className="header">Weather Information</h2>
        {weatherData ? (
            <div className="weather-card" >
          <div className="location-info">
          <img
            src={process.env.PUBLIC_URL + '/location-logo.jpeg'}
            alt="Location Logo"
            className="location-logo"
          />
            <p className="loc">
                Location: {weatherData.location.name},{" "}
                {weatherData.location.region},{" "}
                {weatherData.location.country}
            </p>
            </div>
            <div className="temperature-info">
              {process.env.PUBLIC_URL + '/temp_logo.png' && (
                <img className="temperature-logo" src={process.env.PUBLIC_URL + '/temp_logo.png'} alt="Temperature Logo" />
              )}
              <p className="temp">
                Temperature: {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)
              </p>
            </div>
            <p className="condition">
                Condition: {weatherData.current.condition.text}
            </p>
            <div className="wind-info">
              {process.env.PUBLIC_URL + '/wind_logo.jpg' && (
                <img className="wind-logo" src={process.env.PUBLIC_URL + '/wind_logo.jpg'} alt="Wind Logo" />
              )}
              <p className="wind">
                Wind: {weatherData.current.wind_kph} km/h, {weatherData.current.wind_dir}
              </p>
            </div>
            <div className="humidity-info">
              {process.env.PUBLIC_URL + '/humid_logo.jpeg' && (
                <img className="humidity-logo" src={process.env.PUBLIC_URL + '/humid_logo.jpeg'} alt="Humidity Logo" />
              )}
              <p className="humid">
                Humidity: {weatherData.current.humidity}%
              </p>
            </div>
            <div className="cloudiness-info">
              {process.env.PUBLIC_URL + '/cloud_logo.jpg' && (
                <img className="cloudiness-logo" src={process.env.PUBLIC_URL + '/cloud_logo.jpg'} alt="Cloudiness Logo" />
              )}
              <p className="cloud">
                Cloudiness: {weatherData.current.cloud}%
              </p>
            </div>
            <div className="uv-info">
                {process.env.PUBLIC_URL + '/uv_logo.jpg' && (
                  <img className="uv-logo" src={process.env.PUBLIC_URL + '/uv_logo.jpg'} alt="UV Index Logo" />
                )}
                <p className="UV">
                  UV Index: {weatherData.current.uv}
                </p>
              </div>
            </div>
        ) : (
            <p>Loading weather data...</p>
        )}
        </div>
        <div className="user-table">
          <UserTable/>
        </div>
    </div>
  );
};

export default HomePage;
