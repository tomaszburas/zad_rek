import { v4 as uuid } from 'uuid';
import { NewWeatherEntity, WeatherEntity, WeatherRecordResults } from '../types';
import { pool } from '../utils/db';
import { ValidationError } from '../utils/handle-errors';

export class WeatherRecord implements WeatherEntity {
  id: string;
  date: Date;
  place: string;
  country: string;
  coordLat: number;
  coordLon: number;
  temp: number;
  pressure: number;
  weather: string;
  weatherDesc: string;
  windSpeed: number;

  constructor(obj: NewWeatherEntity) {
    this.id = obj.id;
    this.date = obj.date;
    this.place = obj.place;
    this.country = obj.country;
    this.coordLat = obj.coordLat;
    this.coordLon = obj.coordLon;
    this.temp = obj.temp;
    this.pressure = obj.pressure;
    this.weather = obj.weather;
    this.weatherDesc = obj.weatherDesc;
    this.windSpeed = obj.windSpeed;
  }

  async insert() {
    if (!this.id) this.id = uuid();
    if (!this.date) this.date = new Date();

    await pool.execute(
      'INSERT INTO `weathers` VALUES (:id, :date, :place, :country, :coordLat, :coordLon, :temp, :pressure, :weather, :weatherDesc, :windSpeed)',
      {
        id: this.id,
        date: this.date,
        place: this.place,
        country: this.country,
        coordLat: this.coordLat,
        coordLon: this.coordLon,
        temp: this.temp,
        pressure: this.pressure,
        weather: this.weather,
        weatherDesc: this.weatherDesc,
        windSpeed: this.windSpeed,
      },
    );
  }

  static async getLast(): Promise<WeatherRecord> {
    const [weather] = (await pool.execute(
      'SELECT * FROM `weathers` ORDER BY `date` DESC LIMIT 1',
    )) as WeatherRecordResults;

    if (!weather[0]) throw new ValidationError('Weather not found');

    return new WeatherRecord(weather[0]);
  }
}
