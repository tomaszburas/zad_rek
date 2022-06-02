import { Router } from 'express';
import { WeatherController } from '../controllers/weather-controller';
import { authenticate } from '../utils/authenticate';

export const WeatherRouter = Router();

WeatherRouter
  .get('/get', authenticate, WeatherController.get);
