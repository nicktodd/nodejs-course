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

interface CharacterHomeworld {
  character: Character;
  homeworld: Planet;
}

/**
 * Fetches planet data from the Star Wars API using async/await
 * @param planetId The ID of the planet to fetch
 * @returns The planet data
 */
async function fetchPlanetAsync(planetId: number): Promise<Planet> {
  // TODO: Implement this function using axios and async/await syntax
  // - Make a GET request to https://swapi.dev/api/planets/{planetId}/
  // - Return the planet data if successful
  // - Use try/catch for error handling
  
  throw new Error('Not implemented');
}

/**
 * Fetches character data from the Star Wars API using async/await
 * @param characterId The ID of the character to fetch
 * @returns The character data
 */
async function fetchCharacterAsync(characterId: number): Promise<Character> {
  // TODO: Implement this function using axios and async/await syntax
  // - Make a GET request to https://swapi.dev/api/people/{characterId}/
  // - Return the character data if successful
  // - Use try/catch for error handling
  
  throw new Error('Not implemented');
}

/**
 * Fetches a character and their homeworld using async/await
 * @param characterId The ID of the character
 * @returns Character and homeworld data
 */
async function fetchCharacterHomeworldAsync(characterId: number): Promise<CharacterHomeworld> {
  // TODO: Implement this function using async/await
  // - First await the character using your fetchCharacterAsync function
  // - Then await the character's homeworld using the URL from the character data
  // - Return an object with both character and homeworld information
  // - Use try/catch for error handling
  
  throw new Error('Not implemented');
}

/**
 * Main async function to demonstrate async/await usage
 */
async function mainAsync(): Promise<void> {
  console.log("Fetching data using async/await syntax...");
  
  // TODO: Call your fetchCharacterHomeworldAsync function with different character IDs
  // (e.g., 1 for Luke Skywalker) and log the results
  
  // TODO: Handle errors with try/catch
}

// Run the main async function
mainAsync();
