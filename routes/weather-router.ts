import { Router } from 'express';
import { WeatherController } from '../controllers/weather-controller';

export const WeatherRouter = Router();

WeatherRouter.get('/get', WeatherController.get);
