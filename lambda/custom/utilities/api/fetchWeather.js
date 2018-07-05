const fetch = require('node-fetch');

const API_KEY = '4bab2df8f5a678cbe86ac01e5203de87';

const fetchWeather = async cityName => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
  );

  const weatherInfo = await response.json();

  return weatherInfo;
};

module.exports = fetchWeather;
