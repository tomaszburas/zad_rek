import { Request, Response } from 'express';
import { getAllPeopleSwapi } from '../utils/get-all-people-swapi';
import { ValidationError } from '../utils/handle-errors';

export class StarWarsController {
  static async getAll(req: Request, res: Response) {
    res.status(200).json({
      success: true,
      people: await getAllPeopleSwapi(),
    });
  }

  static async getFiltered(req: Request, res: Response) {
    if (!req.query) {
      throw new ValidationError('Query is empty.');
    }

    const queries = Object.entries(req.query);

    const people = await getAllPeopleSwapi();

    const filtered = people.filter((person) => {
      let result = true;
      queries.forEach(([key, value]) => {
        if (person[key].toLowerCase() !== value) {
          result = false;
        }
      });

      return result ? people : false;
    });

    res.status(200).json({
      success: !!filtered,
      people: filtered,
    });
  }
}
