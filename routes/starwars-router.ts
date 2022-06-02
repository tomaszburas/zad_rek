import { Router } from 'express';
import { StarWarsController } from '../controllers/starwars-controller';
import { authenticate } from '../utils/authenticate';

export const StarWarsRouter = Router();

StarWarsRouter.get('/getall', StarWarsController.getAll).get(
    '/getfiltered',
    authenticate,
    StarWarsController.getFiltered
);
