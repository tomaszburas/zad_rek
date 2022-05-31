import { Router } from 'express';
import { HomeController } from '../controllers/home-controller';

export const HomeRouter = Router();

HomeRouter.get('/', HomeController.homePage)
    .post('/register', HomeController.register)
    .post('/login', HomeController.login);
