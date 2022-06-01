import fetch from 'node-fetch';
import { ValidationError } from './handle-errors';

export const getAllPeopleSwapi = async () => {
    const data = await fetch('https://swapi.dev/api/people');
    const people = await data.json();

    if (!people.results.length) {
        throw new ValidationError('People not found.');
    }

    const allPeople = [];
    allPeople.push(...people.results);

    const pages = Math.ceil(people.count / people.results.length);

    if (pages > 1) {
        for (let i = 2; i <= pages; i++) {
            const resultPerPage = await fetch(`https://swapi.dev/api/people/?page=${i}`);
            const peoplePerPage = await resultPerPage.json();
            allPeople.push(...peoplePerPage.results);
        }
    }

    return allPeople;
};
