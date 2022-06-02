import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN } from '../config';
import { UserRecord } from '../records/user-record';

export class HomeController {
    static homePage(req: Request, res: Response) {
        res.status(200).json({
            success: true,
            message: 'Welcome :)',
        });
    }

    static async register(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = new UserRecord({
            username,
            password,
        });

        await user.register();

        res.status(201).json({ success: true });
    }

    static async login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = new UserRecord({
            username,
            password,
        });

        const loggedUser = await user.login();

        const payload = {
            id: loggedUser.id,
            username: loggedUser.username,
        };

        const token = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '1d' });

        res.status(200)
            .cookie('access_token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            })
            .json({
                success: true,
            });
    }
}
