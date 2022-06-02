import fetch from 'node-fetch';
import { ValidationError } from './handle-errors';
import { Hero, StarWarsEntity } from '../types';

export const getAllPeopleSwapi = async () => {
  const data = await fetch('https://swapi.dev/api/people');
  const people = await data.json();

  if (!people.results.length) {
    throw new ValidationError('People not found.');
  }

  const allPeople: Hero[] = [];
  allPeople.push(...people.results);

  const pages = Math.ceil(people.count / people.results.length);

  if (pages > 1) {
    const resultPerPage = [];
    for (let i = 2; i <= pages; i++) {
      resultPerPage.push(fetch(`https://swapi.dev/api/people/?page=${i}`));
    }
    const allResults = await Promise.all(resultPerPage);

    const allResultsJson: any[] = [];
    allResults.forEach((result) => allResultsJson.push(result.json()));

    const allResultsPeople: StarWarsEntity[] = await Promise.all(allResultsJson);

    allResultsPeople.forEach((element) => {
      element.results.forEach((hero) => allPeople.push(hero));
    });
  }

  return allPeople;
};
