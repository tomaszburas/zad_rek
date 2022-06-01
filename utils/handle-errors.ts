import { NextFunction, Request, Response } from 'express';

interface Error {
    errno?: number;
}

export class ValidationError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    // SQL DUPLICATE USERNAME ERROR
    if (err.errno === 1062) {
        res.status(400).json({
            success: false,
            message: 'Given username already exist in database. Please enter a new username.',
        });
    } else {
        // DEFAULT ERRORS
        res.status(err instanceof ValidationError ? 400 : 500).json({
            success: false,
            message: err instanceof ValidationError ? err.message : 'Sorry, please try again later.',
        });
    }
};
