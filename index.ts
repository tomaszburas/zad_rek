import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { PORT } from './config';
import { handleError } from './utils/handle-errors';
import { HomeRouter } from './routes/home-router';
import { StarWarsRouter } from './routes/starwars-router';
import { WeatherRouter } from './routes/weather-router';

const app = express();

app.use(cors());
app.use(json());

app.use('/', HomeRouter);
app.use('/starwars', StarWarsRouter);
app.use('/weather', WeatherRouter);

app.use(handleError);
app.listen(PORT, () => `Server listening on port ${PORT}`);
