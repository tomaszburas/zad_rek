import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN
    || 'sdfdsafdsfdsACR$3$#@C$#%@ cV54v354VY345 v3Y3v54Y%#^vy56yv65f345th^%jh^&5J&^&^&IJ hsdfFDSA3322';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_NAME = process.env.DB_NAME || 'zad_rek';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'fff34e39432768cd2c730f7793b920f4';
