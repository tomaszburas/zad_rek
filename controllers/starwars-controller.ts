import fetch from 'node-fetch';
import { Request, Response } from 'express';

export class StarWarsController {
    static async getAll(req: Request, res: Response) {
        const data = await fetch('https://swapi.dev/api/people');
        const people = await data.json();

        const allPeople = [];
        const pages = Math.ceil(people.count / people.results.length);

        for (let i = 1; i <= pages; i++) {
            const resultPerPage = await fetch(`https://swapi.dev/api/people/?page=${i}`);
            const peoplePerPage = await resultPerPage.json();
            allPeople.push(peoplePerPage.results);
        }

        res.status(200).json({
            allPeople,
        });
    }

    static getFiltered(req: Request, res: Response) {}
}
