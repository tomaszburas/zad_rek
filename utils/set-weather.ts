import fetch from 'node-fetch';
import { WEATHER_API_KEY } from '../config';
import { WeatherRecord } from '../records/weather-record';

const lat = 50.8660773;
const lon = 20.6285677;

const saveWeather = async () => {
    const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const weather = await data.json();

    const newWeather = new WeatherRecord({
        place: weather.name,
        country: weather.sys.country,
        coordLat: weather.coord.lat,
        coordLon: weather.coord.lon,
        temp: weather.main.temp,
        pressure: weather.main.pressure,
        weather: weather.weather[0].main,
        weatherDesc: weather.weather[0].description,
        windSpeed: weather.wind.speed,
    });

    await newWeather.insert();
};

export const setWeather = () => {
    saveWeather();
    setInterval(setWeather, 3600000);
};
