import { Request, Response } from 'express';
import { ACCESS_TOKEN } from '../config';

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

        await user.create();

        res.status(201).json({ success: true });
    }

    static login(req: Request, res: Response) {
        const { username, password } = req.body;

        const user = await AdminRecord.login(name, password);

        const payload = {
            _id: user._id,
            name: user.name,
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
