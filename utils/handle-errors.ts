import { NextFunction, Request, Response } from 'express';

interface Error {
    errno?: number;
}

export class ValidationError extends Error {}
export class AuthError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    // SQL DUPLICATE USERNAME ERROR
    if (err.errno === 1062) {
        res.status(400).json({
            success: false,
            message: 'Given username already exist in database. Please enter a new username.',
        });
        return;
    }
    // AUTH ERROR
    if (err instanceof AuthError) {
        res.status(401).json({
            success: false,
            message: 'User is not authenticated.',
        });
        return;
    }
    // VALIDATION ERROR
    if (err instanceof ValidationError) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
        return;
    }
    // SERVER ERRORS
    res.status(500).json({
        success: false,
        message: 'Sorry, please try again later.',
    });
};
