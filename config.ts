import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'Random String';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_NAME = process.env.DB_NAME || 'zad_rek';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
