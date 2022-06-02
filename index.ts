import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { PORT } from './config';
import { handleError } from './utils/handle-errors';
import { HomeRouter } from './routes/home-router';
import { StarWarsRouter } from './routes/starwars-router';
import { WeatherRouter } from './routes/weather-router';
import { setWeather } from './utils/set-weather';

import './utils/passport';

const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', HomeRouter);
app.use('/starwars', StarWarsRouter);
app.use('/weather', WeatherRouter);

setWeather();

app.use(handleError);

app.listen(PORT, () => `Server listening on port ${PORT}`);
