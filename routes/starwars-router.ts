import { Router } from 'express';
import { StarWarsController } from '../controllers/starwars-controller';

export const StarWarsRouter = Router();

StarWarsRouter.get('/getall', StarWarsController.getAll).get('/getfiltered', StarWarsController.getFiltered);
