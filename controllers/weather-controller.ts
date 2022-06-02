import { Request, Response } from 'express';
import { WeatherRecord } from '../records/weather-record';

export class WeatherController {
    static async get(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            weather: await WeatherRecord.getLast(),
        });
    }
}
