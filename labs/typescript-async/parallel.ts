import axios from 'axios';

// Define interfaces for API responses
interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface FilmWithCharacters {
  film: Film;
  characters: Character[];
}

/**
 * Fetches film data from the Star Wars API
 * @param filmId The ID of the film to fetch
 * @returns A promise resolving to film data
 */
async function fetchFilm(filmId: number): Promise<Film> {
  // TODO: Implement this function
  // - Make a GET request to https://swapi.dev/api/films/{filmId}/
  // - Return the film data if successful
  // - Handle errors appropriately
  
  throw new Error('Not implemented');
}

/**
 * Fetches character data using a full URL
 * @param url The URL of the character to fetch
 * @returns A promise resolving to character data
 */
async function fetchCharacterByUrl(url: string): Promise<Character> {
  // TODO: Implement this function
  // - Make a GET request to the provided URL
  // - Return the character data if successful
  // - Handle errors appropriately
  
  throw new Error('Not implemented');
}

/**
 * Fetches a film and all its characters in parallel
 * @param filmId The ID of the film
 * @returns The film data and array of character data
 */
async function fetchFilmWithCharacters(filmId: number): Promise<FilmWithCharacters> {
  // TODO: Implement this function
  // - First fetch the film data
  // - Then use Promise.all() to fetch data for all characters that appear in the film
  // - Return an object with the film data and an array of character data
  // - Handle errors appropriately
  
  throw new Error('Not implemented');
}

/**
 * Fetches multiple planets in parallel
 * @param planetIds Array of planet IDs to fetch
 * @returns Array of planet data
 */
async function fetchMultiplePlanets(planetIds: number[]): Promise<Planet[]> {
  // TODO: Implement this function
  // - Create an array of promises for each planet
  // - Use Promise.all() to fetch all planets in parallel
  // - Return an array of planet data
  // - Handle errors appropriately
  
  throw new Error('Not implemented');
}

/**
 * Main function to demonstrate parallel promise execution
 */
async function mainParallel(): Promise<void> {
  console.log("Fetching data in parallel...");
  
  try {
    // TODO: Call fetchMultiplePlanets with IDs [1, 2, 3, 4, 5]
    
    // TODO: Call fetchFilmWithCharacters with a film ID (e.g., 1 for "A New Hope")
    
    // TODO: Log the results
    
  } catch (error: any) {
    console.error('An error occurred:', error.message);
  }
}

// Run the main function
mainParallel();
