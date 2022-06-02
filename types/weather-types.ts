import { FieldPacket } from 'mysql2';

export interface WeatherEntity {
    id: string;
    date: Date;
    coordLon: number;
    coordLat: number;
    place: string;
    country: string;
    weather: string;
    weatherDesc: string;
    temp: number;
    pressure: number;
    windSpeed: number;
}

export interface NewWeatherEntity extends Omit<WeatherEntity, 'id' | 'date'> {
    id?: string;
    date?: Date;
}

export type WeatherRecordResults = [WeatherEntity[], FieldPacket[]];
